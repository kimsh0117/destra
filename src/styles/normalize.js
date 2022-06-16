import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
}

body {
  margin: 0;
}
main {
  display: block;
}


h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
}

pre {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

a {
  background-color: transparent;
}

abbr[title] {
  border-bottom: none; /* 1 */
  text-decoration: underline; /* 2 */
  text-decoration: underline dotted; /* 2 */
}

b,
strong {
  font-weight: bolder;
}


code,
kbd,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

small {
  font-size: 80%;
}

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sup {
  top: -0.5em;
}

img {
  border-style: none;
}


button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  line-height: 1.15; /* 1 */
  margin: 0; /* 2 */
}


button,
input {
  /* 1 */
  overflow: visible;
}


button,
select {
  /* 1 */
  text-transform: none;
}


button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button;
}


button::-moz-focus-inner,
[type='button']::-moz-focus-inner,
[type='reset']::-moz-focus-inner,
[type='submit']::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

button:-moz-focusring,
[type='button']:-moz-focusring,
[type='reset']:-moz-focusring,
[type='submit']:-moz-focusring {
  outline: 1px dotted ButtonText;
}


fieldset {
  padding: 0.35em 0.75em 0.625em;
}


legend {
  box-sizing: border-box; /* 1 */
  color: inherit; /* 2 */
  display: table; /* 1 */
  max-width: 100%; /* 1 */
  padding: 0; /* 3 */
  white-space: normal; /* 1 */
}

progress {
  vertical-align: baseline;
}


textarea {
  overflow: auto;
}


[type='checkbox'],
[type='radio'] {
  box-sizing: border-box; /* 1 */
  padding: 0; /* 2 */
}


[type='number']::-webkit-inner-spin-button,
[type='number']::-webkit-outer-spin-button {
  height: auto;
}


[type='search'] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

[type='search']::-webkit-search-decoration {
  -webkit-appearance: none;
}


::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}


details {
  display: block;
}

summary {
  display: list-item;
}


template {
  display: none;
}


[hidden] {
  display: none;
}

html,
body,
div,
h1,
h2,
h3,
h4,
h5,
h6,
p,
dl,
dt,
dd,
ul,
ol,
li,
table,
tr,
th,
td {
  margin: 0;
  padding: 0;
}

button {
  border: 0;
  outline: 0;
  cursor: pointer;
  appearance: none;
  background: transparent;
  border: 0;
}

input {
  outline: 0;
}

::-moz-placeholder {
  color: #b2b2b2;
  opacity: 1;
}

:-ms-input-placeholder {
  color: #b2b2b2;
}

::-webkit-input-placeholder {
  color: #b2b2b2;
}

`
