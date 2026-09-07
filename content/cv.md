<!-- Carried across from the hub's data/master-document.md on Sep 7, 2026, with a
     clearance pass against the site's binding rules. Facts change in the master
     document first and get re-carried here. Sections map to the master document:
     Experience to section 2, the catalog to 3, Skills to 4, Teaching to 6,
     Education to 5. Sections 7 to 9 of the master document are private and are
     not carried. -->

## Experience

### Course Director, Software Engineering and UX Design
<p class="meta">Full Sail University, Jul 2022 to Aug 2026</p>

Taught and maintained five courses across six course sections: three in iOS development and two in game UX design. Coverage: Swift and SwiftUI, async/await concurrency, MVVM and three-layer architecture, Supabase backends, accessibility (VoiceOver, Dynamic Type), game UX, user onboarding, testing with XCTest, TestFlight and App Store distribution.

**The 2026 rebuild, Feb to Aug 2026.**

- Rebuilt six complete courses from zero: 99 new activities, 24 new assignments, around 145 pages of new content. Nothing from the old versions survived.
- Wrote 14 complete Xcode starter projects (98 Swift files), each README doubling as the assignment brief. Several ship with failing test suites the student turns green.
- Took the two game UX courses from an empty repository to a tagged v1.0 serving a live cohort in 16 days and 63 commits.
- Wrote measurable per-course learning objectives for the full iOS sequence in Dec 2025 and used them as the rebuild's spine, with a deliberate scaffolding arc from heavy in the first course to none in the self-directed portfolio project.
- Built a handoff-ready, database-backed documentation layer around the sequence: a program outline with curriculum philosophy, per-class outlines, a formal scaffolding-levels model, instructor orientations, week-by-week instructor guides, and grading guides. Written so any instructor could pick the courses up cold, which is what happened at departure.

**The AI-assisted grading pipeline, in production for these sections.**

- Designed and ran an AI-assisted grading pipeline: Claude Code custom slash commands, database-backed submission and feedback tracking via MCP, rubric-aware batch evaluation across six course sections. Every output was instructor-reviewed before it was written back, then delivered to students by hand.
- Built discipline-specific evaluation personas: code review (build checks, Swift conventions, project structure) and design review (prototypes, wireflows, visual hierarchy, accessibility), with configurable criteria per course.
- Longitudinal tracking across terms, so prior feedback personalizes current comments. The pipeline retrieved it. Nothing was pasted by hand.
- Student identities never entered the model context: an abstraction step run by hand, never automated.
- Custom slash commands for grading context management of large and image-heavy submissions.
- A human checkpoint by design: the instructor reviews, edits, and approves all output. Computer-generated feedback alone was never delivered.

**Teaching model and measured results.**

- A studio model rather than a broadcast model: one-on-one working sessions and individualized written feedback in place of a lecture format. 70+ individualized feedback documents for a first cohort of around 12 students.
- Anonymous end-of-course survey, six respondents, no name field: 5.0 out of 5 on helping them understand the material, 5.0 on holding attention compared with other courses, 5.0 on polish and professionalism, and 6 of 6 said the school should build more courses this way.

**Regulatory and institutional work, all authored solo.**

- Mapped the FERPA compliance landscape for AI adoption: federal enforcement, RSI requirements, Florida SB 482, BAA and enterprise paths, and a litigation exposure framework.
- Wrote an RSI plan arguing the courses meet 34 CFR 600.2 Regular and Substantive Interaction without a synchronous lecture, quoting the regulation verbatim.
- Wrote a policy brief on federally recognized interaction options for online courses, with a peer-institution precedent survey (Ohio State, University of Houston, SUNY OSCQR).
- Drafted replacement course learning objectives matching the portfolio work the course actually produces: measurable verb, durable noun, no tool lock-in.
- Authored a five-year institutional AI roadmap (2026 to 2030): phased tool deployment, curriculum integration, compliance automation, cross-team integration architecture.
- Prepared VP-level presentations on institutional AI adoption and governance.
- Integrated EA Positive Play accessibility case studies (the Apex Legends ping system, Fonttik) into the UX curriculum with critical industry evaluation.

### Senior Software Engineer, Tech Lead, Visualization and Control
<p class="meta">Luminar Technologies, Jan 2020 to Jun 2022, remote</p>

An individual-contributor role first: hands-on engineering was at least three quarters of the job, with the team lead arc layered on top of it.

