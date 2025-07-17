# Introduce crappy software

As a technologist, it is surprising how much I am frustrated by technology. I see the immense value it provides, in a myriad of applications that my peers, friend, and family use daily. But I also feel that I'm not alone in this frustration, regardless of how useful someone gauges the products that they use.

Picture this:

_Show frames of examples_

- You go to a website looking for a recipe, and you need to register, go through a cookie pop-up, and through someone's life-story
- You try and talk to support, and you're greeted with a bot who's actually a glorified form
- You click on a checkbox some times, and the website still notifies you about that 1 minute later, in a place far away
- You try and open the page you've just been to, and are greeted with loading screens
- You update an issue on GitHub, and have to reload because the website's data is conflicting. That's why IT folks keep asking you to turn it off and on again.
- No words needed here.
- You go use a product you used to love, only to discover it started putting basic features behind a paywall.

_Finish by grabbing all images and putting them in the trash, emil Kowalski animation style_

If you're like me, I can feel your mind banging against the walls in anger over scenarios you've seen one too many times. These patterns are common, and it may seem nitpicky that I'm making a big fuss over it. Most things in life are not smooth-edged, and we all just kinda have to make do with what we've got.

But I'm personally not comfortable with that. I think humanity is at its best when we strive to make things a little bit better, one step at a time.

# Introduce myself

My name is Thomas G. Lopes, I'm a front-end engineer at Hugging Face, and an open-source maintainer. And, I have to admit, I write my fair share of crappy applications, I'm not special in that sense.

But I do believe that the most important step in trying to improve one's abilities, is to recognize what needs improving.

Lets analyze the examples I showed you before.

# Analyzing shitty software

<!--
TODO: List of topics

- [x] Pop-ups
- [ ] Weird UX
    - [x] Toasts
    - [x] Forms and input patterns
    - [x] Auto-fill (use Shine as an example)
- [x] Accessibility
    - [x] Non-native components without kbd functionality
    - [ ] Contrast
    - [ ] Scroll jacking
    - [ ] Headings
- [x] Cache/Local-first
-->

## Pop-ups, and lets stop blaming GDPR

The first one is probably the most prevalent of all. We've been hammered into submission with popups, and led to believe that it is unavoidable.

I've seen a lot of people like to blame GDPR, even our friend Guillermo Rauch, CEO of Vercel. Sure, GDPR makes it so you require consent to use cookies. But not any kind,but the lets-steal-your-data-and-make-fortunes-off-it kind. GDPR comes and warns us about our stalker and we cuss it out?

No, I've come here to cuss the stalkers out. There are plenty of privacy-friendly ways you can gather useful metrics out of your systems, which I'll get into later.

The problem is though, is that I think companies seized an opportunity with pop-ups. Since they became normalized with cookies, a lot of users will let another pop-up slip by without cause for alert. Screaming "Free coupon!"; "Sign up to my newsletter!", and so on. All the while blocking you from going to where you want to go.

All this amounts to a lot of extraneous fluff to your experience.

<!-- https://cookieconsentspeed.run/ -->

Quick shoutout, while I was doing some research for this presentation, I came across this awesome website, called cookie consent speed run. Its pretty dope, do check it out. It does a great job of illustrating some really bad patterns.

## Toasts and weird UX

There's a similar type of popup that is over-used, and often times badly. Toasts. Let's go to YouTube to see an example.

Here's a video I really like. Its a performance of lovely song, so I'd like to add it to my Favorites. Or just any playlist really. So I click the Save button. Then, I immediately click my favorites playlist.

But oops, I already had it in my favorites. So I click the checkbox again to re-add it. Great! Except there's this tucked away toast saying I just removed it. Even though the checkbox says its saved. And if I click this a few times, YouTube just has a stroke.

It's quite common to see our UI contradict itself, or just be flat out wrong. There's this issue that I found in a shopping site I go to. I recreated the phenomenon here because they've since fixed it, kudos to them, but it goes like this.

You have a login form. And so you go to click enter, and its disabled. Obviously, because you haven't filled in the data. If you go ahead and fill in your email and password, the button is then enabled. Great!

The issue is, most people don't fill in their email and password. They use a password manager. (Or maybe I'm mistaken and that only happens in my ideal world where people are not using their grandma's dog's birthday as their password everywhere)

So, what happens when you click to auto-fill? The button stays disabled.

What I then had to do was to go to the password input. Press space. Then backspace. That would trigger the change event handler, and the button would then be activated. Now try explaining why that is to other people.

## Accessibility

It gets worse when we talk about accessibility.

One of the biggest issues for me are tooltips. There's this great resource, called Inclusive Components. It goes over several common UI patterns in depth, helping us create better components.

The issue with tooltip, is what is hidden. If I hover over this button with my cursor, great, I know what it does when I did not before.

But, say I'm not using my cursor, and using a keyboard. I tab the button, and I don't know what it does.

Or, even more important, if I'm on a mobile device. I also don't know what it does! And there is no available interaction for me to discover that information.

Tooltips are not the only components guilty of this. There's an app that's pretty popular and well-praised that has some bad UX patterns, IMO.

Linear.

If you see this list here, at first it seems like its great. Pretty, but, just like a tooltip, it hides elements to cursor only users.

I can only see this menu if I hover over it. Fortunately, I can still tab to it, but the tab navigation is a bit weird. Also, while I can open it with my keyboard, I can not close it. It only closes if I click outside, or select something.

