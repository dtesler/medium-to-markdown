
> medium-to-markdown@0.0.3 convert C:\dev\misc\medium-to-markdown
> node index.js "https://medium.com/@almenon214/adding-telemetry-to-your-vscode-extension-f3d52d2e573c"

Adding telemetry to your vscode extension
=========================================

[![Almenon](https://miro.medium.com/fit/c/96/96/1*4FAOBq9qVna6uHkxaolTtA.png)](https://medium.com/@almenon214?source=post_page-----f3d52d2e573c----------------------)[Almenon](https://medium.com/@almenon214?source=post_page-----f3d52d2e573c----------------------)Follow[May 6, 2018](https://medium.com/@almenon214/adding-telemetry-to-your-vscode-extension-f3d52d2e573c?source=post_page-----f3d52d2e573c----------------------) · 3 min read

The [1% rule](https://en.wikipedia.org/wiki/1%25_rule_(Internet_culture)) of the internet states that the vast majority of users do not engage with the content — they use it and see it, but leave no feedback. In some cases they might give your product one try, don’t like it, and never come back. Or not even try it! This lack of feedback makes it very hard to improve your product or market it to new users.

Enter telemetry — by automatically collecting statistics and/or errors, you can get feedback without having to conduct expensive market research.

[Azure application insights](https://azure.microsoft.com/en-us/services/application-insights/) makes this collection very simple (and free):

npm install [vscode-extension-telemetry](https://github.com/Microsoft/vscode-extension-telemetry) --save

If you want a real-world example of its useage you can take a look at how I use it in [AREPL-vscode](https://github.com/Almenon/AREPL-vscode/blob/master/src/telemetry.ts).

Once it is working you should see events appear in the metrics explorer in azure:

<img class="cp t u gw ak" src="https://miro.medium.com/max/1660/1\*SN6bXX35\_fpZG3xCCiqhng.png" width="830" height="676" role="presentation"/>

But the beauty of application insights is not just in the logging — Microsoft offers a sophistacted query language, similar to SQL / Splunk.

<img class="cp t u gw ak" src="https://miro.medium.com/max/1994/1\*AWTwMT2arn--kzsLhCJziw.png" width="997" height="449" role="presentation"/>

distinct users, ordered by last use date.

Some other useful queries:

// heaviest users by avg time spent using extcustomEvents |   
where timestamp < now() and name=="almenon.arepl/closed" |   
summarize timeOpen=avg(todouble(customDimensions.timeSpent)) by cloud\_RoleInstance | order by timeOpen

* * *

// most frequent users by number of times openedcustomEvents |   
where timestamp < now() and name=="almenon.arepl/closed" |   
summarize numEvents=count(iKey) by cloud\_RoleInstance | order by numEvents

* * *

You can even project your results into graphs

customEvents | where name == 'almenon.arepl/closed' | summarize count() by client\_CountryOrRegion | render piechart

<img class="cp t u gw ak" src="https://miro.medium.com/max/1448/1\*Su93PsHonYivRH\_b8ktvKw.png" width="724" height="601" role="presentation"/>

The analysis leads to some interesting conclusions:

1.  Despite having hundreds of downloads, the actual user count is much much lower. 5 people have used it so far with one person using it twice… not great statistics. Should pick up once I market AREPL at pycon.
2.  The range of users is quite geographically diverse. You don’t just get people in California or America; there’s people from canada, italy, portugal, all sorts of places. I guess that is to be expected with internet marketing — people can see your extension from countries across the world.

Once I get more people using the extension I should be able to draw more insights — like what settings they change, for example. Or how often errors occur. Or the most popular time the extension is used. Really, sky’s the limit!

**Update:** further anlysis of my telemetry data can be found at:

[

AREPL stats for June
--------------------

### So about a month ago I added telemetry to AREPL-vscode to get an idea of how my user base was doing. The information I…

#### medium.com

](https://medium.com/@almenon214/arepl-stats-for-june-5e0c87636c3)
