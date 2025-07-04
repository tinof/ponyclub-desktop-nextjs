API Reference Components Image Component Image Component The Next.js Image
component extends the HTML <img> element for automatic image optimization.

app/page.js

import Image from 'next/image'

export default function Page() { return ( <Image
      src="/profile.png"
      width={500}
      height={500}
      alt="Picture of the author"
    /> ) } Reference Props The following props are available:

Prop Example Type Status src src="/profile.png" String Required alt alt="Picture
of the author" String Required width width={500} Integer (px) - height
height={500} Integer (px) - fill fill={true} Boolean - loader
loader={imageLoader} Function - sizes sizes="(max-width: 768px) 100vw, 33vw"
String - quality quality={80} Integer (1-100) - priority priority={true}
Boolean - placeholder placeholder="blur" String - style
style={{objectFit: "contain"}} Object - onLoadingComplete onLoadingComplete={img
=> done())} Function Deprecated onLoad onLoad={event => done())} Function -
onError onError(event => fail()} Function - loading loading="lazy" String -
blurDataURL blurDataURL="data:image/jpeg..." String - overrideSrc
overrideSrc="/seo.png" String - src The source of the image. Can be one of the
following:

An internal path string.

<Image src="/profile.png" />
An absolute external URL (must be configured with remotePatterns).

<Image src="https://example.com/profile.png" />
A static import.

import profile from './profile.png'

export default function Page() { return <Image src={profile} /> } alt The alt
property is used to describe the image for screen readers and search engines. It
is also the fallback text if images have been disabled or an error occurs while
loading the image.

It should contain text that could replace the image without changing the meaning
of the page. It is not meant to supplement the image and should not repeat
information that is already provided in the captions above or below the image.

If the image is purely decorative or not intended for the user, the alt property
should be an empty string (alt="").

Learn more about image accessibility guidelines.

width and height The width and height properties represent the intrinsic image
size in pixels. This property is used to infer the correct aspect ratio used by
browsers to reserve space for the image and avoid layout shift during loading.
It does not determine the rendered size of the image, which is controlled by
CSS.

<Image src="/profile.png" width={500} height={500} />
You must set both width and height properties unless:

The image is statically imported. The image has the fill property If the height
and width are unknown, we recommend using the fill property.

fill A boolean that causes the image to expand to the size of the parent
element.

<Image src="/profile.png" fill={true} />
Positioning:

The parent element must assign position: "relative", "fixed", "absolute". By
default, the <img> element uses position: "absolute". Object Fit:

If no styles are applied to the image, the image will stretch to fit the
container. You can use objectFit to control cropping and scaling.

"contain": The image will be scaled down to fit the container and preserve
aspect ratio. "cover": The image will fill the container and be cropped. Learn
more about position and object-fit.

loader A custom function used to generate the image URL. The function receives
the following parameters, and returns a URL string for the image:

src width quality

'use client'

import Image from 'next/image'

const imageLoader = ({ src, width, quality }) => { return
`https://example.com/${src}?w=${width}&q=${quality || 75}` }

export default function Page() { return ( <Image
      loader={imageLoader}
      src="me.png"
      alt="Picture of the author"
      width={500}
      height={500}
    /> ) } Good to know: Using props like onLoad, which accept a function,
requires using Client Components to serialize the provided function.

Alternatively, you can use the loaderFile configuration in next.config.js to
configure every instance of next/image in your application, without passing a
prop.

sizes Define the sizes of the image at different breakpoints. Used by the
browser to choose the most appropriate size from the generated srcset.

import Image from 'next/image'

export default function Page() { return ( <div className="grid-element"> <Image
        fill
        src="/example.png"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      /> </div> ) } sizes should be used when:

The image is using the fill prop CSS is used to make the image responsive If
sizes is missing, the browser assumes the image will be as wide as the viewport
(100vw). This can cause unnecessarily large images to be downloaded.

In addition, sizes affects how srcset is generated:

Without sizes: Next.js generates a limited srcset (e.g. 1x, 2x), suitable for
fixed-size images. With sizes: Next.js generates a full srcset (e.g. 640w, 750w,
etc.), optimized for responsive layouts. Learn more about srcset and sizes on
web.dev and mdn.

quality An integer between 1 and 100 that sets the quality of the optimized
image. Higher values increase file size and visual fidelity. Lower values reduce
file size but may affect sharpness.

