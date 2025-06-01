import React, { useState } from 'react';
import './styles/FAQ.css';

const faqList = [
  {
    question: "Is Tasklio really free?",
    answer: "Yes! Tasklio is 100% free with no hidden fees, premium tiers, or subscription requirements. We believe productivity tools should be accessible to everyone."
  },
  {
    question: "Do I need to create an account?",
    answer: "Creating an account allows you to access your tasks from any device with secure cloud synchronization. We offer a quick signup process, or you can use your Google account to get started immediately."
  },
  {
    question: "How does Tasklio protect my privacy?",
    answer: "Your data is protected with enterprise-grade encryption both in transit and at rest. We never sell your data, show ads, or track your usage. Your tasks are securely stored in our SOC 2 compliant cloud infrastructure."
  },
  {
    question: "Does Tasklio work offline?",
    answer: "Yes! Tasklio works seamlessly offline. When you're back online, all your changes sync automatically across all your devices through our secure cloud infrastructure."
  },
  {
    question: "How can I access my tasks from different devices?",
    answer: "Simply sign in to your Tasklio account from any device. Your tasks, categories, and preferences are automatically synchronized across all your devices in real-time through our secure cloud storage."
  },
  {
    question: "How can I get support or contribute?",
    answer: "You can find help, report issues, or contribute on our GitHub repository or by checking our comprehensive documentation. Our community is here to help!"
  }
];

const FAQ = () => {
  const [open, setOpen] = useState(null);

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        <div className="faq-header">
          <div className="faq-badge">FAQ</div>
          <h2>Frequently Asked Questions</h2>
          <p>Find quick answers to common questions about Tasklio</p>
        </div>
        <ul className="faq-list">
          {faqList.map((item, idx) => (
            <li
              className={`faq-item${open === idx ? ' open' : ''}`}
              key={item.question}
              onClick={() => setOpen(open === idx ? null : idx)}
              tabIndex={0}
              onKeyPress={e => {
                if (e.key === 'Enter' || e.key === ' ') setOpen(open === idx ? null : idx);
              }}
              aria-expanded={open === idx}
            >
              <div className="faq-question">
                {item.question}
                <span className="faq-toggle">{open === idx ? '−' : '+'}</span>
              </div>
              <div className="faq-answer" style={{ maxHeight: open === idx ? 200 : 0 }}>
                <p>{item.answer}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
