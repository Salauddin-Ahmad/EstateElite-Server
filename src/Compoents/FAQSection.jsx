import { useState } from "react";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is your return policy?",
      answer:
        "Yes, we offer a 30-day return policy for all eligible items. Please refer to our Return Policy page for more details.",
    },
    {
      question: "Why was my offer not accepted?",
      answer:
        "There could be several reasons why your offer was not accepted. Please ensure that your offer meets the seller's requirements and consider reaching out to the seller directly for more information.",
    },
    {
      question: "Do you have a change of mind policy?",
      answer:
        "Yes, we allow changes of mind within 7 days of purchase, provided the item is in its original condition. Contact our support team for assistance.",
    },
    {
      question: "Can I schedule a property viewing?",
      answer:
        "Yes, you can schedule a property viewing through our website or by contacting the assigned agent directly. We recommend booking in advance.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can contact our customer support via email, phone, or live chat on our website. Our support team is available 24/7 to assist you.",
    },
    // Add more FAQ items as needed
  ];

  return (
    <>
      <h2 className="text-3xl font-bold mb-8 text-center font-sans my-8">
        Frequently Asked Questions
      </h2>
      <div className="faq-section bg-slate-100 p-6 rounded-lg shadow-md mb-10">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="faq-item border-b-2 border-gray-300 pb-4 mb-3"
          >
            <div
              className="faq-question cursor-pointer flex justify-between items-center"
              onClick={() => handleToggleAccordion(index)}
            >
              <h3 className="text-lg font-medium">{faq.question}</h3>
              <span
                className={`icon transform ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              >
                &#9660;
              </span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer mt-4">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default FAQSection;
