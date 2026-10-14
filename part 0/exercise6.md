```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server

    Note right of browser: content-type : application/json; charset=utf-8 
    {"content":"hola!","date":"2026-10-14T11:51:07.000Z"}

    server-->>browser: 201 created 
    deactivate server

    Note right of browser: JavaScript updates the displayed notes with the new note "hola!" without reloading the page.( SPA loads the browser once and javasript does rest of the works according 
    to spa.js using fetch() )
     
   
```   