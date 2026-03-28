## Why

The voting system currently supports only English, limiting its accessibility for Ukrainian-speaking users. Adding multilingual support with English and Ukrainian will make the application accessible to a broader audience and provide better user experience for Ukrainian users.

## What Changes

- Add internationalization (i18n) infrastructure to the web interface
- Implement language switcher UI component
- Create translation files for English (en) and Ukrainian (uk)
- Translate all user-facing text including poll interface, buttons, messages, and labels
- Persist user language preference across sessions
- Set default language based on browser settings

## Impact

- Affected specs: `i18n` (new capability)
- Affected code: `index.html` (language switcher, translation system)
- Dependencies: Requires `web-ui` capability (from add-web-interface change)
- No breaking changes - English remains default language