// Default quality is 75 <Image quality={75} /> If you’ve configured qualities
in next.config.js, the value must match one of the allowed entries.

Good to know: If the original image is already low quality, setting a high
quality value will increase the file size without improving appearance.

style Allows passing CSS styles to the underlying image element.

const imageStyle = { borderRadius: '50%', border: '1px solid #fff', width:
'100px', height: 'auto', }

export default function ProfileImage() { return
<Image src="..." style={imageStyle} /> } Good to know: If you’re using the style
prop to set a custom width, be sure to also set height: 'auto' to preserve the
image’s aspect ratio.

priority A boolean that indicates if the image should be preloaded.

// Default priority is false <Image priority={false} /> true: Preloads the
image. Disables lazy loading. false: Lazy loads the image. When to use it:

The image is above the fold. The image is the Largest Contentful Paint (LCP)
element. You want to improve the initial loading performance of your page. When
not to use it:

When the loading prop isused (will trigger warnings). loading Controls when the
image should start loading.

// Defaults to lazy <Image loading="lazy" /> lazy: Defer loading the image until
it reaches a calculated distance from the viewport. eager: Load the image
immediately, regardless of its position in the page. Use eager only when you
want to ensure the image is loaded immediately.

Learn more about the loading attribute.

placeholder Specifies a placeholder to use while the image is loading, improving
the perceived loading performance.

// defaults to empty <Image placeholder="empty" /> empty: No placeholder while
the image is loading. blur: Use a blurred version of the image as a placeholder.
Must be used with the blurDataURL property. data:image/...: Uses the Data URL as
the placeholder. Examples:

blur placeholder Shimmer effect with data URL placeholder prop Color effect with
blurDataURL prop Learn more about the placeholder attribute.

blurDataURL A Data URL to be used as a placeholder image before the image
successfully loads. Can be automatically set or used with the placeholder="blur"
property.

<Image placeholder="blur" blurDataURL="..." />
The image is automatically enlarged and blurred, so a very small image (10px or less) is recommended.

Automatic

If src is a static import of a jpg, png, webp, or avif file, blurDataURL is
added automatically—unless the image is animated.

Manually set

If the image is dynamic or remote, you must provide blurDataURL yourself. To
generate one, you can use:

A online tool like png-pixel.com A library like Plaiceholder A large blurDataURL
may hurt performance. Keep it small and simple.

Examples:

Default blurDataURL prop Color effect with blurDataURL prop onLoad A callback
function that is invoked once the image is completely loaded and the placeholder
has been removed.

<Image onLoad={(e) => console.log(e.target.naturalWidth)} /> The callback
function will be called with one argument, the event which has a target that
references the underlying <img> element.

Good to know: Using props like onLoad, which accept a function, requires using
Client Components to serialize the provided function.

onError A callback function that is invoked if the image fails to load.

<Image onError={(e) => console.error(e.target.id)} /> Good to know: Using props
like onError, which accept a function, requires using Client Components to
serialize the provided function.

unoptimized A boolean that indicates if the image should be optimized. This is
useful for images that do not benefit from optimization such as small images
(less than 1KB), vector images (SVG), or animated images (GIF).

import Image from 'next/image'

const UnoptimizedImage = (props) => { // Default is false return <Image
{...props} unoptimized /> } true: The source image will be served as-is from the
src instead of changing quality, size, or format. false: The source image will
be optimized. Since Next.js 12.3.0, this prop can be assigned to all images by
updating next.config.js with the following configuration:

next.config.js

module.exports = { images: { unoptimized: true, }, } overrideSrc When providing
the src prop to the <Image> component, both the srcset and src attributes are
generated automatically for the resulting <img>.

input.js

<Image src="/profile.jpg" />
output.html

<img
  srcset="
    /_next/image?url=%2Fme.jpg&w=640&q=75 1x,
    /_next/image?url=%2Fme.jpg&w=828&q=75 2x
  "
  src="/_next/image?url=%2Fme.jpg&w=828&q=75"
/> In some cases, it is not desirable to have the src attribute generated and
you may wish to override it using the overrideSrc prop.

For example, when upgrading an existing website from <img> to <Image>, you may
wish to maintain the same src attribute for SEO purposes such as image ranking
or avoiding recrawl.

input.js

<Image src="/profile.jpg" overrideSrc="/override.jpg" />
output.html

