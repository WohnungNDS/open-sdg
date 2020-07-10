<h1>Configuration</h1>

In addition to the [usual Jekyll configuration options](https://jekyllrb.com/docs/configuration/), there are many options specific to Open SDG. These are detailed below, along with usage examples. **All of these settings go in the `_config.yml` file.**

_Note about "strings": Many of the settings detailed here contain human-readable "strings" (ie, text). In most cases, they can be replaced by [translation keys](translation.md) for better multilingual support. For example, "Indicator" could be replaced with "general.indicator"._

> To see many of these options in action, the [site starter repository](https://github.com/open-sdg/open-sdg-site-starter) contains an [example config file](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_config.yml).

### analytics

_Optional_: This setting can contain another (indented) setting, `ga_prod`, which should be a [Google Analytics tracking ID](https://support.google.com/analytics/answer/1008080?hl=en#GAID). If these settings are used, usage statistics will be sent to Google Analytics. For more information about this, see the [analytics](analytics.md) page.

```nohighlight
analytics:
  ga_prod: 'paste ID here'
```

### contrast_type

_Optional_: This setting allows you to change the type of contrast button your site uses. By default there are two buttons containing 'A'. If you use this option one single button will be displayed with the text 'High contrast' / 'Default contrast', depending on which mode of contrast is active.

```nohighlight
contrast_type: long
```

### country

**_Required_**: This setting should contain two more (indented) settings: `name` and `adjective`. This are intended to allow the platform to refer to the country (or if appropriate, locality or organisation) using the platform.

```nohighlight
country:
  name: Australia
  adjective: Australian
```

### create_goals

_Optional_: This setting can be used to automatically create the goal pages. Without this setting, you will need a file for each goal (per language), in a `_goals` folder. This setting should include another (indented) setting indicating the Jekyll layout to use for the goals.

```nohighlight
create_goals:
  layout: goal
```

### create_indicators

_Optional_: This setting can be used to automatically create the indicator pages. Without this setting, you will need a file for each indicator (per language), in an `_indicators` folder. This setting should include another (indented) setting indicating the Jekyll layout to use for the indicators.

```nohighlight
create_indicators:
  layout: indicator
```

### create_pages

_Optional_: This setting can be used to automatically create 4 platform-dependent pages:

* the home page
* the indicators.json page
* the search results page
* the reporting status page

Without this setting, you will need a file for each of these 4 pages (per language), in a `_pages` folder. This setting can include more advanced settings (see this [jekyll-open-sdg-plugins code](https://github.com/open-sdg/jekyll-open-sdg-plugins/blob/master/lib/jekyll-open-sdg-plugins/create_pages.rb#L18)) but can also simply be set to `true`.

```nohighlight
create_pages: true
```

If you would like to use the alternative frontpage (`frontpage-alt`) alongside a dedicated "goals" page, you can used this configuration:

```nohighlight
create_pages:
  pages:
    - folder: /
      layout: frontpage-alt
    - folder: /goals
      layout: goals
    - folder: /reporting-status
      layout: reportingstatus
    - filename: indicators.json
      folder: /
      layout: indicator-json
    - folder: /search
      layout: search
```

### custom_css

_Optional_: This setting can be used to load additional CSS files on each page. It should be a list of relative paths to CSS files.

```
custom_css:
  - /assets/css/custom.css
```

NOTE: This approach is deprecated. It is recommended to instead [put your custom styles into a _sass folder](customisation.md#adding-custom-css).

### custom_js

_Optional_: This setting can be used to load additional JavaScript files on each page. It should be a list of relative paths to JavaScript files.

```
custom_js:
  - /assets/js/custom.js
```

### data_edit_url

**_Required_**: This setting controls the URL of the "Edit Data" that appear on the staging site's indicator pages. It should be a full URL. Note that you can include `[id]` in the URL, and it will be dynamically replaced with the indicator's id (dash-delimited).

```nohighlight
data_edit_url: http://prose.io/#my-org/my-repo/edit/develop/data/indicator_[id].csv
```

### date_formats

_Optional_: This setting can be used to control date formats for use in the site, such as in the news/category/post layouts. Any number date formats can be entered, using an arbitrary key, such as "standard". Each date format should have a variant for each of your languages. For example, here is how you might configure a "standard" date format:

```nohighlight
date_formats:
  standard:
    en: "%b %d, %Y"
    es: "%d de %b de %Y"
```

The `%` variables in the formats correspond to the variables listed in this [Ruby DateTime documentation](https://ruby-doc.org/stdlib-2.6.1/libdoc/date/rdoc/DateTime.html#method-i-strftime).

### disclaimer

_Optional_: This setting controls the content of the disclaimer that appears at the top of each page. If you are not happy with the default ("ALPHA: This is a development website. We welcome your feedback.") then you can use something like the following example configuration:

```nohighlight
disclaimer:
  phase: BETA
  message: This is my disclaimer message.
```

The above configuration would result in: "BETA: This is my disclaimer message."

If you only want to change the phase (to "BETA" for example), you can omit the `message` like so:

```
disclaimer:
  phase: BETA
```

As always, you can use translation keys.

### email_contacts

**_Required_**: This setting should contain three more (indented) settings for email addresses: `questions`, `suggestions`, and `functional`. This allows the platform to direct users to appropriate inboxes from various parts of your site.

```nohighlight
email_contacts:
  questions: test@example.com
  suggestions: test@example.com
  functional: test@example.com
```

### environment

**_Required_**: This setting should be either `staging` or `production`. Certain features of the platform, such as data management links, will only appear on `staging`. Typically you will have this set to `staging` in the `_config.yml` file, and set to `production` in the `_config_prod.yml` file.

```nohighlight
environment: staging
```

### footer_menu

**_Required_**: This setting controls the footer menu for the platform. It should contain a list of menu items, each containing a `path` and a [translation key](translation.md).

The following example provides a footer menu matching older versions of Open SDG, which included options for social media and email contacts.

```nohighlight
footer_menu:
  - path: mailto:my-email-address@example.com
    translation_key: menu.contact_us
  - path: https://twitter.com/MyTwitterAccount
    translation_key: general.twitter
  - path: https://facebook.com/MyFacebookAccount
    translation_key: general.facebook
  - path: /faq
    translation_key: menu.faq
  - path: /cookies
    translation_key: menu.cookies
```

### frontpage_cards

_Optional_: This setting is used in the `frontpage-alt` layout. It can display any number of "cards" in 3-column rows, beneath the grid of goal tiles. It should be a list of cards. Each configuration is optional, and here is an displaying one card with all of the options:

```
frontpage_cards:
    -
      # This controls the color of the line at the top of the card.
      rule_color: orange
      # This sets the title of the card.
      title: My card title
      # This sets the content of the card. Markdown is supported.
      content: |
        * List item
        * List item with [link](https://example.com)
      # This displays any file in the `_includes` folder.
      include: components/download-all-data.html
      # This controls the text for a call-to-action button.
      button_label: My button text
      # This controls the URL the button links to.
      button_link: https://example.com
    -
      title: My second card
      etc...
```

### frontpage_goals_grid

_Optional_: This setting is used in the `frontpage-alt` layout. It can display a title and description above the grid of goal tiles. It can be configured in the following way:

```
frontpage_goals_grid:
    title: title goes here
    description: description goes here
```

### frontpage_heading

_Optional_: This setting can control the heading that appears on the front page.

```nohighlight
frontpage_heading: Australian data for Sustainable Development Goal indicators
```

### frontpage_instructions

_Optional_: This setting can control the instructions that appear on the front page.

```nohighlight
frontpage_instructions: Click on each goal for Australian statistics for Sustainable Development Goal global indicators.
```

### frontpage_introduction_banner

_Optional_: This setting adds a banner to your site's homepage, in order to introduce your users to your site. To add a banner update the `_config.yml` file with these settings:

```yaml
frontpage_introduction_banner:
    title: title goes here
    description: description goes here
```

### goal_image_base

**_Required_**: This setting controls the base URL for downloading the imagery for the goals (PNG files). The platform will use this as a base, and complete the URLs (behind the scenes) by adding a language and number. For example, if you set this to `https://example.com`, then the platform will try to download the Spanish image for Goal 4 at: `https://example.com/en/4.png`.

```nohighlight
goal_image_base: https://open-sdg.github.io/sdg-translations/assets/img/goals
```

### graph_color_set

_Optional_: This setting can be used to customize the color set used in the charts. There are four possible entries:
Use `graph_color_set: 'default'` for using the 6 default colors,
`graph_color_set: 'sdg'` to use the 17 SDG colors in all charts,
`graph_color_set: 'goal'` to use shades of the color of the current indicator's goal,
`graph_color_set: 'custom'` to use a set of customized colors. In this case, write the hexadecimal color codes of the colors you want to use to the list in `graph_color_list` (see below).

> **NOTE**: Whatever color scheme you choose here, please ensure that all colors satisfy
> the accessibility (minimum contrast) standards in your region. These colors will need to
> be visible on white and black backgrounds.

### graph_color_list

_Optional_: This setting can be used to define a set of colors to be used in the charts. Precondition is `graph_color_set` to be `custom`. Enter a list of hexadecimal color codes.
```yaml
graph_color_list': ['3fd64f','cfd63f','4eecec','ec4ed9']
```

### graph_color_number

_Optional_: This setting can be used to limit the length of the list of colors selected via `graph_color_set`. The maximum value for `graph_color_set: 'default'` is 6, for `graph_color_set: 'sdg'` is 17, for `graph_color_set: 'goal'` is 9 and for `graph_color_set: 'custom'` the length of `graph_color_list`. If nothing is defined here, the corresponding maximum is used. Be aware that the number selected here affects how many datasets can be displayed simultaneously in the charts (2 times this value - once as a normal line or bar and once as a dashed line or bar).

### hide_empty_metadata

_Optional_: This setting can be used to hide any metadata fields that are empty. In other words, this setting can ensure that if an indicator has no data for a particular metadata field, that field will not display at all. The default behavior if for all metadata fields to be displayed, regardless of whether the indicator has the required data.

```nohighlight
hide_empty_metadata: true
```

### languages

**_Required_**: This setting controls the languages to be used on the site. This should be a list of language codes, and the first is assumed to be the default.

Note that the [Jekyll defaults](https://jekyllrb.com/docs/configuration/front-matter-defaults/) mechanism should also be used, to ensure that all pages on the will be assigned a default language.

```nohighlight
languages:
  - es
  - en

defaults:
  -
    scope:
      path: ""
    values:
      language: "es"
```

### languages_public

_Optional_: This setting can be used if you are not happy with any of the standard language codes. For example, if the standard code for a language is `xyz` but you would prefer that it show up in your URLs as `abc`, then you could do the following:

```nohighlight
languages_public:
  xyz: abc
```

### metadata_edit_url

**_Required_**: This setting controls the URL of the "Edit Metadata" that appear on the staging site's indicator pages. It should be a full URL. Note that you can include `[id]` in the URL, and it will be dynamically replaced with the indicator's id (dash-delimited).

```nohighlight
metadata_edit_url: http://prose.io/#my-org/my-repo/edit/develop/meta/[id].md
```

### metadata_tabs

_Optional_: This setting can control the metadata tabs which appear on the indicator pages. This is directly tied to the "schema" of your data repository (ie, the `_prose.yml` file). This keys of this object must correspond to the "scope" of the fields in that schema file. The following configuration is assumed if this setting is omitted:

```nohighlight
metadata_tabs:
  national:
    title: indicator.national_metadata
    blurb: indicator.national_metadata_blurb
  global:
    title: indicator.global_metadata
    blurb: indicator.global_metadata_blurb
  sources:
    title: indicator.sources
    blurb: ''
```

About the "Sources" tab:

While the "keys" above, such as "national" and "global", are arbitrary, the "sources" key is special. The "Sources" tab will only display if the key under `metadata_tabs` is specifically `sources`.

### menu

**_Required_**: This setting controls the main navigation menu for the platform. It should contain a list of menu items, each containing a `path` and a [translation key](translation.md).

```nohighlight
menu:
  - path: /reporting-status
    translation_key: menu.reporting_status
  - path: /about
    translation_key: menu.about
  - path: /faq
    translation_key: menu.faq
```

### non_global_metadata

_Optional_: This setting can be used to control the text of the tab containing non-global metadata. The default text is "National Metadata", but if you are implementing a sub-national platform, you could use "Local Metadata", or similar. Note that using a [translation key](translation.md) is recommended for better multilingual support.

```nohighlight
non_global_metadata: indicator.national_metadata
```

NOTE: This approach is deprecated. It is now possible to have complete control over all the metadata tabs using the `metadata_tabs` configuration setting (see above).

### plugins

**_Required_**: This is a general Jekyll setting, but it is mentioned here to indicate the required plugins. At a minimum you should include the following:

```
plugins:
  - jekyll-remote-theme
  - jekyll-open-sdg-plugins
```

### remote_data_prefix

**_Required_**: This setting tells the platform where to find your hosted [data repository](glossary.md#data-repository).

```nohighlight
remote_data_prefix: https://my-github-org.github.io/my-data-repository
```

### remote_theme

**_Required_**: This is not specific to Open SDG, but it is very important to always use a specific version of Open SDG (as opposed to using the latest version). For example, to use version 0.8.0 of the platform, use the following:

```nohighlight
remote_theme: open-sdg/open-sdg@0.8.0
```

This is far safer and more recommended than using the latest version, such as the following (which is **not recommended**):

```nohighlight
remote_theme: open-sdg/open-sdg
```

### search_index_boost

_Optional_: This setting can be used to give a "boost" to one or more fields in the search index. The boost number should be a positive integer. The higher the number, the more "relevant" that field will be in search results. If omitted, the following defaults will be used:

```
search_index_boost:
  title: 10
```

The following example shows additional fields that can be boosted:

```
search_index_boost:
  # The title of the indicator, goal, or page.
  title: 10
  # The content of the indicator, goal, or page.
  content: 1
  # The id number of the indicator or goal.
  id: 5
```

Additionally, any fields set in the `search_index_extra_fields` setting may also be boosted. For example:

```
search_index_boost:
  # Assumes that "national_agency" was set in "search_index_extra_fields".
  national_agency: 5
```

### search_index_extra_fields

_Optional_: This setting can be used to "index" additional metadata fields in your indicators, for the purposes of affecting the site-wide search. For example, if you have a metadata field called `national_agency` and you would like the sitewide search to include that field, add it in a list here, like so:

```nohighlight
search_index_extra_fields:
  - national_agency
```

### sharethis_property

_Optional_: This setting creates a [ShareThis](https://sharethis.com/platform/share-buttons/) widget along the left side of every page. It should be the [property id](https://sharethis.com/support/faq/how-do-i-find-my-property-id/) for your ShareThis account. For more information about this, see the [sharing](social-media-sharing.md) page.
