```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server

    Note right of browser: Content-Type: application/json; charset=utf-8
    Note right of browser: Request body: {"content":"hola!","date":"2026-10-14T11:51:07.000Z"}

    server-->>browser: 201 Created
    deactivate server

    Note right of browser: JavaScript updates the displayed notes with the new note "hola!" without reloading the page.
```