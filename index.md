---
title: Home
nav: home
description: Digital portfolio of Aidan Barends, Application Development student at CPUT.
---

<section class="hero">
  <div>
    <span class="eyebrow">~/aidan $ Digital portfolio · PRP3 · 2026</span>
    <h1>Hey, I'm Aidan Barends. I build for the <em>web</em>.</h1>
    <p class="lead">I'm an IT student specialising in Application Development at the Cape Peninsula University of Technology. My goal is to become a skilled full-stack developer focused on secure and scalable systems. This year I built the Driver role for GoldenWay, our team's transit app for Golden Arrow commuters.</p>
    <div class="actions">
      <a class="btn" href="agile.html">{% include icon.html name="agile" %}See my Agile eWIL work</a>
      <a class="btn btn--ghost" href="assets/docs/Aidan_Barends_CV.pdf">{% include icon.html name="download" %}View my CV (PDF)</a>
    </div>
  </div>
  <aside class="term" aria-label="At a glance">
    <div class="term__bar"><i></i><i></i><i></i><span>~/aidan</span></div>
    <div class="term__body">
      <p class="term__cmd"><span class="prompt">$</span> cat about.txt</p>
      <ul class="glance">
        <li><span>studying</span><strong>Diploma in ICT: Application Development</strong></li>
        <li><span>goldenway</span><strong>Developer, Driver role</strong></li>
        <li><span>interests</span><strong>Web dev · Cybersecurity · Networking</strong></li>
        <li><span>learning</span><strong>React · Laravel · PHP</strong></li>
      </ul>
    </div>
  </aside>
</section>

<section class="section" aria-labelledby="skills-h">
  <h2 class="bar" id="skills-h">{% include icon.html name="code" %}Technical skills</h2>
  <ul class="pills">
    <li class="pill">HTML</li><li class="pill">CSS</li><li class="pill">JavaScript</li><li class="pill">PHP</li><li class="pill">Java</li><li class="pill">Python</li><li class="pill">Laravel</li><li class="pill">React</li><li class="pill">MySQL</li><li class="pill">Derby</li><li class="pill">Git &amp; GitHub</li><li class="pill">VS Code</li><li class="pill">IntelliJ</li><li class="pill">NetBeans</li><li class="pill">MySQL Workbench</li><li class="pill">Figma</li>
  </ul>
  <h2 class="bar" style="margin-top:28px">{% include icon.html name="server" %}Networking &amp; systems</h2>
  <ul class="pills">
    <li class="pill">Router configuration</li><li class="pill">Wi-Fi &amp; mesh setup</li><li class="pill">Cabling</li><li class="pill">Hardware troubleshooting</li>
  </ul>
</section>

