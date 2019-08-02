<script>
  import { getContext } from 'svelte';
  import { _ } from 'svelte-i18n';

  import s from './Landing.scss';

  const router = getContext('router').getRouter();
</script>

<div class={s.Landing}>
  <div class={s.LandingMain}>
    <article class={s.LandingArticle}>
      <h2 class={s.LandingTitle}>
        {@html $_('articleTitle')}
      </h2>
      <div class={s.LandingContentWrapper}>
        <p class={s.LandingContent}>
          {@html $_('articleContent')}
        </p>
        <p class={s.LandingContentItem}>&mdash; {$_('articleContentCandidates')}</p>
        <p class={s.LandingContentItem}>&mdash; {$_('articleContentRecruiters')}</p>
      </div>
    </article>

    <button class={s.LandingLearnMoreButton} on:click={() => router.navigate('/learn-more')}>{$_('learnMore')}</button>
  </div>

  <div class={s.LandingPanel} />
  <img class={s.LandingImage} src="/assets/images/landing/landing-image-colors-white-transparent.png.webp" alt="" />
</div>
