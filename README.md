# Kanji Learning App

A language learning app for Japanese word characters not part of a syllabary, i.e. the shape of the characters tells you nothing about how to pronounce them, so you must learn them one by one. These are known as "kanji".

The average kanji character has two readings: one known as the "on"-reading (of Chinese origin and typically used in compounds), and one known as the "kun"-reading (of native origin). The learner needs to know both.

If more than one reading exists in either category the app will simply aim to teach the most frequent one. It is meant as a learning aid rather than an exhaustive reference.

## Tech

This app uses a React frontend, a Node.js backend and an SQL database.

## Environment variables

The following environment variables are used and placed in ".env" in the root directory: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME. 

## Acknowledgements

 - **Easy Japanese by Jack Seward** (General information about kanji)
 - **Kodansha Kanji Learner's Dictionary, ed. Jack Halpern** (Authoritative source for kanji readings)
 - [Readme.so](https://readme.so) (Used to create this README)

## Lessons Learned

Debugging teaches you more about coding than anything else ever will.

## Licence

MIT License

Copyright (c) 2024 Daniel Andreas Wang

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.