<section class="section" aria-labelledby="projects-h">
  <h2 class="bar" id="projects-h">{% include icon.html name="folder" %}Projects</h2>
  <div class="grid grid--2">
    <div class="card project project--feature">
      <span class="badge">Uni project · Live · Featured here</span>
      <h3>{% include icon.html name="bus" %}GoldenWay</h3>
      <p>Digital ticketing platform for Golden Arrow commuters to buy and manage bus trips online. I built the Driver role: starting runs, delay reporting, run timelines and on-time tracking.</p>
      <ul class="stack"><li>React</li><li>Vite</li><li>Supabase</li><li>PostgreSQL</li></ul>
      <p class="links"><a href="agile.html">{% include icon.html name="agile" %}Agile eWIL</a><a href="https://goldenwayapp.vercel.app/">{% include icon.html name="external" %}Live demo</a><a href="https://github.com/aidan-g-barends/GoldenWayApp">{% include icon.html name="github" %}Source</a><a href="https://aidan-barends.vercel.app/projects/golden-way">{% include icon.html name="file" %}Case study</a></p>
    </div>
    <div class="card project card--hover">
      <span class="badge">Live</span>
      <h3>{% include icon.html name="folder" %}AI Portfolio Assistant</h3>
      <p>Chat assistant on my portfolio that answers visitors' questions from my CV and project data, streaming replies as they are generated.</p>
      <ul class="stack"><li>Next.js</li><li>TypeScript</li><li>Gemini API</li><li>Tailwind CSS</li></ul>
      <p class="links"><a href="https://aidan-barends.vercel.app/#ask">{% include icon.html name="external" %}Live demo</a><a href="https://aidan-barends.vercel.app/projects/ask-aidan-ai-assistant">{% include icon.html name="file" %}Case study</a></p>
    </div>
    <div class="card project card--hover">
      <span class="badge">Uni project · Live</span>
      <h3>{% include icon.html name="folder" %}PracticeFlow CRM</h3>
      <p>Full-stack CRM for medical practices: patients, appointments, clinical workflows and staff admin. Built by a six-person team; I worked on the frontend.</p>
      <ul class="stack"><li>Next.js</li><li>React</li><li>TypeScript</li><li>Supabase</li></ul>
      <p class="links"><a href="https://practiceflow-crm-iota.vercel.app/">{% include icon.html name="external" %}Live demo</a><a href="https://github.com/aidan-g-barends/practiceflow-crm">{% include icon.html name="github" %}Source</a><a href="https://aidan-barends.vercel.app/projects/practiceflow-crm">{% include icon.html name="file" %}Case study</a></p>
    </div>
    <div class="card project card--hover">
      <span class="badge">Uni project</span>
      <h3>{% include icon.html name="folder" %}MediTicket 2</h3>
      <p>Medical practice platform connecting patients, doctors and staff. I built the patient module across the Spring Boot backend and the Swing frontend.</p>
      <ul class="stack"><li>Spring Boot</li><li>Java</li><li>JPA/Hibernate</li><li>MySQL</li></ul>
      <p class="links"><a href="https://github.com/AidanBarends/MediTicket2">{% include icon.html name="github" %}Backend</a><a href="https://github.com/AidanBarends/MediTicketApp">{% include icon.html name="github" %}Frontend</a><a href="https://aidan-barends.vercel.app/projects/mediticket-2">{% include icon.html name="file" %}Case study</a></p>
    </div>
    <div class="card project card--hover">
      <span class="badge">Uni project · In progress</span>
      <h3>{% include icon.html name="folder" %}UniExchange</h3>
      <p>Campus marketplace for CPUT students to buy, sell and exchange goods and services. I built the campus bulletin and listing details page.</p>
      <ul class="stack"><li>Spring Boot</li><li>Java</li><li>React</li><li>MySQL</li></ul>
      <p class="links"><a href="https://github.com/AidanBarends/UniExchange">{% include icon.html name="github" %}Source</a><a href="https://aidan-barends.vercel.app/projects/uni-exchange">{% include icon.html name="file" %}Case study</a></p>
    </div>
    <div class="card project card--hover">
      <span class="badge">Uni project</span>
      <h3>{% include icon.html name="folder" %}Task Flow Pro</h3>
      <p>Task management platform for teams to organise, assign, monitor and complete work.</p>
      <ul class="stack"><li>Laravel</li><li>PHP</li><li>MySQL</li></ul>
      <p class="links"><a href="https://github.com/aidan-g-barends/Task-Flow-Pro">{% include icon.html name="github" %}Source</a><a href="https://aidan-barends.vercel.app/projects/task-flow-pro">{% include icon.html name="file" %}Case study</a></p>
    </div>
    <div class="card project card--hover">
      <span class="badge">Personal</span>
      <h3>{% include icon.html name="folder" %}Task Manager App</h3>
      <p>Full-stack task manager connecting an Angular frontend to a Spring Boot REST API, built to learn how the two integrate.</p>
      <ul class="stack"><li>Angular</li><li>Spring Boot</li><li>Java</li><li>TypeScript</li></ul>
      <p class="links"><a href="https://github.com/aidan-g-barends/Task-Manager-App">{% include icon.html name="github" %}Source</a><a href="https://aidan-barends.vercel.app/projects/task-manager-app">{% include icon.html name="file" %}Case study</a></p>
    </div>
    <div class="card project card--hover">
      <span class="badge">Personal · In progress</span>
      <h3>{% include icon.html name="folder" %}LedgerSense</h3>
      <p>Finance dashboard for small businesses that imports bank CSVs and flags unusual transactions.</p>
      <ul class="stack"><li>Java</li><li>Spring Boot</li><li>Spring Security</li><li>PostgreSQL</li></ul>
    </div>
  </div>
  <p class="muted" style="margin-top:14px">Client websites are on my main site: <a href="https://aidan-barends.vercel.app/">aidan-barends.vercel.app</a></p>
</section>
