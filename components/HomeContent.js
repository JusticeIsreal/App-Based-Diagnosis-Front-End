import styles from "./../styles/Home.module.css";
import Image from "next/image";
import navLogo from "./../images/App-Based_Click_&_Diagnose-Logo-PNG_4.png";
import footerLogo from "./../images/App-Based_Click_&_Diagnose-Logo-PNG_3.png";
import heroImage from "./../images/heroImg.png";
import HowItWorkImg1 from "./../images/howItWorkImg1.png";
import HowItWorkImg2 from "./../images/howItWorkImg2.png";
import HowItWorkImg3 from "./../images/howItWorkImg3.png";
import whoItIsForImg1 from "./../images/whoItIsForImg1.png";
import whoItIsForImg2 from "./../images/whoItIsForImg2.png";
import whoItIsForImg3 from "./../images/whoItIsForImg3.png";
import contactImg from "./../images/contactImg.png";
import { Burger,Accordion } from "@mantine/core";
import Link from "next/link";
import {
    FaStar,
    FaGlobe,
    FaBookMedical,
    FaUsers,
    FaLightbulb,
    FaGuilded,
    FaReceipt,
    FaFacebook,
    FaTwitter,
    FaLinkedinIn,
    FaInstagramSquare,
    FaPlus
} from "react-icons/fa";
import { useState } from "react";


