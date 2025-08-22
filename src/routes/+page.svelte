<script>
    import Splash from '../Splash.svelte';
    import { post, windowSize } from '../utils';
    import Frame from '$lib/images/Frame.webp';
    import StartPage from '../Start Page.svelte';
    import GamePage from '../Game Page.svelte';

    let scale = $state(1);

    $effect(() => {
        const disable = (e) => {
            e.preventDefault();
        };

        const onResize = () => {
            let scx = 1;
            let scy = 1;

            const { w, h } = windowSize();

            if (w < 450) {
                scx = w / 450;
            }

            if (h < 788) {
                scy = h / 788;
            }

            scale = Math.min(scx, scy);
        };

        onResize();

        window.addEventListener('contextmenu', disable);
        window.addEventListener('dblclick', disable);
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('contextmenu', disable);
            window.removeEventListener('dblclick', disable);
            window.removeEventListener('resize', onResize);
        };
    });

    let splash = $state(true);
    post(() => (splash = false), 2000);
</script>

<div class="app">
    {#if splash}
        <Splash />
    {:else}
        <div class="content" style="scale: {scale};">
            <img class="frame" src={Frame} alt="" />
            <GamePage />
            <StartPage />
            <!-- {#if ss.intro}
                <div class="disclaimer">
                    <span>MUSIC BY ERIC MATYAS  •  WWW.SOUNDIMAGE.ORG</span>
                </div>
            {/if} -->
        </div>
    {/if}
</div>

<style>
    :global {
        body {
            margin: 0;
            overflow: hidden;
            --background: #2f5f85;
            --off-white: #d0d0d0;
            background: var(--background);
            color: var(--off-white);
            --blue: #87b4d8;
            --yellow: #d8d387;
            --green: #add0a3;
        }

        .button-base {
            box-sizing: border-box;
            cursor: pointer;
            display: grid;
            place-content: center;
            transition: transform 0.1s;
        }

        .button-base:focus {
            outline: none !important;
        }

        .no-highlight {
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
    }

    .app {
        display: grid;
        height: 100dvh;
        -webkit-user-select: none;
        user-select: none;
        overflow: hidden;
        touch-action: manipulation;
        outline: none !important;
        background-image: url('$lib/images/Texture.webp');
        background-size: 407px 750px;
        place-content: center;
        font-family: Roboto Condensed;
    }

    .content {
        grid-area: 1/1;
        width: 450px;
        display: grid;
        touch-action: none;
        background: #2f5d84;
        background-image: radial-gradient(transparent, black 150%);
    }

    .frame {
        grid-area: 1/1;
        touch-action: none;
    }

    .disclaimer {
        grid-area: 1/1;
        place-self: center;
        font-size: 10px;
        transform: translateY(350px);
        display: grid;
        justify-items: center;
        gap: 3px;
    }

    @font-face {
        font-family: Title;
        src: url('$lib/fonts/Orbitron.ttf');
    }

    @font-face {
        font-family: Subtitle;
        src: url('$lib/fonts/IBM Plex Sans Italic.ttf');
    }

    @font-face {
        font-family: UI;
        src: url('$lib/fonts/Inter.ttf');
    }

    @font-face {
        font-family: Roboto;
        src: url('$lib/fonts/Roboto-Regular.ttf');
    }

    @font-face {
        font-family: 'Roboto Condensed';
        src: url('$lib/fonts/Roboto Condensed.ttf');
    }

    @font-face {
        font-family: 'Roboto Mono';
        src: url('$lib/fonts/Roboto Mono.ttf');
    }
</style>
