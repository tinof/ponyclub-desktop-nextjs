React Google Reviews React Google Reviews Component Library

The react-google-reviews library makes it easy to fetch and display Google
reviews using ReactJS. The library is built on top of the Featurable API and
provides a simple way to fetch and display Google reviews on your website. You
can also use the Google Places API and your own API key instead of the
Featurable API. In this guide we will show you how to get started with the
react-google-reviews library.

Features Customizable: Choose from three layout options and customize the
appearance of the reviews component SEO-friendly: Include JSON-LD structured
data for search engines to index your reviews Responsive: Works on all devices
and screen sizes Fast: Caches reviews for quick loading and improved performance
Free: No cost to use the Featurable API for fetching reviews Fresh:
Automatically updates with new reviews from Google every 24 hours (using
Featurable API) Accessible: Built with accessibility in mind (WAI-ARIA
compliant) Easy: Using the Featurable API, you can fetch reviews with just a few
lines of code (no server-side code required) Live Demo Here is what the
react-google-reviews component looks like when integrated into a React
application:

Carousel layout PreviewCode

Badge layout PreviewCode Google Rating 5.0 ★★★★★ ★★★★★ Read our 123 reviews
Installation To get started with the react-google-reviews library, you need to
install it using npm.

Installation npm yarn pnpm npm install react-google-reviews

Copy Copied! Usage There are two ways to use the React Google Reviews library:

Using the Featurable API (recommended)

Using the Google Places API.

We recommend using the Featurable API for fetching reviews, as it provides more
features, better performance, and is entirely free.

But if you prefer not to use the Featurable API, you can use the Google Places
API with your own API key. This method is limited to fetching only the first 5
reviews from Google.

The Featurable API method is entirely free, while the Google Places API method
requires a Google Cloud Platform account and may incur costs at scale.

Using the Featurable API (recommended) The Featurable API offers a free and easy
method of using the <ReactGoogleReviews /> component. It requires no server-side
code and automatically fetches new reviews from Google every 24 hours.

Using the Featurable API, you also do not need to find the Google Place ID,
which can be especially helpful for businesses without a physical address.

Prerequisites: Create your free Featurable account at https://featurable.com
Create a new Featurable widget and copy the widget ID Using component with
Featurable API import { ReactGoogleReviews } from "react-google-reviews"; import
"react-google-reviews/dist/index.css";

function Reviews() { // Create a free Featurable account at
https://featurable.com // Then create a new Featurable widget and copy the
widget ID const featurableWidgetId = "842ncdd8-0f40-438d-9c...";

return (
<ReactGoogleReviews layout="carousel" featurableId={featurableWidgetId} /> ); }

Copy Copied! Using the Google Places API (limited to 5 reviews) If you prefer to
use the Google Places API, you can fetch reviews using your own API key. This
method is limited to fetching only the first 5 reviews from Google and requires
server-side code to avoid exposing your API key.

Prerequisites: Create a Google Cloud Platform account at
https://cloud.google.com Create a new project and enable the Google Places API
(old version) Find your business's Google Place ID using the Place ID Finder
Using component with Google Places API import { ReactGoogleReviews,
dangerouslyFetchPlaceReviews, ReactGoogleReview } from "react-google-reviews";
import "react-google-reviews/dist/index.css";

/\*\*

- Example using NextJS page router \*/ async function ReviewsPage({ reviews }, {
  reviews: ReactGoogleReview[] }) { return (
  <ReactGoogleReviews layout="badge" reviews={reviews} /> ); }

export default ReviewsPage;

export const getServerSideProps = async () => { const placeId =
"ChIJN1t_tDeuEmsRU..."; // Google Place ID const apiKey = "AIzaSyD..."; //
Google API Key

// IMPORTANT: Only fetch reviews server-side to avoid exposing API key const
reviews = await dangerouslyFetchPlaceReviews(placeId, apiKey)

return { props: { reviews, } } }

Copy Copied! If using NextJS, the <ReactGoogleReviews /> component should be
wrapped in a client component because it uses client-side hooks.

Configuration The <ReactGoogleReviews /> component has a variety of
configuration options and pre-built layouts. You can also pass a custom renderer
function to customize the appearance of the reviews.

Layout There are three layout options currently available:

Badge: Display a badge with the average rating, total reviews, and link to
Google Business profile Badge layout
<ReactGoogleReviews layout="badge" featurableId={featurableWidgetId} />

Copy Copied! Badge Layout Carousel: An interactive carousel that displays
reviews Carousel layout
<ReactGoogleReviews layout="carousel" featurableId={featurableWidgetId} />

Copy Copied! Carousel Layout

