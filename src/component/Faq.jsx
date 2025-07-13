import React, { useState } from 'react';
import './Faq.css';

function Faq() {
    const faqList = [
        {
            ques: "Can I trial Webflow before paying?",
            ans: "Sure! You can test out Webflow on our free plan where you can experiment with 2 projects. Your unhosted projects will have a two-page limit, but you can purchase a site plan on a per-project basis to unlock up to 100 static pages and additional CMS pages."
        },
        {
            ques: "How many projects can I create?",
            ans: "You can create up to 2 projects on the free plan. Upgrade to unlock more features and remove the two-page limit."
        },
        {
            ques: "Can I use Webflow for free forever?",
            ans: "Yes! You can use Webflow's free plan as long as you want. To unlock more features, you can choose to upgrade."
        }
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenIndex(prevIndex => prevIndex === index ? null : index);
    };

    return (
        <div className="faq-container">
            <h2>FAQ</h2>
            <div className="faq-list">
                {
                    faqList.map((item, index) => (
                        <div className="faq-item" key={index}>
                            <div className="ques" onClick={() => toggleFaq(index)}>
                                <h3>{item.ques}</h3>
                            </div>
                            <div className={`ans ${openIndex === index ? 'open' : ''}`}>
                                <p>{item.ans}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Faq;
