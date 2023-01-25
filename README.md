# Full-Stack Challenge (CPU Usage Hours Dashboard)

This challenge is the build a simple dashboard application.

This application must:

1. Load the data (`cpu_hours.csv`) on the client from a server (REST API).

2. Visualize the data on the client as a chart.

Our preference is React/TypeScript (Client) + Django/Python (Server), but you may complete the challenge using your choice of language(s) and framework(s).

We have provided some basic scaffolding to get you started (Vite/React/TypeScript client, Django/Python server or Express/TypeScript server).

If you have extra time, consider extending the functionality of your solution. Add anything else you think would be cool :>>>

Have fun!

#### Some example feature extensions:

* Chart Hover Tooltips

* Chart Filters

* Chart Variants (e.g. line, bar, etc.)

* Chart View (e.g. year, month, week, etc.)

* Chart Interactions (e.g. zoom to change view)

* MySQL Database

* Authentication

## Please Provide A Write Up For Your Work

Anything we should know about your implementation? Libraries we need to install for it to work? Commands we need to run?

> ### Client
> In `/client`:
> - Run `yarn install --frozen-lockfile` to install dependencies from yarn.lock
>
> ### Backend
> In `/django_server`:
> - Run `pip install -r requirements.txt` to install dependencies <br/>
> 
> In project root:
> - Run `python manage.py seed` to seed database

> ### Local MySQL Setup: 
> You will probably be able to skip this since you already use MySQL and likely have configured locally.  Just in case:
>  
> - https://dev.mysql.com/downloads/mysql/
> - macOS 13 (ARM, 64-bit), DMG Archive (Choose right one for your machine)
> - Add to ~/.bash_profile `export PATH=$PATH:/usr/local/mysql/bin`
> - Troubleshooting:
>   - `NameError: name '_mysql' is not defined` when trying to run  Django server/migrations: ([Link](http://www.trainingtutorials101.com/2020/07/libmysqlclient-django-mac-error.html))
>   - `Authentication plugin 'caching_sha2_password' cannot be loaded: dlopen(/usr/local/mysql/lib/plugin/caching_sha2_password.so, 2): image not found` when trying to use a MySQL GUI ([Link](https://stackoverflow.com/questions/49194719/authentication-plugin-caching-sha2-password-cannot-be-loaded))

What features did you add? How do we use these features?
> - Added ability to expand the view of any particular chart, click the ArrowsPointingOut icon in the top right corner.  Click ArrowsPointingIn to return to the four chart view
> - Added functionality to select year for MonthlyUsage chart. Click the PencilSquareIcon icon in top right to open a modal to select a year.

Can you walk us through your thought process for implementing this challenge? How did you approach solving it? Where did you start?
> After reviewing the assignment, I started by looking over the provided data set in `cpu_hours.csv`. I decided to aim for creating four representations of the data for visualization: grouped by year, month, week for various date ranges, and possibly one by day of the week to see if there was some correlation there.
> 
> I then thought about the options I had for structuring the data flow of the app:
> 1. Client requests all data from API, backend reads file and serves all data to client, client manages all data manipulation. This might be okay for a small data set, but it will not scale and puts all the data processing on the client.
> 2. Client requests specific query for a chart, backend reads file and constructs specific query result. This is better, but still not scalable or performant to have to parse the file for each request.
> 3. Client requests specific query for a chart, backend queries database with appropriate group bys/filters etc., and returns data set to generate a single chart.  I think this is best as it puts all the data processing work on the backend/database which is what it's great at, and allows the client to simply plug data into the visualization.
> 4. All of the above assumes the client will handle data visualization, but an alternative could be to use `matplotlib` or similar to generate a visualization image on the backend and send that to the client. This seems okay for static visualizations, but if we want something more interactive, this would be best handled on the client.
>
> After deciding on going with approach #3, I paused before diving into data modeling to first do some research on client side options for data visualiziations.  I came across D3.js, Chart.js, and `react-chartjs-2`.  D3 definitely seemed to be the most feature rich, but for the purposes of this assignment I wanted to prioritize efficient use of time.  `react-chartjs-2` appeared to be the quickest way to get simple data visualizations on the client and it already had some interactive support like hover tooltips.  
> 
> I chose to go with `react-chartjs-2` and started off with rendering a simple chart with some dummy data to get an idea of how the chart components expected to receive data to see if that might inform how I would develop the backend api.
> 
> I then prepared the Django server with a MySQL database, defined the model/migration for the data set, and created a seed script to handle loading the data into the table.
>
> Next, I defined a service layer over the ORM that would contain a function for each chart that would be an optimized query to fetch its data.  Each service function would be called in its own View route and be serialized there to be returned as JSON data.
>
> On the client, I used React Query to handle my hooks into my backend api and Zod for type validation. For the general UI/UX, I first created a simple one page view of the four charts. To add some interactivity I wanted the user to be able to select different time ranges to adjust the data visualization.  FYI, the components in `/components/Forms` come from another project I was working on, but it was perfect to create the form modal for this feature. I also added an API to fetch the list of years present in the data set to populate the dropdown, so only valid year selections are possible. I also added a 'full-screen' button to allow the user to expand the view of any given chart.
> 


What was the most difficult part of the challenge?
> - Data visualization.  Only because it is something that I don't use regularly in my day-to-day, so there was a lot of combing through documentation and examples to get started.
> - For the most part, everything else was fairly straight-forward.  Just a few bumps in the road getting things setup, configurations, etc. Ex. local MySQL setup.

What do you like about your implementation?
> - I think its a good example of leveraging the strengths of both the backend for data management and database querying, and the client for visualizations and user interaction in the browser.
> - Good use of shared state context although I didn't get to showcase everything I wanted to do with it.  Such as maintaining state when switching between charts.


If you had more time, what would you do next? What would you change? What would you improve?
> - I would repeat what I did for MonthlyUsage chart and add the ability to select time ranges for each chart.  Also, add the modal feature to the full-screen view.
> - Currently, I have a `SmallMonthlyChart` component used in the split view, and `SelectedChart` handles the full-screen view.  Both were intended to have similar functionality, so I might have explored reusing the same Component with Modal for both cases and implemented dynamic styling based on which view it was.
> - I'd add functionality for multiple data sets on a given chart, ex. multiple years overlayed on the MonthlyUsage chart.
> - If I could do it over I would have focused on fewer examples of charts and gone more in depth with just one or two in order to have gotten to the extra features I didn't have time for.
> - With more time I'd challenge myself with a data visualization library that provides even more low-level customization and control like D3.js.
> - Add Authentication
> - Tests
> - Exception handling

### Rough Time Breakdown
Total: ~9.5 hours

1/19: 1.5 hrs
- Project structure overview, local MySQL setup, define model `CpuHours`, migration, seed script

1/20:  3 hours
- Render single dummy data with Chart.js in client
- Bit of Tailwind and dependency configuration, then styled a four quadrant UI with dummy data charts using TailwindCSS with flex styles.
- Add responsive breakpoints
- Setup first Service/View/Hook connection for monthly_hours_by_year. Added CORS and Zod validation.

1/24 2.5 hours
- One more end-to-end chart.  Yearly by range API.  Modified BarChart component to take in props, created utils/helper functions. Dynamic color handling.
- Weekday chart end-to-end. Server and client.
- Weekly chart end-to-end. Some cleanup/refactor, move some functions out of components to Utils

1/25  2.5 hours
- Convert all charts to their own components
- Large refactor of UI components, added shared context, form components, and year selection for MonthlyChart.