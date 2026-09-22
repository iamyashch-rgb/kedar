export type Language = 'en' | 'hi';

export interface TranslationKeys {
  // Navigation & Header
  nav_about: string;
  nav_properties: string;
  nav_land: string;
  nav_construction: string;
  nav_process: string;
  nav_contact: string;
  nav_admin: string;
  nav_start_project: string;

  // Language Selector
  lang_en: string;
  lang_hi: string;
  select_language: string;

  // Hero Section
  hero_tagline: string;
  hero_headline1: string;
  hero_headline2: string;
  hero_subtitle: string;
  hero_cta_explore: string;
  hero_cta_consult: string;
  hero_buy_properties: string;
  hero_sell_properties: string;
  hero_stat_1_val: string;
  hero_stat_1_lbl: string;
  hero_stat_2_val: string;
  hero_stat_2_lbl: string;
  hero_stat_3_val: string;
  hero_stat_3_lbl: string;

  // Construction Scroll Section
  scroll_badge: string;
  scroll_title: string;
  scroll_step_1_title: string;
  scroll_step_1_desc: string;
  scroll_step_2_title: string;
  scroll_step_2_desc: string;
  scroll_step_3_title: string;
  scroll_step_3_desc: string;
  scroll_step_4_title: string;
  scroll_step_4_desc: string;

  // About Section
  about_eyebrow: string;
  about_title_1: string;
  about_title_2: string;
  about_desc: string;
  about_pillar_1_title: string;
  about_pillar_1_desc: string;
  about_pillar_2_title: string;
  about_pillar_2_desc: string;
  about_pillar_3_title: string;
  about_pillar_3_desc: string;

  // Services Section
  services_eyebrow: string;
  services_title: string;
  services_subtitle: string;
  service_1_title: string;
  service_1_desc: string;
  service_2_title: string;
  service_2_desc: string;
  service_3_title: string;
  service_3_desc: string;
  service_4_title: string;
  service_4_desc: string;

  // Featured Properties Section
  properties_eyebrow: string;
  properties_title: string;
  tab_all: string;
  tab_residential: string;
  tab_commercial: string;
  tab_land: string;
  card_view_details: string;
  card_inquire: string;
  prop_price: string;
  prop_area: string;
  prop_location: string;
  prop_config: string;
  prop_availability: string;
  prop_rera: string;

  // Land Dealing Section
  land_eyebrow: string;
  land_title: string;
  land_desc: string;
  land_type_res: string;
  land_type_comm: string;
  land_type_agri: string;
  land_cta: string;

  // Construction Scope Section
  scope_eyebrow: string;
  scope_title: string;
  scope_desc: string;
  scope_item_1: string;
  scope_item_2: string;
  scope_item_3: string;
  scope_item_4: string;
  scope_item_5: string;
  scope_item_6: string;

  // Process Section
  process_eyebrow: string;
  process_title: string;
  process_step_1_title: string;
  process_step_1_desc: string;
  process_step_2_title: string;
  process_step_2_desc: string;
  process_step_3_title: string;
  process_step_3_desc: string;
  process_step_4_title: string;
  process_step_4_desc: string;

  // Consultation CTA Section
  cta_eyebrow: string;
  cta_title: string;
  cta_subtitle: string;
  form_name: string;
  form_phone: string;
  form_email: string;
  form_service: string;
  form_service_select: string;
  form_service_buy: string;
  form_service_sell: string;
  form_service_land: string;
  form_service_const: string;
  form_message: string;
  form_submit: string;
  form_success: string;
  form_success_desc: string;

  // Footer Section
  footer_tagline_1: string;
  footer_tagline_2: string;
  footer_identity: string;
  footer_nav_title: string;
  footer_desk_title: string;
  footer_channels_title: string;
  footer_rights: string;
  footer_privacy: string;
  footer_terms: string;

  // Modals & Common CTAs
  modal_inquire_title: string;
  modal_inquire_desc: string;
  modal_close: string;
  modal_submitted: string;
  btn_whatsapp: string;
  btn_call: string;
  admin_portal: string;
  admin_title: string;
  admin_add_new: string;
  admin_close: string;
  key_highlights: string;
  specifications_overview: string;
  connect_advisory: string;
}