- Led a 7-person visualization team of senior and staff engineers building real-time LiDAR visualization and control software in C++, C#, and Unity for production autonomous driving hardware, the Iris sensor, while shipping code daily.
- Progressed from individual contributor to Tech Lead responsible for stakeholder alignment across several automotive OEM engineering teams. Primary technical liaison for Volvo, Toyota, and SAIC, and the contact point for all technical discussion between the visualization team and the larger organization.
- Led a distributed team of engineers and contractors through sprint planning, code review, and delivery on a hardware-coupled product with no room for latency or instability.
- Designed and maintained high-performance real-time simulation and visualization software for point cloud and machine learning data supporting LiDAR hardware and autonomous driving software.
- Optimized Unity rendering for low-latency performance: Job System and Burst, compute and geometry shaders, stencil and depth buffers, render-to-texture, custom frustum construction and slicing, GLSL.
- C++ and C# interop at the driver, build, and marshalling layers: P/Invoke, struct alignment across the managed boundary, native object wrappers and dispose lifecycle. Build tooling in CMake, vcpkg, Conan, Jenkins, and Docker across Linux and Windows.
- Created calibration and testing software for hardware components, improving ease of use and reducing calibration time for automotive stakeholders and manufacturing. Partnered with manufacturing on the second-generation Iris production line.
- Built manufacturing calibration inside the team's Unity visualizer in one sprint, measured it against the existing MATLAB loop, and recommended against absorbing it, on control-layer fit, team capacity, and product surface.
- Drove stakeholder feedback into the hardware and software roadmap for the Iris system across multiple product generations. Translated sensor requirements from external engineering teams into visualization specifications. Designed and diagrammed new features in UML for team collaboration and integration with larger company projects.
- The weekly shape of a senior IC: own tickets across four subsystems, pull request review on most days, two to three code reviews, one cross-team unblock, PI planning.
- Daily stack: C++, C#, Unity, Bash, Python, CMake, Conan, git. Process: Jira, SAFe Agile, Plastic SCM.

### Department Chair, Mobile Development
<p class="meta">Full Sail University, Jan 2016 to Jan 2020</p>

- Led a team of 8 to 10 software engineering instructors building and maintaining computer science curriculum for the Mobile Development bachelor's program, across 8 to 13 concurrent iOS and Android courses.
- Completed the rollout of the program from campus to online.
- Managed hiring, onboarding, and performance development for the department's instructional team. Mentored junior through senior engineers on both programming and pedagogy, and directed software engineers transitioning into college instruction.
- Helped stabilize a struggling Android development team.
- Ran continuous curriculum update sprints against yearly OS, language, and framework churn, and kept the degree aligned with industry as mobile moved from Objective-C and Java to Swift and Kotlin-era practice.
- Kept writing software throughout: personal projects and freelance ran alongside the role for all four years.

### Course Director, iOS
<p class="meta">Full Sail University, Jan 2014 to Jan 2016</p>

- Created the university's first iOS computer science curriculum in Objective-C, then rebuilt it in Swift while the language was still in beta: three programming courses and one design course overhauled and rolled out in August 2014, two months after Swift was announced.
- One of the first collegiate Swift programs in the country. Featured on Apple's Swift educators page in 2015, alongside Stanford.
- Directed all aspects of the Swift and iOS curriculum: syntax, data structures and algorithms, advanced frameworks. Taught multithreading and concurrent programming, local and remote networking, data persistence, and introductory mobile game development to students with limited prior programming experience.
- Helped launch the specialized Mobile Development campus track. The foundational iOS curriculum was later expanded into a full degree program.

### Co-Founder, Software Engineer, Project Manager
<p class="meta">Category 5 Games, LLC, Jun 2009 to Jan 2020</p>

A two-person studio. Full time for a little over five years, then maintenance and updates alongside a full-time career until 2020. All figures are lifetime and historical, since the titles are no longer on the stores.

- Three self-published titles, 8M+ downloads. Ten Apple App Store features since 2009. Products held 4 to 5 star ratings across the Apple, Google Play, and Amazon stores, with tens of thousands of monthly downloads years after active development stopped.
- MemoryBlock: No. 1 Top Free App on the US Apple App Store, March 2010, and top 10 in 25+ countries.
- Warmongers: No. 20 Top Free App on the US Apple App Store, 2012, ahead of Angry Birds Space for a stretch. 700k+ downloads, 4.7 out of 5 average rating.
- Directed the studio toward free-to-play in early 2010, which made it profitable. In-app purchase did not exist as a platform capability until the second title was nearing release, so the business model was invented mid-flight.
- Increased revenue by 300%+ in one case through data-driven pricing and in-house ad network mediation.
- Designed, built, and shipped every product: managed small teams of developers and contract artists, sourced and hired the artists, owned milestones and schedule. Marketing campaigns, pricing, ad framework integration (Unity Ads, AdMob), in-app purchase design, and store operations on App Store Connect, Google Play Console, and the Amazon Appstore.
- Also the studio's accountant, marketing director, office manager, art director, QA tester, and video editor.
- Stacks across the years: Unity (from a 2007 beta, with the first Unity title shipped on Unity 3.x for iOS and Android), Cocoa Touch and UIKit, Objective-C, Swift, Java for native Android, C++, C#, XNA, Box2D, LibGDX, Torque2D, OpenGL, GLSL, Direct3D, JavaScript, Python.

