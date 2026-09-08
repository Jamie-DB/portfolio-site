<!-- Carried across from the hub's data/master-document.md on Sept 7, 2026, with a
     clearance pass against the site's binding rules. Facts change in the master
     document first and get re-carried here. Sections map to the master document:
     Experience to section 2, the catalog to 3, Skills to 4, Teaching to 6,
     Education to 5. Sections 7 to 9 of the master document are private and are
     not carried. Folds (<details class="fold">) hide detail until asked for. -->

## Experience

<div class="commits">

<article class="commit head">
<p class="when">Sept 2026</p>
<h3>Open to the next role</h3>
<p class="meta">Remote or hybrid preferred. Deepest in AI-augmented engineering, C-family systems and backend, and Unity and simulation. Open across languages and domains as the tools collapse those details into purer forms of problem solving.</p>
</article>

<div class="personal">

### Personal projects
<p class="meta"><time data-short="Personal">2025 to present</time> Independent work, not employment. All of it built with the workflow this site describes, and three of the repos are public with build logs.</p>

- **yt_transcript_mcp.** Swift 6 MCP server fetching YouTube transcripts through the InnerTube API. No Node, no Python. Built in a day: five phases planned before any code, then findings filed by a second agent reviewing with fresh context. 27 issues the same day, 26 closed by end of day. In-memory caching keyed by returned language after review caught the requested-language bug, offline unit tests, SSRF designed out before the network code existed, packaged for Claude Desktop. Public, in daily use. Backlog: host it online for mobile access.
- **chordsheet.** TypeScript, Vite, and Vitest web app for play-along guitar chord sheets, 248 agent-generated tests across 17 files. The AI assist deliberately routes around copyright refusals by emitting only chord names anchored to lyrics the user already has. Monospace character-cell layout so print output is literal text rows, capo as a display transform, chord diagram voicing tables, setlists, File System Access API storage. From a one-paragraph idea to weekly rehearsal use in twelve days and 31 issues. Public.
- **history-heatmap.** Historical population-dynamics visualization engine, AD 33 to the present, in one self-contained HTML file with no server and no dependencies. An analytical gaussian heat field evaluated per viewport at constant cost, mass-conserving anti-aliasing for city-scale overlays, a hybrid model blending hand-curated anchor data with logistic growth and diffusion, a non-linear timeline, city lifecycle animations as pure functions of the playhead, provenance tiers, deep links. Built out of an interest in how ideas spread and which ones last, which is why the first dataset is Christianity and Islam rather than a subject in its own right. More population categories are planned. The dataset is unaudited, and the README says so. Public, with a live demo.
- **magenta_pipeline.** Three-phase art recovery pipeline resurrecting legacy sprite sheets for the reboot below: Photoshop JSX automation, then Python and OpenCV (HSV-space masking to isolate flattened magenta overlays, and nearest-neighbor fill via distance transform to reconstruct the art underneath, after Navier-Stokes inpainting was tried and replaced), PSB write-back, then mask flattening because Unity's PSD importer silently skips masked layers. Independently runnable stages, batch mode, a threshold tuning tool. Private.
- **Warmongers reboot.** Rebuilding the 2012 title in Unity with Git and LFS, Claude Code as the primary development accelerator, and a Unity asset postprocessor enforcing canonical sprite import settings. The design corpus is versioned like code. Private, in progress.

<details class="fold">
<summary>Two more: the course platform and the AI workflow infrastructure.</summary>

- **Course platform, May to Aug 2026.** The static, no-build site that served the two game UX courses to live cohorts: self-contained HTML pages per lesson, a hub with tabbed weeks, a gate with a maintenance switch. 85 commits. Offline since departure.
- **AI workflow infrastructure.** Claude Code as the daily driver with an orchestrator-plus-subagents pattern, custom slash commands, hooks, and CLAUDE.md discipline. A frontier model orchestrates and cheaper models do the mechanical work, on a 60/30/10 cost rule.

