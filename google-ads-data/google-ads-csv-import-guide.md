## Import a CSV file in Google Ads Editor

# Prepare a CSV file

[Next: CSV file columns](https://support.google.com/google-ads/editor/answer/57747?hl=en-GB&ref_topic=2986631)

Importing a [CSV file](https://support.google.com/google-ads/answer/9004364) enables you to add or change many items in your Google Ads account at once. To help ensure a successful import, review the formatting guidelines below.

## 1\. List each item on its own row.

Each row in your CSV file must describe a single entity, such as a campaign, a targeted location or an ad. In the following example, the first row is the header, the next two lines are keywords and the last two lines are ad text.

`Campaign, Ad Group, Keyword, Headline, ...   My campaign, My ad group, keyword 1   My campaign, My ad group, keyword 2   My campaign, My ad group, [blank], headline 1, ...   My campaign, My ad group, [blank], headline 2, ...`

If you need to make only minor changes or additions to the account, you might choose to [export a CSV file](https://support.google.com/adwords/editor/answer/38657) from Google Ads Editor, edit it, then import it back into Google Ads Editor.

**Note:**

-   If under your settings or preferences you chose to include the original columns in CSV/ZIP exports, you may see two columns for some fields – one named #Original that holds the original values, and a second column that can be used to make any edits in CSV. [Learn more about making edits with CSV columns](https://support.google.com/google-ads/editor/answer/57747)
-   Ad assets can be added at the account level, as well as at the campaign and ad group levels. You can create an account-level asset association in your CSV import by entering `<Account-level>` instead of the campaign name in the 'Campaign' column. It's important to distinguish account-level assets from shared assets, which have all the same fields but leave 'Campaign' and 'Ad group' columns blank.

## 2\. Include a column header row.

Google Ads Editor treats the first row in an imported CSV file as a column header row. Choose one of the following options for your CSV column header row:

-   Option 1 (recommended): Include standard Google Ads Editor column headers. In the next article in this guide, you'll see a [list of CSV columns.](https://support.google.com/adwords/editor/answer/57747)
-   Option 2: Use your own column headers, or leave the first row blank. You'll have an opportunity to select or modify the column headers when you import the CSV file.

## 3\. Check formatting within columns.

Some columns require certain formatting. For example, specific language codes indicate language targeting. In the next article in this guide, you'll see a [list of CSV columns](https://support.google.com/google-ads/editor/answer/57747), including special instructions for column formatting.

If a single cell in a column has multiple values, separate the values with semicolons, such as `en;de` for English and German language targeting, or `gender;age` for flexible reach.

If you import a new campaign via CSV import, and the settings aren't readable, Google Ads Editor uses the [default campaign settings](https://support.google.com/google-ads/editor/answer/79784).

## 4\. Check the file format and encoding

Make sure that you save your file in CSV format.

Google Ads Editor doesn't import XLS files. If you create or edit your file in Excel, we recommend saving the file with Unicode Text encoding.

-   Windows: Select **Save As > Save as type > Unicode Text**.
-   Mac: Select **Save As > Format > UTF-16 Unicode Text**. (You might see the file extension change from .csv to .txt, but Google Ads Editor can still import the file.)

'''

## Import a CSV file in Google Ads Editor

# CSV file columns

[](https://support.google.com/google-ads/editor/answer/56368?hl=en-GB&ref_topic=2986631)[Next: Import a CSV file](https://support.google.com/google-ads/editor/answer/30564?hl=en-GB&ref_topic=2986631)

This article describes the [CSV file columns](https://support.google.com/google-ads/editor/answer/57747?hl=en-GB&ref_topic=2986631&sjid=14675240299433127615-EU#CSVcolumns) used when making changes with CSV files, and how to [retain version history when making edits](https://support.google.com/google-ads/editor/answer/57747?hl=en-GB&ref_topic=2986631&sjid=14675240299433127615-EU#CSVimportedits).

In order for Google Ads Editor to recognise CSV columns automatically, the headers must be in English. However, capitalisation and spaces don't matter. For example, `daily budget` is the same as `dailybudget`, `daily_budget`, `DAILY BUDGET`, etc.

Leaving a field blank indicates that Google Ads Editor shouldn't make any changes for that item. Entering a pair of square brackets `[]` indicates that Google Ads Editor should erase any values that already exist for that item.

## CSV columns

The table below lists frequently used CSV column headers. Additional columns are required for certain items, like [dynamic ad targets](https://support.google.com/google-ads/editor/answer/65470).

Column header  
(and alternate headers)

Notes

Campaign  
Campaign name

 

Campaign type

Include one of the following values in the 'Campaign type' column: `Search, Search – Mobile app installs, Display, Display – Smart, Display – Mobile app installs, Display – Gmail, Shopping, Video, Video – Bumper ad, Video – Drive conversions, Video – Outstream, Universal app.`

**Note:** Starting in July 2018, campaign names were modified for Search campaigns that included Display. For Search campaigns, you may see 'Search' as the campaign type with the associated 'Networks' field possibly including 'Search Partners' or 'Display Network', depending on the options that you choose.  
  
If 'Campaign type' isn't specified, 'Networks' will be used to determine the campaign type.

Campaign daily budget  
Daily budget  
Campaign budget  
Budget

The value must be greater than zero.

Language targeting  
Language  
Languages

On the campaign row, enter one or more [language codes](https://developers.google.com/adwords/api/docs/appendix/codes-formats#languages), separated by semicolons.

Location ID  
ID  
Geo ID  
Geo target ID

Enter each location on its own row. In the [location targeting instructions](https://support.google.com/google-ads/editor/answer/33114), refer to the 'Import locations in a CSV file' section.

Location  
Geo targeting

Enter each location on its own row. In the [location targeting instructions](https://support.google.com/google-ads/editor/answer/33114), refer to the 'Import locations in a CSV file' section.

Bid adjustment  
Bid modifier

This column can include a mobile bid modifier (if on the campaign or ad group row) or a bid modifier (if on a location, placement or audience row).

Ad schedule  
Ad schedules  
Ad schedule intervals

Enter a campaign schedule on a campaign row, or enter a sitelink schedule on a sitelink row. For formatting guidelines, see the [ad scheduling instructions](https://support.google.com/google-ads/editor/answer/57750).

Networks

'Networks' is used to determine whether your campaign will appear on Google Search or also on Search Partners. Enter one or more of the following, separated by a semi-colon: `Google Search; Search Partners; Search; Display; or Select`. Search and Search Partners campaign types include Google Search.

For video campaigns, you can enter one or more of the following: `YouTube Search; YouTube Videos or Video Partners.`

Using the value 'Search' will enable both Google Search and Search Partners. If 'Campaign type' isn’t specified, 'Networks' will be used to determine the campaign type. 

Search and Search Partners campaign types include Google Search.

 [Learn more](https://support.google.com/google-ads/editor/answer/48538)

Ad group  
Ad group name

 

Max CPC

 

Display Network max CPC  
Max content CPC  
Display max cpc  
Display network cpc

 

Max CPM

 

CPA bid

 

Flexible reach

On an ad group row, enter one or more of the following [Flexible reach](https://support.google.com/google-ads/editor/answer/48539) options, separated by semicolons, to specify them as 'Observation' for the ad group: `Placements; Topics; Audiences; Genders; Ages; Parental status; Household income`. For example, enter `Placements` to set placements as 'Observation' for the ad group. To modify an existing ad group to use 'Targeting' for all five types, enter `[]` (a pair of square brackets) in this column. [Learn more about Display Network targeting](https://support.google.com/google-ads/answer/2404191)

Display Network custom bid type  
Display Network bid type

You can enter any of the following [Display Network custom bid types](https://support.google.com/google-ads/editor/answer/48539) on the ad group row: `Keywords, Placements, Topics, Audiences, Gender, Age, Parental status, Household income, None`.  
 

Max CPC multiplier  
Max CPC bid multiplier  
Default max CPC multiplier  
Default max CPC bid multiplier

You can enter a maximum CPC multiplier for keywords or ad groups in [campaign experiments](https://support.google.com/google-ads/editor/answer/1399246).

Display Network max CPC multiplier  
Display network max CPC bid multiplier  
Max content CPC multiplier  
Max content CPC bid multiplier

You can enter a Display Network maximum CPC multiplier for ad groups in [campaign experiments](https://support.google.com/google-ads/editor/answer/1399246).

Max CPM multiplier  
Max CPM bid multiplier

You can enter a maximum CPM multiplier for ad groups in [campaign experiments](https://support.google.com/google-ads/editor/answer/1399246).

Keyword  
Keyword text

 

Placement  
Website URL  
Website

Enter a [placement](https://support.google.com/google-ads/editor/answer/59109) or [topic](https://support.google.com/google-ads/editor/answer/30517).

Type  
Criterion type  
Keyword type  
Match type  
Location type

This column can contain various values, depending on the row:

-   Enter a keyword match type, such as `Broad` (keyword rows only).
-   Enter `Negative` to indicate a negative item, such as a negative keyword or excluded location (keyword, placement, audience, dynamic ad target, gender, age or location rows).
-   Enter `Campaign negative` to specify a campaign-level negative (keyword, placement, gender, age or audience rows).

Bid strategy type  
Bidding strategy type  
Bidding type

For campaign rows, enter the bid strategy type. For Display campaigns, another campaign-level option is `Manual CPM`. [Learn more](https://support.google.com/google-ads/editor/answer/94241)

Bid strategy  
Bid strategy name  
Bidding strategy name  
Bidding strategy  
Bidding name

For campaign rows using account-specific portfolio bid strategies, enter the name of the bid strategy. For standard bid strategies, this column should be blank. Portfolio bid strategies are case sensitive. For example, if your Google Ads shared library includes a bid strategy called 'My Bid Strategy', Google Ads Editor doesn't recognise 'my bid strategy' as the same strategy. [Learn more](https://support.google.com/google-ads/editor/answer/94241)

Headline

 

Headline 1  
Headline 2

These columns are used for expanded text ads. Each headline can have up to 30 characters. 

Short headline  
Long headline

These columns are used for responsive ads.

Description line 1  
Description  
Description 1  
Ad text line 1  
Desc line 1

 

Description line 2  
Description 2  
Ad text line 2  
Desc line 2

 

Image  
Image file name  
Business image

 

Ad name

 

Display URL  
Visible URL

 

Final URL  
Final URLs

Enter final URLs, separated by spaces. (Note: If you're updating a destination URL to a final URL, enter a pair of square brackets `[]` in a 'Destination URL' column, which will remove the destination URL, and enter the new final URL in the 'Final URL' column.)

Final mobile URL  
Final mobile URLs

Enter final mobile URLs, separated by spaces.

Tracking template  
Tracking URL

Enter a single URL template.

Path 1  
Path 2

These columns are used for expanded text ads. The text that you put in the fields should describe the product or service described in the ad in more detail. Paths are optional, and they support up to 15 characters each.

Custom parameter  
Custom parameters

Format parameters in the following way (separated by spaces): `{_param1}=value1 {_param2}=value2 {_param3}=value3`

**Note:** Up to 8 parameters are supported.

Device preference

Enter `All` or `Mobile` on the same row as a sitelink or an ad (text, image, dynamic search or display).

Start date

Enter a date in the format `YYYY-MM-DD` on a campaign row or a sitelink row. For campaigns only, the start date must be the current date or a future date (not a past date). The start date can't be changed for a campaign that has already started running. Enter empty brackets `[]` to specify no start date (for sitelinks) or today as the start date (for campaigns).

End date

Enter a future date in the format `YYYY-MM-DD` on a campaign row or a sitelink row, or enter empty brackets `[]` to specify no end date. The end date for a campaign or sitelink must be the same as or later than the start date.

Campaign status

Enter `Enabled, Paused` or `Removed`. For new campaigns only, enter a status of Scratchpad to indicate a draft campaign.

Ad group status

Enter `Enabled, Paused` or `Removed`.  
  
In a campaign running an [experiment](https://support.google.com/google-ads/editor/answer/1399246), ad group status can also be `Control only, Experiment only, Control and experiment`, or `Experiment and control`.

Status

Enter `Enabled, Paused` or `Removed`. Use this column to change the status of keywords, placements, ads, etc. (Note that it isn't possible to pause negative items, such as negative keywords. Entering a status of `Paused` for a negative item has no effect.)  
  
In a campaign running an [experiment](https://support.google.com/google-ads/editor/answer/1399246), you can enter the following values for keywords and ads: `Control only, Experiment only, Control and experiment, Experiment and control`.

Comment

 

Audience  
Audience name  
Full interest category

[Learn more about audience targeting](https://support.google.com/google-ads/editor/answer/1052569)

Gender

Enter `Male, Female` or `Unknown`. [Learn more about gender targeting](https://support.google.com/google-ads/editor/71813)

Age

Enter one of the following age ranges: `18–24, 25–34, 35–44, 45–54, 55–64, 65 or older or Unknown`. [Learn more about age targeting](https://support.google.com/google-ads/editor/answer/47640)

Markup languages

 

Mobile operator

 

Business name  
Company name

 

Address line 1  
Address  
Address 1

 

Address line 2  
Address 2

 

City

 

State  
Region  
Province  
State/province

 

Postcode

 

Phone number  
Phone  
Ad phone number  
Business phone

 

Country  
Country code  
Country of phone  
Phone country

 

Map icon  
Icon  
Icon name

 

Source  
Asset source

 

Template contents  
Display contents  
Display ad contents  
Contents

 

Sitelink text  
Sitelink  
Link text (upgraded)  
Upgraded link text

[Learn how to import sitelinks](https://support.google.com/google-ads/editor/answer/56366)

Platform targeting

On a sitelink row, enter `Mobile, Desktop` or `All`. All sitelinks in a campaign or ad group must have the same platform targeting.

Display ad contents  
Display contents  
Contents

 

Promotion

 

Product group

 

Product group type

 

App ID/Package name

Enter the Package Name (Android) or App ID (iOS) for your mobile app install ad.

Account ID

 

Labels

 

Accent colour

 

Ad formats

 

Ad Group

 

Ad Group Status

 

Ad Group Type

 

Ad Name

 

Ad rotation

 

Ad Schedule

 

Ad text idea 1

 

Ad text idea 2

 

Ad text idea 3

 

Ad text idea 4

 

Address Line 1

 

Address Line 2

 

Advertiser

 

Age

 

Allow flexible colour

 

App store

 

Association rule

 

Audience

 

Bid Modifier

 

Bid Strategy Name   
Bidding strategy name  
Bidding strategy

 

Bid Strategy Type   
Bidding strategy type   
Bidding type  
 

 

Budget   
Campaign budget   
Campaign Daily Budget  
Daily budget  
 

 

Budget period

 

Bumper ad

 

Business Name

 

Company name

 

Business name filter

 

Call reporting

 

Call to action

Call-to-action text

 

Call to action 1

 

Call to action 2 

 

Call to action 3    

 

Call to action 4    

 

Call to action 5    

 

Call to action 6    

 

Call to action 7    

 

Call to action 8    

 

Call to action 9    

 

Call to action 10    

 

Call to action 11

 

Call to action 12  

 

Call to action 13  

 

Call to action 14  

 

Call to action 15  

 

Callout text

 

Campaign

Campaign name

 

Campaign optimisation

 

Campaign Priority

Shopping priority

 

Campaign type

 

Channel ID

Channel

YouTube channel ID

 

Channel Name

Channel

YouTube channel name

 

City

 

Collapsed header

 

Colour

 

Comment

 

Companion banner

Image

Image file name

 

Content

 

Content keywords

 

Country code

 

Country of phone

Country

 

Country of Sale

 

Country of Sale

Country

 

Criterion Type

Type

Match type

Keyword Type

 

CTA 1 background

 

CTA 1 button URL

 

CTA 1 mobile URL

 

CTA 1 text colour

 

CTA 2 background

 

CTA 2 button URL

 

CTA 2 mobile URL

 

CTA 2 text colour

 

CTA 3 background

 

CTA 3 button URL

 

CTA 3 mobile URL

 

CTA 3 text colour

 

CTA 4 background

 

CTA 4 button URL

 

CTA 4 mobile URL

 

CTA 4 text colour

 

CTA 5 background

 

CTA 5 button URL

 

CTA 5 mobile URL

 

CTA 5 text colour

 

CTA 6 background

 

CTA 6 button URL

 

CTA 6 mobile URL

 

CTA 6 text colour

 

CTA background

 

CTA button URL

 

CTA text colour

 

Currency

 

Custom parameters

 

\[Custom parameter\]

 

Delivery method

 

Description

 

\[Desc\]

 

Description 1

 

\[Desc1

 

Item 1 description\]

 

Description 1

 

\[Description Line 1

 

Desc line1

 

Ad text line1\]

 

Description 1 position

 

Description 10

 

Description 11

 

Description 12

 

Description 13

 

Description 14

 

Description 15

 

Description 2

 

\[Desc2

 

Item 2 description\]

 

Description 2

 

\[Description Line 2

 

Desc line2

 

Ad text line2\]

 

Description 2 position

 

Description 3

 

\[Description Line 3

 

Desc3

 

Item 3 description

 

Ad text line3\]

 

Description 3 position

 

Description 4

 

Description 4 \[desc4, Item 4 description\]

 

Description 4 \[Description Line 4, desc line4, ad text line4\]

 

Description 4 position

 

Description 5

 

Description 5 \[desc5, Item 5 description\]

 

Description 5 \[Description Line 5, desc line5, ad text line5\]

 

Description 6

 

Description 6 \[desc6, Item 6 description\]

 

Description 7

 

Description 7 \[desc7, Item 7 description\]

 

Description 8

 

Description 8 \[desc8, Item 8 description\]

 

Description 9

 

Description line 1

 

Description Line 1 \[description 1, desc line 1\]

 

Description Line 1 \[description1, desc line1, ad text line1, Description, desc\]

 

Description Line 1 \[description1, desc line1, ad text line1\]

 

Description line 2

 

Description Line 2 \[description 2, desc line 2\]

 

Description Line 2 \[description2, desc line2, ad text line2\]

 

Desktop Bid Modifier

 

Desktop Bid Modifier \[desktop bid adjustment\]

 

Destination URL

 

Destination URL \[dest url, link url\]

 

Device Preference

 

Discount modifier

 

Display Ad Contents

 

Display Network Custom Bid Type

 

Display Network Custom Bid Type \[display network bid type\]

 

Display URL

 

Display URL \[visible url\]

 

DSA Language

 

DSA page feeds

 

DSA targeting source

 

DSA Website

 

DSA Website \[DSA Website Domain, Website Domain\]

 

Dynamic Ad Target Condition 1

 

Dynamic Ad Target Condition 2

 

Dynamic Ad Target Condition 3

 

Dynamic Ad Target Value 1

 

Dynamic Ad Target Value 2

 

Dynamic Ad Target Value 3

 

End Date

 

End Date \[campaign end date\]

 

Enhanced CPC

 

Exclusion method

 

Feed

 

Feed Name

 

Feed Name \[Feed\]

 

Final mobile URL

 

Final mobile URL \[Final mobile URLs, Mobile final URL, Mobile final URLs\]

 

Final mobile URL 1

 

Final mobile URL 1 \[Mobile final URL 1, Item 1 final mobile URL\]

 

Final mobile URL 1 \[Mobile final URL 1\]

 

Final mobile URL 10

 

Final mobile URL 10 \[Mobile final URL 10\]

 

Final mobile URL 11

 

Final mobile URL 11 \[Mobile final URL 11\]

 

Final mobile URL 12

 

Final mobile URL 12 \[Mobile final URL 12\]

 

Final mobile URL 13

 

Final mobile URL 13 \[Mobile final URL 13\]

 

Final mobile URL 14

 

Final mobile URL 14 \[Mobile final URL 14\]

 

Final mobile URL 15

 

Final mobile URL 15 \[Mobile final URL 15\]

 

Final mobile URL 2

 

Final mobile URL 2 \[Mobile final URL 2, Item 2 final mobile URL\]

 

Final mobile URL 2 \[Mobile final URL 2\]

 

Final mobile URL 3

 

Final mobile URL 3 \[Mobile final URL 3, Item 3 final mobile URL\]

 

Final mobile URL 3 \[Mobile final URL 3\]

 

Final mobile URL 4

 

Final mobile URL 4 \[Mobile final URL 4, Item 4 final mobile URL\]

 

Final mobile URL 4 \[Mobile final URL 4\]

 

Final mobile URL 5

 

Final mobile URL 5 \[Mobile final URL 5, Item 5 final mobile URL\]

 

Final mobile URL 5 \[Mobile final URL 5\]

 

Final mobile URL 6

 

Final mobile URL 6 \[Mobile final URL 6, Item 6 final mobile URL\]

 

Final mobile URL 6 \[Mobile final URL 6\]

 

Final mobile URL 7

 

Final mobile URL 7 \[Mobile final URL 7, Item 7 final mobile URL\]

 

Final mobile URL 7 \[Mobile final URL 7\]

 

Final mobile URL 8

 

Final mobile URL 8 \[Mobile final URL 8, Item 8 final mobile URL\]

 

Final mobile URL 8 \[Mobile final URL 8\]

 

Final mobile URL 9

 

Final mobile URL 9 \[Mobile final URL 9\]

 

Final URL

 

Final URL \[Final URLs\]

 

Final URL 1

 

Final URL 1 \[Item 1 final URL\]

 

Final URL 10

 

Final URL 11

 

Final URL 12

 

Final URL 13

 

Final URL 14

 

Final URL 15

 

Final URL 2

 

Final URL 2 \[Item 2 final URL\]

 

Final URL 3

 

Final URL 3 \[Item 3 final URL\]

 

Final URL 4

 

Final URL 4 \[Item 4 final URL\]

 

Final URL 5

 

Final URL 5 \[Item 5 final URL\]

 

Final URL 6

 

Final URL 6 \[Item 6 final URL\]

 

Final URL 7

 

Final URL 7 \[Item 7 final URL\]

 

Final URL 8

 

Final URL 8 \[Item 8 final URL\]

 

Final URL 9

 

Final URL suffix

 

Flexible Reach

 

Gender

 

Gender \[Negative gender\]

 

Header

 

Header 1

 

Header 1 \[Item 1 header\]

 

Header 2

 

Header 2 \[Item 2 header\]

 

Header 3

 

Header 3 \[Item 3 header\]

 

Header 4

 

Header 4 \[Item 4 header\]

 

Header 5

 

Header 5 \[Item 5 header\]

 

Header 6

 

Header 6 \[Item 6 header\]

 

Header 7

 

Header 7 \[Item 7 header\]

 

Header 8

 

Header 8 \[Item 8 header\]

 

Headline

 

Headline 1

 

Headline 1 position

 

Headline 10

 

Headline 10 position

 

Headline 11

 

Headline 11 position

 

Headline 12

 

Headline 12 position

 

Headline 13

 

Headline 13 position

 

Headline 14

 

Headline 14 position

 

Headline 15

 

Headline 15 position

 

Headline 2

 

Headline 2 position

 

Headline 3

 

Headline 3 position

 

Headline 4

 

Headline 4 position

 

Headline 5

 

Headline 5 position

 

Headline 6

 

Headline 6 position

 

Headline 7

 

Headline 7 position

 

Headline 8

 

Headline 8 position

 

Headline 9

 

Headline 9 position

 

Headline text colour

 

Household income

 

ID

 

ID \[Location ID\]

 

Image

 

Image \[image file name, business image\]

 

Image 1

 

Image 10

 

Image 11

 

Image 12

 

Image 13

 

Image 14

 

Image 15

 

Image 2

 

Image 3

 

Image 4

 

Image 5

 

Image 6

 

Image 7

 

Image 8

 

Image 9

 

Image URL

 

Image URL \[youtube video thumbnail url\]

 

InApp conversion actions

 

InApp conversion actions \[InApp conversions\]

 

Inventory filter

 

Inventory type

 

Keyword

 

Keyword \[keyword text\]

 

Label

 

Label \[Label name\]

 

Labels

 

Labels \[Ad group labels\]

 

Labels \[Campaign labels\]

 

Landing page

 

Landscape image

 

Landscape image \[image, image file name\]

 

Landscape logo

 

Language

 

Languages

 

Languages \[language, Language targeting\]

 

Link Text

 

Link Text \[display text, sitelink, sitelink text\]

 

Link Text \[display text\]

 

Local Inventory Ads

 

Location

 

Location category filter

 

Location label filter

 

Logo

 

Logo 1

 

Logo 2

 

Logo 3

 

Logo 4

 

Logo 5

 

Long headline

 

Main colour

 

Marketing image

 

Max CPC

 

Max CPM

 

Max CPV

 

Maximum CPC bid limit

 

Merchant Identifier

 

Merchant Identifier \[Merchant ID, Merchant\]

 

Mobile app category

 

Mobile app category \[Mobile category, Category\]

 

Mobile Bid Modifier

 

Mobile Bid Modifier \[mobile bid adjustment, Bid Modifier, bid adjustment\]

 

Monetary discount

 

Networks

 

Networks \[network targeting\]

 

Occasion

 

Orders over amount

 

Orders over amount \[on orders over\]

 

Package name

 

Parental status

 

Parental status \[Negative parental status\]

 

Path 1

 

Path 2

 

Percent discount

 

Phone Number

 

Phone Number \[business phone, phone\]

 

Platform Targeting

 

Platform Targeting \[platform\]

 

Postcode

 

Price 1

 

Price 1 \[Item 1 price\]

 

Price 2

 

Price 2 \[Item 2 price\]

 

Price 3

 

Price 3 \[Item 3 price\]

 

Price 4

 

Price 4 \[Item 4 price\]

 

Price 5

 

Price 5 \[Item 5 price\]

 

Price 6

 

Price 6 \[Item 6 price\]

 

Price 7

 

Price 7 \[Item 7 price\]

 

Price 8

 

Price 8 \[Item 8 price\]

 

Price prefix

 

Price qualifier

 

Product Group

 

Product Group \[Decision Path\]

 

Product Group Type

 

Product Group Type \[Partition Type\]

 

Promotional code

 

Promotion end

 

Promotion start

 

Promotion target

 

Promotion text

 

Province

 

Province \[State\]

 

PV Name

 

PV Name \[pv, promoted video, promoted video name\]

 

Radius

 

Shopping ad

 

Shopping ad \[Promotion\]

 

Short headline

 

Smart Shopping ad

 

Snippet Values

 

Square image

 

Start Date

 

Start Date \[campaign start date\]

 

Status

 

Status \[creative status, ad status\]

 

Status \[Keyword Status\]

 

Subject

 

Tablet Bid Modifier

 

Tablet Bid Modifier \[tablet bid adjustment\]

 

Target CPA

 

Target CPA \[CPA Bid, max cpa\]

 

Target CPM

 

Target impression share

 

Target ROAS

 

Targeting method

 

Targeting optimisation

 

Teaser description

 

Thumbnail

 

Title 1

 

Title 1 colour

 

Title 2

 

Title 2 colour

 

Title 3

 

Title 3 colour

 

Title 4

 

Title 4 colour

 

Title 5

 

Title 5 colour

 

Title 6

 

Title 6 colour

 

Top Content Bid Modifier

 

Top Content Bid Modifier \[top content bid adjustment\]

 

Topic

 

Tracking template

 

Tracking template \[Tracking url\]

 

Tracking template 1

 

Tracking template 10

 

Tracking template 11

 

Tracking template 12

 

Tracking template 13

 

Tracking template 14

 

Tracking template 15

 

Tracking template 2

 

Tracking template 3

 

Tracking template 4

 

Tracking template 5

 

Tracking template 6

 

Tracking template 7

 

Tracking template 8

 

Tracking template 9

 

TV Screen Bid Modifier

 

TV Screen Bid Modifier \[tv screen bid adjustment\]

 

Type

 

Unit

 

Unit 1

 

Unit 1 \[Item 1 price unit\]

 

Unit 2

 

Unit 2 \[Item 2 price unit\]

 

Unit 3

 

Unit 3 \[Item 3 price unit\]

 

Unit 4

 

Unit 4 \[Item 4 price unit\]

 

Unit 5

 

Unit 5 \[Item 5 price unit\]

 

Unit 6

 

Unit 6 \[Item 6 price unit\]

 

Unit 7

 

Unit 7 \[Item 7 price unit\]

 

Unit 8

 

Unit 8 \[Item 8 price unit\]

 

Universal app image 1

 

Universal app image 10

 

Universal app image 11

 

Universal app image 12

 

Universal app image 13

 

Universal app image 14

 

Universal app image 15

 

Universal app image 16

 

Universal app image 17

 

Universal app image 18

 

Universal app image 19

 

Universal app image 2

 

Universal app image 20

 

Universal app image 3

 

Universal app image 4

 

Universal app image 5

 

Universal app image 6

 

Universal app image 7

 

Universal app image 8

 

Universal app image 9

 

Universal app package name

 

Universal app store

 

Universal app video ID 1

 

Universal app video ID 10

 

Universal app video ID 11

 

Universal app video ID 12

 

Universal app video ID 13

 

Universal app video ID 14

 

Universal app video ID 15

 

Universal app video ID 16

 

Universal app video ID 17

 

Universal app video ID 18

 

Universal app video ID 19

 

Universal app video ID 2

 

Universal app video ID 20

 

Universal app video ID 3

 

Universal app video ID 4

 

Universal app video ID 5

 

Universal app video ID 6

 

Universal app video ID 7

 

Universal app video ID 8

 

Universal app video ID 9

 

Verification URL

 

Video ID

 

Video ID \[video, youtube video id\]

 

Video ID 1

 

Video ID 1 \[video 1, youtube video id 1\]

 

Video ID 2

 

Video ID 2 \[video 2, youtube video id 2\]

 

Video ID 3

 

Video ID 3 \[video 3, youtube video id 3\]

 

Video ID 4

 

Video ID 4 \[video 4, youtube video id 4\]

 

Video ID 5

 

Video ID 5 \[video 5, youtube video id 5\]

 

Video ID 6

 

Video ID 6 \[video 6, youtube video id 6\]

 

Video ID 7

 

Video ID 7 \[video 7, youtube video id 7\]

 

The following read-only columns appear in [CSV export](https://support.google.com/google-ads/editor/answer/38657) files. If you include them in a CSV import file, Google Ads Editor ignores them:

-   First page CPC
-   Top of page CPC
-   Quality Score
-   Suggested changes
-   Approval status
-   Image size
-   All performance statistics columns, such as impressions, clicks and CTR

If any of the following values appear in the 'Status' columns, Google Ads Editor treats them as synonyms for `Enabled`: `Active`, `Inactive`, `Disapproved`, `Normal`, `Pending`, `Ended`.

## Using CSV imports to make edits 

For each imported row, Google Ads Editor automatically decides whether to edit an existing item or create a new one. The decision is based on the set of columns that are best suited for distinguishing items. For example, keywords are distinguished by their campaign, ad group, keyword text and match type. If an item exists with the same values in these identifying columns, then the imported row is processed as an edit.

You can choose which columns should be used to identify an existing item. Under your settings or application preferences, you can choose to 'Include original columns in CSV/ZIP exports'. When you export a CSV file with this setting, you'll see an identifying column named #Original that holds the existing value of a field. The identifying column without the suffix, meanwhile, can be used to apply new values to be processed. The #Original column, and the values that it holds, will be retained as a previous version.

When enabled, CSV exports will automatically generate #Original columns that are populated with the original values last synced from your Google Ads account. Additionally, users can specify an #Original column for any attribute of an item. In each case, the #Original values will be used to decide whether an existing item in the account is a match for the imported row.

If an existing item isn’t found, the item will be created. (**Note:** You’ll have an opportunity to review any changes before posting them). In the absence of any #Original columns, Google Ads Editor will continue to import CSV files as it has in the past.

### Example

An advertiser has multiple campaigns for running gear. She wants to change the wording in her text ad headlines from 'trainers' to 'running shoes' without losing the historical metrics for the ads. Simply importing the rows with the new headlines would create a new set of ads. Instead, she can export the existing ads and create a new column called 'Headline#Original' where she uses the existing headlines, and write new headlines in the 'Headline' column. Those two columns might look something like this:

**Headline#Original**

**Headline**

Jogging shoes  
Long distance trainers  
Children’s trainers

Jogging running shoes  
Long distance running shoes  
Children’s running shoes  
 

Assuming there haven’t been any changes in the other identifying columns, the result will be that the three existing ads under the 'Headline#Original' column will be edited with new headlines in the 'Headline' column. Meanwhile, for ad types that support version history, you can see how your ads in the 'Headline#Original' column performed.

'''

Import a CSV file in Google Ads Editor
Import a CSV file
Once you've prepared your CSV file, follow these steps to import it in Google Ads Editor:

Select Account > Import. (If you have other pending proposed changes, the menu item will be greyed out. Once you accept or reject the other proposals, you can proceed.)
Choose From file ... to select a file, or Paste text to copy and paste CSV data.
Review the column headers. If a header is incorrect, select the correct header from the drop-down menu.
The preview only shows up to 100 rows of your CSV file. If your file has more than 100 rows, then they'll be included in the import even though they don't appear here.
You can have the same header for multiple columns. For example, if you happen to have keywords in two columns, select 'Keyword' as the column header for both columns. Note: Only the first value in any given row will be used.
Click Import. You can still revert the import later, if needed.
Review the list of imported changes. If there are issues with the CSV file, Google Ads Editor displays a list of errors and warnings.
Click Review imported changes.
Changes imported from the CSV file are displayed as proposed changes in your account.
To accept all changes, click Keep proposed changes.
To reject all changes, click Reject proposed changes.
To review and accept or reject individual changes, follow these instructions.
Editing ads?
You can use a CSV import file to apply edits to your ads without having to recreate them. This is especially important for ads that support version history, since you can make changes to the ads while retaining their historical data. 

Choose the column that you'd like to edit, and rename this column with the tag '#Original'. For example, if you wish to make an edit to the headline in one of your ads, mark the column Headline#Original. Then create a new column, without the #Original tag (in this case, simply 'Headline', and write your edits.

The CSV import file allows you to edit your ads without losing any of the historical data associated with them, as would ordinarily happen if a new ad were created.

If you want to change only the URL fields in your ads, first check your URL import settings.