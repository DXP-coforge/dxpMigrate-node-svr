Compile:
    npx tsc

Run sample:
    node dist/samples/run-mapping.js
(If you use ts-node)
    npx ts-node src/samples/run-mapping.ts


Console output (simplified)

=== OUTPUT ===
{
  type: 'optimizely:page',
  fields: {
    title: 'Home',
    seoTitle: 'Home Page',
    sections: [
      {
        type: 'hero',
        fields: {
          headline: 'Welcome',
          image: '/content/dam/hero.jpg'
        }
      },
      {
        type: 'textBlock',
        fields: {
          text: 'Hello world'
        }
      }
    ]
  }
}

=== TRACE ===
┌─────────┬──────────────┬───────────────────────────┐
│ (index) │ sourcePath   │ value                     │
├─────────┼──────────────┼───────────────────────────┤
│ 0       │ jcr:title    │ Home                      │
│ 1       │ seo.title    │ Home Page                 │
│ 2       │ headline     │ Welcome                   │
│ 3       │ image        │ /content/dam/hero.jpg     │
│ 4       │ text         │ Hello world               │
└─────────┴──────────────┴───────────────────────────┘
