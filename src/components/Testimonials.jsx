import React from "react";

const testimonials = [
  {
    name: "Abena Owusu",
    role: "Product Manager",
    quote:
      "Library has become my Sunday ritual. The recommendations are thoughtful without feeling overwhelming.",
    score: 5,
  },
  {
    name: "Yaw Mensah",
    role: "UX Designer",
    quote:
      "I love the subtle animations and the guided onboarding. It feels personable and modern.",
    score: 5,
  },
  {
    name: "Nana Kwesi",
    role: "Medical Student",
    quote:
      "Having a calm space to track my readings keeps me on track through exams. The mobile experience is spot on.",
    score: 4.5,
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <div className="row">
        <div className="testimonials__header">
          <h2 className="section__title">What readers are saying</h2>
          <p className="section__subtitle">
            A quiet space to discover, save, and share books you can't put down.
          </p>
        </div>
        <div className="testimonials__grid">
          {testimonials.map((testimonial) => {
            const fullStars = Math.floor(testimonial.score);
            const hasHalfStar = testimonial.score % 1 !== 0;

            return (
              <article className="testimonial__card" key={testimonial.name}>
                <div className="testimonial__score">
                  {"*".repeat(fullStars)}
                  {hasHalfStar && "\u00bd"}
                </div>
                <p className="testimonial__quote">"{testimonial.quote}"</p>
                <div className="testimonial__author">
                  <span>{testimonial.name}</span>
                  <small>{testimonial.role}</small>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