export const translations: Record<Language, TranslationKeys> = {
  en: {
    // Navigation & Header
    nav_about: 'About',
    nav_properties: 'Properties',
    nav_land: 'Land',
    nav_construction: 'Construction',
    nav_process: 'Process',
    nav_contact: 'Contact',
    nav_admin: 'ADMIN PORTAL',
    nav_start_project: 'Start a Project',

    // Language Selector
    lang_en: 'EN',
    lang_hi: 'हिंदी',
    select_language: 'Select Language',

    // Hero Section
    hero_tagline: 'PREMIER REALTY & CONSTRUCTION • UTTARAKHAND',
    hero_headline1: 'BUY & SELL PROPERTIES',
    hero_headline2: 'IN UTTARAKHAND.',
    hero_subtitle: 'Dehradun, Mussoorie, Rishikesh & Nainital\'s premier property dealer. Buy verified villas & land or sell your property with 100% legal title assurance and turnkey construction.',
    hero_cta_explore: 'EXPLORE ASSETS',
    hero_cta_consult: 'BOOK CONSULTATION',
    hero_buy_properties: 'BUY PROPERTIES',
    hero_sell_properties: 'SELL YOUR PROPERTY',
    hero_stat_1_val: '15+ YEARS',
    hero_stat_1_lbl: 'ARCHITECTURAL LEGACY',
    hero_stat_2_val: '100% RERA',
    hero_stat_2_lbl: 'VERIFIED TITLE DEEDS',
    hero_stat_3_val: '500+ PROJECTS',
    hero_stat_3_lbl: 'DELIVERED NATIONWIDE',

    // Construction Scroll Section
    scroll_badge: '[ CIVIL & INFRASTRUCTURE ENGINEERING ]',
    scroll_title: 'FROM BLUEPRINT TO LANDMARK HANDOVER',
    scroll_step_1_title: 'Land & Soil Assessment',
    scroll_step_1_desc: 'Detailed geotechnical survey, legal title verification, and site contour grading.',
    scroll_step_2_title: 'Architectural Blueprinting',
    scroll_step_2_desc: 'CAD structural drafting, 3D BIM modeling, and municipal sanction approvals.',
    scroll_step_3_title: 'Superstructure Execution',
    scroll_step_3_desc: 'Reinforced concrete framing, high-grade steel fabrication, and precision masonry.',
    scroll_step_4_title: 'Turnkey Interior & Handover',
    scroll_step_4_desc: 'Bespoke interior finishes, structural audit clearance, and key delivery.',

    // About Section
    about_eyebrow: '[ CORPORATE OVERVIEW ]',
    about_title_1: 'BUILT ON TRUST,',
    about_title_2: 'ENGINEERED FOR GENERATIONS.',
    about_desc: 'Kedar Property is India\'s premier integrated real estate, land dealing, and turnkey construction conglomerate with PAN-India operations across residential, commercial, and land acquisition sectors.',
    about_pillar_1_title: 'Verified Title Assets',
    about_pillar_1_desc: 'Every property is 100% legally clear, RERA registered, and title-deed verified for zero risk.',
    about_pillar_2_title: 'End-to-End Civil Execution',
    about_pillar_2_desc: 'In-house civil engineers, structural architects, and modern heavy construction machinery.',
    about_pillar_3_title: 'PAN-India Footprint',
    about_pillar_3_desc: 'Active developments across Delhi NCR, Gurugram, Mumbai, Bengaluru, Hyderabad, and Goa.',

    // Services Section
    services_eyebrow: '[ CORE DIVISIONS ]',
    services_title: 'OUR REAL ESTATE & CIVIL SERVICES',
    services_subtitle: 'Comprehensive property solutions from plot acquisition to luxury structural construction.',
    service_1_title: 'Property Buying & Selling',
    service_1_desc: 'Curated residential apartments, villas, and commercial properties with total price transparency.',
    service_2_title: 'Land & Plot Acquisition',
    service_2_desc: 'Verified agricultural, residential, and commercial land deals with legal due diligence.',
    service_3_title: 'Turnkey Building Construction',
    service_3_desc: 'Complete architectural design, foundation work, and structural execution under one roof.',
    service_4_title: 'Legal & Valuation Advisory',
    service_4_desc: 'Expert title clearance reports, market valuation, and RERA registration support.',

    // Featured Properties Section
    properties_eyebrow: '[ EXCLUSIVE INVENTORY ]',
    properties_title: 'FEATURED REAL ESTATE ASSETS',
    tab_all: 'ALL ASSETS',
    tab_residential: 'RESIDENTIAL',
    tab_commercial: 'COMMERCIAL',
    tab_land: 'LAND & PLOTS',
    card_view_details: 'VIEW SPECIFICATIONS',
    card_inquire: 'INQUIRE NOW',
    prop_price: 'OFFERING PRICE',
    prop_area: 'AREA / SIZE',
    prop_location: 'LOCATION',
    prop_config: 'CONFIGURATION',
    prop_availability: 'AVAILABILITY',
    prop_rera: 'RERA REGISTRATION',

    // Land Dealing Section
    land_eyebrow: '[ LAND ACQUISITION WING ]',
    land_title: 'PRIME PLOTS & LAND FOR DEVELOPMENT',
    land_desc: 'Clear-title agricultural, residential, and commercial land packages across India\'s prime growth corridors.',
    land_type_res: 'Residential Plots',
    land_type_comm: 'Commercial Land',
    land_type_agri: 'Agricultural Farm Land',
    land_cta: 'REQUEST LAND CATALOG',

    // Construction Scope Section
    scope_eyebrow: '[ STRUCTURAL EXECUTION ]',
    scope_title: 'TURNKEY CIVIL CONSTRUCTION SCOPE',
    scope_desc: 'We engineer high-durability reinforced concrete structures built to seismic safety standards.',
    scope_item_1: 'Foundation & Earthworks',
    scope_item_2: 'Reinforced Structural Frame',
    scope_item_3: 'Civil Masonry & Plaster',
    scope_item_4: 'MEP & Electrical Systems',
    scope_item_5: 'Premium Interior Finishing',
    scope_item_6: 'Quality Audit & Handover',

    // Process Section
    process_eyebrow: '[ METHODOLOGY ]',
    process_title: 'HOW WE DELIVER EXCELLENCE',
    process_step_1_title: 'Consultation & Requirement Analysis',
    process_step_1_desc: 'Understanding your investment goals, budget parameters, and site preferences.',
    process_step_2_title: 'Site Selection & Due Diligence',
    process_step_2_desc: 'Verifying legal ownership, RERA status, and soil feasibility report.',
    process_step_3_title: 'Architectural Design & Approval',
    process_step_3_desc: 'Developing structural blueprints and securing municipal sanctions.',
    process_step_4_title: 'Civil Execution & Key Handover',
    process_step_4_desc: 'Precision construction execution with strict quality control and timely delivery.',

    // Consultation CTA Section
    cta_eyebrow: '[ DIRECT ADVISORY ]',
    cta_title: 'READY TO BUILD OR INVEST?',
    cta_subtitle: 'Schedule a consultation with our senior real estate & civil engineering experts.',
    form_name: 'Full Name',
    form_phone: 'Phone / WhatsApp',
    form_email: 'Email Address',
    form_service: 'Select Service Requirement',
    form_service_select: '-- Choose Division --',
    form_service_buy: 'Buy Property / Plot in Uttarakhand',
    form_service_sell: 'Sell / List My Property in Uttarakhand',
    form_service_land: 'Land / Plot Acquisition',
    form_service_const: 'Turnkey Building Construction',
    form_message: 'Project Brief / Query',
    form_submit: 'SUBMIT ENQUIRY',
    form_success: 'ENQUIRY SUBMITTED SUCCESSFULLY',
    form_success_desc: 'Our senior advisory desk will reach out to you within 2 business hours.',

    // Footer Section
    footer_tagline_1: 'FROM LAND',
    footer_tagline_2: 'TO LEGACY.',
    footer_identity: '[ ENTERPRISE IDENTITY ]',
    footer_nav_title: 'NAVIGATION',
    footer_desk_title: 'CORPORATE DESK',
    footer_channels_title: 'OFFICIAL CHANNELS',
    footer_rights: 'ALL RIGHTS RESERVED.',
    footer_privacy: 'PRIVACY POLICY',
    footer_terms: 'TERMS & CONDITIONS',

    // Modals & Common CTAs
    modal_inquire_title: 'Inquire About This Asset',
    modal_inquire_desc: 'Connect with our senior advisory team for legal search reports & site visits.',
    modal_close: 'Close',
    modal_submitted: 'INQUIRY SUBMITTED',
    btn_whatsapp: 'WHATSAPP ADVISORY',
    btn_call: 'CALL DESK',
    admin_portal: 'ADMIN PORTAL',
    admin_title: 'Kedar Property Management Portal',
    admin_add_new: 'ADD NEW PROPERTY',
    admin_close: 'Exit Admin Portal',
    key_highlights: 'KEY HIGHLIGHTS',
    specifications_overview: 'Architectural Specification & Asset Overview',
    connect_advisory: 'Connect with our senior advisory team for legal search reports & site visits.',
  },
  hi: {
    // Navigation & Header
    nav_about: 'हमारे बारे में',
    nav_properties: 'संपत्तियां',
    nav_land: 'भूमि व प्लॉट',
    nav_construction: 'निर्माण कार्य',
    nav_process: 'कार्य प्रक्रिया',
    nav_contact: 'संपर्क करें',
    nav_admin: 'एडमिन पोर्टल',
    nav_start_project: 'प्रोजेक्ट शुरू करें',

    // Language Selector
    lang_en: 'EN',
    lang_hi: 'हिंदी',
    select_language: 'भाषा चुनें',

    // Hero Section
    hero_tagline: 'उत्तराखंड का प्रमुख रियल एस्टेट और निर्माण संस्थान',
    hero_headline1: 'उत्तराखंड में खरीदें व बेचें',
    hero_headline2: 'सत्यापित संपत्तियां।',
    hero_subtitle: 'देहरादून, मसूरी, ऋषिकेश व नैनीताल में प्रमुख प्रॉपर्टी डीलर। सत्यापित विला, प्लॉट और ज़मीन खरीदें या अपनी संपत्ति 100% कानूनी सुरक्षा के साथ बेचें।',
    hero_cta_explore: 'संपत्तियां देखें',
    hero_cta_consult: 'परामर्श बुक करें',
    hero_buy_properties: 'संपत्ति खरीदें',
    hero_sell_properties: 'अपनी संपत्ति बेचें',
    hero_stat_1_val: '15+ वर्ष',
    hero_stat_1_lbl: 'स्थापत्य विरासत',
    hero_stat_2_val: '100% रेरा',
    hero_stat_2_lbl: 'सत्यापित स्वामित्व दस्तावेज',
    hero_stat_3_val: '500+ प्रोजेक्ट्स',
    hero_stat_3_lbl: 'देशभर में पूर्ण',

    // Construction Scroll Section
    scroll_badge: '[ सिविल एवं अवसंरचना इंजीनियरिंग ]',
    scroll_title: 'ब्लूप्रिंट से लैंडमार्क हैंडओवर तक',
    scroll_step_1_title: 'भूमि एवं मृदा परीक्षण',
    scroll_step_1_desc: 'विस्तृत भू-तकनीकी सर्वेक्षण, कानूनी शीर्षक सत्यापन और साइट ग्रेडिंग।',
    scroll_step_2_title: 'स्थापत्य योजना व ब्लूप्रिंट',
    scroll_step_2_desc: 'सीएडी संरचनात्मक डिजाइनिंग, 3D बीआईएम मॉडलिंग और नगर निगम स्वीकृति।',
    scroll_step_3_title: 'सुपरस्ट्रक्चर निर्माण',
    scroll_step_3_desc: 'प्रबलित कंक्रीट फ़्रेमिंग, उच्च गुणवत्ता वाले इस्पात निर्माण और चिनाई कार्य।',
    scroll_step_4_title: 'टर्नकी इंटीरियर व हैंडओवर',
    scroll_step_4_desc: 'कस्टम इंटीरियर फ़िनिश, स्ट्रक्चरल ऑडिट क्लीयरेंस और चाबी सौंपना।',

    // About Section
    about_eyebrow: '[ कॉर्पोरेट परिचय ]',
    about_title_1: 'विश्वास पर निर्मित,',
    about_title_2: 'पीढ़ियों के लिए इंजीनियर।',
    about_desc: 'केदार प्रॉपर्टी भारत का प्रमुख एकीकृत रियल एस्टेट, भूमि सौदेबाजी और टर्नकी निर्माण संस्थान है जो आवासीय, वाणिज्यिक और भूमि अधिग्रहण क्षेत्रों में अखिल भारतीय स्तर पर कार्यरत है।',
    about_pillar_1_title: 'सत्यापित शीर्षक संपत्तियां',
    about_pillar_1_desc: 'प्रत्येक संपत्ति कानूनी रूप से 100% स्पष्ट, रेरा पंजीकृत और शीर्षक सत्यापन के साथ आती है।',
    about_pillar_2_title: 'पूर्ण सिविल निर्माण',
    about_pillar_2_desc: 'अनुभवी सिविल इंजीनियर, संरचनात्मक वास्तुकार और आधुनिक भारी निर्माण मशीनरी।',
    about_pillar_3_title: 'अखिल भारतीय उपस्थिति',
    about_pillar_3_desc: 'दिल्ली एनसीआर, गुरुग्राम, मुंबई, बेंगलुरु, हैदराबाद और गोवा में सक्रिय परियोजनाएं।',

    // Services Section
    services_eyebrow: '[ मुख्य सेवाएं ]',
    services_title: 'हमारी रियल एस्टेट और सिविल सेवाएं',
    services_subtitle: 'प्लॉट अधिग्रहण से लेकर लक्जरी भवन निर्माण तक पूर्ण संपत्ति समाधान।',
    service_1_title: 'संपत्ति खरीद व बिक्री',
    service_1_desc: 'पूर्ण पारदर्शिता के साथ सत्यापित आवासीय अपार्टमेंट, लक्जरी विला और वाणिज्यिक संपत्तियां।',
    service_2_title: 'भूमि एवं प्लॉट अधिग्रहण',
    service_2_desc: 'कानूनी जांच के साथ सत्यापित कृषि, आवासीय और वाणिज्यिक भूमि सौदे।',
    service_3_title: 'टर्नकी भवन निर्माण',
    service_3_desc: 'एक ही स्थान पर पूर्ण वास्तुकला डिजाइन, मजबूत नींव और संरचनात्मक निर्माण।',
    service_4_title: 'कानूनी एवं मूल्यांकन परामर्श',
    service_4_desc: 'विशेषज्ञ शीर्षक निकासी रिपोर्ट, बाजार मूल्य मूल्यांकन और रेरा पंजीकरण सहायता।',

    // Featured Properties Section
    properties_eyebrow: '[ विशेष संपत्ति सूची ]',
    properties_title: 'प्रमुख रियल एस्टेट संपत्तियां',
    tab_all: 'सभी संपत्तियां',
    tab_residential: 'आवासीय',
    tab_commercial: 'वाणिज्यिक',
    tab_land: 'भूमि व प्लॉट',
    card_view_details: 'विवरण देखें',
    card_inquire: 'अभी पूछताछ करें',
    prop_price: 'प्रस्तावित मूल्य',
    prop_area: 'क्षेत्रफल / आकार',
    prop_location: 'स्थान',
    prop_config: 'संरचना',
    prop_availability: 'उपलब्धता',
    prop_rera: 'रेरा पंजीकरण',

    // Land Dealing Section
    land_eyebrow: '[ भूमि अधिग्रहण विंग ]',
    land_title: 'विकास के लिए प्रमुख भूखंड और भूमि',
    land_desc: 'प्रमुख विकास गलियारों में स्पष्ट-शीर्षक कृषि, आवासीय और वाणिज्यिक भूमि पैकेज।',
    land_type_res: 'आवासीय भूखंड',
    land_type_comm: 'वाणिज्यिक भूमि',
    land_type_agri: 'कृषि एवं फार्म भूमि',
    land_cta: 'भूमि कैटलॉग प्राप्त करें',

    // Construction Scope Section
    scope_eyebrow: '[ संरचनात्मक निर्माण ]',
    scope_title: 'टर्नकी सिविल निर्माण दायरा',
    scope_desc: 'हम भूकंपीय सुरक्षा मानकों के अनुसार निर्मित उच्च टिकाऊ प्रबलित कंक्रीट संरचनाओं का निर्माण करते हैं।',
    scope_item_1: 'नींव और अर्थवर्क्स',
    scope_item_2: 'प्रबलित संरचनात्मक ढांचा',
    scope_item_3: 'सिविल चिनाई और प्लास्टर',
    scope_item_4: 'एमईपी और इलेक्ट्रिकल सिस्टम',
    scope_item_5: 'प्रीमियम इंटीरियर फ़िनिशिंग',
    scope_item_6: 'गुणवत्ता ऑडिट और हैंडओवर',

    // Process Section
    process_eyebrow: '[ कार्यप्रणाली ]',
    process_title: 'हमारी कार्य प्रक्रिया',
    process_step_1_title: 'परामर्श और आवश्यकता विश्लेषण',
    process_step_1_desc: 'आपके निवेश लक्ष्यों, बजट सीमाओं और स्थान प्राथमिकताओं को समझना।',
    process_step_2_title: 'साइट चयन और कानूनी जांच',
    process_step_2_desc: 'कानूनी स्वामित्व, रेरा स्थिति और भूमि क्षमता रिपोर्ट का सत्यापन।',
    process_step_3_title: 'स्थापत्य डिजाइन और स्वीकृति',
    process_step_3_desc: 'संरचनात्मक ब्लूप्रिंट तैयार करना और नगर निगम की मंजूरी प्राप्त करना।',
    process_step_4_title: 'सिविल निर्माण और चाबी सौंपना',
    process_step_4_desc: 'कड़े गुणवत्ता नियंत्रण और समय पर वितरण के साथ सटीक निर्माण निष्पादन।',

    // Consultation CTA Section
    cta_eyebrow: '[ प्रत्यक्ष परामर्श ]',
    cta_title: 'निर्माण या निवेश के लिए तैयार हैं?',
    cta_subtitle: 'हमारे वरिष्ठ रियल एस्टेट और सिविल इंजीनियरिंग विशेषज्ञों के साथ परामर्श शेड्यूल करें।',
    form_name: 'पूरा नाम',
    form_phone: 'फोन / व्हाट्सएप',
    form_email: 'ईमेल पता',
    form_service: 'सेवा का चयन करें',
    form_service_select: '-- विभाग चुनें --',
    form_service_buy: 'उत्तराखंड में संपत्ति / प्लॉट खरीदें',
    form_service_sell: 'उत्तराखंड में अपनी संपत्ति बेचें / सूचीबद्ध करें',
    form_service_land: 'भूमि / प्लॉट अधिग्रहण',
    form_service_const: 'टर्नकी भवन निर्माण',
    form_message: 'प्रोजेक्ट विवरण / प्रश्न',
    form_submit: 'पूछताछ भेजें',
    form_success: 'पूछताछ सफलतापूर्वक सबमिट की गई',
    form_success_desc: 'हमारी वरिष्ठ सलाहकार टीम 2 कार्य घंटों के भीतर आपसे संपर्क करेगी।',

    // Footer Section
    footer_tagline_1: 'भूमि से',
    footer_tagline_2: 'विरासत तक।',
    footer_identity: '[ कॉर्पोरेट पहचान ]',
    footer_nav_title: 'नेविगेशन',
    footer_desk_title: 'कॉर्पोरेट डेस्क',
    footer_channels_title: 'आधिकारिक चैनल',
    footer_rights: 'सर्वाधिकार सुरक्षित।',
    footer_privacy: 'गोपनीयता नीति',
    footer_terms: 'नियम और शर्तें',

    // Modals & Common CTAs
    modal_inquire_title: 'इस संपत्ति के बारे में पूछताछ करें',
    modal_inquire_desc: 'कानूनी खोज रिपोर्ट और साइट विज़िट के लिए हमारी वरिष्ठ सलाहकार टीम से जुड़ें।',
    modal_close: 'बंद करें',
    modal_submitted: 'पूछताछ सबमिट की गई',
    btn_whatsapp: 'व्हाट्सएप परामर्श',
    btn_call: 'कॉल करें',
    admin_portal: 'एडमिन पोर्टल',
    admin_title: 'केदार प्रॉपर्टी प्रबंधन पोर्टल',
    admin_add_new: 'नई संपत्ति जोड़ें',
    admin_close: 'एडमिन पोर्टल से बाहर निकलें',
    key_highlights: 'मुख्य विशेषताएं',
    specifications_overview: 'स्थापत्य विनिर्देश एवं संपत्ति विवरण',
    connect_advisory: 'कानूनी रिपोर्ट और साइट विजिट के लिए हमारी टीम से संपर्क करें।',
  },
};