</details>

</div>

### Course Director, Software Engineering and UX Design
<p class="meta"><time data-short="Course Director">Jul 2022 to Sept 2026</time> Full Sail University</p>

Taught and maintained five courses across six course sections, three in iOS development and two in game UX design, and used the last year to rebuild all of them around AI-assisted tooling that I designed, ran, and measured.

- Rebuilt six complete courses from zero in three months: 99 new activities, 24 new assignments, 14 Xcode starter projects with 98 Swift files. The anonymous end-of-course survey scored 5.0 out of 5 on every metric, and 6 of 6 said the school should build more courses this way.
- Designed and ran an AI-assisted grading pipeline in production: Claude Code custom slash commands, database-backed submission and feedback tracking via MCP, rubric-aware batch evaluation across six sections. Every output was instructor-reviewed before it was written back, and student identities never entered the model context.
- Authored the regulatory case for it solo: the FERPA compliance landscape for AI adoption, an RSI plan against 34 CFR 600.2, a five-year institutional AI roadmap, and VP-level presentations prepared on institutional AI adoption and governance.

<details class="fold">
<summary>The 2026 rebuild in detail.</summary>

- Coverage across the sequence: Swift and SwiftUI, async/await concurrency, MVVM and three-layer architecture, Supabase backends, accessibility (VoiceOver, Dynamic Type), game UX, user onboarding, testing with XCTest, TestFlight and App Store distribution.
- Around 145 pages of new content. Nothing from the old versions survived. Each starter project's README doubles as the assignment brief, and several ship with failing test suites the student turns green.
- Took the two game UX courses from an empty repository to a tagged v1.0 serving a live cohort in 16 days and 63 commits.
- Wrote measurable per-course learning objectives for the full iOS sequence in Dec 2025 and used them as the rebuild's spine, with a deliberate scaffolding arc from heavy in the first course to none in the self-directed portfolio project.
- Built a handoff-ready, database-backed documentation layer around the sequence: a program outline with curriculum philosophy, per-class outlines, a formal scaffolding-levels model, instructor orientations, week-by-week instructor guides, and grading guides. Written so any instructor could pick the courses up cold, which is what happened at departure.
- Integrated EA Positive Play accessibility case studies (the Apex Legends ping system, Fonttik) into the UX curriculum with critical industry evaluation.

</details>

<details class="fold">
<summary>The grading pipeline in detail.</summary>

- Discipline-specific evaluation personas: code review (build checks, Swift conventions, project structure) and design review (prototypes, wireflows, visual hierarchy, accessibility), with configurable criteria per course.
- Longitudinal tracking across terms, so prior feedback personalizes current comments. The pipeline retrieved it. Nothing was pasted by hand.
- Student identities never entered the model context: an abstraction step run by hand, never automated.
- Custom slash commands for grading context management of large and image-heavy submissions.
- A human checkpoint by design: the instructor reviews, edits, and approves all output. Computer-generated feedback alone was never delivered.
- A studio model rather than a broadcast model: one-on-one working sessions and individualized written feedback in place of a lecture format. 70+ individualized feedback documents for a first cohort of around 12 students.

</details>

<details class="fold">
<summary>The regulatory and institutional work in detail.</summary>

- Mapped the FERPA compliance landscape for AI adoption: federal enforcement, RSI requirements, Florida SB 482, BAA and enterprise paths, and a litigation exposure framework.
- Wrote an RSI plan arguing the courses meet 34 CFR 600.2 Regular and Substantive Interaction without a synchronous lecture, quoting the regulation verbatim.
- Wrote a policy brief on federally recognized interaction options for online courses, with a peer-institution precedent survey (Ohio State, University of Houston, SUNY OSCQR).
- Drafted replacement course learning objectives matching the portfolio work the course actually produces: measurable verb, durable noun, no tool lock-in.
- Authored a five-year institutional AI roadmap (2026 to 2030): phased tool deployment, curriculum integration, compliance automation, cross-team integration architecture.

