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
