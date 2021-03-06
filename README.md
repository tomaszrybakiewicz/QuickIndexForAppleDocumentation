## Quick Index for Apple Documentation

### What?

Quick Index is a Google Chrome extension that injects an additional navigation panel to https://developer.apple.com/documentation pages.

![Screenshot 1](/wiki/s1.png)

### Why?

Apple documentation is an invaluable source of information for any iOS/OSX developer. Couple hundreds of frameworks with thousands of pages. Each page beautifully written with a detailed description of each class. 

However, it lacks navigation that would allow one to jump directly to a specific topic, method, and/or property.

### How?

This extension finds all header tags and css-class annotated ("symbol-name") tags on the page, and organizes them into a quick index:
```
h1
  h2
    h3
     symbol-name
     symbol-name
     symbol-name
     symbol-name
    h3
    h3
  h2
     symbol-name
     symbol-name
```

## License

```
 Copyright (c) 2019-present, Tomasz Rybakiewicz.

 Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in
 compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software distributed under the License is
 distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See
 the License for the specific language governing permissions and limitations under the License.
```