</details>

### Senior Software Engineer, Tech Lead, Visualization and Control
<p class="meta"><time data-short="Tech Lead">Jan 2020 to Jun 2022</time> Luminar Technologies, remote</p>

An individual-contributor role first: hands-on engineering was at least three quarters of the job, with the team lead arc layered on top of it.

- Tech Lead on a 7-person visualization team of senior and staff engineers building real-time LiDAR visualization and control software in C++, C#, and Unity for production autonomous driving hardware, the Iris sensor, while shipping code daily.
- Progressed from individual contributor to Tech Lead responsible for stakeholder alignment across several automotive OEM engineering teams. Primary technical liaison for Volvo, Toyota, and SAIC, and the contact point for all technical discussion between the visualization team and the larger organization.
- Ran sprint planning, code review, and delivery with a distributed group of engineers and contractors on a hardware-coupled product with no room for latency or instability.
- Designed and maintained high-performance real-time simulation and visualization software for point cloud and machine learning data supporting LiDAR hardware and autonomous driving software.
- Optimized Unity rendering for low-latency performance: Job System and Burst, compute and geometry shaders, stencil and depth buffers, render-to-texture, custom frustum construction and slicing, GLSL.
- C++ and C# interop at the driver, build, and marshalling layers: P/Invoke, struct alignment across the managed boundary, native object wrappers and dispose lifecycle. Build tooling in CMake, vcpkg, Conan, Jenkins, and Docker across Linux and Windows.
- Created calibration and testing software for hardware components, improving ease of use and reducing calibration time for automotive stakeholders and manufacturing. Partnered with manufacturing on the second-generation Iris production line.
- Built manufacturing calibration inside the team's Unity visualizer in one sprint, measured it against the existing MATLAB loop, and recommended against absorbing it, on control-layer fit, team capacity, and product surface.

<details class="fold">
<summary>Roadmap work, the weekly shape, and the daily stack.</summary>

- Drove stakeholder feedback into the hardware and software roadmap for the Iris system across multiple product generations. Translated sensor requirements from external engineering teams into visualization specifications. Designed and diagrammed new features in UML for team collaboration and integration with larger company projects.
- The weekly shape of a senior IC: own tickets across four subsystems, pull request review on most days, two to three code reviews, one cross-team unblock, PI planning.
- Daily stack: C++, C#, Unity, Bash, Python, CMake, Conan, git. Process: Jira, SAFe Agile, Plastic SCM.

</details>

### Department Chair, Mobile Development
<p class="meta"><time data-short="Dept Chair">Jan 2016 to Jan 2020</time> Full Sail University</p>

- Led a team of 8 to 10 software engineering instructors building and maintaining computer science curriculum for the Mobile Development bachelor's program, across 8 to 13 concurrent iOS and Android courses.
- Managed hiring, onboarding, and performance development for the department's instructional team. Mentored junior through senior engineers on both programming and pedagogy, and directed software engineers transitioning into college instruction.

<details class="fold">
<summary>The rollout, the Android team, and the curriculum churn.</summary>

- Completed the rollout of the program from campus to online.
- Helped stabilize a struggling Android development team.
- Ran continuous curriculum update sprints against yearly OS, language, and framework churn, and kept the degree aligned with industry as mobile moved from Objective-C and Java to Swift and Kotlin-era practice.
- Kept writing software throughout: personal projects and freelance ran alongside the role for all four years.

</details>

### Course Director, iOS
<p class="meta"><time data-short="Course Director">Jan 2014 to Jan 2016</time> Full Sail University</p>

- Created the university's first iOS computer science curriculum in Objective-C, then rebuilt it in Swift while the language was still in beta: three programming courses and one design course overhauled and rolled out in August 2014, two months after Swift was announced.
- One of the first collegiate Swift programs in the country. Featured on Apple's Swift educators page in 2015, alongside Stanford.

