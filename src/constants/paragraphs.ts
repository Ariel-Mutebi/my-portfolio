function paragraph(strings: TemplateStringsArray, ...values: unknown[]): string {
  const raw = String.raw(strings, ...values);
  return raw.replace(/\s*\n\s*/g, " ").trim();
}

export const PARAGRAPHS = [
  paragraph`Hello, I'm Ariel. I'm a professional full-stack we developer. Having parents who work
  in the IT field, I started putting together simple algorithms from an early age, using
  block-based programming languages. In 2021, I became interested in front-end development
  because I was mesmerized by the idea of creating functional art. I followed free online
  curricula maintained by the developer community, such as FreeCodeCamp and The Odin project,
  and over four years of doing so, I not only gained a level of expertise with the web standards,
  but I also gained a foundational understanding of data structures and design principles.`,
  paragraph`I learned not through reading and taking notes, nor through imitating other coders in tutorials,
  but by independent, hands-on practice. FreeCodeCamp required that at each lesson I write a
  code file that could pass its test, and it also had final tests. The Odin Project was even
  better in that it assigned a project at the end of each unit, encouraging me to think at a scale
  beyond just writing functions that could pass tests but instead writing repositories with many
  modules that came together to solve potential real-world problems. My learning was deliberate.
  I did not rush into learning many libraries and frameworks. I focused on becoming an expert with
  the basic tools first.`,
  paragraph`But it was always my dream to go deeper. By 2024, the apps that I could build were confined
  to the user's web browser, with no room for the interconnectedness and dynamism that characterizes
  the modern web. I was just a front-end developer. But I yearned to reach the point where I could
  code my own server and database, so that my apps could feel complete, sophisticated enough to
  potentially add value to the real world. Late in 2024, I finally reached the point in the Odin
  project curriculum where they began to teach back-end web development with Node JS and PostgreSQL,
  and I started building my first full-stack projects along the way. Baby steps.`,
  paragraph`At the start of a three-month holiday mid-2025, I returned rusty to my code editor from a period
  of relative inactivity that I had taken while preparing for and doing final exams. The project
  assigned to me now was creating an inventory management app, a job that sounded run-of-the-mill
  and yet quite intimidating. I decided to distinguish my submission by creating a lost-and-found
  website where any visitor could post a lost item and see the listing of lost and found items on
  a map. Having decided, I now overcame my intimidation and inertia, and I just built it.`,
  paragraph`This project turned out to be my big break! A senior developer who helped me with an
  issue that I posted to the mapping library that I was using checked out my project and sent an
  email to my personal email (which I had leaked in a file that set up the SQL database).
  We had an online meeting in a few days. He had been building an app to make geospatial
  analysis (think making maps with data, choropleths and the like) easier by harnessing AI.
  My project had been in roughly the same field as his, and so I was hired! Today, through
  working with him on his project, whose scale would've taken me many more years to reach,
  I continue to learn how to build better every day as a remote full-stack developer at a
  start-up company. This is my success story, a testament to the favour of God.`
];
