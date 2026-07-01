import { AppConfig } from './types';

export const DEFAULT_PIN = '3214';

export function getDefaultConfig(): AppConfig {
  return {
    pin: DEFAULT_PIN,
    currentWeek: 38,
    _weekOverride: false,
    brand: {
      name: 'WBI',
      accentIdx: 0,
      logoData: '',
    },
    departments: [
      { id: 'sales', name: 'Sales', desc: 'Sales & Enrollment Operations', order: 0 },
      { id: 'retention', name: 'Retention', desc: 'Customer Retention & Success Operations', order: 1 },
      { id: 'marketing', name: 'Marketing', desc: 'Marketing & Acquisition Operations', order: 2 },
      { id: 'academics', name: 'Academics', desc: 'Academic & Teacher Operations', order: 3 },
      { id: 'support', name: 'Support', desc: 'Customer Support & Operations', order: 4 },
      { id: 'hr', name: 'HR', desc: 'Human Resources & Talent Operations', order: 5 },
      { id: 'channel_sales', name: 'Channel Sales', desc: 'Channel Sales & Partnership Operations', order: 6 },
    ],
    categories: [
      // Sales Categories
      { id: 'c-sum', deptId: 'sales', name: 'Summary', order: 0 },
      { id: 'c-er', deptId: 'sales', name: 'Enrollment & Revenue', order: 1 },
      { id: 'c-pe', deptId: 'sales', name: 'Promo Ended', order: 2 },
      { id: 'c-pcm', deptId: 'sales', name: 'PCM', order: 3 },
      { id: 'c-pb', deptId: 'sales', name: 'Promo Booked', order: 4 },
      { id: 'c-conn', deptId: 'sales', name: 'Calls & Connectivity', order: 5 },

      // Retention Categories
      { id: 'c-sum-ret', deptId: 'retention', name: 'Summary', order: 0 },
      { id: 'c-tc-ret', deptId: 'retention', name: 'Team Capacity', order: 1 },
      { id: 'c-cc-ret', deptId: 'retention', name: 'Customer Coverage', order: 2 },
      { id: 'c-pe-ret', deptId: 'retention', name: 'PCM Engine', order: 3 },
      { id: 'c-ref-ret', deptId: 'retention', name: 'Referrals', order: 4 },
      { id: 'c-ren-ret', deptId: 'retention', name: 'Renewals', order: 5 },
      { id: 'c-pb-ret', deptId: 'retention', name: 'Promo Booked', order: 6 },
      { id: 'c-pe2-ret', deptId: 'retention', name: 'Promo Ended', order: 7 },
      { id: 'c-fs-ret', deptId: 'retention', name: 'Fresh Sales', order: 8 },
      { id: 'c-ss-ret', deptId: 'retention', name: 'Student success & At risk cases', order: 9 },

      // Marketing Categories
      { id: 'c-sum-mkt', deptId: 'marketing', name: 'Summary', order: 0 },
      { id: 'c-org-mkt', deptId: 'marketing', name: 'Organic Marketing Activity', order: 1 },
      { id: 'c-cam-mkt', deptId: 'marketing', name: 'Marketing Campaigns', order: 2 },
      { id: 'c-dev-mkt', deptId: 'marketing', name: 'Device Segmentation', order: 3 },
      { id: 'c-lead-mkt', deptId: 'marketing', name: 'Lead Generation', order: 4 },
      { id: 'c-paid-mkt', deptId: 'marketing', name: 'Lead Generation - Paid Acquisition', order: 5 },
      { id: 'c-nurt-mkt', deptId: 'marketing', name: 'Lead Nurturing', order: 6 },
      { id: 'c-roi-mkt', deptId: 'marketing', name: 'Funnel Health & ROI', order: 7 },
      { id: 'c-psi-mkt', deptId: 'marketing', name: 'Page Speed Insights', order: 8 },

      // Academics Categories
      { id: 'c-sum-acad', deptId: 'academics', name: 'Summary', order: 0 },
      { id: 'c-stud-acad', deptId: 'academics', name: 'Students', order: 1 },
      { id: 'c-teach-acad', deptId: 'academics', name: 'Teachers', order: 2 },
      { id: 'c-classcond-acad', deptId: 'academics', name: 'Classes Conducted', order: 3 },
      { id: 'c-kpi-acad', deptId: 'academics', name: 'KPI', order: 4 },
      { id: 'c-qual-acad', deptId: 'academics', name: 'Quality Score', order: 5 },

      // Support Categories
      { id: 'c-sum-sup', deptId: 'support', name: 'Summary', order: 0 },
      { id: 'c-sm-sup', deptId: 'support', name: 'Schedule Management', order: 1 },
      { id: 'c-esc-sup', deptId: 'support', name: 'Escalation', order: 2 },
      { id: 'c-cd-sup', deptId: 'support', name: 'Cancellation/Disenrollment', order: 3 },
      { id: 'c-ops-sup', deptId: 'support', name: 'Support', order: 4 },

      // HR Categories
      { id: 'c-sum-hr', deptId: 'hr', name: 'Summary', order: 0 },
      { id: 'c-ta-hr', deptId: 'hr', name: 'Talent Acquisition', order: 1 },
      { id: 'c-onb-hr', deptId: 'hr', name: 'Onboarding', order: 2 },
      { id: 'c-ret-hr', deptId: 'hr', name: 'Retention & Attrition', order: 3 },
      { id: 'c-hm-hr', deptId: 'hr', name: 'Headcount Management', order: 4 },
      { id: 'c-fho-hr', deptId: 'hr', name: 'Finance & HR Operations', order: 5 },

      // Channel Sales Categories
      { id: 'c-sum-cs', deptId: 'channel_sales', name: 'Summary', order: 0 },
      { id: 'c-b2b-leads-cs', deptId: 'channel_sales', name: 'B2B Leads', order: 1 },
      { id: 'c-b2b-cold-cs', deptId: 'channel_sales', name: 'B2B- Cold Leads', order: 2 },
      { id: 'c-b2b-campaign-cs', deptId: 'channel_sales', name: 'B2B- Campaign Leads', order: 3 },
      { id: 'c-parent-outreach-cs', deptId: 'channel_sales', name: 'Parent Outreach', order: 4 },
      { id: 'c-parent-journey-cs', deptId: 'channel_sales', name: 'Parent Journey', order: 5 },
      { id: 'c-team-cs', deptId: 'channel_sales', name: 'Team', order: 6 },
      { id: 'c-roi-cs', deptId: 'channel_sales', name: 'ROI', order: 7 },
    ],
    subcategories: [
      // Sales Subcategories
      { id: 's-sum', catId: 'c-sum', name: 'Overview', order: 0 },
      { id: 's-er-fe', catId: 'c-er', name: 'Fresh Enrollment', order: 0 },
      { id: 's-er-rev', catId: 'c-er', name: 'Revenue', order: 1 },
      { id: 's-pe-swc', catId: 'c-pe', name: 'Subject wise conversion %', order: 0 },
      { id: 's-pe-swpe', catId: 'c-pe', name: 'Subject wise Promo Ended', order: 1 },
      { id: 's-pe-pa', catId: 'c-pe', name: 'Promo Attendance%', order: 2 },
      { id: 's-pe-cq', catId: 'c-pe', name: 'Closure Quality', order: 3 },
      { id: 's-pcm-eff', catId: 'c-pcm', name: 'PCM Efficiency', order: 0 },
      { id: 's-pcm-oq', catId: 'c-pcm', name: 'Onboarding Quality', order: 1 },
      { id: 's-pb-swpb', catId: 'c-pb', name: 'Sub Wise Promo Booked', order: 0 },
      { id: 's-pb-eff', catId: 'c-pb', name: 'PB Efficiency', order: 1 },
      { id: 's-pb-pq', catId: 'c-pb', name: 'Prospecting Quality', order: 2 },
      { id: 's-pb-co', catId: 'c-pb', name: 'Closed Opportunities', order: 3 },
      { id: 's-conn-dc', catId: 'c-conn', name: 'Dials & Connects', order: 0 },
      { id: 's-conn-cc', catId: 'c-conn', name: 'Contacts & Connects', order: 1 },
      { id: 's-conn-pbc', catId: 'c-conn', name: 'PB Contact TT >60s', order: 2 },
      { id: 's-conn-nurt', catId: 'c-conn', name: 'Nurturing', order: 3 },

      // Retention Subcategories
      { id: 's-sum-ret', catId: 'c-sum-ret', name: 'Overview', order: 0 },
      // Team Capacity
      { id: 's-tc-ts', catId: 'c-tc-ret', name: 'Team Size', order: 0 },
      { id: 's-tc-ac', catId: 'c-tc-ret', name: 'Average Customers Per SSM', order: 1 },
      { id: 's-tc-pi', catId: 'c-tc-ret', name: 'PI Score', order: 2 },
      // Customer Coverage
      { id: 's-cc-cc', catId: 'c-cc-ret', name: 'Customers covered', order: 0 },
      { id: 's-cc-dl', catId: 'c-cc-ret', name: 'Dials', order: 1 },
      // PCM Engine
      { id: 's-pe-eff', catId: 'c-pe-ret', name: 'PCM Efficiency', order: 0 },
      { id: 's-pe-cr', catId: 'c-pe-ret', name: 'PCM Cancellation Reasons', order: 1 },
      { id: 's-pe-q', catId: 'c-pe-ret', name: 'PCM Quality', order: 2 },
      // Referrals
      { id: 's-ref-eff', catId: 'c-ref-ret', name: 'Referrals Efficiency', order: 0 },
      // Renewals
      { id: 's-ren-rev', catId: 'c-ren-ret', name: 'Renewal Revenue', order: 0 },
      { id: 's-ren-sub', catId: 'c-ren-ret', name: 'Renewal- Subscription', order: 1 },
      // Promo Booked
      { id: 's-pb-sw', catId: 'c-pb-ret', name: 'Sub Wise Promo Booked', order: 0 },
      { id: 's-pb-eff-ret', catId: 'c-pb-ret', name: 'PB Efficiency', order: 1 },
      // Promo Ended
      { id: 's-pe2-swc', catId: 'c-pe2-ret', name: 'Subject wise conversion %', order: 0 },
      { id: 's-pe2-swpe', catId: 'c-pe2-ret', name: 'Subject wise Promo Ended', order: 1 },
      { id: 's-pe2-pa', catId: 'c-pe2-ret', name: 'Promo Attendance%', order: 2 },
      // Fresh Sales
      { id: 's-fs-fe', catId: 'c-fs-ret', name: 'Fresh Enrollment', order: 0 },
      { id: 's-fs-rev', catId: 'c-fs-ret', name: 'Revenue', order: 1 },
      // Student success & At risk cases
      { id: 's-ss-ssm', catId: 'c-ss-ret', name: 'Student Success Metrics', order: 0 },
      { id: 's-ss-bd', catId: 'c-ss-ret', name: 'Bechmark deviation', order: 1 },
      { id: 's-ss-pc', catId: 'c-ss-ret', name: 'Paused cases', order: 2 },
      { id: 's-ss-ref', catId: 'c-ss-ret', name: 'Refunds', order: 3 },
      { id: 's-ss-hs', catId: 'c-ss-ret', name: 'Health Score', order: 4 },

      // Marketing Subcategories
      { id: 's-sum-mkt', catId: 'c-sum-mkt', name: 'Overview', order: 0 },
      // Organic Marketing Activity
      { id: 's-org-blogs', catId: 'c-org-mkt', name: 'Blogs', order: 0 },
      { id: 's-org-insta', catId: 'c-org-mkt', name: 'Instagram', order: 1 },
      { id: 's-org-yt', catId: 'c-org-mkt', name: 'Youtube', order: 2 },
      { id: 's-org-fb', catId: 'c-org-mkt', name: 'Facebook', order: 3 },
      { id: 's-org-li', catId: 'c-org-mkt', name: 'LinkedIn', order: 4 },
      { id: 's-org-wa', catId: 'c-org-mkt', name: 'Whatsapp Community', order: 5 },
      { id: 's-org-nps', catId: 'c-org-mkt', name: 'Non-Paid Source', order: 6 },
      { id: 's-org-dr', catId: 'c-org-mkt', name: 'Domain Rating', order: 7 },
      // Marketing campaigns
      { id: 's-cam-de', catId: 'c-cam-mkt', name: 'Digital Event', order: 0 },
      { id: 's-cam-lm', catId: 'c-cam-mkt', name: 'Lead Magnets', order: 1 },
      { id: 's-cam-web', catId: 'c-cam-mkt', name: 'Webinars', order: 2 },
      // Device Segmentation
      { id: 's-dev-desktop', catId: 'c-dev-mkt', name: 'Device Type- Desktop', order: 0 },
      { id: 's-dev-mobile', catId: 'c-dev-mkt', name: 'Device Type- Mobile', order: 1 },
      // Lead Generation
      { id: 's-lead-stage', catId: 'c-lead-mkt', name: 'Total Leads & Lead stage', order: 0 },
      { id: 's-lead-nps', catId: 'c-lead-mkt', name: 'Lead Gen- Non paid sources', order: 1 },
      // Lead Generation- Paid Acquisition
      { id: 's-paid-google', catId: 'c-paid-mkt', name: 'Lead Gen- Google', order: 0 },
      { id: 's-paid-meta', catId: 'c-paid-mkt', name: 'Lead Gen- Meta', order: 1 },
      { id: 's-paid-cpc', catId: 'c-paid-mkt', name: 'Cost Per Click', order: 2 },
      { id: 's-paid-ctr', catId: 'c-paid-mkt', name: 'Click Through Rate', order: 3 },
      { id: 's-paid-cpl', catId: 'c-paid-mkt', name: 'Cost Per Lead', order: 4 },
      { id: 's-paid-spend', catId: 'c-paid-mkt', name: 'AD Spend', order: 5 },
      // Lead Nurturing
      { id: 's-nurt-followup', catId: 'c-nurt-mkt', name: 'Avg time for 1st follow-up(Call', order: 0 },
      { id: 's-nurt-email', catId: 'c-nurt-mkt', name: 'Email Marketing', order: 1 },
      // Funnel Health & ROI
      { id: 's-roi-conversion', catId: 'c-roi-mkt', name: 'Funnel Conversion', order: 0 },
      { id: 's-roi-speed', catId: 'c-roi-mkt', name: 'Funnel Speed', order: 1 },
      { id: 's-roi-performance', catId: 'c-roi-mkt', name: 'ROI', order: 2 },
      // Page Speed Insights
      { id: 's-psi-desktop', catId: 'c-psi-mkt', name: 'Desktop Performance', order: 0 },
      { id: 's-psi-mobile', catId: 'c-psi-mkt', name: 'Mobile Performance', order: 1 },

      // Academics Subcategories
      { id: 's-sum-acad', catId: 'c-sum-acad', name: 'Overview', order: 0 },
      { id: 's-stud-act', catId: 'c-stud-acad', name: 'Active Students', order: 0 },
      { id: 's-stud-nr', catId: 'c-stud-acad', name: 'Non-Renewing Students', order: 1 },
      { id: 's-teach-act', catId: 'c-teach-acad', name: 'Active Teachers', order: 0 },
      { id: 's-teach-train', catId: 'c-teach-acad', name: 'In-Training teachers', order: 1 },
      { id: 's-teach-attr', catId: 'c-teach-acad', name: 'Attrition', order: 2 },
      { id: 's-teach-str', catId: 'c-teach-acad', name: 'Student-Teacher Ratio', order: 3 },
      { id: 's-classcond-cond', catId: 'c-classcond-acad', name: 'Class Conduction', order: 0 },
      { id: 's-classcond-abs', catId: 'c-classcond-acad', name: 'Students Absence', order: 1 },
      { id: 's-classcond-rated', catId: 'c-classcond-acad', name: 'Classes Rated', order: 2 },
      { id: 's-classcond-promorating', catId: 'c-classcond-acad', name: 'Promo students rating', order: 3 },
      { id: 's-classcond-enrolledrating', catId: 'c-classcond-acad', name: 'Enrolled students rating', order: 4 },
      { id: 's-kpi-canc', catId: 'c-kpi-acad', name: 'Class Cancellation', order: 0 },
      { id: 's-kpi-sub', catId: 'c-kpi-acad', name: 'Class Substitution', order: 1 },
      { id: 's-kpi-noshow', catId: 'c-kpi-acad', name: 'Class No Show', order: 2 },
      { id: 's-kpi-catchup', catId: 'c-kpi-acad', name: 'Catchup Class Cancellation', order: 3 },
      { id: 's-kpi-conv', catId: 'c-kpi-acad', name: 'Key Conversion %', order: 4 },
      { id: 's-kpi-ret', catId: 'c-kpi-acad', name: 'Retention %', order: 5 },
      { id: 's-kpi-pi', catId: 'c-kpi-acad', name: 'PI Score', order: 6 },
      { id: 's-qual-promo', catId: 'c-qual-acad', name: 'Promo Class Quality', order: 0 },
      { id: 's-qual-enrolled', catId: 'c-qual-acad', name: 'Enrolled Class Quality', order: 1 },

      // Support Subcategories
      { id: 's-sum-sup', catId: 'c-sum-sup', name: 'Overview', order: 0 },
      { id: 's-sm-occ', catId: 'c-sm-sup', name: 'Occupancy', order: 0 },
      { id: 's-sm-ssb', catId: 'c-sm-sup', name: 'Single Student Batches', order: 1 },
      { id: 's-sm-dsb', catId: 'c-sm-sup', name: 'Dual Student Batches', order: 2 },
      { id: 's-sm-tf', catId: 'c-sm-sup', name: 'Teacher Forecast', order: 3 },
      { id: 's-esc-ext', catId: 'c-esc-sup', name: 'External Escalation', order: 0 },
      { id: 's-esc-int', catId: 'c-esc-sup', name: 'Internal Escalation', order: 1 },
      { id: 's-esc-orm', catId: 'c-esc-sup', name: 'ORM', order: 2 },
      { id: 's-cd-canc', catId: 'c-cd-sup', name: 'Cancellation', order: 0 },
      { id: 's-cd-ref', catId: 'c-cd-sup', name: 'Refunds', order: 1 },
      { id: 's-cd-disp', catId: 'c-cd-sup', name: 'Disputes', order: 2 },
      { id: 's-ops-cust', catId: 'c-ops-sup', name: 'Customer Support', order: 0 },
      { id: 's-ops-teach', catId: 'c-ops-sup', name: 'Teacher Support', order: 1 },
      { id: 's-ops-ssm', catId: 'c-ops-sup', name: 'Sales & SSM Support', order: 2 },

      // HR Subcategories
      { id: 's-sum-hr', catId: 'c-sum-hr', name: 'Overview', order: 0 },
      { id: 's-ta-odp', catId: 'c-ta-hr', name: 'Open Demand Pipeline', order: 0 },
      { id: 's-ta-rsla', catId: 'c-ta-hr', name: 'Recruitment SLA', order: 1 },
      { id: 's-ta-rf', catId: 'c-ta-hr', name: 'Recruitment Funnel', order: 2 },
      { id: 's-ta-se', catId: 'c-ta-hr', name: 'Sourcing Efficiency', order: 3 },
      { id: 's-onb-jp', catId: 'c-onb-hr', name: 'Joining %', order: 0 },
      { id: 's-onb-odp', catId: 'c-onb-hr', name: 'Offer Drop %', order: 1 },
      { id: 's-onb-nhq', catId: 'c-onb-hr', name: 'New Hire Quality', order: 2 },
      { id: 's-ret-att', catId: 'c-ret-hr', name: 'Attrition', order: 0 },
      { id: 's-ret-ret', catId: 'c-ret-hr', name: 'Retention', order: 1 },
      { id: 's-hm-hcb', catId: 'c-hm-hr', name: 'Head Count by Dept', order: 0 },
      { id: 's-hm-wp', catId: 'c-hm-hr', name: 'Workforce Planning', order: 1 },
      { id: 's-fho-pr', catId: 'c-fho-hr', name: 'Payroll', order: 0 },
      { id: 's-fho-er', catId: 'c-fho-hr', name: 'External Resources', order: 1 },

      // Channel Sales Subcategories
      { id: 's-sum-cs', catId: 'c-sum-cs', name: 'Overview', order: 0 },
      // B2B Leads
      { id: 's-b2bleads-contacts', catId: 'c-b2b-leads-cs', name: 'Contacts', order: 0 },
      // B2B- Cold Leads
      { id: 's-coldleads-contacts-connects', catId: 'c-b2b-cold-cs', name: 'Contacts & Connects - Cold Leads', order: 0 },
      { id: 's-coldleads-demo-health', catId: 'c-b2b-cold-cs', name: 'Demo Health - Cold Leads', order: 1 },
      { id: 's-coldleads-partnership', catId: 'c-b2b-cold-cs', name: 'Partnership Health & Productivity - Cold Leads', order: 2 },
      // B2B- Campaign Leads
      { id: 's-campleads-contacts-connects', catId: 'c-b2b-campaign-cs', name: 'Contacts & Connects - Campaign Leads', order: 0 },
      { id: 's-campleads-demo-health', catId: 'c-b2b-campaign-cs', name: 'Demo Health - Campaign Leads', order: 1 },
      { id: 's-campleads-partnership', catId: 'c-b2b-campaign-cs', name: 'Partnership Health & Productivity - Campaign Leads', order: 2 },
      // Parent Outreach
      { id: 's-parentoutreach-b2b', catId: 'c-parent-outreach-cs', name: 'Contacts & Connects - Parent Leads- B2B', order: 0 },
      { id: 's-parentoutreach-gso', catId: 'c-parent-outreach-cs', name: 'Contacts & Connects - Parent Leads- GSO', order: 1 },
      // Parent Journey
      { id: 's-parentjourney-assessment-demo', catId: 'c-parent-journey-cs', name: 'Assessment & Demo', order: 0 },
      { id: 's-parentjourney-gso-outcomes', catId: 'c-parent-journey-cs', name: 'GSO Outcomes', order: 1 },
      // Team
      { id: 's-team-headcount', catId: 'c-team-cs', name: 'Headcount', order: 0 },
      { id: 's-team-productivity', catId: 'c-team-cs', name: 'Productivity', order: 1 },
      // ROI
      { id: 's-roi-acquisition-cost', catId: 'c-roi-cs', name: 'Acquisition Cost', order: 0 },
      { id: 's-roi-revenue-efficiency', catId: 'c-roi-cs', name: 'Revenue Efficiency', order: 1 },
    ],
    metrics: [
      // Sales Overview
      {
        id: 'm-sum',
        subId: 's-sum',
        name: 'Overview',
        order: 0,
        kpi: true,
        sheetName: 'Overview',
        charts: [
          { id: 'ch-sum-1', name: 'Enrollment Trend', col: 'monthly_achievement', kpi: true },
          { id: 'ch-sum-2', name: 'Revenue', col: 'overview_revenue', kpi: true },
          { id: 'ch-sum-3', name: 'Total Promo Ended', col: 'overview_total_promo_ended', kpi: true },
          { id: 'ch-sum-4', name: 'Overall Conversion%', col: 'overview_overall_conversion', kpi: true },
        ],
      },
      // Enrollment & Revenue - Fresh Enrollment
      {
        id: 'm-er-fe',
        subId: 's-er-fe',
        name: 'Fresh Enrollment',
        order: 0,
        kpi: false,
        sheetName: 'Fresh Enrollment',
        charts: [
          { id: 'ch-er-fe-1', name: 'Total Enrollment', col: 'total_enrollment' },
          { id: 'ch-er-fe-2', name: 'Math Enrollments', col: 'math_enrollments' },
          { id: 'ch-er-fe-3', name: 'ELA Enrollments', col: 'ela_enrollments' },
          { id: 'ch-er-fe-4', name: 'Coding Enrollments', col: 'coding_enrollments' },
          { id: 'ch-er-fe-5', name: 'PS Enrollments', col: 'ps_enrollments' },
          { id: 'ch-er-fe-6', name: '12 Weeks Subscription', col: '12_weeks_subscription' },
          { id: 'ch-er-fe-7', name: '24 Weeks Subscription', col: '24_weeks_subscription' },
          { id: 'ch-er-fe-8', name: '48 Weeks Subscription', col: '48_weeks_subscription' },
        ],
      },
      // Enrollment & Revenue - Revenue
      {
        id: 'm-er-rev',
        subId: 's-er-rev',
        name: 'Revenue',
        order: 0,
        kpi: false,
        sheetName: 'Revenue',
        charts: [
          { id: 'ch-er-rev-1', name: 'Total Revenue', col: 'total_revenue' },
          { id: 'ch-er-rev-2', name: 'Math Revenue', col: 'math_revenue' },
          { id: 'ch-er-rev-3', name: 'ELA Revenue', col: 'ela_revenue' },
          { id: 'ch-er-rev-4', name: 'Coding Revenue', col: 'coding_revenue' },
          { id: 'ch-er-rev-5', name: 'PS Revenue', col: 'ps_revenue' },
          { id: 'ch-er-rev-6', name: 'Avg Discount/Enrollment', col: 'avg_discount_enrollment' },
          { id: 'ch-er-rev-7', name: 'Avg Discount/Enrollment - Math', col: 'avg_discount_enrollment_math' },
          { id: 'ch-er-rev-8', name: 'Avg Discount/Enrollment- ELA', col: 'avg_discount_enrollment_ela' },
          { id: 'ch-er-rev-9', name: 'Avg Discount/Enrollment - Coding', col: 'avg_discount_enrollment_coding' },
          { id: 'ch-er-rev-10', name: 'Avg Discount/Enrollment - PS', col: 'avg_discount_enrollment_ps' },
        ],
      },
      // Promo Ended - Subject wise conversion %
      {
        id: 'm-pe-swc',
        subId: 's-pe-swc',
        name: 'Subject wise conversion %',
        order: 0,
        kpi: false,
        sheetName: 'Subject wise conversion %',
        charts: [
          { id: 'ch-pe-swc-1', name: 'Overall Conversion%', col: 'overall_conversion' },
          { id: 'ch-pe-swc-2', name: 'Conversion% - Math', col: 'conversion_math' },
          { id: 'ch-pe-swc-3', name: 'Conversion% - ELA', col: 'conversion_ela' },
          { id: 'ch-pe-swc-4', name: 'Conversion% - Coding', col: 'conversion_coding' },
          { id: 'ch-pe-swc-5', name: 'Conversion% - PS', col: 'conversion_ps' },
        ],
      },
      // Promo Ended - Subject wise Promo Ended
      {
        id: 'm-pe-swpe',
        subId: 's-pe-swpe',
        name: 'Subject wise Promo Ended',
        order: 0,
        kpi: false,
        sheetName: 'Subject wise Promo Ended',
        charts: [
          { id: 'ch-pe-swpe-1', name: 'Total Promos Ended', col: 'total_promos_ended' },
          { id: 'ch-pe-swpe-2', name: 'Promos Ended -Math', col: 'promos_ended_math' },
          { id: 'ch-pe-swpe-3', name: 'Promos Ended -ELA', col: 'promos_ended_ela' },
          { id: 'ch-pe-swpe-4', name: 'Promos Ended -Coding', col: 'promos_ended_coding' },
          { id: 'ch-pe-swpe-5', name: 'Promos Ended -PS', col: 'promos_ended_ps' },
        ],
      },
      // Promo Ended - Promo Attendance%
      {
        id: 'm-pe-pa',
        subId: 's-pe-pa',
        name: 'Promo Attendance%',
        order: 0,
        kpi: false,
        sheetName: 'Promo Attendance%',
        charts: [
          { id: 'ch-pe-pa-1', name: 'Overall Attendance%', col: 'overall_attendance' },
          { id: 'ch-pe-pa-2', name: 'Promo Attendance - Math', col: 'promo_attendance_math' },
          { id: 'ch-pe-pa-3', name: 'Promo Attendance - ELA', col: 'promo_attendance_ela' },
          { id: 'ch-pe-pa-4', name: 'Promo Attendance - Coding', col: 'promo_attendance_coding' },
          { id: 'ch-pe-pa-5', name: 'Promo Attendance - PS', col: 'promo_attendance_ps' },
        ],
      },
      // Promo Ended - Closure Quality
      {
        id: 'm-pe-cq',
        subId: 's-pe-cq',
        name: 'Closure Quality',
        order: 0,
        kpi: false,
        sheetName: 'Closure Quality',
        charts: [
          { id: 'ch-pe-cq-1', name: 'Closure Calls Audited', col: 'closure_calls_audited' },
          { id: 'ch-pe-cq-2', name: 'Closure quality score', col: 'closure_quality_score' },
        ],
      },
      // PCM - PCM Efficiency
      {
        id: 'm-pcm-eff',
        subId: 's-pcm-eff',
        name: 'PCM Efficiency',
        order: 0,
        kpi: false,
        sheetName: 'PCM Efficiency',
        charts: [
          { id: 'ch-pcm-eff-1', name: 'PCM Taken', col: 'pcm_taken' },
          { id: 'ch-pcm-eff-2', name: 'PCM Booked', col: 'pcm_booked' },
          { id: 'ch-pcm-eff-3', name: 'Avg PCM/Seller', col: 'avg_pcm_seller' },
          { id: 'ch-pcm-eff-4', name: 'Avg PCM/Day', col: 'avg_pcm_day' },
        ],
      },
      // PCM - Onboarding Quality
      {
        id: 'm-pcm-oq',
        subId: 's-pcm-oq',
        name: 'Onboarding Quality',
        order: 0,
        kpi: false,
        sheetName: 'Onboarding Quality',
        charts: [
          { id: 'ch-pcm-oq-1', name: 'Onboarding Calls Audited', col: 'onboarding_calls_audited' },
          { id: 'ch-pcm-oq-2', name: 'Onboarding Quality Score', col: 'onboarding_quality_score' },
        ],
      },
      // Promo Booked - Sub Wise Promo Booked
      {
        id: 'm-pb-swpb',
        subId: 's-pb-swpb',
        name: 'Sub Wise Promo Booked',
        order: 0,
        kpi: false,
        sheetName: 'Sub Wise Promo Booked',
        charts: [
          { id: 'ch-pb-swpb-1', name: 'PB Trend', col: 'pb_trend' },
          { id: 'ch-pb-swpb-2', name: 'PB - Math', col: 'pb_math' },
          { id: 'ch-pb-swpb-3', name: 'PB - ELA', col: 'pb_ela' },
          { id: 'ch-pb-swpb-4', name: 'PB - Coding', col: 'pb_coding' },
          { id: 'ch-pb-swpb-5', name: 'PB - PS', col: 'pb_ps' },
        ],
      },
      // Promo Booked - PB Efficiency
      {
        id: 'm-pb-eff',
        subId: 's-pb-eff',
        name: 'PB Efficiency',
        order: 0,
        kpi: false,
        sheetName: 'PB Efficiency',
        charts: [
          { id: 'ch-pb-eff-1', name: 'Avg PB/Seller', col: 'avg_pb_seller' },
          { id: 'ch-pb-eff-2', name: 'Avg PB/Day', col: 'avg_pb_day' },
        ],
      },
      // Promo Booked - Prospecting Quality
      {
        id: 'm-pb-pq',
        subId: 's-pb-pq',
        name: 'Prospecting Quality',
        order: 0,
        kpi: false,
        sheetName: 'Prospecting Quality',
        charts: [
          { id: 'ch-pb-pq-1', name: 'Prospecting Calls audited', col: 'prospecting_calls_audited' },
          { id: 'ch-pb-pq-2', name: 'Prospecting Quality Score', col: 'prospecting_quality_score' },
        ],
      },
      // Promo Booked - Closed Opportunities
      {
        id: 'm-pb-co',
        subId: 's-pb-co',
        name: 'Closed Opportunities',
        order: 0,
        kpi: false,
        sheetName: 'Closed Opportunities',
        charts: [
          { id: 'ch-pb-co-1', name: 'Closed Opportunities', col: 'closed_opportunities' },
        ],
      },
      // Calls & Connectivity - Dials & Connects
      {
        id: 'm-conn-dc',
        subId: 's-conn-dc',
        name: 'Dials & Connects',
        order: 0,
        kpi: false,
        sheetName: 'Dials & Connects',
        charts: [
          { id: 'ch-conn-dc-1', name: 'Avg Dials', col: 'avg_dials' },
          { id: 'ch-conn-dc-2', name: 'Avg Calls >10s', col: 'avg_calls_10s' },
          { id: 'ch-conn-dc-3', name: 'Avg Calls >60s', col: 'avg_calls_60s' },
          { id: 'ch-conn-dc-4', name: 'Total Dials', col: 'total_dials' },
          { id: 'ch-conn-dc-5', name: 'Calls >10 Sec', col: 'calls_10_sec' },
          { id: 'ch-conn-dc-6', name: 'Calls >60 Sec', col: 'calls_60_sec' },
        ],
      },
      // Calls & Connectivity - Contacts & Connects
      {
        id: 'm-conn-cc',
        subId: 's-conn-cc',
        name: 'Contacts & Connects',
        order: 0,
        kpi: false,
        sheetName: 'Contacts & Connects',
        charts: [
          { id: 'ch-conn-cc-1', name: 'Avg Contacts Attempted', col: 'avg_contacts_attempted' },
          { id: 'ch-conn-cc-2', name: 'Avg TT >10s', col: 'avg_tt_10s' },
          { id: 'ch-conn-cc-3', name: 'Avg TT >60s', col: 'avg_tt_60s' },
          { id: 'ch-conn-cc-4', name: 'Total Contacts', col: 'total_contacts' },
          { id: 'ch-conn-cc-5', name: 'Contacts TT >10s', col: 'contacts_tt_10s' },
          { id: 'ch-conn-cc-6', name: 'Contacts TT >60s', col: 'contacts_tt_60s' },
        ],
      },
      // Calls & Connectivity - PB Contact TT >60s
      {
        id: 'm-conn-pbc',
        subId: 's-conn-pbc',
        name: 'PB Contact TT >60s',
        order: 0,
        kpi: false,
        sheetName: 'PB Contact TT >60s',
        charts: [
          { id: 'ch-conn-pbc-1', name: 'PB Contact TT >60s', col: 'pb_contact_tt_60s' },
        ],
      },
      // Calls & Connectivity - Nurturing
      {
        id: 'm-conn-nurt',
        subId: 's-conn-nurt',
        name: 'Nurturing',
        order: 0,
        kpi: false,
        sheetName: 'Nurturing',
        charts: [
          { id: 'ch-conn-nurt-1', name: 'Emails Sent', col: 'emails_sent' },
          { id: 'ch-conn-nurt-2', name: 'Email Nurture Connectivity Rate', col: 'email_nurture_connectivity_rate' },
          { id: 'ch-conn-nurt-3', name: 'SMS Sent', col: 'sms_sent' },
        ],
      },

      // Retention Overview Summary
      {
        id: 'm-sum-ret',
        subId: 's-sum-ret',
        name: 'Overview',
        order: 0,
        kpi: true,
        sheetName: 'Overview',
        charts: [
          { id: 'ch-ret-sum-1', name: 'SSM Head Count', col: 'ssm_head_count', kpi: true },
          { id: 'ch-ret-sum-2', name: 'Average Customers per SSM', col: 'average_customers_per_ssm', kpi: true },
          { id: 'ch-ret-sum-3', name: 'Total customers contacted %', col: 'total_customers_contacted', kpi: true },
          { id: 'ch-ret-sum-4', name: 'Total Revenue', col: 'total_revenue', kpi: true },
        ],
      },
      // Team Size
      {
        id: 'm-tc-ts',
        subId: 's-tc-ts',
        name: 'Team Size',
        order: 0,
        kpi: false,
        sheetName: 'Team Size',
        charts: [
          { id: 'ch-ret-tc-ts-1', name: 'SSM Head Count', col: 'ssm_head_count' },
        ],
      },
      // Average Customers Per SSM
      {
        id: 'm-tc-ac',
        subId: 's-tc-ac',
        name: 'Average Customers Per SSM',
        order: 0,
        kpi: false,
        sheetName: 'Average Customers Per SSM',
        charts: [
          { id: 'ch-ret-tc-ac-1', name: 'Total Active customers with SSM Team', col: 'total_active_customers_with_ssm_team' },
          { id: 'ch-ret-tc-ac-2', name: 'Average Customers per SSM', col: 'average_customers_per_ssm' },
        ],
      },
      // PI Score
      {
        id: 'm-tc-pi',
        subId: 's-tc-pi',
        name: 'PI Score',
        order: 0,
        kpi: false,
        sheetName: 'PI Score',
        charts: [
          { id: 'ch-ret-tc-pi-1', name: 'PI Score', col: 'pi_score' },
        ],
      },
      // Customers covered
      {
        id: 'm-cc-cc',
        subId: 's-cc-cc',
        name: 'Customers covered',
        order: 0,
        kpi: false,
        sheetName: 'Customers covered',
        charts: [
          { id: 'ch-ret-cc-cc-1', name: 'Total customers contacted %', col: 'total_customers_contacted' },
          { id: 'ch-ret-cc-cc-2', name: 'Contacts not covered more than 30 Days', col: 'contacts_not_covered_more_than_30_days' },
          { id: 'ch-ret-cc-cc-3', name: 'Customers contacted via Call', col: 'customers_contacted_via_call' },
          { id: 'ch-ret-cc-cc-4', name: 'Customers contacted via PCM', col: 'customers_contacted_via_pcm' },
        ],
      },
      // Dials
      {
        id: 'm-cc-dl',
        subId: 's-cc-dl',
        name: 'Dials',
        order: 0,
        kpi: false,
        sheetName: 'Dials',
        charts: [
          { id: 'ch-ret-cc-dl-1', name: 'Total Dials', col: 'total_dials' },
          { id: 'ch-ret-cc-dl-2', name: 'Avg Dials/Day', col: 'avg_dials_day' },
          { id: 'ch-ret-cc-dl-3', name: 'Avg dials/SSM', col: 'avg_dials_ssm' },
        ],
      },
      // PCM Efficiency
      {
        id: 'm-pe-eff',
        subId: 's-pe-eff',
        name: 'PCM Efficiency',
        order: 0,
        kpi: false,
        sheetName: 'PCM Efficiency',
        charts: [
          { id: 'ch-ret-pe-eff-1', name: 'PCM Taken', col: 'pcm_taken' },
          { id: 'ch-ret-pe-eff-2', name: 'PCM Booked', col: 'pcm_booked' },
          { id: 'ch-ret-pe-eff-3', name: 'PCM Rescheduled', col: 'pcm_rescheduled' },
          { id: 'ch-ret-pe-eff-4', name: 'Avg PCM/SSM', col: 'avg_pcm_ssm' },
          { id: 'ch-ret-pe-eff-5', name: 'Average PB/ PCM', col: 'average_pb_pcm' },
        ],
      },
      // PCM Cancellation Reasons
      {
        id: 'm-pe-cr',
        subId: 's-pe-cr',
        name: 'PCM Cancellation Reasons',
        order: 0,
        kpi: false,
        sheetName: 'PCM Cancellation Reasons',
        charts: [
          { id: 'ch-ret-pe-cr-1', name: 'Total PCM Cancelled', col: 'total_pcm_cancelled' },
          { id: 'ch-ret-pe-cr-2', name: 'Parent No-show', col: 'parent_no_show' },
          { id: 'ch-ret-pe-cr-3', name: 'SSM-No show', col: 'ssm_no_show' },
          { id: 'ch-ret-pe-cr-4', name: 'Parent Cancelled', col: 'parent_cancelled' },
          { id: 'ch-ret-pe-cr-5', name: 'Other reasons', col: 'other_reasons' },
        ],
      },
      // PCM Quality
      {
        id: 'm-pe-q',
        subId: 's-pe-q',
        name: 'PCM Quality',
        order: 0,
        kpi: false,
        sheetName: 'PCM Quality',
        charts: [
          { id: 'ch-ret-pe-q-1', name: 'PCM Audited', col: 'pcm_audited' },
          { id: 'ch-ret-pe-q-2', name: 'PCM Quality Score', col: 'pcm_quality_score' },
        ],
      },
      // Referrals Efficiency
      {
        id: 'm-ref-eff',
        subId: 's-ref-eff',
        name: 'Referrals Efficiency',
        order: 0,
        kpi: false,
        sheetName: 'Referrals Efficiency',
        charts: [
          { id: 'ch-ret-ref-eff-1', name: 'Advocates created', col: 'advocates_created' },
          { id: 'ch-ret-ref-eff-2', name: 'Referrals received', col: 'referrals_received' },
          { id: 'ch-ret-ref-eff-3', name: 'Referral Enrollments', col: 'referral_enrollments' },
        ],
      },
      // Renewal Revenue
      {
        id: 'm-ren-rev',
        subId: 's-ren-rev',
        name: 'Renewal Revenue',
        order: 0,
        kpi: false,
        sheetName: 'Renewal Revenue',
        charts: [
          { id: 'ch-ret-ren-rev-1', name: 'Renewals Due', col: 'renewals_due' },
          { id: 'ch-ret-ren-rev-2', name: 'Renewals Received', col: 'renewals_received' },
          { id: 'ch-ret-ren-rev-3', name: 'Renewal Revenue Rate%', col: 'renewal_revenue_rate' },
        ],
      },
      // Renewal- Subscription
      {
        id: 'm-ren-sub',
        subId: 's-ren-sub',
        name: 'Renewal- Subscription',
        order: 0,
        kpi: false,
        sheetName: 'Renewal- Subscription',
        charts: [
          { id: 'ch-ret-ren-sub-1', name: 'Subscriptions to be renewed', col: 'subscriptions_to_be_renewed' },
          { id: 'ch-ret-ren-sub-2', name: 'Subscriptions Renewed', col: 'subscriptions_renewed' },
          { id: 'ch-ret-ren-sub-3', name: 'Subscriptions renewal rate %', col: 'subscriptions_renewal_rate' },
          { id: 'ch-ret-ren-sub-4', name: 'Churn rate %', col: 'churn_rate' },
          { id: 'ch-ret-ren-sub-5', name: 'Lost subscription count', col: 'lost_subscription_count' },
          { id: 'ch-ret-ren-sub-6', name: 'Attrition within 120 days', col: 'attrition_within_120_days' },
        ],
      },
      // Sub Wise Promo Booked
      {
        id: 'm-pb-sw',
        subId: 's-pb-sw',
        name: 'Sub Wise Promo Booked',
        order: 0,
        kpi: false,
        sheetName: 'Sub Wise Promo Booked',
        charts: [
          { id: 'ch-ret-pb-sw-1', name: 'PB Trend', col: 'pb_trend' },
          { id: 'ch-ret-pb-sw-2', name: 'PB - Math', col: 'pb_math' },
          { id: 'ch-ret-pb-sw-3', name: 'PB - ELA', col: 'pb_ela' },
          { id: 'ch-ret-pb-sw-4', name: 'PB - Coding', col: 'pb_coding' },
          { id: 'ch-ret-pb-sw-5', name: 'PB - PS', col: 'pb_ps' },
        ],
      },
      // PB Efficiency
      {
        id: 'm-pb-eff-ret',
        subId: 's-pb-eff-ret',
        name: 'PB Efficiency',
        order: 0,
        kpi: false,
        sheetName: 'PB Efficiency',
        charts: [
          { id: 'ch-ret-pb-eff-1', name: 'Avg PB/SSM', col: 'avg_pb_ssm' },
        ],
      },
      // Subject wise conversion %
      {
        id: 'm-pe2-swc',
        subId: 's-pe2-swc',
        name: 'Subject wise conversion %',
        order: 0,
        kpi: false,
        sheetName: 'Subject wise conversion %',
        charts: [
          { id: 'ch-ret-pe2-swc-1', name: 'Overall Conversion%', col: 'overall_conversion' },
          { id: 'ch-ret-pe2-swc-2', name: 'Conversion% - Math', col: 'conversion_math' },
          { id: 'ch-ret-pe2-swc-3', name: 'Conversion% - ELA', col: 'conversion_ela' },
          { id: 'ch-ret-pe2-swc-4', name: 'Conversion% - Coding', col: 'conversion_coding' },
          { id: 'ch-ret-pe2-swc-5', name: 'Conversion% - PS', col: 'conversion_ps' },
        ],
      },
      // Subject wise Promo Ended
      {
        id: 'm-pe2-swpe',
        subId: 's-pe2-swpe',
        name: 'Subject wise Promo Ended',
        order: 0,
        kpi: false,
        sheetName: 'Subject wise Promo Ended',
        charts: [
          { id: 'ch-ret-pe2-swpe-1', name: 'Total Promos Ended', col: 'total_promos_ended' },
          { id: 'ch-ret-pe2-swpe-2', name: 'Promos Ended -Math', col: 'promos_ended_math' },
          { id: 'ch-ret-pe2-swpe-3', name: 'Promos Ended -ELA', col: 'promos_ended_ela' },
          { id: 'ch-ret-pe2-swpe-4', name: 'Promos Ended -Coding', col: 'promos_ended_coding' },
          { id: 'ch-ret-pe2-swpe-5', name: 'Promos Ended -PS', col: 'promos_ended_ps' },
        ],
      },
      // Promo Attendance%
      {
        id: 'm-pe2-pa',
        subId: 's-pe2-pa',
        name: 'Promo Attendance%',
        order: 0,
        kpi: false,
        sheetName: 'Promo Attendance%',
        charts: [
          { id: 'ch-ret-pe2-pa-1', name: 'Overall Attendance%', col: 'overall_attendance' },
          { id: 'ch-ret-pe2-pa-2', name: 'Promo Attendance - Math', col: 'promo_attendance_math' },
          { id: 'ch-ret-pe2-pa-3', name: 'Promo Attendance - ELA', col: 'promo_attendance_ela' },
          { id: 'ch-ret-pe2-pa-4', name: 'Promo Attendance - Coding', col: 'promo_attendance_coding' },
          { id: 'ch-ret-pe2-pa-5', name: 'Promo Attendance - PS', col: 'promo_attendance_ps' },
        ],
      },
      // Fresh Enrollment
      {
        id: 'm-fs-fe',
        subId: 's-fs-fe',
        name: 'Fresh Enrollment',
        order: 0,
        kpi: false,
        sheetName: 'Fresh Enrollment',
        charts: [
          { id: 'ch-ret-fs-fe-1', name: 'Total Enrollment', col: 'total_enrollment' },
          { id: 'ch-ret-fs-fe-2', name: 'Math Enrollments', col: 'math_enrollments' },
          { id: 'ch-ret-fs-fe-3', name: 'ELA Enrollments', col: 'ela_enrollments' },
          { id: 'ch-ret-fs-fe-4', name: 'Coding Enrollments', col: 'coding_enrollments' },
          { id: 'ch-ret-fs-fe-5', name: 'PS Enrollments', col: 'ps_enrollments' },
          { id: 'ch-ret-fs-fe-6', name: '12 Weeks Subscription', col: '12_weeks_subscription' },
          { id: 'ch-ret-fs-fe-7', name: '24 Weeks Subscription', col: '24_weeks_subscription' },
          { id: 'ch-ret-fs-fe-8', name: '48 Weeks Subscription', col: '48_weeks_subscription' },
        ],
      },
      // Revenue
      {
        id: 'm-fs-rev',
        subId: 's-fs-rev',
        name: 'Revenue',
        order: 0,
        kpi: false,
        sheetName: 'Revenue',
        charts: [
          { id: 'ch-ret-fs-rev-1', name: 'Total Revenue', col: 'total_revenue' },
          { id: 'ch-ret-fs-rev-2', name: 'Math Revenue', col: 'math_revenue' },
          { id: 'ch-ret-fs-rev-3', name: 'ELA Revenue', col: 'ela_revenue' },
          { id: 'ch-ret-fs-rev-4', name: 'Coding Revenue', col: 'coding_revenue' },
          { id: 'ch-ret-fs-rev-5', name: 'PS Revenue', col: 'ps_revenue' },
          { id: 'ch-ret-fs-rev-6', name: 'Avg Discount/Enrollment', col: 'avg_discount_enrollment' },
          { id: 'ch-ret-fs-rev-7', name: 'Avg Discount/Enrollment - Math', col: 'avg_discount_enrollment_math' },
          { id: 'ch-ret-fs-rev-8', name: 'Avg Discount/Enrollment- ELA', col: 'avg_discount_enrollment_ela' },
          { id: 'ch-ret-fs-rev-9', name: 'Avg Discount/Enrollment - Coding', col: 'avg_discount_enrollment_coding' },
          { id: 'ch-ret-fs-rev-10', name: 'Avg Discount/Enrollment - PS', col: 'avg_discount_enrollment_ps' },
        ],
      },
      // Student Success Metrics
      {
        id: 'm-ss-ssm',
        subId: 's-ss-ssm',
        name: 'Student Success Metrics',
        order: 0,
        kpi: false,
        sheetName: 'Student Success Metrics',
        charts: [
          { id: 'ch-ret-ss-ssm-1', name: 'Student Attendance %', col: 'student_attendance' },
          { id: 'ch-ret-ss-ssm-2', name: 'Monthly Progress Reporting Breach', col: 'monthly_progress_reporting_breach' },
          { id: 'ch-ret-ss-ssm-3', name: 'Grade acceleration Breach', col: 'grade_acceleration_breach' },
          { id: 'ch-ret-ss-ssm-4', name: 'NATE Adoption', col: 'nate_adoption' },
        ],
      },
      // Bechmark deviation
      {
        id: 'm-ss-bd',
        subId: 's-ss-bd',
        name: 'Bechmark deviation',
        order: 0,
        kpi: false,
        sheetName: 'Bechmark deviation',
        charts: [
          { id: 'ch-ret-ss-bd-1', name: 'Students deviating from expected BM', col: 'students_deviating_from_expected_bm' },
          { id: 'ch-ret-ss-bd-2', name: 'Catchup calsses scheduled', col: 'catchup_classes_scheduled' },
        ],
      },
      // Paused cases
      {
        id: 'm-ss-pc',
        subId: 's-ss-pc',
        name: 'Paused cases',
        order: 0,
        kpi: false,
        sheetName: 'Paused cases',
        charts: [
          { id: 'ch-ret-ss-pc-1', name: 'Paused for more than 3 Weeks', col: 'paused_for_more_than_3_weeks' },
          { id: 'ch-ret-ss-pc-2', name: 'Paused for more than 6 Weeks', col: 'paused_for_more_than_6_weeks' },
        ],
      },
      // Refunds
      {
        id: 'm-ss-ref',
        subId: 's-ss-ref',
        name: 'Refunds',
        order: 0,
        kpi: false,
        sheetName: 'Refunds',
        charts: [
          { id: 'ch-ret-ss-ref-1', name: 'Refunded Subscriptions', col: 'refunded_subscriptions' },
          { id: 'ch-ret-ss-ref-2', name: 'Refund Amount', col: 'refund_amount' },
        ],
      },
      // Health Score
      {
        id: 'm-ss-hs',
        subId: 's-ss-hs',
        name: 'Health Score',
        order: 0,
        kpi: false,
        sheetName: 'Health Score',
        charts: [
          { id: 'ch-ret-ss-hs-1', name: 'Health Score', col: 'health_score' },
        ],
      },

      // Marketing Overview Summary
      {
        id: 'm-sum-mkt',
        subId: 's-sum-mkt',
        name: 'Overview',
        order: 0,
        kpi: true,
        sheetName: 'Overview',
        charts: [
          { id: 'ch-mkt-1', name: 'Lead Acquisition Cost (CPA)', col: 'marketing_cpa', kpi: true },
          { id: 'ch-mkt-2', name: 'Organic Session Volume', col: 'marketing_organic_sessions', kpi: true },
          { id: 'ch-mkt-3', name: 'Total Campaign ROI', col: 'marketing_campaign_roi', kpi: true },
          { id: 'ch-mkt-4', name: 'Lead Conversion Rate', col: 'marketing_lead_conversion_rate', kpi: true },
        ],
      },

      // Organic Marketing Activity - Blogs
      {
        id: 'm-org-blogs',
        subId: 's-org-blogs',
        name: 'Blogs',
        order: 0,
        kpi: false,
        sheetName: 'Blogs',
        charts: [
          { id: 'ch-org-blogs-1', name: 'Count of Blogs Published', col: 'count_of_blogs_published' },
          { id: 'ch-org-blogs-2', name: 'Total Visitors/Sessions- Blogs', col: 'total_visitors_sessions_blogs' },
          { id: 'ch-org-blogs-3', name: 'New contacts from Blogs', col: 'new_contacts_from_blogs' },
        ],
      },

      // Organic Marketing Activity - Instagram
      {
        id: 'm-org-insta',
        subId: 's-org-insta',
        name: 'Instagram',
        order: 0,
        kpi: false,
        sheetName: 'Instagram',
        charts: [
          { id: 'ch-org-insta-1', name: 'Count of Post- Instagram', col: 'count_of_post_instagram' },
          { id: 'ch-org-insta-2', name: 'Impression - Instagram', col: 'impression_instagram' },
          { id: 'ch-org-insta-3', name: 'Interaction - Instagram', col: 'interaction_instagram' },
          { id: 'ch-org-insta-4', name: 'New contacts - Instagram', col: 'new_contacts_instagram' },
          { id: 'ch-org-insta-5', name: 'Total Followers- Instagram', col: 'total_followers_instagram' },
        ],
      },

      // Organic Marketing Activity - Youtube
      {
        id: 'm-org-yt',
        subId: 's-org-yt',
        name: 'Youtube',
        order: 0,
        kpi: false,
        sheetName: 'Youtube',
        charts: [
          { id: 'ch-org-yt-1', name: 'Count of Post- Youtube', col: 'count_of_post_youtube' },
          { id: 'ch-org-yt-2', name: 'Impression - Youtube', col: 'impression_youtube' },
          { id: 'ch-org-yt-3', name: 'Interaction - Youtube', col: 'interaction_youtube' },
          { id: 'ch-org-yt-4', name: 'New contacts - Youtube', col: 'new_contacts_youtube' },
          { id: 'ch-org-yt-5', name: 'Total Followers- Youtube', col: 'total_followers_youtube' },
        ],
      },

      // Organic Marketing Activity - Facebook
      {
        id: 'm-org-fb',
        subId: 's-org-fb',
        name: 'Facebook',
        order: 0,
        kpi: false,
        sheetName: 'Facebook',
        charts: [
          { id: 'ch-org-fb-1', name: 'Count of Post- Facebook', col: 'count_of_post_facebook' },
          { id: 'ch-org-fb-2', name: 'Impression - Facebook', col: 'impression_facebook' },
          { id: 'ch-org-fb-3', name: 'Interaction - Facebook', col: 'interaction_facebook' },
          { id: 'ch-org-fb-4', name: 'New contacts - Facebook', col: 'new_contacts_facebook' },
          { id: 'ch-org-fb-5', name: 'Total Followers- Facebook', col: 'total_followers_facebook' },
        ],
      },

      // Organic Marketing Activity - LinkedIn
      {
        id: 'm-org-li',
        subId: 's-org-li',
        name: 'LinkedIn',
        order: 0,
        kpi: false,
        sheetName: 'LinkedIn',
        charts: [
          { id: 'ch-org-li-1', name: 'Count of Post- LinkedIn', col: 'count_of_post_linkedin' },
          { id: 'ch-org-li-2', name: 'Impression - LinkedIn', col: 'impression_linkedin' },
          { id: 'ch-org-li-3', name: 'Interaction - LinkedIn', col: 'interaction_linkedin' },
          { id: 'ch-org-li-4', name: 'New contacts - LinkedIn', col: 'new_contacts_linkedin' },
          { id: 'ch-org-li-5', name: 'Total Followers- LinkedIn', col: 'total_followers_linkedin' },
        ],
      },

      // Organic Marketing Activity - Whatsapp Community
      {
        id: 'm-org-wa',
        subId: 's-org-wa',
        name: 'Whatsapp Community',
        order: 0,
        kpi: false,
        sheetName: 'Whatsapp Community',
        charts: [
          { id: 'ch-org-wa-1', name: 'Count of Post- Whatsapp', col: 'count_of_post_whatsapp' },
          { id: 'ch-org-wa-2', name: 'Total Followers- Whatsapp', col: 'total_followers_whatsapp' },
        ],
      },

      // Organic Marketing Activity - Non-Paid Source
      {
        id: 'm-org-nps',
        subId: 's-org-nps',
        name: 'Non-Paid Source',
        order: 0,
        kpi: false,
        sheetName: 'Non-Paid Source',
        charts: [
          { id: 'ch-org-nps-1', name: 'New visitor sessions', col: 'new_visitor_sessions' },
          { id: 'ch-org-nps-2', name: 'Session length', col: 'session_length' },
          { id: 'ch-org-nps-3', name: 'Session to contact rate', col: 'session_to_contact_rate' },
          { id: 'ch-org-nps-4', name: 'New contacts- Organic', col: 'new_contacts_organic' },
        ],
      },

      // Organic Marketing Activity - Domain Rating
      {
        id: 'm-org-dr',
        subId: 's-org-dr',
        name: 'Domain Rating',
        order: 0,
        kpi: false,
        sheetName: 'Domain Rating',
        charts: [
          { id: 'ch-org-dr-1', name: 'SEO', col: 'seo' },
          { id: 'ch-org-dr-2', name: 'GEO', col: 'geo' },
        ],
      },

      // Marketing campaigns - Digital Event
      {
        id: 'm-cam-de',
        subId: 's-cam-de',
        name: 'Digital Event',
        order: 0,
        kpi: false,
        sheetName: 'Digital Event',
        charts: [
          { id: 'ch-cam-de-1', name: 'Count of DE Launched', col: 'count_of_de_launched' },
          { id: 'ch-cam-de-2', name: 'Total Form Visitors/Sessions- DE', col: 'total_form_visitors_sessions_de' },
          { id: 'ch-cam-de-3', name: 'New contacts from DE or Form Submissions', col: 'new_contacts_from_de_or_form_submissions' },
        ],
      },

      // Marketing campaigns - Lead Magnets
      {
        id: 'm-cam-lm',
        subId: 's-cam-lm',
        name: 'Lead Magnets',
        order: 0,
        kpi: false,
        sheetName: 'Lead Magnets',
        charts: [
          { id: 'ch-cam-lm-1', name: 'Count of LM Launched', col: 'count_of_lm_launched' },
          { id: 'ch-cam-lm-2', name: 'Total Visitors/Sessions- LM', col: 'total_visitors_sessions_lm' },
          { id: 'ch-cam-lm-3', name: 'New contacts from LM or Form Submissions', col: 'new_contacts_from_lm_or_form_submissions' },
        ],
      },

      // Marketing campaigns - Webinars
      {
        id: 'm-cam-web',
        subId: 's-cam-web',
        name: 'Webinars',
        order: 0,
        kpi: false,
        sheetName: 'Webinars',
        charts: [
          { id: 'ch-cam-web-1', name: 'Count of Webinars Launched', col: 'count_of_webinars_launched' },
          { id: 'ch-cam-web-2', name: 'Total Visitors/Sessions- Webinars', col: 'total_visitors_sessions_webinars' },
          { id: 'ch-cam-web-3', name: 'New contacts from Webinar or Form Submissions', col: 'new_contacts_from_webinar_or_form_submissions' },
        ],
      },

      // Device Segmentation - Device Type- Desktop
      {
        id: 'm-dev-desktop',
        subId: 's-dev-desktop',
        name: 'Device Type- Desktop',
        order: 0,
        kpi: false,
        sheetName: 'Device Type- Desktop',
        charts: [
          { id: 'ch-dev-desktop-1', name: 'New visitor sessions- Desktop', col: 'new_visitor_sessions_desktop' },
          { id: 'ch-dev-desktop-2', name: 'Session length - Desktop', col: 'session_length_desktop' },
          { id: 'ch-dev-desktop-3', name: 'Session to contact rate - Desktop', col: 'session_to_contact_rate_desktop' },
          { id: 'ch-dev-desktop-4', name: 'New contacts created from Desktop', col: 'new_contacts_created_from_desktop' },
        ],
      },

      // Device Segmentation - Device Type- Mobile
      {
        id: 'm-dev-mobile',
        subId: 's-dev-mobile',
        name: 'Device Type- Mobile',
        order: 0,
        kpi: false,
        sheetName: 'Device Type- Mobile',
        charts: [
          { id: 'ch-dev-mobile-1', name: 'New visitor sessions- Mobile', col: 'new_visitor_sessions_mobile' },
          { id: 'ch-dev-mobile-2', name: 'Session length - Mobile', col: 'session_length_mobile' },
          { id: 'ch-dev-mobile-3', name: 'Session to contact rate - Mobile', col: 'session_to_contact_rate_mobile' },
          { id: 'ch-dev-mobile-4', name: 'New contacts created from Mobile', col: 'new_contacts_created_from_mobile' },
        ],
      },

      // Lead Generation - Total Leads & Lead stage
      {
        id: 'm-lead-stage',
        subId: 's-lead-stage',
        name: 'Total Leads & Lead stage',
        order: 0,
        kpi: false,
        sheetName: 'Total Leads & Lead stage',
        charts: [
          { id: 'ch-lead-stage-1', name: 'Total leads', col: 'total_leads' },
          { id: 'ch-lead-stage-2', name: "MQL's", col: 'mql_s' },
          { id: 'ch-lead-stage-3', name: "SQL's", col: 'sql_s' },
          { id: 'ch-lead-stage-4', name: 'Opportunities created', col: 'opportunities_created' },
          { id: 'ch-lead-stage-5', name: 'Customers', col: 'customers' },
          { id: 'ch-lead-stage-6', name: 'Indian Ethnic Leads', col: 'indian_ethnic_leads' },
        ],
      },

      // Lead Generation - Lead Gen- Non paid sources
      {
        id: 'm-lead-nps',
        subId: 's-lead-nps',
        name: 'Lead Gen- Non paid sources',
        order: 0,
        kpi: false,
        sheetName: 'Lead Gen- Non paid sources',
        charts: [
          { id: 'ch-lead-nps-1', name: 'Lead Gen- NPS', col: 'lead_gen_nps' },
          { id: 'ch-lead-nps-2', name: "MQL's- NPS", col: 'mql_s_nps' },
          { id: 'ch-lead-nps-3', name: "SQL's- NPS", col: 'sql_s_nps' },
          { id: 'ch-lead-nps-4', name: 'Opportunities created- NPS', col: 'opportunities_created_nps' },
          { id: 'ch-lead-nps-5', name: 'Customers- NPS', col: 'customers_nps' },
          { id: 'ch-lead-nps-6', name: 'Indian Ethnic Leads- NPS', col: 'indian_ethnic_leads_nps' },
        ],
      },

      // Lead Generation- Paid Acquisition - Lead Gen- Google
      {
        id: 'm-paid-google',
        subId: 's-paid-google',
        name: 'Lead Gen- Google',
        order: 0,
        kpi: false,
        sheetName: 'Lead Gen- Google',
        charts: [
          { id: 'ch-paid-google-1', name: 'Fresh Lead - Google', col: 'fresh_lead_google' },
          { id: 'ch-paid-google-2', name: "MQL's- Google", col: 'mql_s_google' },
          { id: 'ch-paid-google-3', name: "SQL's- Google", col: 'sql_s_google' },
          { id: 'ch-paid-google-4', name: 'Opportunities created- Google', col: 'opportunities_created_google' },
          { id: 'ch-paid-google-5', name: 'Customers- Google', col: 'customers_google' },
          { id: 'ch-paid-google-6', name: 'Indian Ethnic Leads- Google', col: 'indian_ethnic_leads_google' },
        ],
      },

      // Lead Generation- Paid Acquisition - Lead Gen- Meta
      {
        id: 'm-paid-meta',
        subId: 's-paid-meta',
        name: 'Lead Gen- Meta',
        order: 0,
        kpi: false,
        sheetName: 'Lead Gen- Meta',
        charts: [
          { id: 'ch-paid-meta-1', name: 'Fresh Lead - Meta', col: 'fresh_lead_meta' },
          { id: 'ch-paid-meta-2', name: "MQL's- Meta", col: 'mql_s_meta' },
          { id: 'ch-paid-meta-3', name: "SQL's- Meta", col: 'sql_s_meta' },
          { id: 'ch-paid-meta-4', name: 'Opportunities created- Meta', col: 'opportunities_created_meta' },
          { id: 'ch-paid-meta-5', name: 'Customers- Meta', col: 'customers_meta' },
          { id: 'ch-paid-meta-6', name: 'Indian Ethnic Leads- Meta', col: 'indian_ethnic_leads_meta' },
        ],
      },

      // Lead Generation- Paid Acquisition - Cost Per Click
      {
        id: 'm-paid-cpc',
        subId: 's-paid-cpc',
        name: 'Cost Per Click',
        order: 0,
        kpi: false,
        sheetName: 'Cost Per Click',
        charts: [
          { id: 'ch-paid-cpc-1', name: 'Google- CPC', col: 'google_cpc' },
          { id: 'ch-paid-cpc-2', name: 'Meta- CPC', col: 'meta_cpc' },
        ],
      },

      // Lead Generation- Paid Acquisition - Click Through Rate
      {
        id: 'm-paid-ctr',
        subId: 's-paid-ctr',
        name: 'Click Through Rate',
        order: 0,
        kpi: false,
        sheetName: 'Click Through Rate',
        charts: [
          { id: 'ch-paid-ctr-1', name: 'Google- CTR', col: 'google_ctr' },
          { id: 'ch-paid-ctr-2', name: 'Meta- CTR', col: 'meta_ctr' },
        ],
      },

      // Lead Generation- Paid Acquisition - Cost Per Lead
      {
        id: 'm-paid-cpl',
        subId: 's-paid-cpl',
        name: 'Cost Per Lead',
        order: 0,
        kpi: false,
        sheetName: 'Cost Per Lead',
        charts: [
          { id: 'ch-paid-cpl-1', name: 'Google- CPL', col: 'google_cpl' },
          { id: 'ch-paid-cpl-2', name: 'Meta- CPL', col: 'meta_cpl' },
        ],
      },

      // Lead Generation- Paid Acquisition - AD Spend
      {
        id: 'm-paid-spend',
        subId: 's-paid-spend',
        name: 'AD Spend',
        order: 0,
        kpi: false,
        sheetName: 'AD Spend',
        charts: [
          { id: 'ch-paid-spend-1', name: 'Google- AD Spend', col: 'google_ad_spend' },
          { id: 'ch-paid-spend-2', name: 'Meta- AD Spend', col: 'meta_ad_spend' },
        ],
      },

      // Lead Nurturing - Avg time for 1st follow-up(Call
      {
        id: 'm-nurt-followup',
        subId: 's-nurt-followup',
        name: 'Avg time for 1st follow-up(Call',
        order: 0,
        kpi: false,
        sheetName: 'Avg time for 1st follow-up(Call',
        charts: [
          { id: 'ch-nurt-followup-1', name: 'Avg time for 1st follow-up(Call', col: 'avg_time_for_1st_follow_up_call' },
        ],
      },

      // Lead Nurturing - Email Marketing
      {
        id: 'm-nurt-email',
        subId: 's-nurt-email',
        name: 'Email Marketing',
        order: 0,
        kpi: false,
        sheetName: 'Email Marketing',
        charts: [
          { id: 'ch-nurt-email-1', name: 'Emails sent', col: 'emails_sent' },
          { id: 'ch-nurt-email-2', name: 'Open rate', col: 'open_rate' },
          { id: 'ch-nurt-email-3', name: 'Email CTR', col: 'email_ctr' },
          { id: 'ch-nurt-email-4', name: 'Unsubscriber rate', col: 'unsubscriber_rate' },
          { id: 'ch-nurt-email-5', name: 'Health score', col: 'health_score' },
          { id: 'ch-nurt-email-6', name: 'Hardbounced emails', col: 'hardbounced_emails' },
        ],
      },

      // Funnel Health & ROI - Funnel Conversion
      {
        id: 'm-roi-conversion',
        subId: 's-roi-conversion',
        name: 'Funnel Conversion',
        order: 0,
        kpi: false,
        sheetName: 'Funnel Conversion',
        charts: [
          { id: 'ch-roi-conv-1', name: 'Subscriber - Lead %', col: 'subscriber_lead' },
          { id: 'ch-roi-conv-2', name: 'Lead- MQL%', col: 'lead_mql' },
          { id: 'ch-roi-conv-3', name: 'MQL- SQL %', col: 'mql_sql' },
          { id: 'ch-roi-conv-4', name: 'MQL - Opportunity %', col: 'mql_opportunity' },
          { id: 'ch-roi-conv-5', name: 'SQL- Opportunity %', col: 'sql_opportunity' },
          { id: 'ch-roi-conv-6', name: 'Opportunity- Customer %', col: 'opportunity_customer' },
          { id: 'ch-roi-conv-7', name: 'Customer- Evangelist %', col: 'customer_evangelist' },
          { id: 'ch-roi-conv-8', name: 'Customer- Others %', col: 'customer_others' },
          { id: 'ch-roi-conv-9', name: 'Others- Evangelist %', col: 'others_evangelist' },
        ],
      },

      // Funnel Health & ROI - Funnel Speed
      {
        id: 'm-roi-speed',
        subId: 's-roi-speed',
        name: 'Funnel Speed',
        order: 1,
        kpi: false,
        sheetName: 'Funnel Speed',
        charts: [
          { id: 'ch-roi-speed-1', name: 'Subscriber to Lead', col: 'subscriber_to_lead' },
          { id: 'ch-roi-speed-2', name: 'Lead to MQL', col: 'lead_to_mql' },
          { id: 'ch-roi-speed-3', name: 'MQL to SQL', col: 'mql_to_sql' },
          { id: 'ch-roi-speed-4', name: 'MQL to Opportunity', col: 'mql_to_opportunity' },
          { id: 'ch-roi-speed-5', name: 'SQL to Opportunity', col: 'sql_to_opportunity' },
          { id: 'ch-roi-speed-6', name: 'Opportunity to Customer', col: 'opportunity_to_customer' },
          { id: 'ch-roi-speed-7', name: 'Customer to Evangelist', col: 'customer_to_evangelist' },
          { id: 'ch-roi-speed-8', name: 'Customer to Others', col: 'customer_to_others' },
          { id: 'ch-roi-speed-9', name: 'Others to Evangelist', col: 'others_to_evangelist' },
        ],
      },

      // Funnel Health & ROI - ROI
      {
        id: 'm-roi-performance',
        subId: 's-roi-performance',
        name: 'ROI',
        order: 2,
        kpi: false,
        sheetName: 'ROI',
        charts: [
          { id: 'ch-roi-perf-1', name: 'Total ROI', col: 'total_roi' },
          { id: 'ch-roi-perf-2', name: 'ROI- Meta', col: 'roi_meta' },
          { id: 'ch-roi-perf-3', name: 'ROI- Gogle', col: 'roi_gogle' },
        ],
      },

      // Page Speed Insights - Desktop Performance
      {
        id: 'm-psi-desktop',
        subId: 's-psi-desktop',
        name: 'Desktop Performance',
        order: 0,
        kpi: false,
        sheetName: 'Desktop Performance',
        charts: [
          { id: 'ch-psi-desktop-1', name: 'Home Page- Desktop', col: 'home_page_desktop' },
          { id: 'ch-psi-desktop-2', name: 'Math Page- Desktop', col: 'math_page_desktop' },
          { id: 'ch-psi-desktop-3', name: 'ELA Page- Desktop', col: 'ela_page_desktop' },
          { id: 'ch-psi-desktop-4', name: 'Coding Page- Desktop', col: 'coding_page_desktop' },
          { id: 'ch-psi-desktop-5', name: 'PS Page- Desktop', col: 'ps_page_desktop' },
          { id: 'ch-psi-desktop-6', name: 'Math Pricing Page - Desktop', col: 'math_pricing_page_desktop' },
          { id: 'ch-psi-desktop-7', name: 'ELA Pricing Page - Desktop', col: 'ela_pricing_page_desktop' },
          { id: 'ch-psi-desktop-8', name: 'Coding Pricing Page - Desktop', col: 'coding_pricing_page_desktop' },
          { id: 'ch-psi-desktop-9', name: 'PS Pricing Page - Desktop', col: 'ps_pricing_page_desktop' },
          { id: 'ch-psi-desktop-10', name: 'Blogs - Desktop', col: 'blogs_desktop' },
          { id: 'ch-psi-desktop-11', name: 'Contest Page - Desktop', col: 'contest_page_desktop' },
        ],
      },

      // Page Speed Insights - Mobile Performance
      {
        id: 'm-psi-mobile',
        subId: 's-psi-mobile',
        name: 'Mobile Performance',
        order: 1,
        kpi: false,
        sheetName: 'Mobile Performance',
        charts: [
          { id: 'ch-psi-mobile-1', name: 'Home Page- Mobile', col: 'home_page_mobile' },
          { id: 'ch-psi-mobile-2', name: 'Math Page- Mobile', col: 'math_page_mobile' },
          { id: 'ch-psi-mobile-3', name: 'ELA Page- Mobile', col: 'ela_page_mobile' },
          { id: 'ch-psi-mobile-4', name: 'Coding Page- Mobile', col: 'coding_page_mobile' },
          { id: 'ch-psi-mobile-5', name: 'PS Page- Mobile', col: 'ps_page_mobile' },
          { id: 'ch-psi-mobile-6', name: 'Math Pricing Page - Mobile', col: 'math_pricing_page_mobile' },
          { id: 'ch-psi-mobile-7', name: 'ELA Pricing Page - Mobile', col: 'ela_pricing_page_mobile' },
          { id: 'ch-psi-mobile-8', name: 'Coding Pricing Page - Mobile', col: 'coding_pricing_page_mobile' },
          { id: 'ch-psi-mobile-9', name: 'PS Pricing Page - Mobile', col: 'ps_pricing_page_mobile' },
          { id: 'ch-psi-mobile-10', name: 'Blogs - Mobile', col: 'blogs_mobile' },
          { id: 'ch-psi-mobile-11', name: 'Contest Page - Mobile', col: 'contest_page_mobile' },
        ],
      },

      // Academics Overview / Summary
      {
        id: 'm-sum-acad',
        subId: 's-sum-acad',
        name: 'Overview',
        order: 0,
        kpi: true,
        sheetName: 'Overview',
        charts: [
          { id: 'ch-acad-sum-1', name: 'Active Students Trend', col: 'active_students_overall', kpi: true },
          { id: 'ch-acad-sum-2', name: 'Overall Retention %', col: 'retention_overall_pct', kpi: true },
          { id: 'ch-acad-sum-3', name: 'Overall Conversion %', col: 'conversion_overall_pct', kpi: true },
          { id: 'ch-acad-sum-4', name: 'Overall Student-Teacher Ratio', col: 'tsr_overall', kpi: true },
        ],
      },
      // Academics - Active Students
      {
        id: 'm-stud-act',
        subId: 's-stud-act',
        name: 'Active Students',
        order: 0,
        kpi: false,
        sheetName: 'Active Students',
        charts: [
          { id: 'ch-stud-act-1', name: 'Overall', col: 'active_students_overall' },
          { id: 'ch-stud-act-2', name: 'Math', col: 'active_students_math' },
          { id: 'ch-stud-act-3', name: 'ELA', col: 'active_students_ela' },
          { id: 'ch-stud-act-4', name: 'Coding', col: 'active_students_coding' },
          { id: 'ch-stud-act-5', name: 'PS', col: 'active_students_ps' },
        ],
      },
      // Academics - Non-Renewing Students
      {
        id: 'm-stud-nr',
        subId: 's-stud-nr',
        name: 'Non-Renewing Students',
        order: 1,
        kpi: false,
        sheetName: 'Non-Renewing Students',
        charts: [
          { id: 'ch-stud-nr-1', name: 'Overall- NR', col: 'nr_students_overall' },
          { id: 'ch-stud-nr-2', name: 'Math -NR', col: 'nr_students_math' },
          { id: 'ch-stud-nr-3', name: 'ELA -NR', col: 'nr_students_ela' },
          { id: 'ch-stud-nr-4', name: 'Coding -NR', col: 'nr_students_coding' },
          { id: 'ch-stud-nr-5', name: 'PS -NR', col: 'nr_students_ps' },
        ],
      },
      // Academics - Active Teachers
      {
        id: 'm-teach-act',
        subId: 's-teach-act',
        name: 'Active Teachers',
        order: 0,
        kpi: false,
        sheetName: 'Active Teachers',
        charts: [
          { id: 'ch-teach-act-1', name: 'Total Active Teachers', col: 'active_teachers_overall' },
          { id: 'ch-teach-act-2', name: 'Math - Active Teachers', col: 'active_teachers_math' },
          { id: 'ch-teach-act-3', name: 'ELA - Active Teachers', col: 'active_teachers_ela' },
          { id: 'ch-teach-act-4', name: 'Coding - Active Teachers', col: 'active_teachers_coding' },
          { id: 'ch-teach-act-5', name: 'PS - Active Teachers', col: 'active_teachers_ps' },
        ],
      },
      // Academics - In-Training Teachers
      {
        id: 'm-teach-train',
        subId: 's-teach-train',
        name: 'In-Training teachers',
        order: 1,
        kpi: false,
        sheetName: 'In-Training teachers',
        charts: [
          { id: 'ch-teach-train-1', name: 'Total In-Training', col: 'in_training_teachers_overall' },
          { id: 'ch-teach-train-2', name: 'Math - In-Training', col: 'in_training_teachers_math' },
          { id: 'ch-teach-train-3', name: 'ELA - In-Training', col: 'in_training_teachers_ela' },
          { id: 'ch-teach-train-4', name: 'Coding - In-Training', col: 'in_training_teachers_coding' },
          { id: 'ch-teach-train-5', name: 'PS - In-Training', col: 'in_training_teachers_ps' },
        ],
      },
      // Academics - Attrition
      {
        id: 'm-teach-attr',
        subId: 's-teach-attr',
        name: 'Attrition',
        order: 2,
        kpi: false,
        sheetName: 'Attrition',
        charts: [
          { id: 'ch-teach-attr-1', name: 'Total Attrition', col: 'attrition_overall' },
          { id: 'ch-teach-attr-2', name: 'Math - Attrition', col: 'attrition_math' },
          { id: 'ch-teach-attr-3', name: 'ELA - Attrition', col: 'attrition_ela' },
          { id: 'ch-teach-attr-4', name: 'Coding - Attrition', col: 'attrition_coding' },
          { id: 'ch-teach-attr-5', name: 'PS - Attrition', col: 'attrition_ps' },
        ],
      },
      // Academics - Student-Teacher Ratio
      {
        id: 'm-teach-str',
        subId: 's-teach-str',
        name: 'Student-Teacher Ratio',
        order: 3,
        kpi: false,
        sheetName: 'Student-Teacher Ratio',
        charts: [
          { id: 'ch-teach-str-1', name: 'Overall TSR', col: 'tsr_overall' },
          { id: 'ch-teach-str-2', name: 'Math TSR', col: 'tsr_math' },
          { id: 'ch-teach-str-3', name: 'ELA TSR', col: 'tsr_ela' },
          { id: 'ch-teach-str-4', name: 'Coding TSR', col: 'tsr_coding' },
          { id: 'ch-teach-str-5', name: 'PS TSR', col: 'tsr_ps' },
        ],
      },
      // Academics - Class Conduction
      {
        id: 'm-classcond-cond',
        subId: 's-classcond-cond',
        name: 'Class Conduction',
        order: 0,
        kpi: false,
        sheetName: 'Class Conduction',
        charts: [
          { id: 'ch-classcond-cond-1', name: 'Total Classes Conducted', col: 'classes_conducted_overall' },
          { id: 'ch-classcond-cond-2', name: 'Math Classes', col: 'classes_conducted_math' },
          { id: 'ch-classcond-cond-3', name: 'ELA Classes', col: 'classes_conducted_ela' },
          { id: 'ch-classcond-cond-4', name: 'Coding Classes', col: 'classes_conducted_coding' },
          { id: 'ch-classcond-cond-5', name: 'PS Classes', col: 'classes_conducted_ps' },
        ],
      },
      // Academics - Students Absence
      {
        id: 'm-classcond-abs',
        subId: 's-classcond-abs',
        name: 'Students Absence',
        order: 1,
        kpi: false,
        sheetName: 'Students Absence',
        charts: [
          { id: 'ch-classcond-abs-1', name: 'Total Students Absence %', col: 'absence_rate_overall' },
          { id: 'ch-classcond-abs-2', name: 'Math Absence%', col: 'absence_rate_math' },
          { id: 'ch-classcond-abs-3', name: 'ELA Absence%', col: 'absence_rate_ela' },
          { id: 'ch-classcond-abs-4', name: 'Coding Absence%', col: 'absence_rate_coding' },
          { id: 'ch-classcond-abs-5', name: 'PS Absence%', col: 'absence_rate_ps' },
        ],
      },
      // Academics - Classes Rated
      {
        id: 'm-classcond-rated',
        subId: 's-classcond-rated',
        name: 'Classes Rated',
        order: 2,
        kpi: false,
        sheetName: 'Classes Rated',
        charts: [
          { id: 'ch-classcond-rated-1', name: 'Overall classes rated %', col: 'classes_rated_overall_pct' },
          { id: 'ch-classcond-rated-2', name: 'Math classes rated %', col: 'classes_rated_math_pct' },
          { id: 'ch-classcond-rated-3', name: 'ELA classes rated %', col: 'classes_rated_ela_pct' },
          { id: 'ch-classcond-rated-4', name: 'Coding classes rated %', col: 'classes_rated_coding_pct' },
          { id: 'ch-classcond-rated-5', name: 'PS classes rated %', col: 'classes_rated_ps_pct' },
        ],
      },
      // Academics - Promo students rating
      {
        id: 'm-classcond-promorating',
        subId: 's-classcond-promorating',
        name: 'Promo students rating',
        order: 3,
        kpi: false,
        sheetName: 'Promo students rating',
        charts: [
          { id: 'ch-classcond-promorating-1', name: 'Overall Class Rating by Promo Students', col: 'promo_students_rating_overall' },
          { id: 'ch-classcond-promorating-2', name: 'Math Class Rating by Promo Students', col: 'promo_students_rating_math' },
          { id: 'ch-classcond-promorating-3', name: 'ELA Class Rating by Promo Students', col: 'promo_students_rating_ela' },
          { id: 'ch-classcond-promorating-4', name: 'Coding Class Rating by Promo Students', col: 'promo_students_rating_coding' },
          { id: 'ch-classcond-promorating-5', name: 'PS Class Rating by Promo Students', col: 'promo_students_rating_ps' },
        ],
      },
      // Academics - Enrolled students rating
      {
        id: 'm-classcond-enrolledrating',
        subId: 's-classcond-enrolledrating',
        name: 'Enrolled students rating',
        order: 4,
        kpi: false,
        sheetName: 'Enrolled students rating',
        charts: [
          { id: 'ch-classcond-enrolledrating-1', name: 'Overall Class Rating by Enrolled Students', col: 'enrolled_students_rating_overall' },
          { id: 'ch-classcond-enrolledrating-2', name: 'Math Class Rating by Enrolled Students', col: 'enrolled_students_rating_math' },
          { id: 'ch-classcond-enrolledrating-3', name: 'ELA Class Rating by Enrolled Students', col: 'enrolled_students_rating_ela' },
          { id: 'ch-classcond-enrolledrating-4', name: 'Coding Class Rating by Enrolled Students', col: 'enrolled_students_rating_coding' },
          { id: 'ch-classcond-enrolledrating-5', name: 'PS Class Rating by Enrolled Students', col: 'enrolled_students_rating_ps' },
        ],
      },
      // Academics - Class Cancellation
      {
        id: 'm-kpi-canc',
        subId: 's-kpi-canc',
        name: 'Class Cancellation',
        order: 0,
        kpi: false,
        sheetName: 'Class Cancellation',
        charts: [
          { id: 'ch-kpi-canc-1', name: 'Overall Classes Cancelled', col: 'classes_cancelled_overall' },
          { id: 'ch-kpi-canc-2', name: 'Math Classes Cancelled', col: 'classes_cancelled_math' },
          { id: 'ch-kpi-canc-3', name: 'ELA Classes Cancelled', col: 'classes_cancelled_ela' },
          { id: 'ch-kpi-canc-4', name: 'Coding Classes Cancelled', col: 'classes_cancelled_coding' },
          { id: 'ch-kpi-canc-5', name: 'PS Classes Cancelled', col: 'classes_cancelled_ps' },
        ],
      },
      // Academics - Class Substitution
      {
        id: 'm-kpi-sub',
        subId: 's-kpi-sub',
        name: 'Class Substitution',
        order: 1,
        kpi: false,
        sheetName: 'Class Substitution',
        charts: [
          { id: 'ch-kpi-sub-1', name: 'Overall Classes Substituted', col: 'classes_substituted_overall' },
          { id: 'ch-kpi-sub-2', name: 'Math Classes Substituted', col: 'classes_substituted_math' },
          { id: 'ch-kpi-sub-3', name: 'ELA Classes Substituted', col: 'classes_substituted_ela' },
          { id: 'ch-kpi-sub-4', name: 'Coding Classes Substituted', col: 'classes_substituted_coding' },
          { id: 'ch-kpi-sub-5', name: 'PS Classes Substituted', col: 'classes_substituted_ps' },
        ],
      },
      // Academics - Class No Show
      {
        id: 'm-kpi-noshow',
        subId: 's-kpi-noshow',
        name: 'Class No Show',
        order: 2,
        kpi: false,
        sheetName: 'Class No Show',
        charts: [
          { id: 'ch-kpi-noshow-1', name: 'Original Teacher No-Show', col: 'original_teacher_no_show' },
          { id: 'ch-kpi-noshow-2', name: 'Substitution Teacher No-Show', col: 'substitute_teacher_no_show' },
        ],
      },
      // Academics - Catchup Class Cancellation
      {
        id: 'm-kpi-catchup',
        subId: 's-kpi-catchup',
        name: 'Catchup Class Cancellation',
        order: 3,
        kpi: false,
        sheetName: 'Catchup Class Cancellation',
        charts: [
          { id: 'ch-kpi-catchup-1', name: 'Overall CC Cancelled', col: 'catchup_cancelled_overall' },
          { id: 'ch-kpi-catchup-2', name: 'Math CC Cancelled', col: 'catchup_cancelled_math' },
          { id: 'ch-kpi-catchup-3', name: 'ELA CC Cancelled', col: 'catchup_cancelled_ela' },
          { id: 'ch-kpi-catchup-4', name: 'Coding CC Cancelled', col: 'catchup_cancelled_coding' },
          { id: 'ch-kpi-catchup-5', name: 'PS CC Cancelled', col: 'catchup_cancelled_ps' },
          { id: 'ch-kpi-catchup-6', name: 'Math CC Cancelled - Teacher No-Show', col: 'catchup_cancelled_math_teacher_noshow' },
          { id: 'ch-kpi-catchup-7', name: 'ELA CC Cancelled - Teacher No-Show', col: 'catchup_cancelled_ela_teacher_noshow' },
          { id: 'ch-kpi-catchup-8', name: 'Coding CC Cancelled - Teacher No-Show', col: 'catchup_cancelled_coding_teacher_noshow' },
          { id: 'ch-kpi-catchup-9', name: 'PS CC Cancelled - Teacher No-Show', col: 'catchup_cancelled_ps_teacher_noshow' },
          { id: 'ch-kpi-catchup-10', name: 'Math CC Cancelled - Emergency Time-Off', col: 'catchup_cancelled_math_emergency_timeoff' },
          { id: 'ch-kpi-catchup-11', name: 'ELA CC Cancelled - Emergency Time-Off', col: 'catchup_cancelled_ela_emergency_timeoff' },
          { id: 'ch-kpi-catchup-12', name: 'Coding CC Cancelled - Emergency Time-Off', col: 'catchup_cancelled_coding_emergency_timeoff' },
          { id: 'ch-kpi-catchup-13', name: 'PS CC Cancelled - Emergency Time-Off', col: 'catchup_cancelled_ps_emergency_timeoff' },
          { id: 'ch-kpi-catchup-14', name: 'Math CC Cancelled - Planned Time-Off', col: 'catchup_cancelled_math_planned_timeoff' },
          { id: 'ch-kpi-catchup-15', name: 'ELA CC Cancelled - Planned Time-Off', col: 'catchup_cancelled_ela_planned_timeoff' },
          { id: 'ch-kpi-catchup-16', name: 'Coding CC Cancelled - Planned Time-Off', col: 'catchup_cancelled_coding_planned_timeoff' },
          { id: 'ch-kpi-catchup-17', name: 'PS CC Cancelled - Planned Time-Off', col: 'catchup_cancelled_ps_planned_timeoff' },
        ],
      },
      // Academics - Key Conversion %
      {
        id: 'm-kpi-conv',
        subId: 's-kpi-conv',
        name: 'Key Conversion %',
        order: 4,
        kpi: false,
        sheetName: 'Key Conversion %',
        charts: [
          { id: 'ch-kpi-conv-1', name: 'Overall Conversion %', col: 'conversion_overall_pct' },
          { id: 'ch-kpi-conv-2', name: 'Math Conversion %', col: 'conversion_math_pct' },
          { id: 'ch-kpi-conv-3', name: 'ELA Conversion %', col: 'conversion_ela_pct' },
          { id: 'ch-kpi-conv-4', name: 'Coding Conversion %', col: 'conversion_coding_pct' },
          { id: 'ch-kpi-conv-5', name: 'PS Conversion %', col: 'conversion_ps_pct' },
        ],
      },
      // Academics - Retention %
      {
        id: 'm-kpi-ret',
        subId: 's-kpi-ret',
        name: 'Retention %',
        order: 5,
        kpi: false,
        sheetName: 'Retention %',
        charts: [
          { id: 'ch-kpi-ret-1', name: 'Overall Retention %', col: 'retention_overall_pct' },
          { id: 'ch-kpi-ret-2', name: 'Math Retention %', col: 'retention_math_pct' },
          { id: 'ch-kpi-ret-3', name: 'ELA Retention %', col: 'retention_ela_pct' },
          { id: 'ch-kpi-ret-4', name: 'Coding Retention %', col: 'retention_coding_pct' },
          { id: 'ch-kpi-ret-5', name: 'PS Retention %', col: 'retention_ps_pct' },
        ],
      },
      // Academics - PI Score
      {
        id: 'm-kpi-pi',
        subId: 's-kpi-pi',
        name: 'PI Score',
        order: 6,
        kpi: false,
        sheetName: 'PI Score',
        charts: [
          { id: 'ch-kpi-pi-1', name: 'Overall PI Score', col: 'pi_score_overall' },
          { id: 'ch-kpi-pi-2', name: 'Math PI Score', col: 'pi_score_math' },
          { id: 'ch-kpi-pi-3', name: 'ELA PI Score', col: 'pi_score_ela' },
          { id: 'ch-kpi-pi-4', name: 'Coding PI Score', col: 'pi_score_coding' },
          { id: 'ch-kpi-pi-5', name: 'PS PI Score', col: 'pi_score_ps' },
        ],
      },
      // Academics - Promo Class Quality
      {
        id: 'm-qual-promo',
        subId: 's-qual-promo',
        name: 'Promo Class Quality',
        order: 0,
        kpi: false,
        sheetName: 'Promo Class Quality',
        charts: [
          { id: 'ch-qual-promo-1', name: 'Promo Classes Audited- Math', col: 'promo_classes_audited_math' },
          { id: 'ch-qual-promo-2', name: 'Promo Class Quality Score - Math', col: 'promo_class_quality_score_math' },
          { id: 'ch-qual-promo-3', name: 'Promo Students Engagement Score - Math', col: 'promo_students_engagement_score_math' },
          { id: 'ch-qual-promo-4', name: 'Promo Classes Audited- ELA', col: 'promo_classes_audited_ela' },
          { id: 'ch-qual-promo-5', name: 'Promo Class Quality Score - ELA', col: 'promo_class_quality_score_ela' },
          { id: 'ch-qual-promo-6', name: 'Promo Students Engagement Score - ELA', col: 'promo_students_engagement_score_ela' },
          { id: 'ch-qual-promo-7', name: 'Promo Classes Audited- Coding', col: 'promo_classes_audited_coding' },
          { id: 'ch-qual-promo-8', name: 'Promo Class Quality Score - Coding', col: 'promo_class_quality_score_coding' },
          { id: 'ch-qual-promo-9', name: 'Promo Students Engagement Score - Coding', col: 'promo_students_engagement_score_coding' },
          { id: 'ch-qual-promo-10', name: 'Promo Classes Audited- PS', col: 'promo_classes_audited_ps' },
          { id: 'ch-qual-promo-11', name: 'Promo Class Quality Score - PS', col: 'promo_class_quality_score_ps' },
          { id: 'ch-qual-promo-12', name: 'Promo Students Engagement Score - PS', col: 'promo_students_engagement_score_ps' },
        ],
      },
      // Academics - Enrolled Class Quality
      {
        id: 'm-qual-enrolled',
        subId: 's-qual-enrolled',
        name: 'Enrolled Class Quality',
        order: 1,
        kpi: false,
        sheetName: 'Enrolled Class Quality',
        charts: [
          { id: 'ch-qual-enrolled-1', name: 'Enrolled Classes Audited- Math', col: 'enrolled_classes_audited_math' },
          { id: 'ch-qual-enrolled-2', name: 'Enrolled Class Quality Score - Math', col: 'enrolled_class_quality_score_math' },
          { id: 'ch-qual-enrolled-3', name: 'Enrolled Students Engagement Score - Math', col: 'enrolled_students_engagement_score_math' },
          { id: 'ch-qual-enrolled-4', name: 'Enrolled Classes Audited- ELA', col: 'enrolled_classes_audited_ela' },
          { id: 'ch-qual-enrolled-5', name: 'Enrolled Class Quality Score - ELA', col: 'enrolled_class_quality_score_ela' },
          { id: 'ch-qual-enrolled-6', name: 'Enrolled Students Engagement Score - ELA', col: 'enrolled_students_engagement_score_ela' },
          { id: 'ch-qual-enrolled-7', name: 'Enrolled Classes Audited- Coding', col: 'enrolled_classes_audited_coding' },
          { id: 'ch-qual-enrolled-8', name: 'Enrolled Class Quality Score - Coding', col: 'enrolled_class_quality_score_coding' },
          { id: 'ch-qual-enrolled-9', name: 'Enrolled Students Engagement Score - Coding', col: 'enrolled_students_engagement_score_coding' },
          { id: 'ch-qual-enrolled-10', name: 'Enrolled Classes Audited- PS', col: 'enrolled_classes_audited_ps' },
          { id: 'ch-qual-enrolled-11', name: 'Enrolled Class Quality Score - PS', col: 'enrolled_class_quality_score_ps' },
          { id: 'ch-qual-enrolled-12', name: 'Enrolled Students Engagement Score - PS', col: 'enrolled_students_engagement_score_ps' },
        ],
      },
      // Support Summary
      {
        id: 'm-sum-sup',
        subId: 's-sum-sup',
        name: 'Overview',
        order: 0,
        kpi: true,
        sheetName: 'Overview',
        charts: [
          { id: 'ch-sum-sup-1', name: 'Occupancy Overall', col: 'occupancy_overall', kpi: true },
          { id: 'ch-sum-sup-2', name: 'Total Escalations', col: 'total_escalations', kpi: true },
          { id: 'ch-sum-sup-3', name: 'Refund Value', col: 'refund_value', kpi: true },
          { id: 'ch-sum-sup-4', name: 'Tickets Received', col: 'tickets_received', kpi: true },
        ],
      },
      // Schedule Management - Occupancy
      {
        id: 'm-sm-occ',
        subId: 's-sm-occ',
        name: 'Occupancy',
        order: 0,
        kpi: false,
        sheetName: 'Occupancy',
        charts: [
          { id: 'ch-sm-occ-1', name: 'Occupancy Overall', col: 'occupancy_overall' },
          { id: 'ch-sm-occ-2', name: 'Occupancy- Math', col: 'occupancy_math' },
          { id: 'ch-sm-occ-3', name: 'Occupancy- ELA', col: 'occupancy_ela' },
          { id: 'ch-sm-occ-4', name: 'Occupancy- Coding', col: 'occupancy_coding' },
          { id: 'ch-sm-occ-5', name: 'Occupancy- PS', col: 'occupancy_ps' },
        ],
      },
      // Schedule Management - Single Student Batches
      {
        id: 'm-sm-ssb',
        subId: 's-sm-ssb',
        name: 'Single Student Batches',
        order: 1,
        kpi: false,
        sheetName: 'Single Student Batches',
        charts: [
          { id: 'ch-sm-ssb-1', name: 'Single Student Batch Overall', col: 'single_student_batch_overall' },
          { id: 'ch-sm-ssb-2', name: 'Single Student Batch- Math', col: 'single_student_batch_math' },
          { id: 'ch-sm-ssb-3', name: 'Single Student Batch- ELA', col: 'single_student_batch_ela' },
          { id: 'ch-sm-ssb-4', name: 'Single Student Batch- Coding', col: 'single_student_batch_coding' },
          { id: 'ch-sm-ssb-5', name: 'Single Student Batch- PS', col: 'single_student_batch_ps' },
        ],
      },
      // Schedule Management - Dual Student Batches
      {
        id: 'm-sm-dsb',
        subId: 's-sm-dsb',
        name: 'Dual Student Batches',
        order: 2,
        kpi: false,
        sheetName: 'Dual Student Batches',
        charts: [
          { id: 'ch-sm-dsb-1', name: 'Dual Student Batches Overall', col: 'dual_student_batches_overall' },
          { id: 'ch-sm-dsb-2', name: 'Dual Student Batches- Math', col: 'dual_student_batches_math' },
          { id: 'ch-sm-dsb-3', name: 'Dual Student Batches- ELA', col: 'dual_student_batches_ela' },
          { id: 'ch-sm-dsb-4', name: 'Dual Student Batches- Coding', col: 'dual_student_batches_coding' },
          { id: 'ch-sm-dsb-5', name: 'Dual Student Batches- PS', col: 'dual_student_batches_ps' },
        ],
      },
      // Schedule Management - Teacher Forecast
      {
        id: 'm-sm-tf',
        subId: 's-sm-tf',
        name: 'Teacher Forecast',
        order: 3,
        kpi: false,
        sheetName: 'Teacher Forecast',
        charts: [
          { id: 'ch-sm-tf-1', name: 'Teacher Forecast Overall', col: 'teacher_forecast_overall' },
          { id: 'ch-sm-tf-2', name: 'Teacher Forecast- Math', col: 'teacher_forecast_math' },
          { id: 'ch-sm-tf-3', name: 'Teacher Forecast- ELA', col: 'teacher_forecast_ela' },
          { id: 'ch-sm-tf-4', name: 'Teacher Forecast- Coding', col: 'teacher_forecast_coding' },
          { id: 'ch-sm-tf-5', name: 'Teacher Forecast- PS', col: 'teacher_forecast_ps' },
        ],
      },
      // Escalation - External Escalation
      {
        id: 'm-esc-ext',
        subId: 's-esc-ext',
        name: 'External Escalation',
        order: 0,
        kpi: false,
        sheetName: 'External Escalation',
        charts: [
          { id: 'ch-esc-ext-1', name: 'Count of Escalation - External', col: 'count_of_escalation_external' },
          { id: 'ch-esc-ext-2', name: 'Response Time - External', col: 'response_time_external' },
          { id: 'ch-esc-ext-3', name: 'Resolution Time - External', col: 'resolution_time_external' },
          { id: 'ch-esc-ext-4', name: 'Escalation on Sales - External', col: 'escalation_on_sales_external' },
          { id: 'ch-esc-ext-5', name: 'Escalation on Support - External', col: 'escalation_on_support_external' },
          { id: 'ch-esc-ext-6', name: 'Escalation on SSM - External', col: 'escalation_on_ssm_external' },
          { id: 'ch-esc-ext-7', name: 'Escalation on Teachers - External', col: 'escalation_on_teachers_external' },
          { id: 'ch-esc-ext-8', name: 'Escalation on Academics - External', col: 'escalation_on_academics_external' },
          { id: 'ch-esc-ext-9', name: 'Escalation on Tech - External', col: 'escalation_on_tech_external' },
        ],
      },
      // Escalation - Internal Escalation
      {
        id: 'm-esc-int',
        subId: 's-esc-int',
        name: 'Internal Escalation',
        order: 1,
        kpi: false,
        sheetName: 'Internal Escalation',
        charts: [
          { id: 'ch-esc-int-1', name: 'Count of Escalation - Internal', col: 'count_of_escalation_internal' },
          { id: 'ch-esc-int-2', name: 'Response Time - Internal', col: 'response_time_internal' },
          { id: 'ch-esc-int-3', name: 'Resolution Time - Internal', col: 'resolution_time_internal' },
          { id: 'ch-esc-int-4', name: 'Escalation on Sales - Internal', col: 'escalation_on_sales_internal' },
          { id: 'ch-esc-int-5', name: 'Escalation on Support - Internal', col: 'escalation_on_support_internal' },
          { id: 'ch-esc-int-6', name: 'Escalation on SSM - Internal', col: 'escalation_on_ssm_internal' },
          { id: 'ch-esc-int-7', name: 'Escalation on Teachers - Internal', col: 'escalation_on_teachers_internal' },
          { id: 'ch-esc-int-8', name: 'Escalation on Academics - Internal', col: 'escalation_on_academics_internal' },
          { id: 'ch-esc-int-9', name: 'Escalation on Tech - Internal', col: 'escalation_on_tech_internal' },
        ],
      },
      // Escalation - ORM
      {
        id: 'm-esc-orm',
        subId: 's-esc-orm',
        name: 'ORM',
        order: 2,
        kpi: false,
        sheetName: 'ORM',
        charts: [
          { id: 'ch-esc-orm-1', name: 'Google Rating', col: 'google_rating' },
          { id: 'ch-esc-orm-2', name: 'Google Reviews', col: 'google_reviews' },
          { id: 'ch-esc-orm-3', name: 'Trustpilot Rating', col: 'trustpilot_rating' },
          { id: 'ch-esc-orm-4', name: 'Trustpilot Reviews', col: 'trustpilot_reviews' },
          { id: 'ch-esc-orm-5', name: 'AmbitionBox Rating', col: 'ambitionbox_rating' },
          { id: 'ch-esc-orm-6', name: 'AmbitionBox Reviews', col: 'ambitionbox_reviews' },
          { id: 'ch-esc-orm-7', name: 'Yelp Rating', col: 'yelp_rating' },
          { id: 'ch-esc-orm-8', name: 'Yelp Reviews', col: 'yelp_reviews' },
          { id: 'ch-esc-orm-9', name: 'Glassdoor Rating', col: 'glassdoor_rating' },
          { id: 'ch-esc-orm-10', name: 'Glassdoor Reviews', col: 'glassdoor_reviews' },
        ],
      },
      // Cancellation/Disenrollment - Cancellation
      {
        id: 'm-cd-canc',
        subId: 's-cd-canc',
        name: 'Cancellation',
        order: 0,
        kpi: false,
        sheetName: 'Cancellation',
        charts: [
          { id: 'ch-cd-canc-1', name: 'Count of Cancelled Subscription', col: 'count_of_cancelled_subscription' },
          { id: 'ch-cd-canc-2', name: 'Cancellation Reason- Not satisfied with acads/teacher style', col: 'cancellation_reason_not_satisfied_with_acads_teacher_style' },
          { id: 'ch-cd-canc-3', name: 'Cancellation Reason- Not satisfied with tech', col: 'cancellation_reason_not_satisfied_with_tech' },
          { id: 'ch-cd-canc-4', name: 'Cancellation Reason- Found a better alternative', col: 'cancellation_reason_found_a_better_alternative' },
          { id: 'ch-cd-canc-5', name: 'Cancellation Reason- Pricing is too high', col: 'cancellation_reason_pricing_is_too_high' },
          { id: 'ch-cd-canc-6', name: 'Cancellation Reason- Don\'t want to active subscription', col: 'cancellation_reason_dont_want_to_active_subscription' },
          { id: 'ch-cd-canc-7', name: 'Cancellation Reason- Taking breaks', col: 'cancellation_reason_taking_breaks' },
          { id: 'ch-cd-canc-8', name: 'Cancellation Reason- Internal (Pause student)', col: 'cancellation_reason_internal_pause_student' },
          { id: 'ch-cd-canc-9', name: 'Cancellation Reason- Junk cancellation', col: 'cancellation_reason_junk_cancellation' },
          { id: 'ch-cd-canc-10', name: 'Cancellation Reason- Refund/Refund cases', col: 'cancellation_reason_refund_refund_cases' },
          { id: 'ch-cd-canc-11', name: 'Cancellation Reason- Others', col: 'cancellation_reason_others' },
        ],
      },
      // Cancellation/Disenrollment - Refunds
      {
        id: 'm-cd-ref',
        subId: 's-cd-ref',
        name: 'Refunds',
        order: 1,
        kpi: false,
        sheetName: 'Refunds',
        charts: [
          { id: 'ch-cd-ref-1', name: 'Count of refunds processed', col: 'count_of_refunds_processed' },
          { id: 'ch-cd-ref-2', name: 'Refund value', col: 'refund_value' },
        ],
      },
      // Cancellation/Disenrollment - Disputes
      {
        id: 'm-cd-disp',
        subId: 's-cd-disp',
        name: 'Disputes',
        order: 2,
        kpi: false,
        sheetName: 'Disputes',
        charts: [
          { id: 'ch-cd-disp-1', name: 'Count of Disputes', col: 'count_of_disputes' },
          { id: 'ch-cd-disp-2', name: 'Disputes Won', col: 'disputes_won' },
          { id: 'ch-cd-disp-3', name: 'Disputes Taken out', col: 'disputes_taken_out' },
        ],
      },
      // Support - Customer Support
      {
        id: 'm-ops-cust',
        subId: 's-ops-cust',
        name: 'Customer Support',
        order: 0,
        kpi: false,
        sheetName: 'Customer Support',
        charts: [
          { id: 'ch-ops-cust-1', name: 'Tickets received', col: 'tickets_received' },
          { id: 'ch-ops-cust-2', name: 'Response Time', col: 'response_time' },
          { id: 'ch-ops-cust-3', name: 'Resolution Time', col: 'resolution_time' },
        ],
      },
      // Support - Teacher Support
      {
        id: 'm-ops-teach',
        subId: 's-ops-teach',
        name: 'Teacher Support',
        order: 1,
        kpi: false,
        sheetName: 'Teacher Support',
        charts: [
          { id: 'ch-ops-teach-1', name: 'Urgent Support- Lobby Notifications', col: 'urgent_support_lobby_notifications' },
          { id: 'ch-ops-teach-2', name: 'Urgent Support- Tech Issues', col: 'urgent_support_tech_issues' },
          { id: 'ch-ops-teach-3', name: 'Urgent Support- Counselling cancellation', col: 'urgent_support_counselling_cancellation' },
        ],
      },
      // Support - Sales & SSM Support
      {
        id: 'm-ops-ssm',
        subId: 's-ops-ssm',
        name: 'Sales & SSM Support',
        order: 2,
        kpi: false,
        sheetName: 'Sales & SSM Support',
        charts: [
          { id: 'ch-ops-ssm-1', name: 'Count of Billing Credits- Sales', col: 'count_of_billing_credits_sales' },
          { id: 'ch-ops-ssm-2', name: 'Count of Billing Credits- SSM', col: 'count_of_billing_credits_ssm' },
          { id: 'ch-ops-ssm-3', name: 'Billing Credits value- Sales', col: 'billing_credits_value_sales' },
          { id: 'ch-ops-ssm-4', name: 'Billing Credits value- SSM', col: 'billing_credits_value_ssm' },
        ],
      },

      // HR Summary
      {
        id: 'm-sum-hr',
        subId: 's-sum-hr',
        name: 'Overview',
        order: 0,
        kpi: true,
        sheetName: 'Overview',
        charts: [
          { id: 'ch-sum-hr-1', name: 'Total Open Positions', col: 'total_open_positions', kpi: true },
          { id: 'ch-sum-hr-2', name: 'Joining Count', col: 'joining_count', kpi: true },
          { id: 'ch-sum-hr-3', name: 'Total Exists (Exits)', col: 'total_exists_attrition', kpi: true },
          { id: 'ch-sum-hr-4', name: 'Payroll Completion %', col: 'payroll_completion_percent', kpi: true },
        ],
      },
      // Talent Acquisition - Open Demand Pipeline
      {
        id: 'm-ta-odp',
        subId: 's-ta-odp',
        name: 'Open Demand Pipeline',
        order: 0,
        kpi: false,
        sheetName: 'Open Demand Pipeline',
        charts: [
          { id: 'ch-ta-odp-1', name: 'Total Open Positions', col: 'total_open_positions' },
          { id: 'ch-ta-odp-2', name: 'Total Positions Closed', col: 'total_positions_closed' },
          { id: 'ch-ta-odp-3', name: 'Total Positions Delayed', col: 'total_positions_delayed' },
        ],
      },
      // Talent Acquisition - Recruitment SLA
      {
        id: 'm-ta-rsla',
        subId: 's-ta-rsla',
        name: 'Recruitment SLA',
        order: 1,
        kpi: false,
        sheetName: 'Recruitment SLA',
        charts: [
          { id: 'ch-ta-rsla-1', name: 'Average Time to Fill- Front liner', col: 'average_time_to_fill_front_liner' },
          { id: 'ch-ta-rsla-2', name: 'Average Time to Fill -Team Lead/Manager/SR Mgr', col: 'average_time_to_fill_team_lead_manager_sr_mgr' },
          { id: 'ch-ta-rsla-3', name: 'Average Time to Fill- GM/Director', col: 'average_time_to_fill_gm_director' },
        ],
      },
      // Talent Acquisition - Recruitment Funnel
      {
        id: 'm-ta-rf',
        subId: 's-ta-rf',
        name: 'Recruitment Funnel',
        order: 2,
        kpi: false,
        sheetName: 'Recruitment Funnel',
        charts: [
          { id: 'ch-ta-rf-1', name: 'Profiles Screened- R1 %', col: 'profiles_screened_r1_percent' },
          { id: 'ch-ta-rf-2', name: 'R1- R2 Conversion %', col: 'r1_r2_conversion_percent' },
          { id: 'ch-ta-rf-3', name: 'R2-R3 Conversion %', col: 'r2_r3_conversion_percent' },
          { id: 'ch-ta-rf-4', name: 'R3-Selected Conversion %', col: 'r3_selected_conversion_percent' },
        ],
      },
      // Talent Acquisition - Sourcing Efficiency
      {
        id: 'm-ta-se',
        subId: 's-ta-se',
        name: 'Sourcing Efficiency',
        order: 3,
        kpi: false,
        sheetName: 'Sourcing Efficiency',
        charts: [
          { id: 'ch-ta-se-1', name: 'Cost per Selected Candidate', col: 'cost_per_selected_candidate' },
        ],
      },
      // Onboarding - Joining %
      {
        id: 'm-onb-jp',
        subId: 's-onb-jp',
        name: 'Joining %',
        order: 0,
        kpi: false,
        sheetName: 'Joining %',
        charts: [
          { id: 'ch-onb-jp-1', name: 'Joining Count', col: 'joining_count' },
          { id: 'ch-onb-jp-2', name: 'Joining %', col: 'joining_percent' },
        ],
      },
      // Onboarding - Offer Drop %
      {
        id: 'm-onb-odp',
        subId: 's-onb-odp',
        name: 'Offer Drop %',
        order: 1,
        kpi: false,
        sheetName: 'Offer Drop %',
        charts: [
          { id: 'ch-onb-odp-1', name: 'Offer Drop Count', col: 'offer_drop_count' },
          { id: 'ch-onb-odp-2', name: 'Offer Drop %', col: 'offer_drop_percent' },
        ],
      },
      // Onboarding - New Hire Quality
      {
        id: 'm-onb-nhq',
        subId: 's-onb-nhq',
        name: 'New Hire Quality',
        order: 2,
        kpi: false,
        sheetName: 'New Hire Quality',
        charts: [
          { id: 'ch-onb-nhq-1', name: 'New Hire Retention 30 Days', col: 'new_hire_retention_30_days' },
          { id: 'ch-onb-nhq-2', name: 'New Hire Retention 90 Days', col: 'new_hire_retention_90_days' },
        ],
      },
      // Retention & Attrition - Attrition
      {
        id: 'm-ret-att',
        subId: 's-ret-att',
        name: 'Attrition',
        order: 0,
        kpi: false,
        sheetName: 'Attrition',
        charts: [
          { id: 'ch-ret-att-1', name: 'Total Exists', col: 'total_exists_attrition' },
          { id: 'ch-ret-att-2', name: 'Unwanted Attrition', col: 'unwanted_attrition' },
          { id: 'ch-ret-att-3', name: 'Attrition- Frontliners', col: 'attrition_frontliners' },
          { id: 'ch-ret-att-4', name: 'Attrition- TL+', col: 'attrition_tl_plus' },
          { id: 'ch-ret-att-5', name: 'Attrition- GM+', col: 'attrition_gm_plus' },
        ],
      },
      // Retention & Attrition - Retention
      {
        id: 'm-ret-ret',
        subId: 's-ret-ret',
        name: 'Retention',
        order: 1,
        kpi: false,
        sheetName: 'Retention',
        charts: [
          { id: 'ch-ret-ret-1', name: 'Employee in Notice Period', col: 'employee_in_notice_period' },
          { id: 'ch-ret-ret-2', name: 'Retained Employees', col: 'retained_employees' },
          { id: 'ch-ret-ret-3', name: 'Save Rate%', col: 'save_rate_percent' },
        ],
      },
      // Headcount Management - Head Count by Dept
      {
        id: 'm-hm-hcb',
        subId: 's-hm-hcb',
        name: 'Head Count by Dept',
        order: 0,
        kpi: false,
        sheetName: 'Head Count by Dept',
        charts: [
          { id: 'ch-hm-hcb-1', name: 'Teachers- Math', col: 'teachers_math' },
          { id: 'ch-hm-hcb-2', name: 'Teachers- ELA', col: 'teachers_ela' },
          { id: 'ch-hm-hcb-3', name: 'Teachers- ELA HW', col: 'teachers_ela_hw' },
          { id: 'ch-hm-hcb-4', name: 'Teachers- PS', col: 'teachers_ps' },
          { id: 'ch-hm-hcb-5', name: 'Teachers- Coding', col: 'teachers_coding' },
          { id: 'ch-hm-hcb-6', name: 'Academic Operations', col: 'academic_operations' },
          { id: 'ch-hm-hcb-7', name: 'Academic Training & Quality', col: 'academic_training_quality' },
          { id: 'ch-hm-hcb-8', name: 'HR', col: 'hr_headcount' },
          { id: 'ch-hm-hcb-9', name: 'IT', col: 'it_headcount' },
          { id: 'ch-hm-hcb-10', name: 'Marketing', col: 'marketing_headcount' },
          { id: 'ch-hm-hcb-11', name: 'Pedagogy ELA & PS', col: 'pedagogy_ela_ps' },
          { id: 'ch-hm-hcb-12', name: 'Pedagogy Math', col: 'pedagogy_math' },
          { id: 'ch-hm-hcb-13', name: 'Retention', col: 'retention_headcount' },
          { id: 'ch-hm-hcb-14', name: 'Sales', col: 'sales_headcount' },
          { id: 'ch-hm-hcb-15', name: 'QualityAudit', col: 'qualityaudit' },
          { id: 'ch-hm-hcb-16', name: 'B2B Sales', col: 'b2b_sales' },
          { id: 'ch-hm-hcb-17', name: 'CXO', col: 'cxo_headcount' },
          { id: 'ch-hm-hcb-18', name: 'Platform', col: 'platform_headcount' },
          { id: 'ch-hm-hcb-19', name: 'Total', col: 'total_headcount' },
        ],
      },
      // Headcount Management - Workforce Planning
      {
        id: 'm-hm-wp',
        subId: 's-hm-wp',
        name: 'Workforce Planning',
        order: 1,
        kpi: false,
        sheetName: 'Workforce Planning',
        charts: [
          { id: 'ch-hm-wp-1', name: 'Dept wise Capacity Gap - Sales', col: 'dept_wise_capacity_gap_sales' },
          { id: 'ch-hm-wp-2', name: 'Dept wise Capacity Gap - SSM', col: 'dept_wise_capacity_gap_ssm' },
          { id: 'ch-hm-wp-3', name: 'Dept wise Capacity Gap - Marketing', col: 'dept_wise_capacity_gap_marketing' },
          { id: 'ch-hm-wp-4', name: 'Dept wise Capacity Gap - Academics', col: 'dept_wise_capacity_gap_academics' },
          { id: 'ch-hm-wp-5', name: 'Dept wise Capacity Gap - IT', col: 'dept_wise_capacity_gap_it' },
          { id: 'ch-hm-wp-6', name: 'Dept wise Capacity Gap - B2B', col: 'dept_wise_capacity_gap_b2b' },
        ],
      },
      // Finance & HR Operations - Payroll
      {
        id: 'm-fho-pr',
        subId: 's-fho-pr',
        name: 'Payroll',
        order: 0,
        kpi: false,
        sheetName: 'Payroll',
        charts: [
          { id: 'ch-fho-pr-1', name: 'Payroll Completion %', col: 'payroll_completion_percent' },
        ],
      },
      // Finance & HR Operations - External Resources
      {
        id: 'm-fho-er',
        subId: 's-fho-er',
        name: 'External Resources',
        order: 1,
        kpi: false,
        sheetName: 'External Resources',
        charts: [
          { id: 'ch-fho-er-1', name: 'Consultant Cost', col: 'consultant_cost' },
          { id: 'ch-fho-er-2', name: 'CFO Cost', col: 'cfo_cost' },
        ],
      },

      // Channel Sales metrics
      {
        id: 'm-sum-cs',
        subId: 's-sum-cs',
        name: 'Overview',
        order: 0,
        kpi: true,
        sheetName: 'Overview',
        charts: [
          { id: 'ch-cs-sum-1', name: 'Total B2B Leads Created', col: 'total_b2b_leads_created', kpi: true },
          { id: 'ch-cs-sum-2', name: 'Active Partners - Cold Leads', col: 'active_partners_cold_leads', kpi: true },
          { id: 'ch-cs-sum-3', name: 'GSO Enrollment', col: 'gso_enrollment', kpi: true },
          { id: 'ch-cs-sum-4', name: 'GSO Revenue', col: 'gso_revenue', kpi: true },
        ],
      },
      {
        id: 'm-b2bleads-contacts',
        subId: 's-b2bleads-contacts',
        name: 'Contacts',
        order: 0,
        kpi: false,
        sheetName: 'Contacts',
        charts: [
          { id: 'ch-cs-b2b-1', name: 'Total B2B Leads Created', col: 'total_b2b_leads_created' },
          { id: 'ch-cs-b2b-2', name: 'B2B Leads Connected', col: 'b2b_leads_connected' },
          { id: 'ch-cs-b2b-3', name: 'B2B Leads Qualified', col: 'b2b_leads_qualified' },
          { id: 'ch-cs-b2b-4', name: 'Partners On-boarded', col: 'partners_onboarded' },
        ],
      },
      {
        id: 'm-coldleads-contacts-connects',
        subId: 's-coldleads-contacts-connects',
        name: 'Contacts & Connects - Cold Leads',
        order: 0,
        kpi: false,
        sheetName: 'Contacts & Connects - Cold Leads',
        charts: [
          { id: 'ch-cs-cold-ct-1', name: 'B2B leads created- Cold Leads', col: 'b2b_leads_created_cold_leads' },
          { id: 'ch-cs-cold-ct-2', name: 'Contacted attempted - Cold Leads', col: 'contacted_attempted_cold_leads' },
          { id: 'ch-cs-cold-ct-3', name: 'Dials - Cold Leads', col: 'dials_cold_leads' },
          { id: 'ch-cs-cold-ct-4', name: 'Manual Emails sent - Cold Leads', col: 'manual_emails_sent_cold_leads' },
          { id: 'ch-cs-cold-ct-5', name: 'Automated Emails sent - Cold Leads', col: 'automated_emails_sent_cold_leads' },
          { id: 'ch-cs-cold-ct-6', name: 'Avg Dials/Contacts - Cold Leads', col: 'avg_dials_contacts_cold_leads' },
          { id: 'ch-cs-cold-ct-7', name: 'Avg Emails/Contacts - Cold Leads', col: 'avg_emails_contacts_cold_leads' },
          { id: 'ch-cs-cold-ct-8', name: 'Connected - Cold Leads', col: 'connected_cold_leads' },
          { id: 'ch-cs-cold-ct-9', name: 'Connected Leads % - Cold Leads', col: 'connected_leads_percent_cold_leads' },
          { id: 'ch-cs-cold-ct-10', name: 'Qualified - Cold Leads', col: 'qualified_cold_leads' },
          { id: 'ch-cs-cold-ct-11', name: 'Qualified % - Cold Leads', col: 'qualified_percent_cold_leads' },
        ],
      },
      {
        id: 'm-coldleads-demo-health',
        subId: 's-coldleads-demo-health',
        name: 'Demo Health - Cold Leads',
        order: 1,
        kpi: false,
        sheetName: 'Demo Health - Cold Leads',
        charts: [
          { id: 'ch-cs-cold-dh-1', name: 'Demo scheduled - Cold Leads', col: 'demo_scheduled_cold_leads' },
          { id: 'ch-cs-cold-dh-2', name: 'Demo conducted - Cold Leads', col: 'demo_conducted_cold_leads' },
          { id: 'ch-cs-cold-dh-3', name: 'Demo conversion % - Cold Leads', col: 'demo_conversion_percent_cold_leads' },
          { id: 'ch-cs-cold-dh-4', name: 'Partners On-boarded - Cold Leads', col: 'partners_onboarded_cold_leads' },
        ],
      },
      {
        id: 'm-coldleads-partnership',
        subId: 's-coldleads-partnership',
        name: 'Partnership Health & Productivity - Cold Leads',
        order: 2,
        kpi: false,
        sheetName: 'Partnership Health & Productivity - Cold Leads',
        charts: [
          { id: 'ch-cs-cold-pp-1', name: 'Active Partners - Cold Leads', col: 'active_partners_cold_leads' },
          { id: 'ch-cs-cold-pp-2', name: 'Average days to onboard - Cold Leads', col: 'average_days_to_onboard_cold_leads' },
          { id: 'ch-cs-cold-pp-3', name: 'Parent Leads generated through Partner - Cold Leads', col: 'parent_leads_generated_through_partner_cold_leads' },
          { id: 'ch-cs-cold-pp-4', name: 'Referral Leads created through Partner - Cold Leads', col: 'referral_leads_created_through_partner_cold_leads' },
          { id: 'ch-cs-cold-pp-5', name: 'Referral to Partner Conversion - Cold Leads', col: 'referral_to_partner_conversion_cold_leads' },
        ],
      },
      {
        id: 'm-campleads-contacts-connects',
        subId: 's-campleads-contacts-connects',
        name: 'Contacts & Connects - Campaign Leads',
        order: 0,
        kpi: false,
        sheetName: 'Contacts & Connects - Campaign Leads',
        charts: [
          { id: 'ch-cs-camp-ct-1', name: 'B2B leads created- Campaign Leads', col: 'b2b_leads_created_campaign_leads' },
          { id: 'ch-cs-camp-ct-2', name: 'Contacted attempted - Campaign Leads', col: 'contacted_attempted_campaign_leads' },
          { id: 'ch-cs-camp-ct-3', name: 'Dials - Campaign Leads', col: 'dials_campaign_leads' },
          { id: 'ch-cs-camp-ct-4', name: 'Manual Emails sent - Campaign Leads', col: 'manual_emails_sent_campaign_leads' },
          { id: 'ch-cs-camp-ct-5', name: 'Automated Emails sent - Campaign Leads', col: 'automated_emails_sent_campaign_leads' },
          { id: 'ch-cs-camp-ct-6', name: 'Avg Dials/Contacts - Campaign Leads', col: 'avg_dials_contacts_campaign_leads' },
          { id: 'ch-cs-camp-ct-7', name: 'Avg Emails/Contacts - Campaign Leads', col: 'avg_emails_contacts_campaign_leads' },
          { id: 'ch-cs-camp-ct-8', name: 'Connected - Campaign Leads', col: 'connected_campaign_leads' },
          { id: 'ch-cs-camp-ct-9', name: 'Connected Leads % - Campaign Leads', col: 'connected_leads_percent_campaign_leads' },
          { id: 'ch-cs-camp-ct-10', name: 'Qualified - Campaign Leads', col: 'qualified_campaign_leads' },
          { id: 'ch-cs-camp-ct-11', name: 'Qualified % - Campaign Leads', col: 'qualified_percent_campaign_leads' },
        ],
      },
      {
        id: 'm-campleads-demo-health',
        subId: 's-campleads-demo-health',
        name: 'Demo Health - Campaign Leads',
        order: 1,
        kpi: false,
        sheetName: 'Demo Health - Campaign Leads',
        charts: [
          { id: 'ch-cs-camp-dh-1', name: 'Demo scheduled - Campaign Leads', col: 'demo_scheduled_campaign_leads' },
          { id: 'ch-cs-camp-dh-2', name: 'Demo conducted - Campaign Leads', col: 'demo_conducted_campaign_leads' },
          { id: 'ch-cs-camp-dh-3', name: 'Demo conversion % - Campaign Leads', col: 'demo_conversion_percent_campaign_leads' },
          { id: 'ch-cs-camp-dh-4', name: 'Partners On-boarded - Campaign Leads', col: 'partners_onboarded_campaign_leads' },
        ],
      },
      {
        id: 'm-campleads-partnership',
        subId: 's-campleads-partnership',
        name: 'Partnership Health & Productivity - Campaign Leads',
        order: 2,
        kpi: false,
        sheetName: 'Partnership Health & Productivity - Campaign Leads',
        charts: [
          { id: 'ch-cs-camp-pp-1', name: 'Active Partners - Campaign Leads', col: 'active_partners_campaign_leads' },
          { id: 'ch-cs-camp-pp-2', name: 'Average days to onboard - Campaign Leads', col: 'average_days_to_onboard_campaign_leads' },
          { id: 'ch-cs-camp-pp-3', name: 'Parent Leads generated through Partner - Campaign Leads', col: 'parent_leads_generated_through_partner_campaign_leads' },
          { id: 'ch-cs-camp-pp-4', name: 'Referral Leads created through Partner - Campaign Leads', col: 'referral_leads_created_through_partner_campaign_leads' },
          { id: 'ch-cs-camp-pp-5', name: 'Referral to Partner Conversion - Campaign Leads', col: 'referral_to_partner_conversion_campaign_leads' },
        ],
      },
      {
        id: 'm-parentoutreach-b2b',
        subId: 's-parentoutreach-b2b',
        name: 'Contacts & Connects - Parent Leads- B2B',
        order: 0,
        kpi: false,
        sheetName: 'Contacts & Connects - Parent Leads- B2B',
        charts: [
          { id: 'ch-cs-po-b2b-1', name: 'Contacted attempted - Parents B2B', col: 'contacted_attempted_parents_b2b' },
          { id: 'ch-cs-po-b2b-2', name: 'Dials Made- Parents B2B', col: 'dials_made_parents_b2b' },
          { id: 'ch-cs-po-b2b-3', name: 'Manual Emails sent -Parents B2B', col: 'manual_emails_sent_parents_b2b' },
          { id: 'ch-cs-po-b2b-4', name: 'Automated Emails sent - Parents B2B', col: 'automated_emails_sent_parents_b2b' },
          { id: 'ch-cs-po-b2b-5', name: 'Avg Dials/Contacts - Parents B2B', col: 'avg_dials_contacts_parents_b2b' },
          { id: 'ch-cs-po-b2b-6', name: 'Avg Emails/Contacts - Parents B2B', col: 'avg_emails_contacts_parents_b2b' },
          { id: 'ch-cs-po-b2b-7', name: 'Connected - Parents B2B', col: 'connected_parents_b2b' },
          { id: 'ch-cs-po-b2b-8', name: 'Connected Leads % - Parents B2B', col: 'connected_leads_percent_parents_b2b' },
        ],
      },
      {
        id: 'm-parentoutreach-gso',
        subId: 's-parentoutreach-gso',
        name: 'Contacts & Connects - Parent Leads- GSO',
        order: 1,
        kpi: false,
        sheetName: 'Contacts & Connects - Parent Leads- GSO',
        charts: [
          { id: 'ch-cs-po-gso-1', name: 'Contacted attempted - Parents GSO', col: 'contacted_attempted_parents_gso' },
          { id: 'ch-cs-po-gso-3', name: 'Dials Made- Parents GSO', col: 'dials_made_parents_gso' },
          { id: 'ch-cs-po-gso-4', name: 'Manual Emails sent -Parents GSO', col: 'manual_emails_sent_parents_gso' },
          { id: 'ch-cs-po-gso-5', name: 'Automated Emails sent - Parents GSO', col: 'automated_emails_sent_parents_gso' },
          { id: 'ch-cs-po-gso-6', name: 'Avg Dials/Contacts - Parents GSO', col: 'avg_dials_contacts_parents_gso' },
          { id: 'ch-cs-po-gso-7', name: 'Avg Emails/Contacts - Parents GSO', col: 'avg_emails_contacts_parents_gso' },
          { id: 'ch-cs-po-gso-8', name: 'Connected - Parents GSO', col: 'connected_parents_gso' },
          { id: 'ch-cs-po-gso-9', name: 'Connected Leads % - Parents GSO', col: 'connected_leads_percent_parents_gso' },
        ],
      },
      {
        id: 'm-parentjourney-assessment-demo',
        subId: 's-parentjourney-assessment-demo',
        name: 'Assessment & Demo',
        order: 0,
        kpi: false,
        sheetName: 'Assessment & Demo',
        charts: [
          { id: 'ch-cs-pj-ad-1', name: 'Assessment assigned', col: 'assessment_assigned' },
          { id: 'ch-cs-pj-ad-2', name: 'Connect- Assessment %', col: 'connect_assessment_percent' },
          { id: 'ch-cs-pj-ad-3', name: 'Completed assessment', col: 'completed_assessment' },
          { id: 'ch-cs-pj-ad-4', name: 'Assessment assigned to completed %', col: 'assessment_assigned_to_completed_percent' },
          { id: 'ch-cs-pj-ad-5', name: 'PCM Booked', col: 'pcm_booked_cs' },
          { id: 'ch-cs-pj-ad-6', name: 'Completed to PCM booked %', col: 'completed_to_pcm_booked_percent' },
          { id: 'ch-cs-pj-ad-7', name: 'PCM taken', col: 'pcm_taken_cs' },
          { id: 'ch-cs-pj-ad-8', name: 'PCM Booked to PCM taken %', col: 'pcm_booked_to_pcm_taken_percent' },
          { id: 'ch-cs-pj-ad-9', name: 'PCM- Positve', col: 'pcm_positive_cs' },
          { id: 'ch-cs-pj-ad-10', name: 'PCM- Negative', col: 'pcm_negative_cs' },
          { id: 'ch-cs-pj-ad-11', name: 'PCM- Neutral', col: 'pcm_neutral_cs' },
        ],
      },
      {
        id: 'm-parentjourney-gso-outcomes',
        subId: 's-parentjourney-gso-outcomes',
        name: 'GSO Outcomes',
        order: 1,
        kpi: false,
        sheetName: 'GSO Outcomes',
        charts: [
          { id: 'ch-cs-pj-go-1', name: 'GSO Enrollment', col: 'gso_enrollment' },
          { id: 'ch-cs-pj-go-2', name: 'GSO Revenue', col: 'gso_revenue' },
        ],
      },
      {
        id: 'm-team-headcount',
        subId: 's-team-headcount',
        name: 'Headcount',
        order: 0,
        kpi: false,
        sheetName: 'Headcount',
        charts: [
          { id: 'ch-cs-tm-hc-1', name: 'Count of active sellers', col: 'count_of_active_sellers' },
          { id: 'ch-cs-tm-hc-2', name: 'In-Training', col: 'active_sellers_in_training' },
          { id: 'ch-cs-tm-hc-3', name: 'Attrition', col: 'active_sellers_attrition' },
        ],
      },
      {
        id: 'm-team-productivity',
        subId: 's-team-productivity',
        name: 'Productivity',
        order: 1,
        kpi: false,
        sheetName: 'Productivity',
        charts: [
          { id: 'ch-cs-tm-pr-1', name: 'Total Calls', col: 'team_total_calls' },
          { id: 'ch-cs-tm-pr-2', name: 'Avg calls/Seller', col: 'avg_calls_seller' },
          { id: 'ch-cs-tm-pr-3', name: 'Avg calls/Day', col: 'avg_calls_day' },
          { id: 'ch-cs-tm-pr-4', name: 'Avg Manual Emails/seller', col: 'avg_manual_emails_seller' },
          { id: 'ch-cs-tm-pr-5', name: 'Avg Manual Emails/Day', col: 'avg_manual_emails_day' },
          { id: 'ch-cs-tm-pr-6', name: 'Avg Manual SMS/Seller', col: 'avg_manual_sms_seller' },
          { id: 'ch-cs-tm-pr-7', name: 'Avg Manual SMS/Day', col: 'avg_manual_sms_day' },
        ],
      },
      {
        id: 'm-roi-acquisition-cost',
        subId: 's-roi-acquisition-cost',
        name: 'Acquisition Cost',
        order: 0,
        kpi: false,
        sheetName: 'Acquisition Cost',
        charts: [
          { id: 'ch-cs-roi-ac-1', name: 'CPL- B2B leads', col: 'cpl_b2b_leads' },
          { id: 'ch-cs-roi-ac-2', name: 'Cost per Partner', col: 'cost_per_partner' },
          { id: 'ch-cs-roi-ac-3', name: 'Avg cost per parent lead created through Partnership', col: 'avg_cost_parent_lead_partnership' },
          { id: 'ch-cs-roi-ac-4', name: 'Cost per enrollment', col: 'cost_per_enrollment_cs' },
        ],
      },
      {
        id: 'm-roi-revenue-efficiency',
        subId: 's-roi-revenue-efficiency',
        name: 'Revenue Efficiency',
        order: 1,
        kpi: false,
        sheetName: 'Revenue Efficiency',
        charts: [
          { id: 'ch-cs-roi-re-1', name: 'Revenue per Partner', col: 'revenue_per_partner' },
          { id: 'ch-cs-roi-re-2', name: 'Avg Order Value', col: 'avg_order_value_cs' },
        ],
      },
    ],
    leadershipNotes: {
      sales: [
        {
          id: 'lns-sales-1',
          title: 'Enrollment Speed and Efficiency',
          notes: [
            'Week-on-Week trial registrations have outperformed standard targets by 11.2% due to targeted digital campaigns.',
            'Conversion rates on trial to full enrollment are trending steady at 82.5%, aligning with top-tier forecasts.',
            'Recommendation: Priority focus on older trial cohorts (leads > 60 days age) to arrest drop-offs.',
          ],
        },
        {
          id: 'lns-sales-2',
          title: 'Quality & Process Metrics',
          notes: [
            'Closure quality scores indicate minor friction on documentation steps; retraining scheduled for Tuesday.',
            'Onboarding bottlenecks identified specifically on standard curriculum configuration path.',
          ],
        },
      ],
      retention: [
        {
          id: 'lns-ret-1',
          title: 'Customer Satisfaction & Churn Analysis',
          notes: [
            'Customer satisfaction (CSAT) score remains exceptionally high at 94.8% for the 3rd consecutive week.',
            'Logo churn rate dipped by 1.4% WoW, marking the lowest churn level observed in Q2.',
            'Success squads triggered proactive health checkups for corporate tier accounts approaching renewals.',
          ],
        },
        {
          id: 'lns-ret-2',
          title: 'Feedback Loop & Support Tickets',
          notes: [
            'First response SLA metrics reached 98.1% compliance following standard staffing level alignment.',
            'Key user feedback points towards a request for simplified self-serve billing logs and invoice exports.',
          ],
        },
      ],
      marketing: [
        {
          id: 'lns-mkt-1',
          title: 'Growth & Inbound Performance',
          notes: [
            'Lead acquisition cost (CPA) corrected by 8.4% WoW due to campaign budget optimization on high-performing segments.',
            'Organic search click-through increased WoW by 5.3% as a result of primary keyword ranking improvement across major high-intent terms.',
            'Conversion rates of inbound marketing-qualified leads to sales-ready leads are holding strong at 12.8%.',
          ],
        },
        {
          id: 'lns-mkt-2',
          title: 'Device & Outbound Multi-channel',
          notes: [
            'Mobile traffic captures 64.2% of inbound engagement share, prompting localized UX funnel adjustments.',
            'Email blast click-to-open rates exceeded benchmarks by reaching 23.4% using curated onboarding drips.',
          ],
        },
      ],
      academics: [
        {
          id: 'lns-acad-1',
          title: 'Academic Content & Quality Index',
          notes: [
            'Math and Coding active students counts have seen steady growth of 4.2% WoW.',
            'Teacher attrition has stabilized at historic lows due to restructured teaching models and competitive tiers.',
            'Promo class quality audit scores have set a strong baseline across Math and ELA classes.',
          ],
        },
        {
          id: 'lns-acad-2',
          title: 'Class Conduction and Capacity Control',
          notes: [
            'Key target Student-Teacher ratios are adhering tightly within the optimized 15:1 limit.',
            'Catch-up class bookings have improved lesson delivery rates by 14% WoW succeeding the cancellation corrections.',
          ],
        },
      ],
      support: [
        {
          id: 'lns-sup-1',
          title: 'Schedule Management & Occupancy Optimization',
          notes: [
            'Active student seat occupancy remains highly optimized at 87% overall. Math is slightly over-allocated; coding has 14% free reserve capacity.',
            'Teacher supply forecasts aligned perfectly leading to low class cancellation rates due to staffing shortfalls.',
          ],
        },
        {
          id: 'lns-sup-2',
          title: 'Escalations & Customer Support SLAs',
          notes: [
            'Response SLA on critical support tickets met our target at 100% within the target window.',
            'Refund values corrected WoW down to historic lows after resolving major billing credit discrepancies.',
          ],
        },
      ],
      hr: [
        {
          id: 'lns-hr-1',
          title: 'Talent Acquisition & Sourcing Performance',
          notes: [
            'Target Talent Acquisition pipelines remain healthy with 12 open positions successfully closed inside standard SLA.',
            'Recruitment SLA targets experienced minor deviation for senior management posts due to candidate sourcing delays.',
          ],
        },
        {
          id: 'lns-hr-2',
          title: 'Attrition Trend and New Hire Quality',
          notes: [
            'New Hire Retention remains highly robust at 95% at the 30-day mark and 90% at the 90-day mark.',
            'Unwanted attrition dropped this cycle with targeted career pathing discussions implemented across frontliners.',
          ],
        },
      ],
      channel_sales: [
        {
          id: 'lns-cs-1',
          title: 'B2B Partner Sourcing & Onboarding',
          notes: [
            'B2B Leads created grew by 14% WoW as of the latest cycle, primarily driven by digital outreach and campaign leads.',
            'Onboarding cycle times for active cold-lead partners reduced slightly to an average of 12 days.',
            'Recommendation: Accelerate activation steps to tap into high-intent referral pipelines sooner.',
          ],
        },
        {
          id: 'lns-cs-2',
          title: 'Parent Conversion Journey',
          notes: [
            'Overall GSO enrollment volumes are tracking tightly on target with conversion of completed assessments hitting 84%.',
            'PCM efficiency remains stable, though we notice minor variance on GSO specific revenue due to product-mix shifts.',
          ],
        },
      ],
    },
  };
}
