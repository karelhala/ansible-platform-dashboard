/* eslint-disable max-len */
import { defineMessages } from 'react-intl';

const trialMessages = defineMessages({
  header: {
    id: 'trial.header',
    defaultMessage: 'Try Red Hat Ansible Automation Platform'
  },
  description: {
    id: 'trial.description',
    defaultMessage: 'See how your organization can benefit from scallable automation with a Red Hat® Ansible® Automation platform trial.'
  },
  startButton: {
    id: 'trial.startButton',
    defaultMessage: 'Start your trial'
  },
  adCardHeader: {
    id: 'trial.adCardHeader',
    defaultMessage: 'What you get with this product trial'
  },
  adCardContent: {
    id: 'trial.addCardContent',
    defaultMessage: `<li>A single, 60-day, self-supported subscription to Red Hat® Ansible® Automation Platform for installation on Red Hat Enterprise Linux® (a subscription to Red Hat Enterprise Linux is included with this product trial, if not already installed)</li>
<li>Access to Red Hat's award-winning Customer Portal, including documentation, helpful videos, discussions, and more</li>
<li>A single entitlement to all available versions of this product</li>
<li>Access to Red Hat Insights for Red Hat Ansible Automation Platform</li>
<li>Access to Red Hat Smart Management (included with Red Hat Enterprise Linux)</li>
<li>Access to Red Hat Ansible Automation Platform hosted services on <a>Red Hat Hybrid Cloud Console</a></li>`
  },
  adCardFooter: {
    id: 'trial.adCardFooter',
    defaultMessage: 'This product trial is not intended for production use. By proceeding, you agree to the <a>product trial terms</a>.'
  },
  reqCardHeader: {
    id: 'trial.reqCardHeader',
    defaultMessage: 'Requirements to get started'
  },
  reqCardRHELTitle: {
    id: 'trial.reqCardRHELTitle',
    defaultMessage: 'Install Red Hat Enterprise Linux'
  },
  reqCardRHELContent: {
    id: 'trial.reqCardRHELContent',
    defaultMessage: 'You need to run Red Hat Enterprise Linux as your operating system for this product trial. We’ll provide next steps to download and install once your Ansible Automation Platform trial has been activated.'
  },
  reqCardBreakTitle: {
    id: 'trial.reqCardBreakTitle',
    defaultMessage: 'Start the installation'
  },
  reqCardBreakContent: {
    id: 'trial.reqCardBreakContent',
    defaultMessage: 'You may need to wait up to 30 minutes to access hosted services after the trial subscription is activated.'
  },
  faq1a: {
    id: 'trial.faq1a',
    defaultMessage: 'What is a product trial? How is a Red Hat product trial different from a traditional licensed software trial?'
  },
  faq1b: {
    id: 'trial.faq1b',
    defaultMessage: 'Red Hat® product trials offer all the benefits included in a Red Hat subscription. But Red Hat product trials are more than just access to the latest code. They provide access to all versions of the software, to patches and other software updates, and to our award-winning <a>Red Hat Customer Portal</a>.'
  },
  faq2a: {
    id: 'trial.faq2a',
    defaultMessage: 'May I run product trial software in a production environment?'
  },
  faq2b: {
    id: 'trial.faq2b',
    defaultMessage: 'Product trials are not intended for production environments. Using product trials in a production environment is a violation of the product trial terms and conditions.'
  },
  faq3a: {
    id: 'trial.faq3a',
    defaultMessage: 'Do Red Hat product trials come with support? How do I know if my trial has support?'
  },
  faq3b: {
    id: 'trial.faq3b',
    defaultMessage: `<p>Some product trials offer a level of support while others are self-supported (unsupported). There are several ways to determine the support level of your product trial:</p>
<ul>
<li>In the product trial name (e.g., 60 Day Self Support Red Hat Directory Server Evaluation). You’ll find this in the welcome email you receive when your product trial begins.</li>
<li>On the Subscriptions page in Red Hat Customer Portal.</li>
<li>By contacting Sales or Customer Service.</li>
</ul>
<p>Users with self-supported product trials have access to all <a>product documentation</a> as well as the vast Red Hat <a1>Knowledgebase</a1>.</p>`
  },
  faq4a: {
    id: 'trial.faq4a',
    defaultMessage: 'How do I download my product trial?'
  },
  faq4b: {
    id: 'trial.faq4b',
    defaultMessage: 'Once your product trial subscription is active, we\'ll provide you with a download of the latest version on the "success" page (the page that opens after you click “Start my trial” and is also accessible from the confirmation email you’ll receive) or you can download the software from the Downloads section of Red Hat Customer Portal. However, some trials are accessed in the cloud rather than downloaded. In those instances, we’ll provide instructions to access your trial.'
  },
  faq5a: {
    id: 'trial.faq5a',
    defaultMessage: 'How long does a product trial last?'
  },
  faq5b: {
    id: 'trial.faq5b',
    defaultMessage: 'Most product trials are 60 days, but exceptions may be made at the discretion of Red Hat Sales and Customer Service based on the user’s needs.'
  },
  faq6a: {
    id: 'trial.faq6a',
    defaultMessage: 'What technologies can I try through this program?'
  },
  faq6b: {
    id: 'trial.faq6b',
    defaultMessage: 'Nearly all Red Hat technologies are available for a product trial. You can find a listing of available trials in the <a>Red Hat product trial center</a>. If there is a product you\'d like to try that isn’t listed, please <a1>contact Red Hat Sales</a1>.'
  },
  faq7a: {
    id: 'trial.faq7a',
    defaultMessage: 'Why do I need to consult with a sales representative to obtain certain product trials?'
  },
  faq7b: {
    id: 'trial.faq7b',
    defaultMessage: `<p>There are several possible reasons:</p>
<ol>
<li>You’ve requested more than 1 product trial.</li>
<li>Your product trial is not available via the web.</li>
<li>You’ve requested multiple product trials as part of a bundled SKU.</li>
<li>Your product trial requires additional approvals before being activated.</li>
</ol>
<a>Contact Red Hat Sales</a> to try these technologies.`
  },
  faq8a: {
    id: 'trial.faq8a',
    defaultMessage: 'Can I renew the product trial after it has expired?'
  },
  faq8b: {
    id: 'trial.faq8b',
    defaultMessage: 'There are limits to how many product trials are allowed for each product over a given time period. If you need to extend your product trial or request more trials, please <a>contact Red Hat Sales</a>.'
  },
  faq9a: {
    id: 'trial.faq9a',
    defaultMessage: 'I’d like to use the product trial software after my trial has expired, or I’d like to use the software in a production environment. What are my options?'
  },
  faq9b: {
    id: 'trial.faq9b',
    defaultMessage: `<ul>
<li>Purchase a subscription.</li>
<li>Renew the product trial after the expiry grace period has ended.</li>
<li><a>Contact Red Hat Sales</a> to determine if the product trial can be renewed sooner or if a similar product trial is available.</li>
</ul>`
  },
  faqTitle: {
    id: 'trial.faqTitle',
    defaultMessage: 'Frequently asked questions'
  },
  footerTitle: {
    id: 'trial.footerTitle',
    defaultMessage: 'Product trial terms and conditions'
  },
  footerContent: {
    id: 'trial.footerContent',
    defaultMessage: `<p>Red Hat is providing each Red Hat Product Trial Subscription for evaluation purposes subject to the terms of the Red Hat Enterprise Agreement. If you use the Red Hat Subscription for any purpose other than evaluation, you agree to pay Red Hat the Subscription Fee(s) for each Unit pursuant to the Enterprise Agreement, which is in addition to any and all other remedies available to Red Hat under applicable law.</p>
<p>Examples of situations where you would incur additional fees and be in violation of the Agreement include, but are not limited to:</p>
<ul>
<li>Using the services provided under the trial program for a production installation,</li>
<li>Offering support services to third parties, or</li>
<li>Complementing or supplementing third-party support services with services received through the Red Hat Product Trial Subscription program.</li>
</ul>
<p>By proceeding, you acknowledge that you've read and agree to the terms and conditions of the Red Hat Enterprise Agreement which governs your use.</p>`
  },
  installRHETrial: {
    id: 'trial.installRHETrial',
    defaultMessage: 'You need to run Red Hat Enterprise Linux® as your operating system for this product trial. If you already have it, proceed to the next step. If you don’t, start your download now. This <a1>installation guide</a1> provides step-by-step instructions.'
  },
  startInstallTrial: {
    id: 'trial.startInstallTrial',
    defaultMessage: 'You may need to wait up to 30 minutes to access <a>automation hub</a> services after the trial subscription is activated.'
  }
});

export default trialMessages;
