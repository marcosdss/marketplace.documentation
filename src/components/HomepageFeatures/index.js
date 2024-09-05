import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Documentações de Componentes',
    Svg: require('@site/static/img/developer-components.svg').default,
    description: (
      <>
        Explore as documentações e guias dos componentes do projeto Oba Hortifruti.
      </>
    ),
  },
  {
    title: 'Blog de Relatórios: Acompanhando Instabilidades',
    Svg: require('@site/static/img/relatories-analytics.svg').default,
    description: (
      <>
        Fique atualizado sobre instabilidades, erros e mudanças nos deploys por meio do nosso blog dedicado.
      </>
    ),
  },
  {
    title: 'Registros de Mudanças e Atualizações',
    Svg: require('@site/static/img/release-notes.svg').default,
    description: (
      <>
        Acesse os registros de mudanças, melhorias e atualizações recentes. Este recurso permite que você acompanhe o progresso do projeto e compreenda as versões mais recentes.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
