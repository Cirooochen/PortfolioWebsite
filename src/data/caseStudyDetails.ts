import type { CaseStudyDetail } from '../types'
import { unsplash } from './media'

// Oaks and EV Smart Money are real case studies (images are placeholders); Lumen is a placeholder
export const caseStudyDetails: CaseStudyDetail[] = [
  {
    id: 'oaks',
    title: 'Oaks',
    oneLiner: 'A “save now, buy later” product that rewards people for saving up for the things they want.',
    metadata: [
      { label: 'Role', value: ['Product Designer', 'User research'] },
      { label: 'Timeline', value: ['04.2023 – 12.2023', '9 months'] },
      { label: 'Team', value: ['12-person startup', 'Product lead, tech lead', '2 developers'] },
      { label: 'Platform', value: ['Widgets on merchant websites', 'Mobile web app'] },
    ],
    background: {
      title: 'Save first, pay less',
      description: [
        'Oaks is a SaaS startup that offers a new way to buy: instead of paying now or paying later, people save up for a product first. Merchants reward them for saving, so the final price ends up lower.',
        'I designed the first version of the product and improved its usability. After launch, I ran user research to raise the sign-up rate, and worked with the team to find a better product-market fit.',
      ],
      blocks: [
        {
          type: 'textOnly',
          title: 'Part 1: widgets on merchant websites',
          description:
            'Small banners, or teasers, sit on partner shops’ product pages. When a shopper taps one, a popup explains the offer and helps them set up a savings plan before signing up.',
        },
        {
          type: 'textOnly',
          title: 'Part 2: the web app',
          description:
            'After signing up, people use a dashboard to see and edit their savings plans, create new ones, and open a savings account to start saving and earning rewards.',
        },
        {
          type: 'mediaOnly',
          media: [
            unsplash(
              '1555041469-a586c61ea9bc',
              'A green velvet sofa in an empty room with wooden floors',
              'The first version: account creation, identity check, then the first savings plan.',
            ),
          ],
        },
      ],
    },
    challenge: {
      title: 'Explaining an idea people had never seen before',
      blocks: [
        {
          type: 'textMedia',
          description:
            '“Save now, buy later with rewards” was new to almost everyone. Our biggest challenge was helping people understand it quickly, and trust it enough to sign up. There was no playbook to copy, so we had to test, learn, and change the product again and again.',
          media: {
            kind: 'image',
            src: '/images/case-studies/oaks/challenge-illustration.jpg',
            alt: 'Illustration of a person on a rock holding a tangled green thread that winds across stepping stones to a glowing doorway',
          },
          aspect: 'square',
        },
      ],
    },
    persona: {
      title: 'Who we designed for',
      description:
        'We built two personas from user interviews and analytics data. They kept the team focused on real needs when we made design decisions.',
      blocks: [
        {
          type: 'textMedia',
          title: 'Alexa, the explorer · 30, customer service, Berlin',
          description: [
            'Alexa loves online shopping and is driven by deals and discounts. She wants to save for a designer chair while keeping her finances healthy, but she often gives up before reaching a goal.',
            '“Saving is not easy for me, especially for things like a designer chair or a handbag. I need a plan and some extra motivation.”',
          ],
          media: { kind: 'image', src: '/images/case-studies/oaks/persona-alexa.jpg', alt: 'Alexa, a woman in a rust-coloured sweater, smiling on a sofa in a sunny living room' },
          aspect: 'portrait',
        },
        {
          type: 'textMedia',
          title: 'Ryan, the go-getter · 32, software engineer, Berlin',
          description: [
            'Ryan is good at long-term saving and comfortable with new tech. Short-term goals are harder: when he saves for a new gadget, the money often goes somewhere else first.',
            '“When it comes to saving for something like the latest gadget, I always end up spending on other things before I reach my goal.”',
          ],
          media: { kind: 'image', src: '/images/case-studies/oaks/persona-ryan.jpg', alt: 'Ryan, a man in a dark T-shirt, smiling at his desk by a window with a laptop' },
          aspect: 'portrait',
          mediaFirst: true,
        },
        {
          type: 'textMedia',
          title: 'What this meant for the design',
          description:
            'Both personas needed things to be simple. We focused on a clean dashboard that shows progress at a glance, clear savings insights such as rewards earned and the expected target date, and a step-by-step setup that removes friction.',
          media: unsplash('1512428559087-560fa5ceab42', 'A person in a white shirt using a smartphone'),
        },
      ],
    },
    keyWork: [
      {
        label: 'New onboarding',
        title: 'Fixing an onboarding flow that lost most of its users',
        description:
          'After we launched the first version, very few visitors became users. The question was why.',
        subsections: [
          {
            title: 'What the data showed',
            blocks: [
              {
                type: 'textMedia',
                description:
                  'Google Analytics showed two problems. Few shoppers clicked the teaser at all, and many of those who did left at the same step: setting up their savings plan.',
                media: unsplash(
                  '1460925895917-afdab827c52f',
                  'A laptop on a glass table showing an analytics dashboard with area charts',
                  'Most people dropped out while configuring their savings plan.',
                ),
              },
            ],
          },
          {
            title: 'A quick fix that didn’t work',
            description: [
              'My first guess was that people weren’t motivated enough to finish. So I added a small card with fun facts about saving to encourage them. It was cheap to build, so we shipped it fast.',
              'The drop-off rate didn’t change at all. Instead of guessing again, the team agreed to take time to talk to users.',
            ],
          },
          {
            title: 'Research',
            description: [
              'User interviews showed that motivation wasn’t the issue. When money is involved, people want time to understand a new service before they commit to it.',
              'Our flow asked them to make a financial decision in the middle of shopping, before they understood what Oaks was.',
            ],
          },
          {
            title: 'Brainstorm and testing',
            blocks: [
              {
                type: 'textMedia',
                mediaFirst: true,
                description:
                  'I ran a brainstorming session with our Product Lead and CPO, and we came up with seven ideas to reduce drop-off. I then tested them in three rounds of online surveys, checking how easy each one was to understand and use. The answer was clear: people wanted a simpler sign-up, and they didn’t want to set up a savings plan while shopping.',
                media: unsplash(
                  '1587440871875-191322ee64b0',
                  'A team sketching wireframes on paper surrounded by sticky notes and a laptop',
                ),
              },
            ],
          },
          {
            title: 'Final design',
            blocks: [
              {
                type: 'textMedia',
                layout: 'stacked',
                title: 'Sign up first, decide later',
                description:
                  'The new “quick sign-up” lets people register in seconds and explore Oaks before deciding anything. Tapping the teaser opens a popup in the merchant’s own branding. A “How it works” button explains the product on a separate page, and people can sign up right away with just their email.',
                media: unsplash(
                  '1563013544-824ae1b704d3',
                  'A person holding a credit card while shopping on a laptop',
                  'The new flow: teaser, merchant-branded popup, and a “How it works” page.',
                ),
              },
              {
                type: 'textOnly',
                title: 'A clear value proposition',
                description:
                  'We tested eight headlines and chose the one that puts the reward first: “Save now and buy later for up to €42 less.”',
              },
              {
                type: 'textOnly',
                title: 'Built on the merchant’s trust',
                description:
                  'The popup uses images from the merchant’s own brand, and the Oaks logo is much smaller than in the first version. Shoppers already trust the shop they are on, so we let the shop lead.',
              },
              {
                type: 'textOnly',
                title: 'Explain without pushing',
                description:
                  'People who want details can open “How it works”. Everyone else can sign up early, which gives us more chances to explain the product later.',
              },
            ],
          },
        ],
      },
      {
        label: 'Product pivot',
        title: 'Taking the bank account out of the product',
        description:
          'The new onboarding brought in many more sign-ups. But soon we saw a new problem: very few people finished opening their savings account in the web app.',
        subsections: [
          {
            title: 'In-store visits',
            blocks: [
              {
                type: 'textMedia',
                description:
                  'To find out what was holding people back, we visited the stores of our partner merchant POCO and talked to real customers. One reason came up again and again: people were tired of opening yet another bank account.',
                media: unsplash(
                  '1556742049-0cfed4f6a45d',
                  'A customer paying with a smartphone at a shop counter',
                ),
              },
              {
                type: 'textOnly',
                title: 'Insight',
                description:
                  'People are slow to adopt new banking services. If we made setup much simpler, more of them would be willing to try.',
              },
            ],
          },
          {
            title: 'A simpler concept',
            description: [
              'We decided to drop the bank account completely and use payment methods people already know and trust. After long discussions, we tested a new idea inspired by prepaid SIM cards.',
              'People choose how much to put in and see their reward right away. They sign up with their email, check their order, and pay with PayPal. A dashboard then shows how their savings grow. They can top up whenever and however much they like, and once they reach their goal, the money works like a voucher in the store.',
            ],
          },
          {
            title: 'Final design',
            blocks: [
              {
                type: 'mediaOnly',
                media: [
                  unsplash(
                    '1556740738-b6a63e27c4df',
                    'A woman at a shop counter paying at a card terminal',
                    'From a marketing campaign to top-up, PayPal checkout, dashboard, and pay-out.',
                  ),
                ],
              },
              {
                type: 'textOnly',
                title: 'Top up in a few taps',
                description:
                  'People pick an amount, such as €25, €50, €75, or €100, see their POCO reward added to it, and pay with PayPal. No bank account, no paperwork.',
              },
              {
                type: 'textOnly',
                title: 'A savings card, not an account',
                description:
                  'The dashboard shows one simple card: the total balance, split into money added and rewards earned. A short tip explains how to use the balance in any POCO store the next day.',
              },
            ],
          },
        ],
      },
    ],
    results: {
      title: 'What we achieved',
      description:
        'The onboarding redesign raised our sign-up rate to 2.4%. The low number of opened accounts showed us where the next problem was, and led to the pivot.',
      stats: [
        { value: '14', label: 'Merchants using Oaks widgets' },
        { value: '676', label: 'Sign-ups after the onboarding redesign' },
        { value: '2.4%', label: 'Sign-up rate after the redesign' },
        { value: '32', label: 'Savings accounts opened' },
      ],
      blocks: [
        {
          type: 'mediaOnly',
          media: [
            unsplash(
              '1542744173-8e7e53415bb0',
              'A team meeting around a conference table with laptops',
              'Sharing design suggestions with the team.',
            ),
          ],
        },
      ],
    },
    summary: {
      title: 'What I learned',
      description:
        'We tested the new concept with POCO and got encouraging feedback, so the next step was more store visits and more testing. Oaks taught me a lot as a designer. These are the lessons I took with me:',
      takeaways: [
        {
          title: 'Listen before you fix',
          description:
            'My first fix was based on a guess, and it didn’t work. Talking to users showed the real problem: people weren’t unmotivated, they just weren’t ready to commit yet.',
        },
        {
          title: 'Trust is part of the design',
          description:
            'Merchant branding and familiar payment methods like PayPal did more for sign-ups than any clever feature. People try new things when they feel safe.',
        },
        {
          title: 'Be brave enough to pivot',
          description:
            'At an early-stage startup, product-market fit rarely comes on the first try. Changing direction is painful, but when research points the way, following it is the right call.',
        },
      ],
    },
  },
  {
    id: 'ev-smart-money',
    title: 'EV Smart Money',
    oneLiner: 'An online platform that makes exclusive real estate investments simple for high-net-worth investors.',
    metadata: [
      { label: 'Role', value: ['User research', 'UI/UX design', 'Web design'] },
      { label: 'Timeline', value: ['02.2021 – 04.2023', 'Launched 10.2022'] },
      { label: 'Team', value: ['25-person company', 'Worked with the design lead'] },
      { label: 'Platform', value: ['Mobile-first web app', 'Marketing website'] },
    ],
    background: {
      title: 'Exclusive investments, now online',
      description: [
        'EV Smart Money is a private equity investment platform. It gives customers access to exclusive real estate investments that used to be available only through personal advisors. The company is a licence partner of Engel & Völkers.',
        'Working closely with the design lead, I ran research and user testing to understand our audience, learn from the market, and find the right design approach. Together, we designed the first version of the product and launched it in October 2022.',
      ],
      blocks: [
        {
          type: 'mediaOnly',
          media: [
            unsplash(
              '1600596542815-ffad4c1539a9',
              'A modern white villa with a swimming pool under a blue sky',
              'Real estate funds, opened up to investors online.',
            ),
          ],
        },
      ],
    },
    challenge: {
      title: 'One simple journey on top of a complex system',
      description: [
        'Before anyone can invest, they have to sign up, get classified as an investor, and verify their identity. Behind the scenes, each of these steps runs on a different service provider, and some checks were still done by hand.',
        'Our challenge was to turn all of this into an onboarding experience that feels easy and trustworthy for a demanding audience, within real technical limits.',
      ],
    },
    persona: {
      title: 'Who we designed for',
      description:
        'To understand how wealthy investors think about money, we interviewed eight clients from Engel & Völkers’ customer base. We learned about their digital habits, how they make financial decisions, and what kind of investors they are. These insights shaped our persona.',
      blocks: [
        {
          type: 'textMedia',
          title: 'Dr. Johannes Bischoff, the careful long-term investor · 48, senior executive',
          description: [
            'Johannes is an experienced investor with a well-spread portfolio. He prefers lower risk, wants steady income over the medium to long term, and does his own research instead of relying on advisors.',
            'He has little free time, has had bad advice in the past, and doesn’t always fully understand complex investment products. He wants a clear, honest overview of the product, its risks, and its costs, so he can decide for himself.',
          ],
          media: {
            kind: 'image',
            src: '/images/case-studies/ev-smart-money/persona-johannes.jpg',
            alt: 'Johannes, a man with glasses in a navy blazer and light blue shirt, smiling in a bright office',
          },
          aspect: 'portrait',
        },
        {
          type: 'textOnly',
          title: 'What he needs from us',
          description:
            'Trust, transparency, and respect for his time. Every screen had to answer one question for him: “What’s in it for me?”',
        },
      ],
    },
    keyWork: [
      {
        label: 'Research',
        title: 'Understanding the market and the whole journey',
        description:
          'Before designing screens, we needed to know what good looks like in this market, and how our own system really worked.',
        subsections: [
          {
            title: 'Competitor research',
            blocks: [
              {
                type: 'textMedia',
                description:
                  'I analysed investment products on the market to learn their best practices, useful UX patterns, and clever ways to handle long onboarding flows.',
                media: unsplash(
                  '1460925895917-afdab827c52f',
                  'A laptop on a glass table showing an analytics dashboard with area charts',
                  'Collecting onboarding patterns from investment and banking products.',
                ),
              },
            ],
          },
          {
            title: 'User journey map',
            blocks: [
              {
                type: 'textMedia',
                mediaFirst: true,
                description:
                  'With several service providers and a complex back end, getting everyone on the same page was crucial. I created a user journey map that showed every step, from the website to registration and investor profile, along with the systems behind each one. It gave the team a shared view of the current service and showed where to improve.',
                media: unsplash(
                  '1587440871875-191322ee64b0',
                  'A team sketching wireframes on paper surrounded by sticky notes and a laptop',
                  'The journey map, with every service provider in its own lane.',
                ),
              },
            ],
          },
          {
            title: 'Testing the first flow',
            description:
              'We designed a first version of the user flow and tested it with real customers. The feedback was clear: people wanted to see investment products right away, and they needed more help and flexibility during onboarding.',
            blocks: [
              {
                type: 'textOnly',
                title: 'Where people struggled',
                description: [
                  'Many people dropped out between sign-up and identity verification. They couldn’t see any products at the start, had no one to talk to, and didn’t fully understand what they were signing up for.',
                  'Questions were long, the flow was broken up by blockers, and manual checks meant long waits with no feedback.',
                ],
              },
              {
                type: 'textOnly',
                title: 'What we decided to change',
                description:
                  'Give instant feedback at every step. Stop identity verification from blocking everything else. Show products early. Speak to users in their own terms. And offer a real person to talk to when they need one.',
              },
            ],
          },
        ],
      },
      {
        label: 'Onboarding design',
        title: 'An onboarding flow that guides, step by step',
        description:
          'We turned the research into a clear set of principles, then designed and tested the new onboarding flow around them.',
        subsections: [
          {
            title: 'Design principles',
            description:
              'Four principles gave the whole team a shared basis for decisions and kept the experience consistent.',
            blocks: [
              {
                type: 'textOnly',
                title: 'Always show where things stand',
                description: 'Keep users informed about what is happening, with clear and timely feedback.',
              },
              {
                type: 'textOnly',
                title: 'One screen, one question',
                description: 'Small, focused steps help users feel in control instead of overwhelmed.',
              },
              {
                type: 'textOnly',
                title: 'Help is always close',
                description: 'Make sure users understand how to finish each task, and can get help when they need it.',
              },
              {
                type: 'textOnly',
                title: 'For now and for later',
                description:
                  'Show users we remember where they left off. For example, their answers are saved automatically so they can return any time.',
              },
            ],
          },
          {
            title: 'Design process',
            blocks: [
              {
                type: 'textMedia',
                description:
                  'Designers, developers, and stakeholders worked together from the start. We began with wireframes on the whiteboard, then moved to prototypes and testing. Short cycles let us make decisions based on evidence, not opinions.',
                media: unsplash(
                  '1581291518857-4e27b48ff24e',
                  'A hand sketching wireframes with a pen on paper',
                  'From whiteboard sketches to tested prototypes.',
                ),
              },
            ],
          },
          {
            title: 'Final design',
            blocks: [
              {
                type: 'mediaOnly',
                media: [
                  unsplash(
                    '1586717791821-3f44a563fa4c',
                    'Wireframes drawn on a tablet with a stylus',
                    'Investor classification, one question per screen.',
                  ),
                  unsplash(
                    '1512428559087-560fa5ceab42',
                    'A person in a white shirt using a smartphone',
                    'Progress and next steps after classification.',
                  ),
                ],
              },
              {
                type: 'textOnly',
                title: 'Clear, short questions',
                description:
                  'Investor classification asks one question per screen, explains why we need to ask it, and shows how long the whole step will take, about five minutes.',
              },
              {
                type: 'textOnly',
                title: 'Progress you can see',
                description:
                  'A progress ring and a simple checklist show what’s done and what’s next. After classification, users can start identity verification right away, or close it and come back later.',
              },
              {
                type: 'textOnly',
                title: 'Products first, paperwork later',
                description:
                  'Users reach “My investments” and can explore investment opportunities before they finish verification. A small reminder shows how complete their investor profile is.',
              },
              {
                type: 'textOnly',
                title: 'A real person when it matters',
                description:
                  'A chat button sits on every step, and each investor can contact a personal investor support advisor, because for big financial decisions, people still want to talk to someone.',
              },
            ],
          },
        ],
      },
    ],
    results: {
      title: 'Launched in October 2022',
      description:
        'We launched the first version of EV Smart Money, with a mobile-first onboarding flow that brings classification, identity verification, and investment products together in one clear journey.',
      stats: [
        { value: '10.2022', label: 'First version launched' },
        { value: '8', label: 'In-depth client interviews' },
        { value: '4', label: 'Design principles behind every screen' },
      ],
    },
    summary: {
      title: 'What I learned',
      description:
        'EV Smart Money showed me how much design work happens before the first screen, especially in a regulated product with many moving parts.',
      takeaways: [
        {
          title: 'Map the system, not just the screens',
          description:
            'The journey map got stakeholders, developers, and service providers talking about the same thing, and showed us problems no single screen would reveal.',
        },
        {
          title: 'Principles make decisions faster',
          description: 'With four shared principles, debates turned into quick checks: does this design follow them or not?',
        },
        {
          title: 'Trust is built by people, too',
          description:
            'Good UI earns attention, but for high-value decisions, a real advisor one tap away made the difference.',
        },
      ],
    },
  },
  {
    id: 'lumen',
    title: 'Lumen',
    oneLiner: 'A launch website that lets visitors try an AI writing tool before they sign up.',
    metadata: [
      { label: 'Role', value: 'Product Designer, Web' },
      { label: 'Timeline', value: ['2024', '10 weeks'] },
      { label: 'Team', value: ['1 product marketer', '2 engineers', '1 copywriter'] },
      { label: 'Platform', value: 'Responsive marketing site' },
      { label: 'Tools', value: ['Figma', 'Framer', 'Hotjar'] },
    ],
    background: {
      title: 'A great product nobody understood',
      blocks: [
        {
          type: 'textMedia',
          description: [
            'Lumen is an AI writing assistant for marketing teams: it drafts, edits, and checks copy against a company’s own style guide.',
            'After a strong private beta, Lumen was preparing for public launch. The existing landing page was a headline and a waitlist form, and visitors left without knowing what the product actually did.',
          ],
          media: unsplash('1531297484001-80022131f5a1', 'A laptop glowing in a dark room'),
        },
      ],
    },
    challenge: {
      title: 'Explaining AI without the hype',
      description:
        'Every competitor promised to "10× your content". We needed to show, quickly and honestly, how Lumen fits into a writer’s real workflow, and convert visitors into trial users.',
      blocks: [
        {
          type: 'textOnly',
          title: 'Success measures',
          description:
            'Double the trial sign-up rate of the beta landing page, and keep the site fast on mobile, where 46% of beta traffic came from.',
        },
      ],
    },
    persona: {
      title: 'Two audiences, one page',
      blocks: [
        {
          type: 'textOnly',
          title: 'The content lead',
          description:
            'Buys tools for a team of five to twenty writers. Cares about brand consistency, security, and whether the output sounds like the company.',
        },
        {
          type: 'textOnly',
          title: 'The individual writer',
          description:
            'Arrives from a colleague’s link and wants to see, in under a minute, whether Lumen will save time or just add another tab.',
        },
      ],
    },
    keyWork: [
      {
        label: 'Launch site',
        title: 'A website that shows the product working',
        description: 'The core idea: replace product claims with a live, hands-on demo right in the hero.',
        subsections: [
          {
            title: 'Research',
            blocks: [
              {
                type: 'textMedia',
                title: 'Where visitors dropped off',
                description:
                  'Session recordings and funnel data from the beta page showed most visitors scrolled looking for screenshots, found none, and left within 20 seconds.',
                media: unsplash(
                  '1460925895917-afdab827c52f',
                  'A laptop on a glass table showing an analytics dashboard with area charts',
                ),
              },
            ],
          },
          {
            title: 'Design exploration',
            description:
              'I tested three hero concepts with 24 marketers through unmoderated tests: a product video, an annotated screenshot, and an interactive editor.',
            blocks: [
              {
                type: 'mediaOnly',
                media: [
                  unsplash(
                    '1581291518857-4e27b48ff24e',
                    'A hand sketching wireframes with a pen on paper',
                    'Hero concepts, first on paper.',
                  ),
                  unsplash(
                    '1586717791821-3f44a563fa4c',
                    'Wireframes drawn on a tablet with a stylus',
                    'Interactive editor flow, refined on tablet.',
                  ),
                ],
              },
            ],
          },
          {
            title: 'Final design',
            blocks: [
              {
                type: 'textMedia',
                layout: 'stacked',
                title: 'Try it before you sign up',
                description:
                  'The hero is a small working editor: visitors paste a paragraph, pick a tone, and watch Lumen rewrite it. Below it, three short sections answer the questions content leads asked most: style guides, team workflow, and data privacy.',
                media: unsplash(
                  '1499951360447-b19be8fe80f5',
                  'A tidy wooden desk with a laptop and monitor showing websites',
                ),
              },
            ],
          },
          {
            title: 'Handover',
            description:
              'I built the responsive layouts in Framer with the engineers, defined motion specs for the demo, and set up Hotjar funnels so the team could keep testing after launch.',
          },
        ],
      },
    ],
    results: {
      title: 'A launch that sold the product itself',
      description: 'In the first month after launch:',
      stats: [
        { value: '2.4×', label: 'Trial sign-up rate compared with the beta page' },
        { value: '41%', label: 'Of visitors tried the live demo' },
        { value: '18k', label: 'Sign-ups in the launch month' },
        { value: '1.2s', label: 'Largest contentful paint on mobile' },
      ],
    },
    summary: {
      title: 'What I took away',
      description:
        'Lumen reminded me that the best marketing for a good product is the product itself, as long as you make it effortless to try.',
      takeaways: [
        {
          title: 'Show, don’t claim',
          description: 'One working demo did more than every headline we wrote.',
        },
        {
          title: 'Test early with the real audience',
          description: 'Unmoderated tests with 24 marketers settled a debate the team had been having for weeks.',
        },
      ],
    },
  },
]