Problem is, its also inconsistent. The menu items below, don't show me the x button with the keyboard, at all.

The reason this is important, is because not all users are able to use a mouse day to day. And this also affects users who just prefer using their keyboards.

There are many examples of elements like these out there that just do not work fully as intended, that have missed an use case here and there. This is just a small sample.

But, don't get me wrong, Linear is a hell of a product. They're one of the biggest competitors to Jira and managed to carve their way on a well estabilished market because they usually nail the feeling of using their apps.

And the biggest reason...

## Everything is in the cloud

...is its speed.

But I'm skipping ahead a bit.

Lets first talk about the state of the web apps today.

Most of the apps we use today, are online.

Note-taking, photo uploads, spreadsheets, design tools, you name it.

The benefits of this are obvious. Its much easier to sell user data if they willingly give it away for free.

Of course, there is also the added benefit of being able to access your data in all of your devices.

The problem though is, you are now dealing with several problems.

- Latency
- Inconsistent data between client and server
- Depend on an internet connection to work

These may not seem like big problems, because we're so used to having online-only services these days, and internet connection is, in general over here in Europe, good enough.

But then, you just happen into those situations where the internet suddenly is not so good. If you use NOS at your home, it'll drop constantly. You may be on a train where signal is not reliable. So on and so forth.

Even worse, you go to distract yourself with Wordle while the internet is down, and even that relies on the internet.

Regarding the inconsistent data, this is a funny example you may have run into.

Most people here I assume, are programmers. We commonly use an online service to host our code and collaborate with others, such as GitHub.

<!-- Go through the issues page -->

## Summarizing the problems

Now, a lot of these problems seem small. They are edge cases, or do not define the bulk of your experience when using an app. They do however infiltrate every corner they can, enough that we all have experienced repeatedly. They are quite devilish.

The Devil is in the details. Now, as much of a cliche as the saying is, its extremely important to have it in mind.

These things are a pain in the ass. As I said earlier, I maintain an open-source library, Melt UI. It is an UI library, obviously, and for every component that I have, I need to deal with a ton of devilish details.

Lets take a look at the Tooltip again!

It looks familiar, right? Truth is, the tooltip we've seen before was using Melt. But I neutered it, this one is much better.

When I tab to it, the content appears. When I put my cursor between the trigger and the content, it is still open. It is screen reader accessible, for people with vision impairment. The list goes on. And everything is customizable.

The other day a user wanted to contribute to the library, to this component specifically, and he was astonished by the amount of lines of code needed just to write a tooltip.

So, the solutions I'm going to show here, are not the simplest in a lot of cases. They require you to go hunting to try and improve as much as you can. It is frustrating, but I find the end result extremely satisfying.

I'm not going to give you a secret sauce here, because I don't have one, as much as I'd like to. I just hope to share some of the things I came upon, and try to instill some inspiration and insight into how I approach these things.

# Solutions

<!--
TODO: List of topics

- [x] Cache/Local-first
- [ ] Good UX
- [ ] Animations
- [ ] Pop-ups
-->

## Local-first

Lets go back to Linear. Remember when I mentioned that the thing I liked the most, was its speed?

That's because Linear is not strictly cloud-only. When you first open the app, it tries and loads as much data as it can, that's relevant to the current page you're in and adjacent ones, and stores it. All further interactions are done based on that local data.

This means that loading times are very fast, if not instant. It does however, keep a connection to the server open when available, to try and stop your data from getting stale. Whenever something changes in the server, it'll simply update the data that you have locally.

This is commonly referred to as a "local-first" approach, but recently a new term has been introduced for the underlying mechanism, called a "sync engine". It perfectly describes what it does, sync data between the client and server.

There has been a big push in the last few years to make this more approachable. One such example is Zero.

Zero even created a kind of Linear clone, that manages to be much faster.

<!-- Showcase zbugs a bit (bugs.rocicorp.dev) -->

This enables a really nice behaviour as well. If the data you're interacting with is local, that means that when you try and edit, or add something, for example a new task, you don't have to wait for loading indicators, and latency, and whatever. Linear just updates the local data again.

I got really excited by this idea, and wanted to experiment with it a bit. So I created a bill splitter for me and my girlfriend. It uses Zero and SvelteKit under the hood, and you'll see the same speed as you saw before. I want to however dive into the code just to give you a small glimpse of what it looks like.

<!-- Show schema -->
<!-- Show .query -->
<!-- Show .mutate.insert -->
<!-- Show .mutate.update -->
<!-- Do not show data being sent while offline, not sure if it works -->

Now, the problem with Zero, is that its a little bit tricky to host in production. Its still in beta, so a bit unstable, and there are some not so simple steps to it.

I was a bit bummed about that aspect of it, specially since my frontend pea brain can _not_ deal with things like AWS.

So I decied to try something called Convex. It is similar to Zero, since it uses a sync engine, but its cache lives on the server instead, and so when you reload the data needs to be queried again. It still enables dirt-simple code, but I felt this piece was lacking. I did however, create a local cache layer on top of it, and it works great.

<!-- Show thom.chat -->

If you're curious to see more apps that are local-first, a popular one I use is Obsidian. Its a note-taking app that gets often compared to Notion. But it doesn't crap itself whenever loading a new page, and lets me see my notes whenever I want to, even when NOS doesn't let me.

Also, for more local-first resources, check out https://lofi.so/
