import CommonLayout from '@/components/common/CommonLayout'
import CommonBanner from '@/components/CommonBanner'
import { Col, Flex, Row, TypographyTitle } from '@/lib/AntRegistry'
import React, { ReactElement } from 'react'
import aboutBanner from '@/assets/brand-guide/title-above.png';
import banner from '@/assets/images/cappuccino-sits-elegantly-atop-pile-rich-coffee-beans.jpg';
import common_img from '@/assets/images/bun-with-poppy-seeds.jpg'
const OurStory = () => {

  const story = [
    {
      image: banner.src,
      title: 'Building Dreams One Layer at a Time',
      desc: `A new wave of artisanal patisserie is taking shape in the city of Panchkula, where old and new
      come together. There are no pretentious Parisian or Viennese vibes here; instead, antique
      copper pots and pans coexist with sleek espresso machines, while Kerala vanilla beans infuse
      the air alongside French butter. Two visionary women at Copper & Crumb are changing the
      Indian café and patisserie scene.
      `
    },
    {
      image: banner.src,
      title: `A Dream's Beginnings
      `,
      desc: `Dreams simmered like sweet caramel for Kannupriya Garg during the quiet hours of
      motherhood, and it was the beginning of her journey. She turned her kitchen into an
      experimental space while her children slept. Each failed attempt at the perfect entremet wasn't a
      setback; it was a step forward on the path to mastery. Chef Zareen came to India from the
      illustrious London kitchens with more than simply a set of baking techniques; she brought a
      vision for connecting cultures. As she taught Kannu the intricate techniques of French pastries,
      she would often comment, "Every layer tells a story," as her hands would gracefully glide
      through the air. "The base speaks of foundation, the Crémeux of passion, and the glaze—that
      final, perfect mirror—reflects not just light but the journey of transformation."
      `
    },
    {
      image: banner.src,
      title: `Creating Greatness with Alchemy`,
      desc: `Their collaboration with Beanrove Coffee Roasters completed the perfect triangle, founded on
      shared values of sustainability and fair trade. Their coffee obsession matched our pastry
      perfectionism. Every cup of coffee is an adventure in discovery, and every pastry is a story of
      cultural fusion; together, they're creating something unprecedented: a venue where French
      patisserie technique meets Indian culinary wisdom.
      `
    },
    {
      image: banner.src,
      title: `Sustainable Practices and Community Development
      `,
      desc: `Our involvement extends beyond the kitchen walls. We collaborate with local farmers to provide
      a consistent supply of ethically sourced seasonal fruits while supporting sustainability. We
      procure heritage wheat varieties from local farmers, which assures preservation of local
      methods of cultivation while establishing the exceptional taste of our desserts. We work with
      local artisans to preserve traditional craftsmanship.
      
      `
    },
    {
      image: banner.src,
      title: `A Haven for Narratives`,
      desc: `In March of 2024, an unexpected gift arrived in the form of a vacant storefront that became a
      canvas for bigger dreams. In today's world, Copper & Crumb is a living example of thoughtful
      design and intentional production. Three distinct sensations infuse our space: Indulge in a single
      traveler's paradise at The Quiet Zone, where you may unwind with a handcrafted cappuccino
      and a Parisian-Indian slice of entremet. In the Social Zone, people meet around tables made by
      neighborhood craftspeople to share more than simply pastries—they share stories and laughs.
      Visit our Exhibition Zone in the morning and you'll catch our pastry team in action—hands
      dusted with flour, rolling pins in constant motion, the satisfying crackle of laminated dough being
      folded. It's where French technique meets Indian heart, right before your eyes
      
      `
    },
    {
      image: banner.src,
      title: `Exploring Fusion: More Than Just Recipes
      `,
      desc: `Take our butter chicken puff pastry; it's a study in accuracy and love. Creating such delicate
      layers of puff pastry to match the depth of North Indian spices. That wasn't an easy feat. It took
      us 45 tries to find the right equilibrium, nevertheless we declined to compromise. Our newest
      offering takes matters to the next level. Consider a base of nutty pecan sponge, with warmth
      and butteriness hinting at the layers above. Then a creamy mascarpone mousse with a delicate
      tonka bean perfume that whispers behind the powerful tones of our house-roasted coffee mix.
      Finally, a concluding drizzle of pecan praline seeps out with each bite, providing a molten
      contrast to the light pastry. This isn't fusion for fusion's sake; it's respect for both traditions
      creating something entirely new. French technique meets Indian spice, tropical bean meets
      roasted nut - an orchestra of tastes that widens culinary boundaries. And it all starts out with
      respect. Respect for the centuries-long mastered croissant. Gratitude for the butter chicken
      recipe carried down through the centuries. Respect for the farmers who farm our sustainable
      coffee and the artisans who create our tables. Every taste tells a story in which the ancient and
      new, regional and global, coexist in delightful harmony. Copper & Crumb doesn't simply serve
      desserts. We're establishing a platform for cultural conversation in which the foundations of
      tradition coexist with the spirit of innovation. This is more than just fusion; it's a celebration of the
      human experience, with each flavor infused with the passion, perseverance, and reverence that
      brought it to life.
      `
    },
    {
      image: banner.src,
      title: `An Enduring Impression

      `,
      desc: `We are a movement, not just a café. We know how tough it is for women to break into
      professional kitchens—both of us lived that story. That’s why we have instituted an
      apprenticeship program that gives special attention to women in the culinary arts. Watching
      them master everything from lamination to tempering chocolate reminds us why we started this
      in the first place. Some of them had never held a piping bag before. Today they're crafting
      perfect entremets. That's the real flavor of success.
      
      `
    },
    {
      image: banner.src,
      title: `Let’s Write the Next Chapter Together.

      `,
      desc: `Every time you visit Copper & Crumb, you become part of a bigger cause. Whether you're
      seeking solitude with an exquisite cup of coffee, gathering with friends over mind-blowing
      pastries, or simply observing our artists in action, you become a part of this transformation's
      story. Like a perfect setting, the most beautiful events in life emerge layer by layer, each addition
      improving the whole experience. This world, where old and modern coexist, where crumb and
      copper meet, where each creation tells a story of persistence, awaits the telling of your own
      story.
      
      `
    },
  ]
  const isEven = (number:number) => {
    return number % 2 === 0;
  }
  return (
    <section className="contact-us pt-0 bg-white">
      <CommonBanner title="Our story" image={common_img.src}/>
      <div className="container mt-sm-5 pt-5">
        <Row gutter={[20, 20]} justify={'center'}>
          <Col span={24} lg={16} xl={14} xxl={12} className='text-center mb-4'>
            <div className='mb-4 pb-2'><img src={aboutBanner.src} alt="error" /></div>
            <h4 className="title mb-4">
              Copper & Crumb            </h4>
            {/* <p className="sub-title">
              From quiet kitchen experiments during motherhood to the bustling heart of Panchkula's culinary
              scene, Copper & Crumb represents the vision of two women who dared to dream differently.
              Here, antique copper pots share space with modern espresso machines, while Kerala vanilla
              beans infuse the air alongside French butter
            </p> */}
          </Col>
          {story?.map((res, index) => <Col key={index} span={24} lg={12} xl={24} xxl={24}>
            {!isEven(index)? <Flex gap={40}>
              <Col span={24} lg={12} xl={12} xxl={12}>
                <TypographyTitle level={4}>{res.title}</TypographyTitle>
                <p className='fs-16'>{res.desc}</p>
              </Col>
              <div className="about-banner mb-3">
                <img src={res.image} alt="error" className='img-fluid' />
              </div>
            </Flex> :
              <Flex gap={40}>
                <div className="about-banner mb-3">
                  <img src={res.image} alt="error" className='img-fluid' />
                </div>
                <Col span={24} lg={12} xl={12} xxl={12}>
                  <TypographyTitle level={4}>{res.title}</TypographyTitle>
                  <p className='fs-16'>{res.desc}</p>
                </Col>
              </Flex>}
          </Col>)}
        </Row>
      </div>
    </section>
  )
}
OurStory.getLayout = function getLayout(page: ReactElement) {
  return (
    <CommonLayout>
      {page}
    </CommonLayout>
  )
}
export default OurStory