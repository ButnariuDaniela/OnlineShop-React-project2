import React from 'react';
import Layout from '../../components/Layout/Layout';

function About() {
    return (
        <div>
            <Layout>
                <div className='container content'>
                    <div className='row'>
                        <img className='col-2' src="https://i.imgur.com/tAsW7WM.jpeg" alt="" />
                        <div className='col-8'>
                            <h1 className='fw-bold mb-5'>Despre noi</h1>
                            <div className='d-flex align-items-center flex-direction: row'>
                                <p>
                                    Cu o experienta de peste 25 de ani in domeniul mobilei, Open Space este unul dintre cei mai mari importanti jucatori pe piata locala de fronturi din MDF vopsit si MDF furniruit vopsit.
                                </p>
                                <p>
                                    Am investit in mod constant in tehnologie de ultima ora. Astfel, putem oferi o paleta larga de modele si culori la standarde ridicate de calitate. Acoperim toate culorile din paletarele RAL, NCS pe grosimi diferite de MDF.
                                </p>
                                <p>
                                    Open Space este partener de incredere in dezvolarea producatorilor de mobila premium de inalta calitate si design deosebit. Pe langa fronturile necesare de mdf vopsit, punem la dispozitia partenerilor nostri servicii de design, consultanta si tot ce tine de mobila.
                                </p>
                                <p>
                                    Produsele noastre au un grad ridicat de personalizare. Efectiv transformam in realitate, in mod profesionist, schitele partenerilor nostri.
                                </p>
                                <p className='fst-italic'>
                                    Fii partenerul nostru!
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
}

export default About;