### Independent work
<p class="meta">2025 to present</p>

- **yt_transcript_mcp.** Swift 6 MCP server fetching YouTube transcripts through the InnerTube API. No Node, no Python. Built in a day: five phases planned before any code, then findings filed by a second agent reviewing with fresh context. 27 issues the same day, 26 closed by end of day. In-memory caching keyed by returned language after review caught the requested-language bug, offline unit tests, SSRF designed out before the network code existed, packaged for Claude Desktop. Public, in daily use. Backlog: host it online for mobile access.
- **chordsheet.** TypeScript, Vite, and Vitest web app for play-along guitar chord sheets, 248 tests across 17 files. The AI assist deliberately routes around copyright refusals by emitting only chord names anchored to lyrics the user already has. Monospace character-cell layout so print output is literal text rows, capo as a display transform, chord diagram voicing tables, setlists, File System Access API storage. From a one-paragraph idea to weekly rehearsal use in twelve days and 31 issues. Public.
- **history-heatmap.** Historical population-dynamics visualization engine, AD 33 to the present, in one self-contained HTML file with no server and no dependencies. An analytical gaussian heat field evaluated per viewport at constant cost, mass-conserving anti-aliasing for city-scale overlays, a hybrid model blending hand-curated anchor data with logistic growth and diffusion, a non-linear timeline, city lifecycle animations as pure functions of the playhead, provenance tiers, deep links. The current Christianity and Islam dataset is the first lens, with more population types planned. The dataset is unaudited, and the README says so. Public, with a live demo.
- **magenta_pipeline.** Three-phase art recovery pipeline resurrecting legacy sprite sheets for the reboot below: Photoshop JSX automation, then Python and OpenCV (HSV-space masking to isolate flattened magenta overlays, and nearest-neighbor fill via distance transform to reconstruct the art underneath, after Navier-Stokes inpainting was tried and replaced), PSB write-back, then mask flattening because Unity's PSD importer silently skips masked layers. Independently runnable stages, batch mode, a threshold tuning tool. Private.
- **Warmongers reboot.** Rebuilding the 2012 title in Unity with Git and LFS, Claude Code as the primary development accelerator, and a Unity asset postprocessor enforcing canonical sprite import settings. The design corpus is versioned like code. Private, in progress.
- **Course platform, May to Aug 2026.** The static, no-build site that served the two game UX courses to live cohorts: self-contained HTML pages per lesson, a hub with tabbed weeks, a gate with a maintenance switch. 85 commits. Offline since departure.
- **AI workflow infrastructure.** Claude Code as the daily driver with an orchestrator-plus-subagents pattern, custom slash commands, hooks, and CLAUDE.md discipline. An always-on agent on a dedicated M1 Pro with 32GB running Qwen through Ollama for bulk work and the Claude API for reasoning, on a 60/30/10 cost rule.

## Shipped products and projects

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
| chordsheet | 2026 | Web | 248 tests, issue-driven | TypeScript, Vite, Vitest |
| Course site | 2026 | Static web | 85 commits, served live cohorts May to Aug | HTML, CSS, Cloudflare |
| Annual review site | 2026 | Cloudflare Pages | Six linked documents | HTML, CSS, wrangler |
| history-heatmap | 2026 | Web, single file | 20 commits in six days, hybrid history and simulation model | Vanilla JS, HTML, zero dependencies |
| CustomSRP | 2019 | Learning project | Unity scriptable render pipeline from scratch | Unity 2019.3 beta, HLSL |
| Warmongers reboot | In progress | Unity | Rebuilding the 2012 title | Unity, C#, Git and LFS, Claude Code |
| FCPXML silence removal tool | In progress | macOS | | SwiftUI |

## Skills

Tiers are honest. Anything listed as familiar or explored is not being claimed as expertise.

**Languages.** Expert and current: C#, Swift. Strong: C++, daily from 2020 to 2022 and in professional use back to 2009, with the depth at the driver, interop, and build layers rather than architecture ownership, which sat on the C# side. Professional: Java, Objective-C, Python, JavaScript and TypeScript, GLSL, HLSL, Bash. Familiar: PowerShell, SQL.

