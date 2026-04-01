import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

export default function FaqAccordion({ items }) {
    const [openIndex, setOpenIndex] = useState(null);

    if (!Array.isArray(items) || items.length === 0) return null;

    return (
        <div className="faq-list">
            {items.map((item, i) => (
                <div
                    key={i}
                    className={`faq-item${openIndex === i ? ' faq-item--open' : ''}`}
                >
                    <button
                        className="faq-item__question"
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        aria-expanded={openIndex === i}
                    >
                        <span>{item.q}</span>
                        <FaChevronDown className="faq-item__chevron" />
                    </button>
                    <div className="faq-item__answer">
                        <p>{item.a}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
