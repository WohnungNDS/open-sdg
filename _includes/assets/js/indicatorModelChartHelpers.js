/**
 * Model helper functions related to charts and datasets.
 */

/**
 * @return {Object} Starting point for a Chart.js dataset
 */
function getBaseDataset() {
  return Object.assign({}, {
    fill: false,
    pointHoverRadius: 5,
    pointBackgroundColor: '#FFFFFF',
    pointHoverBorderWidth: 1,
    tension: 0,
    spanGaps: false
  });
}

/**
 * @param {Array} rows
 * @param {Object} combination Key/value representation of a field combo
 * @param {Array} selectableFields Field names
 * @return {Array} Matching rows
 */
function getDataMatchingCombination(data, combination, selectableFields) {
  return data.filter(function(row) {
    return selectableFields.every(function(field) {
      return row[field] === combination[field];
    });
  });
}

/**
 * @param {Object} combination Key/value representation of a field combo
 * @param {string} fallback
 * @return {string} Human-readable description of combo
 */
function getCombinationDescription(combination, fallback) {
  var keys = Object.keys(combination);
  if (keys.length === 0) {
    return fallback;
  }
  return keys.map(function(key) {
    return translations.t(combination[key]);
  }).join(', ');
}

/**
 * @return {string} Hex number of headline color
 *
 * TODO: Make this dynamic to support high-contrast.
 */
function getHeadlineColor() {
  return '777777';
}

/**
 * @return {string} CSS value for headline background
 *
 * TODO: Make this dynamic to support high-contrast.
 */
function getHeadlineBackground() {
  return '#FFFFFF';
}

/**
 * @param {int} datasetIndex
 * @param {Array} colors
 * @return Color from a list
 */
function getColor(datasetIndex, colors) {
  if (datasetIndex > colors.length) {
    return colors[datasetIndex - colors.length];
  } else {
    return colors[datasetIndex];
  }
}

/**
 * @param {int} datasetIndex
 * @param {Array} colors
 * @return CSS background color from a list
 */
function getBackgroundColor(datasetIndex, colors) {
  return '#' + getColor(datasetIndex, colors);
}

/**
 * @param {string} color
 * @return Canvas pattern from color
 */
function getBackgroundPattern(color) {
  if (window.pattern && typeof window.pattern.draw === 'function') {
    return window.pattern.draw('diagonal', color);
  }
  return color;
}

/**
 * @param {int} datasetIndex
 * @param {Array} colors
 * @return Background color or pattern
 */
function getBackground(datasetIndex, colors) {
  var color = getBackgroundColor(datasetIndex, colors);

  if (datasetIndex > colors.length) {
    color = getBackgroundPattern(color);
  }

  return color;
}

/**
 * @param {int} datasetIndex
 * @param {Array} colors
 * @return Use dashed lines after running out of colors
 */
function getBorderDash(datasetIndex, colors) {
  return datasetIndex > colors.length ? [5, 5] : undefined;
}

/**
 * @param {Array} years
 * @param {Array} rows
 * @return {Array} Prepared rows
 */
function prepareDataForDataset(years, rows) {
  return years.map(function(year) {
    return rows
      .filter(function(row) { return row[YEAR_COLUMN] === year; }, this)
      .map(function(row) { return row[VALUE_COLUMN]; }, this)[0];
  }, this);
}

/**
 * @param {Array} years
 * @param {Array} rows
 * @param {string} label
 * @return {Object} Dataset object for Chart.js
 */
function makeHeadlineDataset(years, rows, label) {
  var dataset = getBaseDataset();
  return Object.assign(dataset, {
    label: label,
    borderColor: '#' + getHeadlineColor(),
    backgroundColor: getHeadlineBackground(),
    pointBorderColor: '#' + getHeadlineColor(),
    data: prepareDataForDataset(years, rows),
  });
}

/**
 * @param {Array} years
 * @param {Array} rows
 * @param {Object} combination
 * @param {string} labelFallback
 * @param {string} color
 * @param {string} background
 * @param {Array} border
 * @return {Object} Dataset object for Chart.js
 */
function makeDataset(years, rows, combination, labelFallback, color, background, border) {
  var dataset = getBaseDataset();
  return Object.assign(dataset, {
    label: getCombinationDescription(combination, labelFallback),
    disaggregation: combination,
    borderColor: '#' + color,
    backgroundColor: background,
    pointBorderColor: '#' + color,
    borderDash: border,
    borderWidth: 4,
    data: prepareDataForDataset(years, rows),
  });
}
