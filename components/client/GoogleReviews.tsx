'use client'

import { ReactGoogleReviews } from 'react-google-reviews'
import 'react-google-reviews/dist/index.css'

export default function GoogleReviews() {
  const featurableWidgetId = 'e22fc7c6-97ba-49d1-8391-7b5f236ffb84'

  return (
    <div className='px-4 md:px-8 mt-6 mb-20'>
      <div className='max-w-6xl mx-auto bg-white/90 p-4 rounded-2xl shadow-md'>
        <ReactGoogleReviews layout='carousel' featurableId={featurableWidgetId} />
      </div>
    </div>
  )
}
