"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function Disclaimer() {

  window.scrollTo(0, 0);
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Card className="border-pink-800 bg-gradient-to-b from-white to-pink-50 dark:from-pink-950 dark:to-pink-900 shadow-lg">
        <CardHeader className="pb-4 border-b border-pink-200 dark:border-pink-800">
          <CardTitle className="text-3xl font-bold text-pink-950 dark:text-pink-100 text-center">Disclaimer</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 pb-8">
          <div className="space-y-6 text-pink-950 dark:text-pink-100">
            <p className="leading-7">
              The information, statistics and data contained herein is produced, processed, compiled and based on
              various sources from public domain believed to be reliable to the best of our knowledge. These details are
              neither all-inclusive nor guaranteed and are subject to applicable changes without notice.
            </p>

            <Separator className="my-2 bg-pink-200 dark:bg-pink-800" />

            <p className="leading-7">
              These details have been disseminated for reference purpose only and IMM makes no warranties or
              representations whatsoever regarding the quality, content, suitability, completeness, adequacy, accuracy
              or timeliness of such information and data.
            </p>

            <p className="leading-7">
              Readers are further advised to procure information from the official websites of the respective
              Universities / institutes/ Business Schools etc. IMM expressly disclaims all and any liability and
              responsibility to anyone who has read /referred this, or otherwise, in respect of the consequences of
              anything done or omitted to be done by any such person/entity in reliance upon the content of this
              website.
            </p>

            <Separator className="my-2 bg-pink-200 dark:bg-pink-800" />

            <p className="leading-7">
              Your decision to use any information contained herein will be your decision alone, based solely on your
              own evaluation and assessment. Students/ users / Readers are further advised to review and crosscheck the
              details before arriving to any decision.
            </p>

            <p className="leading-7">
              IMM shall not be held liable for any material or non material damage caused by omissions, incorrect or
              incomplete information. We may not be necessarily affiliated in any manner to the Universities
              /institutes/ Business Schools etc. mentioned herein.
            </p>

            <p className="leading-7">
              It is also clarified that the Universities /institutes/ Business Schools etc mentioned herein have not
              contributed to the preparation of this web content.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