<img
  srcset="
    /_next/image?url=%2Fme.jpg&w=640&q=75 1x,
    /_next/image?url=%2Fme.jpg&w=828&q=75 2x
  "
  src="/override.jpg"
/> decoding A hint to the browser indicating if it should wait for the image to
be decoded before presenting other content updates or not.

// Default is async <Image decoding="async" /> async: Asynchronously decode the
image and allow other content to be rendered before it completes. sync:
Synchronously decode the image for atomic presentation with other content. auto:
No preference. The browser chooses the best approach. Learn more about the
decoding attribute.

Other Props Other properties on the <Image /> component will be passed to the
underlying img element with the exception of the following:

srcSet: Use Device Sizes instead. Deprecated props onLoadingComplete Warning:
Deprecated in Next.js 14, use onLoad instead.

A callback function that is invoked once the image is completely loaded and the
placeholder has been removed.

The callback function will be called with one argument, a reference to the
underlying <img> element.

'use client'

<Image onLoadingComplete={(img) => console.log(img.naturalWidth)} /> Good to
know: Using props like onLoadingComplete, which accept a function, requires
using Client Components to serialize the provided function.

Configuration options You can configure the Image Component in next.config.js.
The following options are available:

localPatterns Use localPatterns in your next.config.js file to allow images from
specific local paths to be optimized and block all others.

next.config.js

module.exports = { images: { localPatterns: [ { pathname: '/assets/images/**',
search: '', }, ], }, } The example above will ensure the src property of
next/image must start with /assets/images/ and must not have a query string.
Attempting to optimize any other path will respond with 400 Bad Request error.

remotePatterns Use remotePatterns in your next.config.js file to allow images
from specific external paths and block all others. This ensures that only
external images from your account can be served.

next.config.js

module.exports = { images: { remotePatterns: [new
URL('https://example.com/account123/**')], }, } If using a version prior to
15.3.0, you can configure remotePatterns using the object:

next.config.js

module.exports = { images: { remotePatterns: [ { protocol: 'https', hostname:
'example.com', port: '', pathname: '/account123/**', search: '', }, ], }, } The
example above will ensure the src property of next/image must start with
https://example.com/account123/ and must not have a query string. Any other
protocol, hostname, port, or unmatched path will respond with 400 Bad Request.

Wildcard Patterns:

Wildcard patterns can be used for both pathname and hostname and have the
following syntax:

- match a single path segment or subdomain \*\* match any number of path
  segments at the end or subdomains at the beginning. This syntax does not work
  in the middle of the pattern. next.config.js

module.exports = { images: { remotePatterns: [ { protocol: 'https', hostname:
'**.example.com', port: '', search: '', }, ], }, } This allows subdomains like
image.example.com. Query strings and custom ports are still blocked.

Good to know: When omitting protocol, port, pathname, or search then the
wildcard \*\* is implied. This is not recommended because it may allow malicious
actors to optimize urls you did not intend.

Query Strings:

You can also restrict query strings using the search property:

next.config.js

module.exports = { images: { remotePatterns: [ { protocol: 'https', hostname:
'assets.example.com', search: '?v=1727111025337', }, ], }, } The example above
will ensure the src property of next/image must start with
https://assets.example.com and must have the exact query string
?v=1727111025337. Any other protocol or query string will respond with 400 Bad
Request.

loaderFile loaderFiles allows you to use a custom image optimization service
instead of Next.js.

next.config.js

module.exports = { images: { loader: 'custom', loaderFile:
'./my/image/loader.js', }, } The path must be relative to the project root. The
file must export a default function that returns a URL string:

my/image/loader.js

'use client'

export default function myImageLoader({ src, width, quality }) { return
`https://example.com/${src}?w=${width}&q=${quality || 75}` } Example:

Custom Image Loader Configuration Alternatively, you can use the loader prop to
configure each instance of next/image.

deviceSizes deviceSizes allows you to specify a list of device width
breakpoints. These widths are used when the next/image component uses sizes prop
to ensure the correct image is served for the user's device.

If no configuration is provided, the default below is used:

next.config.js

module.exports = { images: { deviceSizes: [640, 750, 828, 1080, 1200, 1920,
2048, 3840], }, } imageSizes imageSizes allows you to specify a list of image
widths. These widths are concatenated with the array of device sizes to form the
full array of sizes used to generate image srcset.

If no configuration is provided, the default below is used:

next.config.js