**Engines and platforms.** Unity, expert, since a 2007 beta: shipped commercial titles, production automotive tooling, Job System and Burst, scriptable render pipeline exploration. iOS SDK, expert: UIKit history, SwiftUI current, async/await, XCTest, TestFlight and App Store process. Android, professional: Java-era native and curriculum ownership. Unreal, explored. AR and VR, exploratory.

**Graphics.** Shipped shaders in GLSL and HLSL, Direct3D experience, in-depth OpenGL coursework, Metal exploration, a scriptable render pipeline built from scratch. A graphics-capable generalist, not a graphics specialist.

**Systems, from the Luminar years.** Unity Profiler deep profiling of standalone builds from the command line, prefab architecture and its limits, preprocessor-gated scene variants as a shipping discipline. Interop: P/Invoke marshalling, struct byte alignment and padding across the managed boundary, native object wrappers and dispose lifecycle, interop facade layering. Build: CMake, vcpkg, git submodules, clang-tidy, Jenkins, Docker, cross-platform Linux and Windows builds, config-driven versioning, dependency surgery. Middleware and robotics: topic publish and subscribe, TF trees and coordinate frames, bag playback, Cap'n Proto, SOME/IP, packet-to-frame aggregation. LiDAR: scan profiles, field-of-view and rate coupling, reflectance, divergence, rolling shutter, PCAP capture and playback, calibration files, live sensor command and response. Coordinate math between Unity and ROS conventions, Euler and quaternion, sign conventions. Narrower but real: octree partitioning and ray-triangle intersection, .NET testability tradeoffs, NUnit, mocking, SonarQube, Jetson deployment.

**Architecture patterns worth naming.** Data model, visualizer, and visualizer-controller separation with events in both directions. Set-and-notify-on-change properties. A facade per sensor type behind a common control client. Manager and registry classes owning known-entity lists and notifying subscribers. Preprocessor-directive scene variants, used first at Category 5 to serve one codebase to iOS, Android, Amazon, and the editor, and again at Luminar for a sensor-only build.

**AI-augmented development.** Before November 2025, no agent wrote code, because none had earned it. Opus 4.5 was the first allowed to, on manual mode. From 4.7 on, review replaced per-action approval. Claude Code daily: custom slash commands, agents, CLAUDE.md discipline, hooks, headless patterns. Orchestration: a frontier orchestrator with cheaper subagents, fresh-context reviewer loops, multi-agent consensus, prompt contracts. MCP: built a Swift MCP server, plus heavy database-backed MCP integration work. Local and hybrid: an always-on agent on dedicated hardware, Ollama-hosted Qwen, 60/30/10 cost-tiered routing, context management patterns. Evaluation design: rubric-aware batch evaluation, discipline-specific personas, longitudinal feedback. Governance: FERPA, RSI, 34 CFR 600.2, ACCSC, and Florida SB 482 compliance mapping, BAA and enterprise procurement paths, a five-year institutional roadmap.

**Tools and process.** git including LFS, Jira, Plastic SCM, SAFe Agile, CMake, Conan, Docker, Jenkins, Xcode, Figma, database API and schema design, Supabase, Cloudflare Pages and wrangler, UML, RESTful APIs.

**Leadership and communication.** Led a 7-person senior and staff engineering team and an 8 to 10 person instructor team. Customer-facing technical liaison for Volvo, Toyota, and SAIC. Twelve years explaining hard technical ideas to people who did not already agree, with a written feedback record of 70+ documents in a single cohort. Regulatory writing that quotes federal code accurately.

## Teaching and curriculum record

- Twelve years at Full Sail University across two stints, 2014 to 2026, campus then online.
- Built the university's first iOS curriculum (Objective-C, 2014), the Swift rebuild two months after the language was announced (Aug 2014), and the SwiftUI-era rebuild (2026).
- Featured on Apple's Swift educators page, 2015, alongside Stanford.
- Department Chair, Mobile Development, Jan 2016 to Jan 2020: 8 to 13 courses, 8 to 10 instructors, campus-to-online rollout.
- 2026: the six-course rebuild, studio-model pedagogy, learning objectives authored before curriculum, starter-code-first assignment design, the RSI plan, the policy brief, and the learning-objective proposal.
- 200+ students mentored, a conservative count across the years.

## Education

B.S. Game Development, Full Sail University, 2009. A computer-science-focused degree emphasizing software engineering through real-time applications, building games in C++ and C# with custom engines.