Custom renderer: Render reviews using a custom function Custom renderer layout
<ReactGoogleReviews layout="custom" featurableId={featurableWidgetId}
renderer={(reviews) => { return ( <div> {reviews.map(({ reviewId, reviewer,
comment }) => ( <div key={reviewId}> <h3>{reviewer.displayName}</h3>

<p>{comment}</p> </div> ))} </div> ); }} />

Copy Copied! CSS Classes The <ReactGoogleReviews /> component uses the Block
Element Modifier (BEM) naming convention for CSS classes. You can override
stylings by supplying a stylesheet that uses these selectors.

Carousel Classes Name .carousel Description Main carousel container

Name .carousel\_\_btn Description Button to scroll carousel

Name .carousel\_\_btn--left Description Left (previous) carousel button

Name .carousel\_\_btn--right Description Right (next) carousel button

Name .carousel\_\_btn--light Type default Description Light theme carousel
button

Name .carousel\_\_btn--dark Description Dark theme carousel button

Name .carousel**btn**icon Description SVG chevron icon for carousel button

Name .carousel\_\_card Description Container for carousel review card

Name .slick-dots > li > button::before Description Carousel slider dots

Name .slick-dots > li.slick-active > button::before Description Carousel slider
dots active state

Badge Classes Name .badge Description Main badge container

Name .badge\_\_container Description Inner container for badge

Name .badge\_\_container--light Type default Description Light theme inner
container for badge

Name .badge\_\_container--dark Description Dark theme inner container for badge

Name .badge\_\_subcontainer Description Inner container for badge text

Name .badge\_\_label Description "Google Rating" badge label

Name .badge\_\_label--light Type default Description Light theme for badge label

Name .badge\_\_label--dark Description Dark theme for badge label

Name .badge**rating**container Description Badge container for rating and stars

Name .badge\_\_rating Description Rating text (e.g. 4.8)

Name .badge\_\_rating--light Type default Description Light theme for rating
text

Name .badge\_\_rating--dark Description Dark theme for rating text

Name .badge\_\_stars Description Container for star icons

Name .badge**stars**container Description Inner container for star icons

Name .badge**stars**fill Description Filled state for star icons

Name .badge**stars**empty Description Empty state for star icons

Name .badge**link**container Description Container for "Read our \_\_ reviews"
profile link

Name .badge**link Description The "Read our ** reviews" profile link

Name .badge\_\_link--light Type default Description Light theme for badge
profile link

Name .badge\_\_link--dark Description Dark theme for badge profile link

Props The <ReactGoogleReviews /> component accepts the following props:

Common Props Name featurableId Type string Description Featurable widget ID

Name reviews Type ReactGoogleReview[] Description Array of reviews to display,
fetched using dangerouslyFetchPlaceReviews

Name layout Type "badge" | "carousel" | "custom" Description Array of reviews to
display, fetched using dangerouslyFetchPlaceReviews

Name nameDisplay? Type "fullNames" | "firstAndLastInitials" | "firstNamesOnly"
Description How to display names on reviews. Default: "firstAndLastInitials"

Name logoVariant? Type "logo" | "icon" | "none" Description How to display the
Google logo. Default: "icon"

Name maxCharacters? Type number Description When collapsed, the maximum number
of characters to display in the review body. Default: 200

Name dateDisplay? Type "relative" | "absolute" Description How to display the
review date. Default: "relative"

Name reviewVariant? Type "card" | "testimonial" Description Review layout
variations. Default: "card"

Name theme? Type "light" | "dark" Description Color scheme of the component.
Default: "light"

Name structuredData? Type boolean Description Whether to include JSON-LD
structured data for SEO

Name structuredData? Type boolean Description Whether to include JSON-LD
structured data for SEO. Default: false

Name brandName? Type string Description Custom business name for structured data

Name productName? Type string Description Custom product name for structured
data

Name productDescription? Type string Description Optional product description
for structured data

Name accessibility? Type boolean Description Enable/disable accessibility
features. Default: true

Name totalReviewCount? Type number Description Total number of reviews on Google
Business profile. This is automatically fetched if using featurableId.
Otherwise, this is required if passing reviews manually and structuredData is
true.

Name averageRating? Type number Description Average rating for Google Business
profile. This is automatically fetched if using featurableId. Otherwise, this is
required if passing reviews manually and structuredData is true.

Carousel Props Name carouselSpeed Type number Description Autoplay speed of the
carousel in milliseconds. Default: 3000

Name carouselAutoplay Type boolean Description Whether to autoplay the carousel.
Default: true

Name maxItems Type number Description Maximum number of items to display at any
one time in carousel. Default: 3

Badge Props Name profileUrl Type string Description Link to Google Business
profile, if manually fetching reviews via Place API. Using Featurable API will
automatically supply this URL.

License This project is licensed under the MIT License. By using the Featurable
API, you agree to the Featurable Terms of Service.

Acknowledgements This library uses slick-carousel and react-slick for the
carousel layout.
