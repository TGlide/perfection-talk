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
    - [ ] Toasts
    - [ ] Forms and input patterns
    - [ ] Auto-fill (use Shine as an example)
- [ ] Accessibility
    - [ ] Non-native components without kbd functionality
    - [ ] Contrast
    - [ ] Scroll jacking
    - [ ] Headings
- [ ] Cache/Local-first
-->

## Pop-ups, and lets stop blaming GDPR

The first one is probably the most prevalent of all. We've been hammered into submission with popups, and led to believe that it is unavoidable.

I've seen a lot of people like to blame GDPR, even our friend Guillermo Rauch, CEO of Vercel. Sure, GDPR makes it so you require consent to use cookies. But not any kind,but the lets-steal-your-data-and-make-fortunes-off-it kind. GDPR comes and warns us about our stalker and we cuss it out?

No, I've come here to cuss the stalkers out. There are plenty of privacy-friendly ways you can gather useful metrics out of your systems, which I'll get into later.

The problem is though, is that I think companies seized an opportunity with pop-ups. Since they became normalized with cookies, a lot of users will let another pop-up slip by without cause for alert. Screaming "Free coupon!"; "Sign up to my newsletter!", and so on. All the while blocking you from going to where you want to go.

All this amounts to a lot of extraneous fluff to your experience, like a shop-keeper who nags you after you told them you don't need assistance for the 3rd time.
