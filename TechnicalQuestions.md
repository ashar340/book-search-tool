## How long did you spend on the coding assignment?

I almost about 5-6 hrs of evening hours after work for three days.

##  What would you add to your solution if you had more time?

- Refined Pagination with ellipses

 - Filtering - It would be superfluous to have fine grained filtering available at disposal when looking at such a large dataset, ie. filter By Published Dates, Author would help.

- Ability to show multiple editions for every title

## What was the most useful feature that was added to the latest version of your chosen language?

The **Awaited Type** and **Promise Improvements**

TypeScript 4.5 introduces a new utility type called the Awaited type. This type is meant to model operations like await in async functions, or the .then() method on Promises – specifically, the way that they recursively unwrap Promises.

// A = string

`type  A = Awaited<Promise<string>>;`

  

// B = number

`type  B = Awaited<Promise<Promise<number>>>;`

  

// C = boolean | number

`type  C = Awaited<boolean | Promise<number>>;`

The Awaited type can be helpful for modeling existing APIs, including JavaScript built-ins like Promise.all, Promise.race, etc.

## How would you track down a performance issue in production? Have you ever had to do this?

1.  I would use React’s official APIs to measure performance of our component in production, which can be used to track down where the issue might lie.
2.  I had to do this when our monitoring tool reported that some of our users were experiencing slowness.
3.  Since, Webpack removes some or most of the development code useful to determine the issue for the production build. Although, it does leave behind some of the code which can be run through the profiler
4.  Users who were using low-end devices were facing sluggish experience on one of the recently deployed pages, to get an idea of actual performance issues the users were facing, I leveraged dev tools to throttle the cpu performance to mimic a 3x slowdown
5.  The issue was really the 60fps animations running on low-end devices which was a huge slowdown, we ended up changing the animations strategy for low-end devices to be only performed when no background tasks are running and disabling animations completely for very low-end devices.

## How would you improve the API that you just used?

1.  OpenAPI specification can be provided and leveraged by tools like Swagger for better documentation, I ran into inconsistencies with the shape of the responses as being presented on the docs
2.  API Versioning to avoid breaking schema changes.
3.  REST APIs can become inflexible with ever-changing UI requirements, on the contrary a Graphql endpoint is very flexible when it comes to data-fetching, to fetch exactly and as much data needed.
4.  There are many scenarios one could run into where a REST API would end up overfetching, resulting in an overhead over the network and increasing the response times, which is what I experienced working with the OpenLibrary endpoints.
5.  While the API was using Apache solr queries for data filtering, a more standardized filtering could be done to filter server side being agnostic of how solr queries are written.

## Please describe yourself using correctly formatted JSON.

```json
{
  "name": "Ananya",
  "lastname": "Sharma",
  "age": 22,
  "livesin": "Toronto, ON",
  "techstack": {
    "languages": [
      "JavaScript",
      "TypeScript",
      "C#",
      "Python",
      "Rust",
      "Elm",
      "Haskell"
    ],
    "frameworks": [
      "React",
      "React Native",
      "Angular",
      "Redux",
      "XState",
      "RxJS",
      "Apollo GraphQL",
      "Webpack",
      "Babel",
      "NodeJS",
      "Express",
      ".NET Core",
      "Docker",
      "Git",
      "AWS",
      "Azure"
    ]
  },
  "passions": [
    "Programming",
    "Psychology",
    "Hiking",
    "Biking"
  ],
  "interests": [
    "Functional Programming",
    "Serveless Architechture",
    "Animations",
    "Accessibility"
  ],
  "interpersonal_skills": [
    " Leadership",
    " Resourcefulness",
    " Organizational",
    "Communication",
    " Problem Solving",
    "Critical Thinking",
    "Adaptability"
  ]
}
```



