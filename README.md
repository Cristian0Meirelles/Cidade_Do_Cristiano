# A cidade do Cristiano

My portfolio, built as a small pixel-art city. Each building is a different
part of who I am as a software engineer, and the whole site is available in
six languages: Portuguese, English, Spanish, French, German and Japanese.

## The buildings

| Building    | What's inside                                                     |
| ----------- | ----------------------------------------------------------------- |
| House       | About me, as a trading card                                       |
| Office      | Every job in detail: context, what I did, tools and results       |
| Workshop    | Each project as a technical blueprint                             |
| Library     | My story in eight chapters                                        |
| Station     | Every place I've lived, as a transit line                         |
| School      | Education, languages and skills, with where I used each one       |
| Studio      | My sketchbook: drawings, sketches and a page for visitors to draw |
| Observatory | Where I'm heading, as constellations                              |
| Arcade      | A platform game through my career                                 |
| Cyber café  | A text adventure (Portuguese only)                                |

## Tech

Plain HTML, CSS and modern JavaScript (ES modules). No framework and no runtime
dependencies.

- Each place is a standalone page with its own visual identity, loaded by the
  city inside an iframe. Every page also works on its own URL, such as
  `/en/trabalhos/`.
- Light and dark themes, keyboard navigation, `prefers-reduced-motion`
  support and responsive layouts tested on mobile screens.
- The city picks the visitor's language from the browser, with a manual
  selector that remembers the choice.

## How translations work

Pages are written once, in Portuguese, in `src/places/`. Each page has a file
in `src/i18n/` that pairs every Portuguese sentence with its translations:

```json
{
  "pt": "Onde eu trabalhei, e o que eu fiz lá",
  "en": "Where I’ve worked, and what I did there",
  "es": "Dónde trabajé y qué hice allí",
  "fr": "Où j’ai travaillé, et ce que j’y ai fait",
  "de": "Wo ich gearbeitet habe und was ich dort gemacht habe",
  "ja": "働いてきた場所と、そこでやったこと"
}
```

`scripts/build.mjs` generates one copy of each page per language in `dist/`
and warns about any translation that no longer matches the source. The city
itself switches language at runtime, using `src/js/i18n.js`.

## Project structure

```
src/
  index.html      the city
  css/ js/        city styles, logic and translations
  places/         one page per building
  i18n/           translations for each page
  shared/         base styles, theme toggle and iframe bridge
  assets/img/     photos, drawings and screenshots
scripts/
  build.mjs       builds dist/ in six languages
```

## Running locally

```bash
npm install
npm run dev
```

## Deploy

The project deploys to Vercel with no extra setup. `vercel.json` runs
`npm run build` and serves the `dist/` folder.

## Contact

Cristiano Meirelles, full stack software engineer.

- Email: cristianocmeirelles@gmail.com
- LinkedIn: [linkedin.com/in/cristiano-c-meirelles](https://www.linkedin.com/in/cristiano-c-meirelles/)
- GitHub: [github.com/Cristian0Meirelles](https://github.com/Cristian0Meirelles)
