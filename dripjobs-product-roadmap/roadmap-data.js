/*
 * Roadmap data: every ClickUp task tagged 🎯 (open tasks, any list), read only.
 * Refreshed by a Claude session on request ("Refresh roadmap"), see CLAUDE.md.
 *
 * Fields per task:
 *   id        ClickUp task id (builds the link and the Product Signals lookup, never shown on the board)
 *   name      task title
 *   status    ClickUp status, lowercase
 *   priority  urgent | high | normal | low | '' (none)
 *   type      ClickUp task type: Bug | Epic | ... | '' (none)
 *   tags      all tags except 🎯, lowercase
 *   list      list the task sits in
 *   space     space that list belongs to (looked up by id at refresh, matched by name in RM_CONFIG)
 *   updated   date_updated in ms
 *
 * Space names by list id as of the last sync:
 *   901402649270 Active Triage, 901412659249 DripJobs (v2)  -> DripJobs Product Management
 *   901402649641 Active Development, 901407852471 TJ - Project Management -> DripJobs Development V1
 *   901408821625 QA Development Testing -> QA Space - V1
 */
(function () {
  var PM = 'DripJobs Product Management', DEV = 'DripJobs Development V1', QA = 'QA Space - V1';
  var L = {
    triage: ['Active Triage', PM], v2: ['DripJobs (v2)', PM], dev: ['Active Development', DEV],
    tj: ['TJ - Project Management', DEV], qa: ['QA Development Testing', QA]
  };
  function T(id, name, status, priority, type, tags, list, updated) {
    return { id: id, name: name, status: status, priority: priority, type: type, tags: tags,
             list: L[list][0], space: L[list][1], updated: updated };
  }
  window.RM_DATA = {
    syncedAt: '2026-11-20',
    tasks: [
      T('86bd5np0d','Customer Portal proposal detail: add Proposal Name field to header','needs pm analysis','normal','',['lane: maintenance'],'triage',1795205597005),
      T('86bd5n2vx','Customer Portal proposal detail: STATUS field shows the proposal number instead of the proposal status','ready for dev','normal','Bug',['lane: maintenance'],'tj',1795205642478),
      T('86bd4x9e3','Invoice Tax Changes Don\'t Carry Through: Area Rate Edits Don\'t Recalculate and Tax Overrides Leave Rows Mismatched','needs pm analysis','high','Bug',['lane: maintenance'],'triage',1795023246139),
      T('86bd4e028','Suggest Proposal Tax Rate from Job Address','new','low','',['v2 candidate'],'v2',1795200123395),
      T('86bd3xzzd','Metrics > Reports: report tables have no horizontal scroll, so right-hand columns are cut off','ready for dev','normal','Bug',['lane: maintenance'],'tj',1794840366940),
      T('86bd384r8','The Good Contractors List (TGCL): Partner Guarantee Banner on Proposals via Activation Key','needs design','normal','',['lane: gate'],'triage',1794760090542),
      T('86bd2fc5w','Job Costing: Supplier PO Reference for Matching Supplier Receipts to Jobs','needs pm analysis','normal','',['lane: gate'],'triage',1794505896458),
      T('86bd1e56a','Job Costing: Remember QB Time Job Mapping for Future Time Sheet Entries','needs pm analysis','','',['lane: gate'],'triage',1794606380187),
      T('86bd1dj0y','Bug: Pages Hidden From a Role\'s Menu Still Open by Direct URL (Including Reminders and Invoices)','needs pm analysis','normal','Bug',['lane: maintenance'],'triage',1795195230643),
      T('86bd1b4yw','Bug: Change Method in the Portal Writes "Sent" Instead of the Invoice\'s Real Status','in progress','normal','Bug',['lane: maintenance'],'tj',1795017860246),
      T('86bd18vxh','Smart Invoice Due Dates: Default Payment Terms, Due Date Keyword, Quick-Select Picker, Progressive Portal Banners','needs pm analysis','low','',['v2 candidate'],'v2',1794581735621),
      T('86bd15vcp','Seasonal Pause Resume: Billing Resumes in Chargebee but DripJobs Access Is Not Restored','pr created','urgent','Bug',[],'dev',1795113012720),
      T('86bd136ud','User Unable to Log In: App Hangs on Loading After Reinstall (Reported on Android, User Has 3 Active Accounts Across 3 Companies)','resolved without fix','normal','Bug',[],'tj',1794343409845),
      T('86bcz692c','QuickBooks Relink: Let Super Admins Link to an Existing QuickBooks Record or Create a New One','needs design','normal','',['lane: maintenance'],'triage',1793986570574),
      T('86bcxp94k','Proposal Social Proof Banner: Star Rating Display and Satisfaction Guarantee Control','ready for dev','normal','',['lane: maintenance'],'tj',1795107089491),
      T('86bcwtubp','Add Public Zapier Trigger: Job Scheduled','pr created','normal','',[],'dev',1794945606101),
      T('86bcvnm6q','Color Chart: Customer Approval of Color Changes After Proposal Acceptance','needs pm analysis','normal','',['lane: exception'],'triage',1795098999851),
      T('86bcuz39k','Payment Requests: Mark as Paid Should Close or Reduce the Request Based on the Amount Paid','ready for dev','normal','',['lane: maintenance'],'tj',1794839870260),
      T('86bctymnd','Add Missing Canadian Time Zones: British Columbia, Alberta, Manitoba, Saskatchewan, and Newfoundland','ready for dev','normal','',['lane: maintenance'],'tj',1795107120201),
      T('86bctd6k1','Epic: Completed Job Lifecycle','needs pm analysis','normal','Epic',['v2 candidate'],'v2',1794581735621),
      T('86bcp73zk','Proposal Builder: Add Custom Rate Directly Within an Area','needs design','normal','',['lane: gate'],'triage',1793722364315),
      T('86bcnjzgu','Production Rates: Export Configuration for V2 Migration','needs design','high','',['lane: v2 prep'],'triage',1793722379770),
      T('86bcjdgjn','Zapier Action: Update Job Labor Costs','new','normal','',['lane: gate'],'triage',1794949092687),
      T('86bcffa8f','Color Chart: Show on Customer Proposal (Portal & PDF) + Auto-Fill from Production Rates Products','needs design','normal','',['lane: exception'],'triage',1793722340165),
      T('86bcdt9jh','Business-Aware Customer Name in Internal Notification Emails','needs pm analysis','normal','',['lane: maintenance'],'triage',1795195318411),
      T('86bca5551','QuickBooks Unlink Can Be Undone or Create Duplicate Customers, and Sync Status Resets on Save','in progress','normal','Bug',[],'tj',1794940761838),
      T('86bc33f26','Add Per Package Discount Action for All Packages','qa kickback','normal','',[],'qa',1790874573028),
      T('86bc1vdyn','Business Entity: Contact-to-Job-Address Pairing for Sub-Properties (Property Management Use Case)','needs pm analysis','normal','',['lane: exception'],'triage',1795195318411),
      T('86bbuyf0m','CompanyCam AI Voice Walkthrough: API Discovery & Feasibility Assessment','needs pm analysis','normal','',['v2 candidate','investigate'],'v2',1794581735621),
      T('86bbke1pr','Multiple Concurrent Payment Requests on a Single Invoice','needs design','high','',['v2 candidate'],'v2',1794581735621),
      T('86bbj44md','Automated Follow Up Sequence for Completed Jobs with Unpaid Invoices','new','normal','',['product-signal','lane: gate'],'triage',1794584352817),
      T('86bbfqr1t','Flashline Integration Evaluation and Path Decision','needs pm analysis','normal','',['v2 candidate'],'v2',1794581735621),
      T('86bbdqm72','Drip Preference Visibility: Lock Disable Drips Toggle for Contact Opt Out, Alert Users on Stage and Sequence Changes (Command Center and Proposal Builder)','needs design','normal','',['lane: gate'],'triage',1793722360785),
      T('86bb0tcpe','CSV Import for Products and Services','needs design','normal','',['lane: gate'],'triage',1793722371994),
      T('86bawv87z','Add MMS (Image Attachment) Support to Drip Text Message Steps','needs pm analysis','normal','',['v2 candidate'],'v2',1794581735621),
      T('86bav8qzx','Card on File: Save and Charge Homeowner Payment Method for Deposits and Remaining Balances','needs pm analysis','normal','',['partner','lane: v2 prep'],'triage',1795206265354),
      T('86bak26q5','Text Messages Disabled Banner: Add Complete Setup Button','needs design','normal','',['lane: maintenance'],'triage',1794857455471),
      T('86bagb0jj','Multiple Discounts on a Proposal — Stack via Apply Discount Modal','needs pm analysis','normal','',['v2 candidate'],'v2',1794581735621),
      T('86backa83','Industry Starter Templates — Proposal Templates Page','needs pm analysis','normal','',['v2 candidate'],'triage',1795031707399),
      T('86ba6w17v','Customizable Deposit Label on Proposals','needs pm analysis','normal','',['featurebase','lane: maintenance'],'triage',1795195200922),
      T('86ba1ggxb','Job Costing UI Refresh: Align to DripJobs Design System','branch ready','normal','',['release-2026-11-23'],'dev',1795196216643),
      T('86b9bgfd0','Evaluate Stripe Multi-Currency Conversion for DripJobs Connected Accounts','needs pm analysis','normal','',['lane: v2 prep'],'triage',1793907299903),
      T('86b96cf69','Epic: Zapier Integration Enhancement Suite','in review','high','',[],'triage',1794584243888),
      T('86b929zpn','Stripe Auto-Charge → DripJobs Payment Sync','needs pm analysis','normal','',['lane: v2 prep'],'triage',1793905914196),
      T('86b9246bt','EPIC | Stripe Payment Feature Suite','needs pm analysis','normal','Epic',['evaluated','lane: v2 prep'],'triage',1795202197528),
      T('86b8yhwwx','Tasks Page — UX/UI Overhaul (Consolidated)','needs design','low','',['v2 candidate','featurebase','thinktank'],'v2',1794581735621),
      T('86b8gdanh','Add Thumbtack direct integration','testing complete','normal','',[],'dev',1795197210321),
      T('86b84am3v','Support Shared Custom Email Domains Across Multiple Tenants','in review','normal','',['evaluated','lane: gate'],'triage',1795207274770),
      T('86b848td9','Save & Reuse Packages in Proposal Builder','in review','normal','',['evaluated','lane: gate'],'triage',1795207143060),
      T('86b7pb88h','Financeit Consumer Financing Integration (Phase 1A - Low Lift)','needs pm analysis','normal','',['evaluated','lane: v2 prep'],'triage',1795203131949),
      T('86b6yekvj','Integrate Stripe Check Scan for Remote Check Deposit','needs pm analysis','normal','',['evaluated','lane: v2 prep'],'triage',1795198543398),
      T('86b6jqjjw','Add Helper Text for Stripe Payment Status Tags on Invoice View','needs pm analysis','normal','',['evaluated','lane: v2 prep'],'triage',1795198613407),
      T('86b62np7t','Enable Stripe Instant Payouts for Connected Accounts','needs pm analysis','normal','',['evaluated','lane: v2 prep'],'triage',1795198541903),
      T('86b607f38','Add Stripe Financial Connections Integration','needs pm analysis','normal','',['evaluated','lane: v2 prep'],'triage',1795198614912),
      T('86b5hu44p','Job Costing — Export Job Costing Data to Spreadsheet','pr created','normal','',['featurebase'],'dev',1794848616219),
      T('86b4xwfe0','Integrate Stripe Tap to Pay for iOS and Android Devices','needs pm analysis','normal','',['evaluated','lane: v2 prep'],'triage',1795198540691),
      T('86b4xb6gb','Add Scheduling Prompt to Project Scheduled Stage Confirmation Modal','needs pm analysis','normal','',['lane: maintenance','evaluated','quickwin'],'triage',1795187814902),
      T('86b4ucn0t','Stripe ACH Pending Payment Handling & Customer Communication Enhancements','needs pm analysis','normal','',['evaluated','lane: v2 prep'],'triage',1795198611774),
      T('86b4n10f5','Smart Contact Detection & Merging for Duplicate Prevention','needs pm analysis','normal','',['lane: v2 prep'],'v2',1794516488180),
      T('86b3h976w','Add ACSS Pre-Authorized Debit Payments for CAD Accounts','needs pm analysis','normal','',['evaluated','featurebase','lane: v2 prep'],'triage',1795198556082),
      T('86b32d4gr','Invoice Reminders','in review','normal','',['lane: exception','featurebase'],'triage',1794590263695),
      T('86b0v2qjg','Add “Paid” Indicator for Subcontractors in Job Costing','needs design','normal','',['lane: exception','featurebase'],'triage',1793722347430),
      T('86b07w2z0','UI Refresh: Subcontractor Record (Settings › Subcontractors)','needs design','normal','',['lane: maintenance'],'triage',1794598901158)
    ]
  };
})();
