
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileTextIcon, ShieldCheckIcon } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
              <FileTextIcon className="mx-auto h-16 w-16 text-primary mb-4" />
              <h1 className="text-4xl font-headline font-bold text-foreground mb-3">Terms and Conditions</h1>
              <p className="text-lg text-muted-foreground">
                  Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center">
                    <ShieldCheckIcon className="h-6 w-6 mr-2 text-primary"/>
                    Welcome to Techversity!
                </CardTitle>
                <CardDescription>
                    Please read these terms and conditions carefully before using Our Service.
                </CardDescription>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none space-y-6">
                <section>
                    <h2 className="text-xl font-semibold">1. Introduction</h2>
                    <p>
                        These Terms and Conditions (&quot;Terms&quot;, &quot;Terms and Conditions&quot;) govern your relationship with
                        Techversity website (the &quot;Service&quot;) operated by Techversity Inc. (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;).
                        Your access to and use of the Service is conditioned on your acceptance of and compliance with these
                        Terms. These Terms apply to all visitors, users, and others who access or use the Service.
                    </p>
                    <p>
                        By accessing or using the Service you agree to be bound by these Terms. If you disagree
                        with any part of the terms then you may not access the Service.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold">2. Accounts</h2>
                    <p>
                        When you create an account with us, you must provide us information that is accurate, complete,
                        and current at all times. Failure to do so constitutes a breach of the Terms, which may result
                        in immediate termination of your account on our Service.
                    </p>
                    <p>
                        You are responsible for safeguarding the password that you use to access the Service and for
                        any activities or actions under your password, whether your password is with our Service or
                        a third-party service.
                    </p>
                    <p>
                        You agree not to disclose your password to any third party. You must notify us immediately
                        upon becoming aware of any breach of security or unauthorized use of your account.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold">3. Intellectual Property</h2>
                    <p>
                        The Service and its original content (excluding Content provided by users), features and
                        functionality are and will remain the exclusive property of Techversity Inc. and its
                        licensors. The Service is protected by copyright, trademark, and other laws of both the
                        United States and foreign countries. Our trademarks and trade dress may not be used in
                        connection with any product or service without the prior written consent of Techversity Inc.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold">4. User Content</h2>
                    <p>
                        Our Service allows you to post, link, store, share and otherwise make available certain
                        information, text, graphics, videos, or other material (&quot;Content&quot;). You are responsible for
                        the Content that you post to the Service, including its legality, reliability, and
                        appropriateness.
                    </p>
                    <p>
                        By posting Content to the Service, you grant us the right and license to use, modify,
                        publicly perform, publicly display, reproduce, and distribute such Content on and through
                        the Service. You retain any and all of your rights to any Content you submit, post or
                        display on or through the Service and you are responsible for protecting those rights.
                    </p>
                </section>

                 <section>
                    <h2 className="text-xl font-semibold">5. Termination</h2>
                    <p>
                        We may terminate or suspend your account immediately, without prior notice or liability, for
                        any reason whatsoever, including without limitation if you breach the Terms.
                    </p>
                    <p>
                        Upon termination, your right to use the Service will immediately cease. If you wish to
                        terminate your account, you may simply discontinue using the Service.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold">6. Limitation Of Liability</h2>
                    <p>
                        In no event shall Techversity Inc., nor its directors, employees, partners, agents,
                        suppliers, or affiliates, be liable for any indirect, incidental, special, consequential
                        or punitive damages, including without limitation, loss of profits, data, use, goodwill,
                        or other intangible losses, resulting from (i) your access to or use of or inability to
                        access or use the Service; (ii) any conduct or content of any third party on the Service;
                        (iii) any content obtained from the Service; and (iv) unauthorized access, use or
                        alteration of your transmissions or content, whether based on warranty, contract, tort
                        (including negligence) or any other legal theory, whether or not we have been informed
                        of the possibility of such damage, and even if a remedy set forth herein is found to
                        have failed of its essential purpose.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold">7. Changes To Terms</h2>
                    <p>
                        We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
                        If a revision is material we will try to provide at least 30 days notice prior to any new
                        terms taking effect. What constitutes a material change will be determined at our sole
                        discretion.
                    </p>
                    <p>
                        By continuing to access or use our Service after those revisions become effective, you agree
                        to be bound by the revised terms. If you do not agree to the new terms, please stop using
                        the Service.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold">8. Contact Us</h2>
                    <p>
                        If you have any questions about these Terms, please contact us at support@techversity.example.com.
                    </p>
                </section>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