<details class="fold">
<summary>What the curriculum covered, and where it went.</summary>

- Directed all aspects of the Swift and iOS curriculum: syntax, data structures and algorithms, advanced frameworks. Taught multithreading and concurrent programming, local and remote networking, data persistence, and introductory mobile game development to students with limited prior programming experience.
- Helped launch the specialized Mobile Development campus track. The foundational iOS curriculum was later expanded into a full degree program.

</details>

### Co-Founder, Software Engineer, Project Manager
<p class="meta"><time data-short="Category 5">Jun 2009 to Jan 2020</time> Category 5 Games, LLC</p>

A two-person studio. Full time for a little over five years, then maintenance and updates alongside a full-time career until 2020. All figures are lifetime and historical, since the titles are no longer on the stores.

- Three self-published titles, 8M+ downloads. Ten Apple App Store features since 2009. Products held 4 to 5 star ratings across the Apple, Google Play, and Amazon stores, with tens of thousands of monthly downloads years after active development stopped.
- MemoryBlock: No. 1 Top Free App on the US Apple App Store, March 2010, and top 10 in 25+ countries.
- Warmongers: No. 20 Top Free App on the US Apple App Store, 2012, ahead of Angry Birds Space for a stretch. 700k+ downloads, 4.7 out of 5 average rating.

<details class="fold">
<summary>The business side, the hats, and the stacks.</summary>

- Directed the studio toward free-to-play in early 2010, which made it profitable. In-app purchase did not exist as a platform capability until the second title was nearing release, so the business model was invented mid-flight.
- Increased revenue by 300%+ in one case through data-driven pricing and in-house ad network mediation.
- Designed, built, and shipped every product: managed small teams of developers and contract artists, sourced and hired the artists, owned milestones and schedule. Marketing campaigns, pricing, ad framework integration (Unity Ads, AdMob), in-app purchase design, and store operations on App Store Connect, Google Play Console, and the Amazon Appstore.
- Also the studio's accountant, marketing director, office manager, art director, QA tester, and video editor.
- Stacks across the years: Unity (from a 2007 beta, with the first Unity title shipped on Unity 3.x for iOS and Android), Cocoa Touch and UIKit, Objective-C, Swift, Java for native Android, C++, C#, XNA, Box2D, LibGDX, Torque2D, OpenGL, GLSL, Direct3D, JavaScript, Python.

</details>

</div>

## Skills

<p>Expertise in these areas, and open to opportunities across languages and domains as the tools collapse those details into purer forms of problem solving. Anything marked explored is not being claimed as expertise.</p>

<dl class="tags">
<dt>languages</dt>
<dd><span class="tag deep">C#</span><span class="tag deep">Swift</span><span class="tag">C++<small>daily 2020 to 2022, back to 2009</small></span><span class="tag">Java</span><span class="tag">Objective-C</span><span class="tag">Python</span><span class="tag">JavaScript</span><span class="tag">TypeScript</span><span class="tag">GLSL</span><span class="tag">HLSL</span><span class="tag">Bash</span><span class="tag">PowerShell<small>familiar</small></span><span class="tag">SQL<small>familiar</small></span></dd>
<dd class="tier">C++ depth sits at the driver, interop, and build layers. Architecture ownership sat on the C# side.</dd>

<dt>engines and platforms</dt>
<dd><span class="tag deep">Unity<small>since a 2007 beta</small></span><span class="tag deep">iOS SDK<small>UIKit to SwiftUI</small></span><span class="tag">Android<small>Java era</small></span><span class="tag">Unreal<small>explored</small></span><span class="tag">AR and VR<small>explored</small></span></dd>

<dt>graphics</dt>
<dd><span class="tag">Shaders in GLSL and HLSL</span><span class="tag">Direct3D</span><span class="tag">OpenGL</span><span class="tag">Metal<small>explored</small></span><span class="tag">Scriptable render pipeline<small>from scratch</small></span></dd>
<dd class="tier">A graphics-capable generalist, not a graphics specialist.</dd>