module.exports = { images: { imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], },
} imageSizes is only used for images which provide a sizes prop, which indicates
that the image is less than the full width of the screen. Therefore, the sizes
in imageSizes should all be smaller than the smallest size in deviceSizes.

qualities qualities allows you to specify a list of image quality values.

next.config.js

module.exports = { images: { qualities: [25, 50, 75], }, } In the example above,
only three qualities are allowed: 25, 50, and 75. If the quality prop does not
match a value in this array, the image will fail with a 400 Bad Request.

formats formats allows you to specify a list of image formats to be used.

next.config.js

module.exports = { images: { // Default formats: ['image/webp'], }, } Next.js
automatically detects the browser's supported image formats via the request's
Accept header in order to determine the best output format.

If the Accept header matches more than one of the configured formats, the first
match in the array is used. Therefore, the array order matters. If there is no
match (or the source image is animated), it will use the original image's
format.

You can enable AVIF support, which will fallback to the original format of the
src image if the browser does not support AVIF:

next.config.js

module.exports = { images: { formats: ['image/avif'], }, } Good to know:

We still recommend using WebP for most use cases. AVIF generally takes 50%
longer to encode but it compresses 20% smaller compared to WebP. This means that
the first time an image is requested, it will typically be slower, but
subsequent requests that are cached will be faster. If you self-host with a
Proxy/CDN in front of Next.js, you must configure the Proxy to forward the
Accept header. minimumCacheTTL minimumCacheTTL allows you to configure the Time
to Live (TTL) in seconds for cached optimized images. In many cases, it's better
to use a Static Image Import which will automatically hash the file contents and
cache the image forever with a Cache-Control header of immutable.

If no configuration is provided, the default below is used.

next.config.js

module.exports = { images: { minimumCacheTTL: 60, // 1 minute }, } You can
increase the TTL to reduce the number of revalidations and potentionally lower
cost:

next.config.js

module.exports = { images: { minimumCacheTTL: 2678400, // 31 days }, } The
expiration (or rather Max Age) of the optimized image is defined by either the
minimumCacheTTL or the upstream image Cache-Control header, whichever is larger.

If you need to change the caching behavior per image, you can configure headers
to set the Cache-Control header on the upstream image (e.g. /some-asset.jpg, not
/\_next/image itself).

There is no mechanism to invalidate the cache at this time, so its best to keep
minimumCacheTTL low. Otherwise you may need to manually change the src prop or
delete the cached file <distDir>/cache/images.

disableStaticImages disableStaticImages allows you to disable static image
imports.

The default behavior allows you to import static files such as import icon from
'./icon.png' and then pass that to the src property. In some cases, you may wish
to disable this feature if it conflicts with other plugins that expect the
import to behave differently.

You can disable static image imports inside your next.config.js:

next.config.js

module.exports = { images: { disableStaticImages: true, }, } dangerouslyAllowSVG
dangerouslyAllowSVG allows you to serve SVG images.

next.config.js

module.exports = { images: { dangerouslyAllowSVG: true, }, } By default, Next.js
does not optimize SVG images for a few reasons:

SVG is a vector format meaning it can be resized losslessly. SVG has many of the
same features as HTML/CSS, which can lead to vulnerabilities without proper
Content Security Policy (CSP) headers. We recommend using the unoptimized prop
when the src prop is known to be SVG. This happens automatically when src ends
with ".svg".

<Image src="/my-image.svg" unoptimized />
In addition, it is strongly recommended to also set contentDispositionType to force the browser to download the image, as well as contentSecurityPolicy to prevent scripts embedded in the image from executing.

next.config.js

module.exports = { images: { dangerouslyAllowSVG: true, contentDispositionType:
'attachment', contentSecurityPolicy: "default-src 'self'; script-src 'none';
sandbox;", }, } contentDispositionType contentDispositionType allows you to
configure the Content-Disposition header.

next.config.js

module.exports = { images: { contentDispositionType: 'inline', }, } By default,
the loader sets the Content-Disposition header to attachment for added
protection since the API can serve arbitrary remote images.

The default value is attachment which forces the browser to download the image
when visiting directly. This is particularly important when dangerouslyAllowSVG
is true.

You can optionally configure inline to allow the browser to render the image
when visiting directly, without downloading it.

Deprecated configuration options domains Warning: Deprecated since Next.js 14 in
favor of strict remotePatterns in order to protect your application from
malicious users. Only use domains if you own all the content served from the
domain.

Similar to remotePatterns, the domains configuration can be used to provide a
list of allowed hostnames for external images. However, the domains
configuration does not support wildcard pattern matching and it cannot restrict
protocol, port, or pathname.

Below is an example of the domains property in the next.config.js file:

next.config.js

module.exports = { images: { domains: ['assets.acme.com'], }, } Functions
getImageProps The getImageProps function can be used to get the props that would
be passed to the underlying <img> element, and instead pass them to another
component, style, canvas, etc.

import { getImageProps } from 'next/image'

const props = getImageProps({ src: 'https://example.com/image.jpg', alt: 'A
scenic mountain view', width: 1200, height: 800, })

function ImageWithCaption() { return ( <figure> <img {...props} /> <figcaption>A
scenic mountain view</figcaption> </figure> ) } This also avoid calling React
useState() so it can lead to better performance, but it cannot be used with the
placeholder prop because the placeholder will never be removed.

Known browser bugs This next/image component uses browser native lazy loading,
which may fallback to eager loading for older browsers before Safari 15.4. When
using the blur-up placeholder, older browsers before Safari 12 will fallback to
empty placeholder. When using styles with width/height of auto, it is possible
to cause Layout Shift on older browsers before Safari 15 that don't preserve the
aspect ratio. For more details, see this MDN video.

Safari 15 - 16.3 display a gray border while loading. Safari 16.4 fixed this
issue. Possible solutions:

Use CSS @supports (font: -apple-system-body) and (-webkit-appearance: none) {
img[loading="lazy"] { clip-path: inset(0.6px) } } Use priority if the image is
above the fold Firefox 67+ displays a white background while loading. Possible
solutions:

Enable AVIF formats Use placeholder Examples Styling images Styling the Image
component is similar to styling a normal <img> element, but there are a few
guidelines to keep in mind:

Use className or style, not styled-jsx. In most cases, we recommend using the
className prop. This can be an imported CSS Module, a global stylesheet, etc.

import styles from './styles.module.css'

export default function MyImage() { return
<Image className={styles.image} src="/my-image.png" alt="My Image" /> } You can
also use the style prop to assign inline styles.

export default function MyImage() { return ( <Image
style={{ borderRadius: '8px' }} src="/my-image.png" alt="My Image" /> ) } When
using fill, the parent element must have position: relative or display: block.
This is necessary for the proper rendering of the image element in that layout
mode.

<div style={{ position: 'relative' }}>
  <Image fill src="/my-image.png" alt="My Image" />
</div>
You cannot use styled-jsx because it's scoped to the current component (unless you mark the style as global).

Responsive images with a static export When you import a static image, Next.js
automatically sets its width and height based on the file. You can make the
image responsive by setting the style:

Responsive image filling the width and height of its parent container

import Image from 'next/image' import mountains from '../public/mountains.jpg'

export default function Responsive() { return ( <div
style={{ display: 'flex', flexDirection: 'column' }}> <Image alt="Mountains" //
Importing an image will // automatically set the width and height
src={mountains} sizes="100vw" // Make the image display full width // and
preserve its aspect ratio style={{
          width: '100%',
          height: 'auto',
        }} /> </div> ) } Responsive images with a remote URL If the source image
is a dynamic or a remote URL, you must provide the width and height props so
Next.js can calculate the aspect ratio:

components/page.js

import Image from 'next/image'

export default function Page({ photoUrl }) { return ( <Image src={photoUrl}
alt="Picture of the author" sizes="100vw" style={{
        width: '100%',
        height: 'auto',
      }} width={500} height={300} /> ) } Try it out:

Demo the image responsive to viewport Responsive image with fill If you don't
know the aspect ratio of the image, you can add the fill prop with the objectFit
prop set to cover. This will make the image fill the full width of its parent
container.

Grid of images filling parent container width

import Image from 'next/image' import mountains from '../public/mountains.jpg'

export default function Fill() { return ( <div style={{
        display: 'grid',
        gridGap: '8px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, auto))',
      }} > <div style={{ position: 'relative', width: '400px' }}> <Image
alt="Mountains" src={mountains} fill sizes="(min-width: 808px) 50vw, 100vw"
style={{
            objectFit: 'cover', // cover, contain, none
          }} /> </div> {/_ And more images in the grid... _/} </div> ) }
Background Image Use the fill prop to make the image cover the entire screen
area:

Background image taking full width and height of page

import Image from 'next/image' import mountains from '../public/mountains.jpg'

export default function Background() { return ( <Image alt="Mountains"
src={mountains} placeholder="blur" quality={100} fill sizes="100vw" style={{
        objectFit: 'cover',
      }} /> ) } For examples of the Image component used with the various
styles, see the Image Component Demo.

Remote images To use a remote image, the src property should be a URL string.

app/page.js

import Image from 'next/image'

export default function Page() { return ( <Image
      src="https://s3.amazonaws.com/my-bucket/profile.png"
      alt="Picture of the author"
      width={500}
      height={500}
    /> ) } Since Next.js does not have access to remote files during the build
process, you'll need to provide the width, height and optional blurDataURL props
manually.

The width and height attributes are used to infer the correct aspect ratio of
image and avoid layout shift from the image loading in. The width and height do
not determine the rendered size of the image file.

To safely allow optimizing images, define a list of supported URL patterns in
next.config.js. Be as specific as possible to prevent malicious usage. For
example, the following configuration will only allow images from a specific AWS
S3 bucket:

next.config.js

module.exports = { images: { remotePatterns: [ { protocol: 'https', hostname:
's3.amazonaws.com', port: '', pathname: '/my-bucket/**', search: '', }, ], }, }
Theme detection If you want to display a different image for light and dark
mode, you can create a new component that wraps two <Image> components and
reveals the correct one based on a CSS media query.

components/theme-image.module.css

.imgDark { display: none; }

@media (prefers-color-scheme: dark) { .imgLight { display: none; } .imgDark {
display: unset; } } components/theme-image.tsx TypeScript

TypeScript

import styles from './theme-image.module.css' import Image, { ImageProps } from
'next/image'

type Props = Omit<ImageProps, 'src' | 'priority' | 'loading'> & { srcLight:
string srcDark: string }

const ThemeImage = (props: Props) => { const { srcLight, srcDark, ...rest } =
props

return ( <> <Image {...rest} src={srcLight} className={styles.imgLight} />
<Image {...rest} src={srcDark} className={styles.imgDark} /> </> ) } Good to
know: The default behavior of loading="lazy" ensures that only the correct image
is loaded. You cannot use priority or loading="eager" because that would cause
both images to load. Instead, you can use fetchPriority="high".

Try it out:

Demo light/dark mode theme detection Art direction If you want to display a
different image for mobile and desktop, sometimes called Art Direction, you can
provide different src, width, height, and quality props to getImageProps().

app/page.js

import { getImageProps } from 'next/image'

export default function Home() { const common = { alt: 'Art Direction Example',
sizes: '100vw' } const { props: { srcSet: desktop }, } = getImageProps({
...common, width: 1440, height: 875, quality: 80, src: '/desktop.jpg', }) const
{ props: { srcSet: mobile, ...rest }, } = getImageProps({ ...common, width: 750,
height: 1334, quality: 70, src: '/mobile.jpg', })

return ( <picture> <source media="(min-width: 1000px)" srcSet={desktop} />

<source media="(min-width: 500px)" srcSet={mobile} /> <img {...rest}
style={{ width: '100%', height: 'auto' }} /> </picture> ) } Background CSS You
can even convert the srcSet string to the image-set() CSS function to optimize a
background image.

app/page.js

import { getImageProps } from 'next/image'

function getBackgroundImage(srcSet = '') { const imageSet = srcSet .split(', ')
.map((str) => { const [url, dpi] = str.split(' ') return `url("${url}") ${dpi}`
}) .join(', ') return `image-set(${imageSet})` }

export default function Home() { const { props: { srcSet }, } = getImageProps({
alt: '', width: 128, height: 128, src: '/img.png' }) const backgroundImage =
getBackgroundImage(srcSet) const style = { height: '100vh', width: '100vw',
backgroundImage }

return ( <main style={style}> <h1>Hello World</h1> </main> ) } Version History
Version Changes v15.3.0 remotePatterns added support for array of URL objects.
v15.0.0 contentDispositionType configuration default changed to attachment.
v14.2.23 qualities configuration added. v14.2.15 decoding prop added and
localPatterns configuration added. v14.2.14 remotePatterns.search prop added.
v14.2.0 overrideSrc prop added. v14.1.0 getImageProps() is stable. v14.0.0
onLoadingComplete prop and domains config deprecated. v13.4.14 placeholder prop
support for data:/image... v13.2.0 contentDispositionType configuration added.
v13.0.6 ref prop added. v13.0.0 The next/image import was renamed to
next/legacy/image. The next/future/image import was renamed to next/image. A
codemod is available to safely and automatically rename your imports. <span>
wrapper removed. layout, objectFit, objectPosition, lazyBoundary, lazyRoot props
removed. alt is required. onLoadingComplete receives reference to img element.
Built-in loader config removed. v12.3.0 remotePatterns and unoptimized
configuration is stable. v12.2.0 Experimental remotePatterns and experimental
unoptimized configuration added. layout="raw" removed. v12.1.1 style prop added.
Experimental support for layout="raw" added. v12.1.0 dangerouslyAllowSVG and
contentSecurityPolicy configuration added. v12.0.9 lazyRoot prop added. v12.0.0
formats configuration added. AVIF support added. Wrapper <div> changed to
<span>.

'''

Image Optimization with Vercel Image Optimization is available on all plans

Vercel supports dynamically transforming unoptimized images to reduce the file
system while maintaining high quality. These optimized images are cached on the
Vercel Edge Network, meaning they're available close to users whenever they're
requested.

Get started Image Optimization works with many frameworks, including Next.js,
Astro, and Nuxt, enabling you to optimize images using built-in components.

Get started with Next.js by following the Image Optimization Quickstart and
selecting Next.js from the dropdown. Get started with Nuxt by following the
Image Optimization Quickstart and selecting Nuxt from the dropdown. Get started
with Astro by following the Image Optimization Quickstart and selecting Astro
from the dropdown. For a live example which demonstrates usage with the
next/image component, see the Image Optimization demo. Why should I optimize my
images on Vercel? Optimizing images on Vercel provides several advantages for
your application:

Reduces the size of images and data transferred, enhancing website performance,
user experience, and Fast Data Transfer usage. Improving Core Web Vitals,
reduced bounce rates, and speeding up page loads. Sizing images to support
different devices and use modern formats like WebP and AVIF. Optimized images
are cached after transformation, which allows them to be reused in subsequent
requests. How Image Optimization works The flow of image optimization on Vercel
involves several steps, starting from the image request to serving the optimized
image.

The optimization process starts with your component choice in your codebase:

If you use a standard HTML img element, the browser will be instructed to bypass
optimization and serve the image directly from its source. If you use a
framework's Image component (like next/image) it will use Vercel's image
optimization pipeline, allowing your images to be automatically optimized and
cached. When Next.js receives an image request, it checks the unoptimized prop
on the Image component or the configuration in the next.config.ts file to
determine if optimization is disabled.

If you set the unoptimized prop on the Image component to true, Next.js bypasses
optimization and serves the image directly from its source. If you don't set the
unoptimized prop or set it to false, Next.js checks the next.config.ts file to
see if optimization is disabled. This configuration applies to all images and
overrides the individual component prop. If neither the unoptimized prop is set
nor optimization is disabled in the next.config.ts file, Next.js continues with
the optimization process. If optimization is enabled, Vercel validates the
loader configuration (whether using the default or a custom loader) and verifies
that the image source URL matches the allowed patterns defined in your
configuration (remotePatterns or localPatterns).

Vercel then checks the status of the edge cache to see if an image has been
previously cached:

HIT: The image is fetched and served from the cache, either in region or from
the shared global cache. If fetched from the global cache, it's billed as an
image cache read which is reflected in your usage metrics. MISS: The image is
fetched, transformed, cached, and then served to the user. Billed as an image
transformation and image cache write which is reflected in your usage metrics.
STALE: The image is fetched and served from the cache while revalidating in the
background. Billed as an image transformation and image cache write which is
reflected in your usage metrics. When to use Image Optimization Image
Optimization is ideal for:

Responsive layouts where images need to be optimized for different device sizes
(e.g. mobile vs desktop) Large, high-quality images (e.g. product photos, hero
images) User uploaded images Content where images play a central role (e.g.
photography portfolios) In some cases, Image Optimization may not be necessary
or beneficial, such as:

Small icons or thumbnails (under 10 KB) Animated image formats such as GIFs
Vector image formats such as SVG Frequently changing images where caching could
lead to outdated content If your images meet any of the above criteria where
Image Optimization is not beneficial, we recommend using the unoptimized prop on
the Next.js Image component. For guidance on SvelteKit, Astro, or Nuxt, see
their documentation.

It's important that you are only optimizing images that need to be optimized
otherwise you could end up using your image usage quota unnecessarily. For
example, if you have a small icon or thumbnail that is under 10 KB, you should
not use Image Optimization as these images are already very small and optimizing
them further would not provide any benefits.

Setting up remote or local patterns An important aspect of using the Image
component is properly setting up remote/local patterns in your next.config.ts
file. This configuration determines which images are allowed to be optimized.

You can set up patterns for both local images (stored as static assets in your
public folder) and remote images (stored externally). In both cases you specify
the pathname the images are located at.

Local images A local image is imported from your file system and analyzed at
build time. The import is added to the src prop: src={myImage}

Setting up local patterns To set up local patterns, you need to specify the
pathname of the images you want to optimize. This is done in the next.config.ts
file:

next.config.ts

module.exports = { images: { localPatterns: [ { pathname: '/assets/images/**',
search: '', }, ], }, }; See the Next.js documentation for local patterns for
more information.

Local images cache key The cache key for local images is based on the query
string parameters, the Accept HTTP header, and the content hash of the image
URL.

Cache Key: Project ID Query string parameters: q: The quality of the optimized
image, between 1 (lowest quality) and 100 (highest quality). w: The width (in
pixels) of the optimized image. url: The URL of the optimized image is keyed by
content hash e.g. /assets/me.png is converted to
3399d02f49253deb9f5b5d1159292099. Accept HTTP header (normalized). Local image
cache invalidation: Redeploying your app doesn't invalidate the image cache. To
invalidate, replace the image of the same name with different content, then
redeploy. Local image cache expiration: Cached for up to 31 days on the Vercel
Edge Network. Remote images A remote image requires the src property to be a URL
string, which can be relative or absolute.

Setting up remote patterns To set up remote patterns, you need to specify the
hostname of the images you want to optimize. This is done in the next.config.ts
file:

next.config.ts

module.exports = { images: { remotePatterns: [ { protocol: 'https', hostname:
'example.com', port: '', pathname: '/account123/**', search: '', }, ], }, }; In
the case of external images, you should consider adding your account id to the
pathname if you don't own the hostname. For example pathname:
'/account123/v12h2bv/\*\*'. This helps protect your source images from potential
abuse.

See the Next.js documentation for remote patterns for more information.

Remote images cache key The cache key for remote images is based on the query
string parameters, the Accept HTTP header, and the content hash of the image
URL.

Cache Key: Project ID Query string parameters: q: The quality of the optimized
image, between 1 (lowest quality) and 100 (highest quality). w: The width (in
pixels) of the optimized image. url: The URL of the optimized image e.g.
https://example.com/assets/me.png. Accept HTTP header (normalized). Remote image
cache invalidation: Redeploying your app doesn't invalidate the image cache To
invalidate, add a query string to the src property (e.g., ?v=2), then redeploy.
Alternatively, you can configure the cache to expire more frequently. Remote
image cache expiration: TTL is determined by the Cache-Control max-age header
from the upstream image or minimumCacheTTL config (default: 60 seconds),
whichever is larger. If your image content changes frequently, it's best to keep
this TTL short. Once an image is cached, it remains so even if you update the
source image. For remote images, users accessing a URL with a previously cached
image will see the old version until the cache expires or the image is
invalidated. Each time an image is requested, it counts towards your Fast Data
Transfer and Edge Request usage for your billing cycle.

See Pricing for more information, and read more about caching behavior in the
Next.js documentation.

Image Transformation URL format When you use the Image component in common
frameworks and deploy your project on Vercel, Image Optimization automatically
adjusts your images for different device screen sizes. The src prop you provided
in your code is dynamically replaced with an optimized image URL. For example:

Next.js: /\_next/image?url={link/to/src/image}&w=3840&q=75 Nuxt.js, Astro, etc:
/\_vercel/image?url={link/to/src/image}&w=3840&q=75 The Image Optimization API
has the following query parameters:

url: The URL of the source image to be transformed. This can be a local image
(relative url) or remote image (absolute url). w: The width of the transformed
image in pixels. No height is needed since the source image aspect ratio is
preserved. q: The quality of the transformed image, between 1 (lowest quality)
and 100 (highest quality). The allowed values of those query parameters are
determined by the framework you are using, such as next.config.js for Next.js.

If you are not using a framework that comes with an Image component or you are
building your own framework, refer to the Build Output API to see how the build
output from a framework can configure the Image Optimization API.
