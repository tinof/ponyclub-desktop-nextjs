import PartyTownConfig from "@/components/PartyTownConfig";

export default function PartyTownTestPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Partytown Test Page</h1>

      <div className="space-y-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Partytown Status</h2>
          <p>
            This page tests if Partytown is working correctly with our
            third-party scripts.
          </p>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Test Instructions</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Open browser developer tools (F12)</li>
            <li>Go to the Console tab</li>
            <li>
              Look for messages indicating scripts are running in web workers
            </li>
            <li>Check the Network tab for Partytown-related requests</li>
            <li>
              Verify that main thread is not blocked by third-party scripts
            </li>
          </ol>
        </div>

        <div className="p-4 bg-yellow-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Expected Behavior</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Google Analytics should initialize in a web worker</li>
            <li>Bokun widgets should load in a web worker</li>
            <li>
              Console should show "[GA] Google Analytics initialized in web
              worker"
            </li>
            <li>No blocking of main thread during script execution</li>
          </ul>
        </div>
      </div>

      {/* Include Partytown config for this test page */}
      <PartyTownConfig />

      {/* Test script to verify Partytown is working */}
      <script
        type="text/partytown"
        dangerouslySetInnerHTML={{
          __html: `
            console.log('[Partytown Test] This script is running in a web worker!');
            console.log('[Partytown Test] Worker context:', typeof importScripts !== 'undefined' ? 'Web Worker' : 'Main Thread');
          `,
        }}
      />
    </div>
  );
}