<dt>AI-augmented development</dt>
<dd><span class="tag deep">Claude Code</span><span class="tag">Custom slash commands</span><span class="tag">Hooks</span><span class="tag">CLAUDE.md discipline</span><span class="tag">Subagents</span><span class="tag">Headless patterns</span><span class="tag">MCP<small>built a server</small></span><span class="tag">Fresh-context reviewer loops</span><span class="tag">Multi-agent consensus</span><span class="tag">Prompt contracts</span><span class="tag">60/30/10 cost routing</span><span class="tag">Rubric-aware evaluation</span><span class="tag">Evaluation personas</span><span class="tag">FERPA and RSI compliance mapping</span></dd>
<dd class="tier">Used LLMs daily for the work around the code well before letting one write it. Opus 4.5 was the first I handed the keyboard to, on manual mode. From 4.7 on, review replaced per-action approval.</dd>

<dt>tools and process</dt>
<dd><span class="tag">git and LFS</span><span class="tag">Jira</span><span class="tag">Plastic SCM</span><span class="tag">SAFe Agile</span><span class="tag">CMake</span><span class="tag">Conan</span><span class="tag">Docker</span><span class="tag">Jenkins</span><span class="tag">Xcode</span><span class="tag">Figma</span><span class="tag">Database API and schema design</span><span class="tag">Supabase</span><span class="tag">Cloudflare Pages and wrangler</span><span class="tag">UML</span><span class="tag">RESTful APIs</span></dd>

<dt>leadership and communication</dt>
<dd class="tier">Tech Lead on a 7-person senior and staff engineering team, and led an 8 to 10 person instructor team. Customer-facing technical liaison for Volvo, Toyota, and SAIC. Twelve years explaining hard technical ideas to people who did not already agree, with a written feedback record of 70+ documents in a single cohort. Regulatory writing that quotes federal code accurately.</dd>
</dl>

<details class="fold">
<summary>Systems, from the Luminar years.</summary>

<dl class="tags">
<dt>Unity at production scale</dt>
<dd><span class="tag">Profiler deep profiling of standalone builds</span><span class="tag">Prefab architecture and its limits</span><span class="tag">Preprocessor-gated scene variants</span><span class="tag">Job System and Burst</span></dd>
<dt>interop</dt>
<dd><span class="tag">P/Invoke marshalling</span><span class="tag">Struct alignment across the managed boundary</span><span class="tag">Native wrappers and dispose lifecycle</span><span class="tag">Interop facade layering</span></dd>
<dt>build</dt>
<dd><span class="tag">CMake</span><span class="tag">vcpkg</span><span class="tag">git submodules</span><span class="tag">clang-tidy</span><span class="tag">Jenkins</span><span class="tag">Docker</span><span class="tag">Linux and Windows builds</span><span class="tag">Config-driven versioning</span><span class="tag">Dependency surgery</span></dd>
<dt>middleware and robotics</dt>
<dd><span class="tag">Topic publish and subscribe</span><span class="tag">TF trees and coordinate frames</span><span class="tag">Bag playback</span><span class="tag">Cap'n Proto</span><span class="tag">SOME/IP</span><span class="tag">Packet-to-frame aggregation</span></dd>
<dt>LiDAR</dt>
<dd><span class="tag">Scan profiles</span><span class="tag">Field-of-view and rate coupling</span><span class="tag">Reflectance and divergence</span><span class="tag">Rolling shutter</span><span class="tag">PCAP capture and playback</span><span class="tag">Calibration files</span><span class="tag">Live sensor command and response</span><span class="tag">Unity to ROS coordinate math</span></dd>
<dt>narrower but real</dt>
<dd><span class="tag">Octree partitioning</span><span class="tag">Ray-triangle intersection</span><span class="tag">.NET testability tradeoffs</span><span class="tag">NUnit and mocking</span><span class="tag">SonarQube</span><span class="tag">Jetson deployment</span></dd>
</dl>