const HomeContent = () => {
    const [menu,setMenu] = useState(false)

    return (
        <>
            <section className={styles.hero}>
                <nav>
                    <Link href={'/'}>
                    <a href="" className={styles.logo}>
                        <Image src={navLogo} />
                    </a>
                    </Link>
                    <ul className={menu===true ? styles.showNav : ''}>
                        <li>
                            <a href="">Features</a>
                        </li>
                        <li>
                            <a href="">How it works</a>
                        </li>
                        <li>
                            <a href="">Pricing</a>
                        </li>
                        <li>
                            <a href="">Contact</a>
                        </li>
                        <li>
                            <a href="">About</a>
                        </li>
                        <div>
                        <Link href={'/auth/signup'}>
                            <a>
                                <button>Register</button>
                            </a>
                        </Link>
                       
                        <Link href={'/auth/login'}>
                            <a>
                                <button>Log in</button>
                            </a>
                        </Link>
                    </div>
                    </ul>
                   <div className={styles.burgerWrapper}>
                    <Burger onClick={()=>{setMenu(!menu)}} opened={menu}/>
                   </div>
                </nav>
                <div className={styles.heroContent}>
                    {/* <Image className={styles.topEllipse} src="https://uploads-ssl.webflow.com/629e21d17c3e1342a378afdd/62a05b545631811a8177658b_top%20ellipse.png" alt=""  data-w-id="404cf9a1-5603-d05c-c51c-1c58d5666b89" loading="lazy"  width="347" /> */}
                    <div className={styles.text}>
                        <h1>Bedside diagnosis just became easier</h1>
                        <p>
                            Our App-Based Click-a-Diagnosis digital product is a
                            user-friendly platform that makes medical diagnosis
                            easier and faster
                        </p>
                        <form action="">
                            <input type="email" required placeholder="Email" />
                            <button>Register</button>
                        </form>
                    </div>
                    <div className={styles.img}>
                        <Image src={heroImage} />
                    </div>
                </div>
            </section>

            <section className={styles.features}>
                <h2>Features</h2>
                <p>
                    Our App-Based Click & Diagnose product provides you with the
                    most recent and reliable medical diagnoses and prescrition
                    wherever you are.{" "}
                </p>
                <div className={styles.featuresContainer}>
                    <div className={styles.featuresContent}>
                        <i>
                            <FaGlobe />
                        </i>
                        <h3>Web based app</h3>
                        <p>
                            Our platform can be accessed easily from any browser
                            across all devices. You don’t need to download
                            another app on your mobile device.
                        </p>
                    </div>

                    <div className={styles.featuresContent}>
                        <i>
                            <FaBookMedical />
                        </i>
                        <h3>Quality Resource</h3>
                        <p>
                            Get in-depth information about common problems that
                            patients present with in just a few minutes.
                        </p>
                    </div>

                    <div className={styles.featuresContent}>
                        <i>
                            <FaUsers />
                        </i>
                        <h3>Multiple Specialities</h3>
                        <p>
                            Our product can be used by different medical
                            specialists and sub-specialists.
                        </p>
                    </div>

                    <div className={styles.featuresContent}>
                        <i>
                            <FaLightbulb />
                        </i>
                        <h3> Regular Updates</h3>
                        <p>
                            Our library of medical information is regularly
                            updated to add new medical conditions.
                        </p>
                    </div>

                    <div className={styles.featuresContent}>
                        <i>
                            <FaGuilded />
                        </i>
                        <h3> Prescription Guide</h3>
                        <p>
                            Our product gives you a guide in prescribing
                            medications for various medical conditions.{" "}
                        </p>
                    </div>

                    <div className={styles.featuresContent}>
                        <i>
                            <FaReceipt />
                        </i>
                        <h3> Evidence-Based Guide</h3>
                        <p>
                            {" "}
                            All information & prescription provided are
                            evidenced based & drawn from years of experience of
                            seasoned medical practitioner
                        </p>
                    </div>
                </div>
            </section>

            <section className={styles.howItWorks}>
                <h2>How it works</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse varius enim in eros elementum tristique.
                </p>

                <div className={styles.container}>
                    <div className={styles.content}>
                        <div className={styles.imgContainer}>
                            <Image src={HowItWorkImg1} alt="" />
                        </div>
                        <div className={styles.text}>
                            <h3>Register/Log in</h3>
                            <p>
                                Register to create your account or log in if you
                                already have an account
                            </p>
                            <a href="">Register</a>
                        </div>
                    </div>

                    <div className={styles.content}>
                        <div className={styles.imgContainer}>
                            <Image src={HowItWorkImg2} alt="" />
                        </div>
                        <div className={styles.text}>
                            <h3>Search our Extensive Library </h3>
                            <p>
                                Search for any medical condition that you need
                                information on.
                            </p>
                            <a href="">Register</a>
                        </div>
                    </div>

                    <div className={styles.content}>
                        <div className={styles.imgContainer}>
                            <Image src={HowItWorkImg3} alt="" />{" "}
                        </div>
                        <div className={styles.text}>
                            <h3>Get what you need</h3>
                            <p>
                                The information you need is provided in short
                                notes that are easy to read and understand.
                            </p>
                            <a href="">Register</a>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.whoItWorkedFor}>
                <h1>Who it is for</h1>
                <p>
                    The Web-Based app is designed for medical doctors, other
                    medical professionals & medical students to give them quick
                    and easy diagnoses and prescription guide.{" "}
                </p>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <div className={styles.imgContent}>
                            <Image src={whoItIsForImg1} alt="" />{" "}
                        </div>
                        <h3>DOCTORS</h3>
                        <p>
                            House Officers, Residents, Surgeons, Obstetricians,
                            Paediatricians, Gynaecologists, Urologists, General
                            Practitioners, Dermatologists etc.{" "}
                        </p>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.imgContent}>
                            <Image src={whoItIsForImg2} alt="" />{" "}
                        </div>
                        <h3>Other Medical Professionals</h3>
                        <p>
                            Physiotherapists, radiographers, occupational
                            therapists and paramedics will all find this a
                            useful resource.
                        </p>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.imgContent}>
                            <Image src={whoItIsForImg3} alt="" />{" "}
                        </div>
                        <h3> Medical Students</h3>
                        <p>
                            {" "}
                            Medical students at various levels can use it as a
                            study guide to aid their learning and as a handy
                            bedside clinical aid for faster decision-making
                        </p>
                    </div>
                </div>
            </section>

            <section className={styles.ourPlan}>
                <h2>Our Plans</h2>
                <p>Find a plan that is suitable for you or your team.</p>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <h1>FREE TRIAL</h1>
                        <h3>$0</h3>
                        <span>Register now and get a 30 day free trial</span>
                        <button>Register</button>
                    </div>
                    <div className={styles.content}>
                        <h1>FREE TRIAL</h1>
                        <h3>$0</h3>
                        <span>Register now and get a 30 day free trial</span>
                        <button>Register</button>
                    </div>
                    <div className={styles.content}>
                        <h1>FREE TRIAL</h1>
                        <h3>$0</h3>
                        <span>Register now and get a 30 day free trial</span>
                        <button>Register</button>
                    </div>
                </div>
            </section>

            <section className={styles.faqs}>
                <h2>Frequently asked questions</h2>
               <section className={styles.container}>
                    <Accordion iconPosition={"right"} icon={<FaPlus/>}>
                        <Accordion.Item
                        className={styles.content}
                        style={{borderBottom:"2px solid rgb(253, 230, 200)"}}
                        label={"Are you sure this thing is on?"}>
                              <p style={{textAlign:"left"}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Suspendisse varius enim in eros elementum
                            tristique. Duis cursus, mi quis viverra ornare, eros
                            dolor interdum nulla, ut commodo diam libero vitae
                            erat. Aenean faucibus nibh et justo cursus id rutrum
                            lorem imperdiet. Nunc ut sem vitae risus tristique
                            posuere.
                        </p>
                        </Accordion.Item>
                        <Accordion.Item
                        className={styles.content}
                        style={{borderBottom:"2px solid rgb(253, 230, 200)"}}
                        label={"Are you sure this thing is on?"}>
                              <p style={{textAlign:"left"}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Suspendisse varius enim in eros elementum
                            tristique. Duis cursus, mi quis viverra ornare, eros
                            dolor interdum nulla, ut commodo diam libero vitae
                            erat. Aenean faucibus nibh et justo cursus id rutrum
                            lorem imperdiet. Nunc ut sem vitae risus tristique
                            posuere.
                        </p>
                        </Accordion.Item>
                    </Accordion>
               </section>

            </section>



            <section className={styles.contact}>
                <h2>Help us improve this product</h2>
                <p>
                    Please provide us with useful feedback that would help us
                    improve on this product
                </p>
                <div className={styles.container}>
                    <div className={styles.img}>
                        <Image src={contactImg} alt="" />{" "}
                    </div>
                    <form action="">
                        <input type="text" required placeholder="Name" />
                        <input type="text" required placeholder="Email" />
                        <textarea
                            placeholder="Message"
                            name=""
                            id=""
                            cols="30"
                            rows="10"
                        ></textarea>
                        <button>Submit</button>
                    </form>
                </div>
            </section>

            <section className={styles.endorsement}>
                <h2>What people say about us</h2>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <div className={styles.icons}>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Suspendisse varius enim in eros elementum
                            tristique
                        </p>

                        <div className={styles.person}>
                            <div className={styles.img}><Image src={whoItIsForImg1} alt="" /></div>{" "}
                            <div className={styles.details}>
                                <h3>Jane Cooper</h3>
                                <h4>KRUSTY KRAB</h4>
                            </div>
                        </div>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.icons}>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Suspendisse varius enim in eros elementum
                            tristique
                        </p>

                        <div className={styles.person}>
                           <div className={styles.img}><Image src={whoItIsForImg2} alt="" /></div>{" "}
                            <div className={styles.details}>
                                <h3>Jane Cooper</h3>
                                <h4>KRUSTY KRAB</h4>
                            </div>
                        </div>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.icons}>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Suspendisse varius enim in eros elementum
                            tristique
                        </p>

                        <div className={styles.person}>
                           <div className={styles.img}><Image src={whoItIsForImg3} alt="" /></div>{" "}
                            <div className={styles.details}>
                                <h3>Jane Cooper</h3>
                                <h4>KRUSTY KRAB</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.ads}>
                <div className={styles.container}>
                    <h1>Ready to give it a try?</h1>
                    <p>Register now for a 30 day free trial</p>
                    <form action="">
                        <input type="email" required placeholder="Email" />
                        <button>Register</button>
                    </form>
                </div>
            </section>

            <footer className={styles.footer}>
                <div>
                <a href="" className={styles.logo}>
                    <Image src={footerLogo} alt="" />
                </a>
                <p>Copyright © Faruq Bakre for Giliapos</p>
                <ul>
                    <li>
                        <a href="">Terms of use</a>
                    </li>
                    <li>
                        <a href="">Privacy policy</a>
                    </li>
                </ul>
                </div>
                <ul style={{flexDirection:"row"}}>
                    <li>
                        <i>
                            {" "}
                            <FaFacebook />
                        </i>
                    </li>
                    <li>
                        <i>
                            {" "}
                            <FaTwitter />
                        </i>
                    </li>
                    <li>
                        <i>
                            {" "}
                            <FaLinkedinIn />
                        </i>
                    </li>
                    <li>
                        <i>
                            {" "}
                            <FaInstagramSquare />
                        </i>
                    </li>
                </ul>
            </footer>
        </>
    );
};

export default HomeContent;
