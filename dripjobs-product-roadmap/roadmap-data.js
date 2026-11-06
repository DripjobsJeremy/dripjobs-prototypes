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
    syncedAt: '2026-11-06',
    tasks: [
      T('86bcz692c','QuickBooks Relink: Let Super Admins Link to an Existing QuickBooks Record or Create a New One','needs design','normal','',['lane: maintenance'],'triage',1793986570574),
      T('86bcy12kw','Proposal Tax Rate Displays Two Decimals Instead of Three on Web and Mobile','pr created','high','Bug',[],'dev',1793972903489),
      T('86bcxp94k','Proposal Social Proof Banner: Star Rating Display and Satisfaction Guarantee Control','triage','normal','',['lane: maintenance'],'triage',1793747475731),
      T('86bcvnm6q','Color Chart: Customer Approval of Color Changes After Proposal Acceptance','needs pm analysis','normal','',['lane: exception'],'triage',1793722343946),
      T('86bcvghfg','Add Public Zapier Trigger: Proposal Sent','pr created','normal','',[],'dev',1793915213186),
      T('86bcuz39k','Payment Requests: Mark as Paid Should Close or Reduce the Request Based on the Amount Paid','ready for dev','normal','',['lane: maintenance'],'dev',1793898112766),
      T('86bctymnd','Add Missing Canadian Time Zones: British Columbia, Alberta, Manitoba, Saskatchewan, and Newfoundland','in review','urgent','',['lane: maintenance'],'triage',1793988954408),
      T('86bctd6k1','Epic: Completed Job Lifecycle','needs pm analysis','normal','Epic',['v2 candidate'],'triage',1793722387194),
      T('86bcqaczq','Add Description Only Option to the Add Multiple Items Modal (Web and Mobile)','branch ready','normal','',['release-2026-11-09'],'dev',1793987891717),
      T('86bcp73zk','Proposal Builder: Add Custom Rate Directly Within an Area','needs design','normal','',['lane: gate'],'triage',1793722364315),
      T('86bcnjzgu','Production Rates: Export Configuration for V2 Migration','needs design','high','',['lane: v2 prep'],'triage',1793722379770),
      T('86bckuadk','Add Paint Pro base rates to Production Rates add-on default seed (new adds only)','branch ready','normal','',['release-2026-11-09'],'dev',1793987894191),
      T('86bcjdgjn','Zapier Action: Update Job Labor Costs','needs pm analysis','normal','',['lane: exception'],'triage',1793911876602),
      T('86bcgubc7','Brand Settings: Add a Full Logo Upload That Supports Wide Logos','branch ready','high','',['release-2026-11-09'],'dev',1793987895276),
      T('86bcffa8f','Color Chart: Show on Customer Proposal (Portal & PDF) + Auto-Fill from Production Rates Products','needs design','normal','',['lane: exception'],'triage',1793722340165),
      T('86bcdt9jh','Business-Aware Customer Name in Internal Notification Emails','needs pm analysis','normal','',['lane: maintenance'],'triage',1793722357561),
      T('86bca5551','QuickBooks Unlink Can Be Undone or Create Duplicate Customers, and Sync Status Resets on Save','in progress','normal','Bug',[],'tj',1793998696577),
      T('86bc33f26','Add Per Package Discount Action for All Packages','qa kickback','normal','',[],'qa',1790874573028),
      T('86bc1vdyn','Business Entity: Contact-to-Job-Address Pairing for Sub-Properties (Property Management Use Case)','needs pm analysis','normal','',['lane: exception'],'triage',1793726053246),
      T('86bbuyf0m','CompanyCam AI Voice Walkthrough: API Discovery & Feasibility Assessment','needs pm analysis','normal','',['investigate','v2 candidate'],'triage',1793722403710),
      T('86bbke1pr','Multiple Concurrent Payment Requests on a Single Invoice','needs design','high','',['v2 candidate'],'triage',1793722390133),
      T('86bbhhhqd','Business Entity Records (V1)','pr created','high','Epic',[],'dev',1793911999283),
      T('86bbfqr1t','Flashline Integration Evaluation and Path Decision','needs pm analysis','normal','',['v2 candidate'],'triage',1793722406865),
      T('86bbdqm72','Drip Preference Visibility: Lock Disable Drips Toggle for Contact Opt Out, Alert Users on Stage and Sequence Changes (Command Center and Proposal Builder)','needs design','normal','',['lane: gate'],'triage',1793722360785),
      T('86bb0tcpe','CSV Import for Products and Services','needs design','normal','',['lane: gate'],'triage',1793722371994),
      T('86bawv87z','Add MMS (Image Attachment) Support to Drip Text Message Steps','needs pm analysis','normal','',['v2 candidate'],'triage',1793722393219),
      T('86bav8qzx','Card on File: Save and Charge Homeowner Payment Method for Deposits and Remaining Balances','needs pm analysis','normal','',['lane: v2 prep','partner'],'triage',1793997798113),
      T('86bagb0jj','Multiple Discounts on a Proposal — Stack via Apply Discount Modal','needs pm analysis','normal','',['v2 candidate'],'triage',1793722397059),
      T('86ba1ggxb','Job Costing UI Refresh: Align to DripJobs Design System','pr created','normal','',[],'dev',1793999930745),
      T('86b9bgfd0','Evaluate Stripe Multi-Currency Conversion for DripJobs Connected Accounts','needs pm analysis','normal','',['lane: v2 prep'],'triage',1793907299903),
      T('86b96cf69','Epic: Zapier Integration Enhancement Suite','in review','high','',[],'triage',1793911947733),
      T('86b929zpn','Stripe Auto-Charge → DripJobs Payment Sync','needs pm analysis','normal','',['lane: v2 prep'],'triage',1793905914196),
      T('86b9246bt','EPIC | Stripe Payment Feature Suite','needs pm analysis','normal','Epic',['lane: v2 prep'],'triage',1793990438413),
      T('86b8yhwwx','Tasks Page — UX/UI Overhaul (Consolidated)','needs design','low','',['featurebase','thinktank','v2 candidate'],'triage',1793722400490),
      T('86b8gdanh','Add Thumbtack direct integration','testing complete','normal','',[],'dev',1793391191357),
      T('86b7pb88h','Financeit Consumer Financing Integration (Phase 1A - Low Lift)','needs pm analysis','normal','',['lane: v2 prep'],'triage',1793989612970),
      T('86b6yekvj','Integrate Stripe Check Scan for Remote Check Deposit','needs pm analysis','normal','',['lane: v2 prep'],'triage',1793990457367),
      T('86b6jqjjw','Add Helper Text for Stripe Payment Status Tags on Invoice View','needs pm analysis','normal','',['lane: v2 prep'],'triage',1793905590396),
      T('86b62np7t','Enable Stripe Instant Payouts for Connected Accounts','needs pm analysis','normal','',['lane: v2 prep'],'triage',1793902772314),
      T('86b607f38','Add Stripe Financial Connections Integration','needs pm analysis','normal','',['lane: v2 prep'],'triage',1793907808927),
      T('86b5hu44p','Job Costing — Export Job Costing Data to Spreadsheet','ready for dev','normal','',['featurebase'],'dev',1793921918532),
      T('86b4xwfe0','Integrate Stripe Tap to Pay for iOS and Android Devices','needs pm analysis','normal','',['lane: v2 prep'],'triage',1793990441016),
      T('86b4ucn0t','Stripe ACH Pending Payment Handling & Customer Communication Enhancements','needs pm analysis','normal','',['lane: v2 prep'],'triage',1793903283663),
      T('86b4n10f5','Smart Contact Detection & Merging for Duplicate Prevention','needs pm analysis','normal','',['lane: v2 prep'],'v2',1793722383319),
      T('86b3h976w','Add ACSS Pre-Authorized Debit Payments for CAD Accounts','needs pm analysis','normal','',['lane: v2 prep','featurebase'],'triage',1793902777649),
      T('86b32d4gr','Invoice Reminders','in review','normal','',['featurebase','lane: exception'],'triage',1793722336624),
      T('86b0v2qjg','Add “Paid” Indicator for Subcontractors in Job Costing','needs design','normal','',['featurebase','lane: exception'],'triage',1793722347430)
    ]
  };
})();