</details>

<details class="fold">
<summary>Architecture patterns worth naming.</summary>

<p>Data model, visualizer, and visualizer-controller separation with events in both directions. Set-and-notify-on-change properties. A facade per sensor type behind a common control client. Manager and registry classes owning known-entity lists and notifying subscribers. Preprocessor-directive scene variants, used first at Category 5 to serve one codebase to iOS, Android, Amazon, and the editor, and again at Luminar for a sensor-only build.</p>

</details>

## Shipped products and projects

<details class="fold">
<summary>The full catalog, 2009 to now.</summary>

| Product | Year | Platforms | Notes | Stack |
|---|---|---|---|---|
| Jungle Swing | 2009 | iOS | First title, two-person team | Objective-C, Cocoa Touch |
| MemoryBlock | 2010 | iOS, Google Play, Amazon | No. 1 Top Free US, Mar 2010. Top 10 in 25+ countries | Objective-C, Java, later Unity builds |
| Warmongers | 2012 | iOS, Google Play, Amazon | No. 20 Top Free US, 700k+ downloads, 4.7 out of 5 | Unity, C#, native code |
| Luminar visualization and control suite | 2020 to 2022 | Internal and automotive customers | Production tooling for the Iris LiDAR sensor, calibration and testing software. Tech Lead, team of 7 | C++, C#, Unity, Python, CMake, Conan |
| Six-course platform | 2026 | Live cohorts | 99 activities, 24 assignments, 14 starter projects, 98 Swift files, 5.0 out of 5 survey | Claude Code, database-backed via MCP, Swift, Xcode |
| AI grading pipeline | 2025 to 2026 | Production, own sections | Six sections, 70+ feedback documents, longitudinal tracking | Claude Code slash commands, database-backed via MCP, evaluation personas |
| yt_transcript_mcp | 2026 | Claude Code, Claude Desktop | Built in a day, 27-issue review trail, daily use | Swift 6, SPM, InnerTube API |
| magenta_pipeline | 2026 | CLI, Photoshop, Unity | Recovers legacy sprite sheets for the reboot | Python, OpenCV, psd-tools, JSX |
| chordsheet | 2026 | Web | 248 agent-generated tests, issue-driven | TypeScript, Vite, Vitest |
| Course site | 2026 | Static web | 85 commits, served live cohorts May to Aug | HTML, CSS, Cloudflare |
| Annual review site | 2026 | Cloudflare Pages | Six linked documents | HTML, CSS, wrangler |
| history-heatmap | 2026 | Web, single file | 20 commits in six days, hybrid history and simulation model | Vanilla JS, HTML, zero dependencies |
| CustomSRP | 2019 | Learning project | Unity scriptable render pipeline from scratch | Unity 2019.3 beta, HLSL |
| Warmongers reboot | In progress | Unity | Rebuilding the 2012 title | Unity, C#, Git and LFS, Claude Code |
| FCPXML silence removal tool | In progress | macOS | | SwiftUI |

</details>

## Teaching and curriculum record

- Twelve years at Full Sail University across two stints, 2014 to 2026, campus then online.
- Built the university's first iOS curriculum (Objective-C, 2014), the Swift rebuild two months after the language was announced (Aug 2014), and the SwiftUI-era rebuild (2026).
- Featured on Apple's Swift educators page, 2015, alongside Stanford.
- Department Chair, Mobile Development, Jan 2016 to Jan 2020: 8 to 13 courses, 8 to 10 instructors, campus-to-online rollout.
- 2026: the six-course rebuild, studio-model pedagogy, learning objectives authored before curriculum, starter-code-first assignment design, the RSI plan, the policy brief, and the learning-objective proposal.
- 200+ students mentored, a conservative count across the years.

## Education

B.S. Game Development, Full Sail University, 2009. A computer-science-focused degree emphasizing software engineering through real-time applications, building games in C++ and C# with custom engines.
