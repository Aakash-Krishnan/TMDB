//! Disclaimer: Sorry to make this code look complicated.

//NOTE: I'm just taking the necessary datas from the API's response and returning it as an object.
export const dataProcessor = (data, type, ratings, tvCrew) => {
  const id = data.id;
  const backdrop = data.backdrop_path;
  const poster = data.poster_path;

  let releaseYear, releaseDate, title, certificate, finalCertificate;
  if (type === "movie") {
    title = data.title;
    releaseYear = data.release_date.split("-")[0];
    releaseDate = data.release_date.split("-").reverse().join("/");
  } else {
    title = data.original_name;
    releaseYear = data.first_air_date.split("-")[0];
  }

  if (!ratings) {
    certificate = data.release_dates.results.filter(
      (item) => item.iso_3166_1 === String(data.origin_country[0])
    );

    certificate = certificate[0];
    const country = certificate.iso_3166_1;
    const cer = certificate?.release_dates?.filter(
      (item) => item.certification !== ""
    )[0]?.certification;

    finalCertificate = {
      country,
      certificate: cer,
    };
  } else if (ratings.results.length !== 0) {
    certificate = ratings.results.filter(
      (item) => item.iso_3166_1 === String(data.origin_country[0])
    );
    if (certificate.length === 0) {
      certificate = ratings.results;
    }
    certificate = certificate[0];
    const country = certificate.iso_3166_1;
    finalCertificate = {
      country,
      certificate: certificate.rating,
    };
  }

  const genres = data.genres.map((item) => item.name);
  const duration = type != "tv" && minToHour(data.runtime);
  const score = Math.round(data.vote_average * 10);
  const tagline = data.tagline;
  const overview = data.overview;

  let topCrewMember;
  if (type === "movie") {
    topCrewMember = data.credits.crew.filter(
      (item) =>
        item.job === "Director" ||
        item.job === "Story" ||
        item.job === "Screenplay"
    );
  } else {
    topCrewMember = tvCrew.crew.filter(
      (item) => item.department === "Directing"
    );
  }

  const crewJob = {};
  for (let i = 0; i < topCrewMember.length; i++) {
    if (Object.keys(crewJob).length === 4) break;

    if (!crewJob[topCrewMember[i].name]) {
      crewJob[topCrewMember[i].name] =
        typeof topCrewMember[i].job === "string"
          ? [topCrewMember[i].job]
          : ["Director"];
    } else {
      crewJob[topCrewMember[i].name].push(topCrewMember[i].job);
    }
  }

  const favorite = false;
  const watchlist = false;

  const obj = {
    id,
    title,
    releaseYear,
    releaseDate,
    finalCertificate,
    genres,
    duration,
    score,
    tagline,
    overview,
    crewJob,
    backdrop,
    poster,
    favorite,
    watchlist,
  };

  return obj;
};

//NOTE: Just converting minutes to hours.
const minToHour = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

//NOTE: Tried my best to cover some possible way to fetch the watch provider for each content.
export const watchProviderProcessor = (watchProviders) => {
  const provider =
    Object.keys(watchProviders).length > 0
      ? watchProviders.IN
        ? watchProviders.IN.flatrate
          ? watchProviders.IN.flatrate[0]
          : null
        : Object.keys(watchProviders).filter(
            (key) => watchProviders[key]?.flatrate?.length > 0
          )[0] != null
        ? watchProviders[
            Object.keys(watchProviders).filter(
              (key) => watchProviders[key]?.flatrate?.length > 0
            )[0]
          ].flatrate[0]
        : watchProviders[Object.keys(watchProviders)[0]].buy[0]
      : null;

  return provider;
};
