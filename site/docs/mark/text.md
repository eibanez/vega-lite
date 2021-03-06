---
layout: docs
menu: docs
title: Text
permalink: /docs/text.html
---

{: .suppress-error}
```json
// Single View Specification
{
  "data": ... ,
  "mark": "text",
  "encoding": ... ,
  ...
}
```

`text` mark represents each data point with a text instead of a point.


## Documentation Overview
{:.no_toc}

* TOC
{:toc}

## Text Table Heatmap

<span class="vl-example" data-name="layer_text_heatmap"></span>


## Labels

You can also use `text` marks as labels for other marks and set offset (`dx` or `dy`), `align`, and `baseline` properties of the mark definition.

<span class="vl-example" data-name="layer_bar_labels"></span>

## Scatterplot with Text

Mapping a field to `text` channel of text mark sets the mark's text value. For example, we can make a colored scatterplot with text marks showing the initial character of its origin, instead of [`point`](point.html#color) marks.

<span class="vl-example" data-name="text_scatterplot_colored"></span>


## Geo Text

With the [types](type.html) `longitude` and `latitude` instead of `x` and `y` and a corresponding [projection](projection.html), we can show text at accurate locations. The example below shows the name of every US state capital at the location of the capital.

<span class="vl-example" data-name="geo_text"></span>


{:#config}
## Text Config

{: .suppress-error}
```json
// Top-level View Specification
{
  ...
  "config": {
    "text": ...,
    ...
  }
}
```

The `text` property of the top-level [`config`](config.html) object sets the default properties for all text marks.  If [mark property encoding channels](encoding.html#mark-prop) are specified for marks, these config values will be overridden.

Besides standard [mark config properties](mark.html#config), text config can contain `shortTimeLabels`.

{% include table.html props="shortTimeLabels" source="TextConfig" %}
