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
    syncedAt: '2026-11-03',
    tasks: [
      T('86bcvnm6q','Color Chart: Customer Approval of Color Changes After Proposal Acceptance','needs pm analysis','normal','',['lane: exception'],'triage',1793722343946),
      T('86bcvghfg','Add Public Zapier Trigger: Proposal Sent','ready for dev','normal','',[],'tj',1793660656232),
      T('86bctymnd','Add Missing Canadian Time Zones: British Columbia, Alberta, Manitoba, Saskatchewan, and Newfoundland','needs pm analysis','urgent','',['lane: maintenance'],'triage',1793722354410),
      T('86bctd6k1','Epic: Completed Job Lifecycle','needs pm analysis','normal','Epic',['v2 candidate'],'triage',1793722387194),
      T('86bcqaczq','Add Description Only Option to the Add Multiple Items Modal (Web and Mobile)','pr created','normal','',[],'dev',1793286353212),
      T('86bcp73zk','Proposal Builder: Add Custom Rate Directly Within an Area','needs design','normal','',['lane: gate'],'triage',1793722364315),
      T('86bcnjzgu','Production Rates: Export Configuration for V2 Migration','needs design','high','',['lane: v2 prep'],'triage',1793722379770),
      T('86bckuadk','Add Paint Pro base rates to Production Rates add-on default seed (new adds only)','pr created','normal','',[],'dev',1793383355976),
      T('86bcjdgjn','Zapier Action: Update Job Labor Costs','needs pm analysis','normal','',['lane: exception'],'triage',1793722350618),
      T('86bcgubc7','Brand Settings: Add a Full Logo Upload That Supports Wide Logos','pr created','high','',[],'dev',1793379724818),
      T('86bcffa8f','Color Chart: Show on Customer Proposal (Portal & PDF) + Auto-Fill from Production Rates Products','needs design','normal','',['lane: exception'],'triage',1793722340165),
      T('86bcdt9jh','Business-Aware Customer Name in Internal Notification Emails','needs pm analysis','normal','',['lane: maintenance'],'triage',1793722357561),
      T('86bcaf2hu','Enhancement: Role Departments, Multiple Roles per Member, Roles History, and Account Representative Label (Company Settings and At Risk Accounts)','pr created','normal','',[],'dev',1793047907311),
      T('86bca5551','QuickBooks Unlink Can Be Undone or Create Duplicate Customers, and Sync Status Resets on Save','needs pm analysis','normal','Bug',[],'triage',1792596927913),
      T('86bc33f26','Add Per Package Discount Action for All Packages','qa kickback','normal','',[],'qa',1790874573028),
      T('86bc1vdyn','Business Entity: Contact-to-Job-Address Pairing for Sub-Properties (Property Management Use Case)','needs pm analysis','normal','',['lane: exception'],'triage',1793726053246),
      T('86bbuyf0m','CompanyCam AI Voice Walkthrough: API Discovery & Feasibility Assessment','needs pm analysis','normal','',['investigate','v2 candidate'],'triage',1793722403710),
      T('86bbke1pr','Multiple Concurrent Payment Requests on a Single Invoice','needs design','high','',['v2 candidate'],'triage',1793722390133),
      T('86bbhhhqd','Business Entity Records (V1)','test in progress','high','Epic',[],'qa',1793721512972),
      T('86bbfqr1t','Flashline Integration Evaluation and Path Decision','needs pm analysis','normal','',['v2 candidate'],'triage',1793722406865),
      T('86bbdqm72','Drip Preference Visibility: Lock Disable Drips Toggle for Contact Opt Out, Alert Users on Stage and Sequence Changes (Command Center and Proposal Builder)','needs design','normal','',['lane: gate'],'triage',1793722360785),
      T('86bb0tcpe','CSV Import for Products and Services','needs design','normal','',['lane: gate'],'triage',1793722371994),
      T('86bawv87z','Add MMS (Image Attachment) Support to Drip Text Message Steps','needs pm analysis','normal','',['v2 candidate'],'triage',1793722393219),
      T('86bagb0jj','Multiple Discounts on a Proposal — Stack via Apply Discount Modal','needs pm analysis','normal','',['v2 candidate'],'triage',1793722397059),
      T('86ba1ggxb','Job Costing UI Refresh: Align to DripJobs Design System','qa kickback','normal','',[],'qa',1793708983584),
      T('86b8yhwwx','Tasks Page — UX/UI Overhaul (Consolidated)','needs design','low','',['featurebase','thinktank','v2 candidate'],'triage',1793722400490),
      T('86b8gdanh','Add Thumbtack direct integration','testing complete','normal','',[],'dev',1793391191357),
      T('86b8bmzhr','Expired Payment Card  Banner','pr created','high','',[],'dev',1793286016124),
      T('86b7pb88h','Financeit Consumer Financing Integration (Phase 1A - Low Lift)','needs pm analysis','normal','',['lane: gate'],'triage',1793722367293),
      T('86b5hu44p','Job Costing — Export Job Costing Data to Spreadsheet','ready for dev','normal','',['featurebase'],'qa',1793299250587),
      T('86b4n10f5','Smart Contact Detection & Merging for Duplicate Prevention','needs pm analysis','normal','',['lane: v2 prep'],'v2',1793722383319),
      T('86b32d4gr','Invoice Reminders','in review','normal','',['featurebase','lane: exception'],'triage',1793722336624),
      T('86b0v2qjg','Add “Paid” Indicator for Subcontractors in Job Costing','needs design','normal','',['featurebase','lane: exception'],'triage',1793722347430)
    ]
  };
})();
