// @flow
import template from 'lodash/utilities/template';
import containerBHtml from 'raw-loader!journalism/views/podcastContainerB.html';
import containerCHtml from 'raw-loader!journalism/views/podcastContainerC.html';
import config from 'lib/config';
import { addClassesAndTitle } from 'common/views/svg';

import audioIcon from 'svgs/journalism/podcast-container/audio-icon.svg';

import containerWaveCLarge from 'svgs/journalism/podcast-container/waveform-c.svg';
import containerWaveCTablet from 'svgs/journalism/podcast-container/waveform-c-tablet.svg';
import containerWaveCMobile from 'svgs/journalism/podcast-container/waveform-c-mobile.svg';

const headline = 'How to be human: the man who was raised by wolves';
const standfirst =
    'Abandoned as a child, Marcos Rodríguez Pantoja survived alone in the wild for 15 years. But living with people proved to be even more difficult';
const episodeUrl =
    '/news/audio/2018/sep/10/how-to-be-human-the-man-who-was-raised-by-wolves-podcast';
const seriesUrl = '/news/series/the-audio-long-read';
const urlWithCampaign = (url: string, variant: string) =>
    `${url}?CMP=podcast-container-${variant}`;

const runContainerTest = (variant: string) => (): void => {
    const podcastContainer = document.getElementById('podcast');

    if (podcastContainer) {
        podcastContainer.className += ` podcast-container-${variant}`;
        const oldBody = podcastContainer.querySelector('.fc-container__body');

        if (oldBody) {
            podcastContainer.className += ' podcast-container__visible';

            switch (variant) {
                case 'b':
                    oldBody.innerHTML = template(containerBHtml, {
                        headline,
                        standfirst,
                        episodeUrl: urlWithCampaign(episodeUrl, variant),
                        seriesUrl: urlWithCampaign(seriesUrl, variant),
                        audioIcon: addClassesAndTitle(audioIcon.markup, [
                            `podcast-container-b__audio-icon`,
                        ]),
                    });

                    break;
                case 'c':
                    oldBody.innerHTML = template(containerCHtml, {
                        headline,
                        standfirst,
                        episodeUrl: urlWithCampaign(episodeUrl, variant),
                        seriesUrl: urlWithCampaign(seriesUrl, variant),
                        audioIcon: addClassesAndTitle(audioIcon.markup, [
                            `podcast-container-c__audio-icon`,
                        ]),
                        waveLarge: addClassesAndTitle(
                            containerWaveCLarge.markup,
                            [`podcast-container-c__wave-large`]
                        ),
                        waveTablet: addClassesAndTitle(
                            containerWaveCTablet.markup,
                            [`podcast-container-c__wave-tablet`]
                        ),
                        waveMobile: addClassesAndTitle(
                            containerWaveCMobile.markup,
                            [`podcast-container-c__wave-mobile`]
                        ),
                    });

                    podcastContainer.className +=
                        ' podcast-container-c__thrasher';

                    break;

                default:
            }
        }
    }
};

const trackClick = (selector: string) => (complete: () => void): void => {
    const component = document.querySelector(selector);
    if (component) {
        component.onclick = () => {
            complete();
        };
    }
};

const trackImpression = (selector: string) => (track: () => void): void => {
    const component = document.querySelector(selector);
    if (component) {
        const observer = new window.IntersectionObserver(
            (entries, self) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        self.disconnect();
                        track();
                    }
                });
            },
            { threshold: 1.0 }
        );
        observer.observe(component);
    }
};

export const PodcastContainer = {
    id: 'PodcastContainer',
    start: '2018-09-17',
    expiry: '2018-10-17',
    author: 'Tom Forbes',
    description: 'Test designs for a /uk podcasts container',
    audience: 1,
    audienceOffset: 0,
    successMeasure: 'Measure click-through across the variants',
    audienceCriteria: '',
    showForSensitive: true,
    canRun() {
        return (
            config.page.pageId === 'uk' &&
            window.CSS &&
            window.CSS.supports('display: grid')
        );
    },

    variants: [
        {
            id: 'b',
            test: runContainerTest('b'),
            impression: trackImpression('.podcast-container__track'),
            success: trackClick('.podcast-container__track'),
        },
        {
            id: 'c',
            test: runContainerTest('c'),
            impression: trackImpression('.podcast-container-c__main'),
            success: trackClick('.podcast-container__track'),
        },
    ],
};
