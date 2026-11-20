// FAQ answers as published on /our-faqs/ (lightly edited for clarity; claims unchanged).
// "Track online" has been omitted because no online tracking tool exists (see audit §2.9).

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  { q: "What services do you offer?", a: "We offer comprehensive logistics solutions, including air freight, sea freight, road transport, customs clearance and project cargo handling." },
  { q: "How can I request a quote for your services?", a: "Contact our customer service team by phone or email, or fill out the quote request form on our contact page." },
  { q: "What is the estimated delivery time for shipments?", a: "Delivery times vary depending on the mode of transport, distance and the specific requirements of your shipment. We provide delivery estimates when you request a quote." },
  { q: "What documentation is required for international shipments?", a: "Typically a commercial invoice, packing list, bill of lading or air waybill, and any other documents specific to your shipment." },
  { q: "Can you provide tracking for my shipment?", a: "Yes, we offer tracking for your shipments. Contact our customer service team at any time for an update on your cargo." },
  { q: "Do you offer door-to-door delivery?", a: "Yes, we offer door-to-door delivery services for your convenience." },
  { q: "How do you handle project cargo?", a: "Our team specialises in project cargo, providing tailored solutions for large-scale or complex shipments — including planning, coordination and execution." },
  { q: "Do you offer insurance for my shipments?", a: "Yes, we offer insurance options for your shipments to protect your goods during transit." },
  { q: "How do you ensure the safety of my goods during transport?", a: "We follow strict safety protocols and use high-quality packaging materials to protect your goods, and our experienced team monitors shipments throughout." },
  { q: "What types of goods can you transport?", a: "A wide variety, including general cargo, perishable items, hazardous materials, oversized and overweight items, and project cargo." },
  { q: "What is the process for customs clearance?", a: "Our experienced team handles every aspect of customs clearance, including documentation, inspections and fees, for a smooth and efficient process." },
  { q: "What are your standard shipping rates?", a: "Rates vary depending on the service, distance and type of goods. Please contact our team for a detailed quote." },
  { q: "Where are you located?", a: "We are based in Lahore, Pakistan, and Dubai, UAE." },
  { q: "How can I contact your customer service team?", a: "You can reach our team by phone, email or WhatsApp. All contact details are on our contact page." },
];
