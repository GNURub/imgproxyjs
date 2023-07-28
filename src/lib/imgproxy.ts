import { Buffer } from 'buffer';
import { createHmac } from 'crypto';
import { Transformers } from './transformer';
import { Abbreviations, Options, Settings, ValueOf } from './types';

export class ImgProxy extends Transformers {
  private options: {
    config: Settings;
    defaultOpts: Options;
    settings: {
      [key: keyof Abbreviations]: string;
    };
  } = {
    config: {
      url: '',
      autoreset: true,
    },
    defaultOpts: {},
    settings: {},
  };

  private abbreviations: Abbreviations = {
    resize: 'rs',
    size: 'size',
    resizing_type: 'rt',
    resizing_algorithm: 'ra',
    width: 'w',
    height: 'h',
    min_width: 'mw',
    min_height: 'mh',
    zoom: 'z',
    enlarge: 'el',
    extend: 'ex',
    extend_aspect_ratio: 'exar',
    gravity: 'g',
    crop: 'c',
    padding: 'pd',
    trim: 't',
    quality: 'q',
    max_bytes: 'mb',
    background: 'bg',
    adjust: 'a',
    brightness: 'br',
    contrast: 'co',
    saturation: 'sa',
    blur: 'bl',
    sharpen: 'sh',
    pixelate: 'pix',
    unsharpening: 'ush',
    watermark: 'wm',
    watermark_url: 'wmu',
    video_thumbnail_second: 'vts',
    style: 'st',
    jpeg_options: 'jpgo',
    png_options: 'pngo',
    gif_options: 'gifo',
    webp_options: 'webpo',
    preset: 'pr',
    cachebuster: 'cb',
    strip_metadata: 'sm',
    strip_color_profile: 'scp',
    unsharp_masking: 'ush',
    blur_detections: 'bd',
    auto_rotate: 'ar',
    rotate: 'rot',
    filename: 'fn',
    format: 'ext',
    enforce_thumbnail: 'eth',
    format_quality: 'fq',
    skip_processing: 'skp',
    expires: 'exp',
    return_attachment: 'att',
    max_src_resolution: 'msr',
    max_src_file_size: 'msfs',
    max_animation_frames: 'maf',
    max_animation_frame_resolution: 'mafr',
    fallback_image_url: 'fiu',
  };

  private transformers = {
    resize: this.tresize,
    size: this.tsize,
    extend: this.textend,
    extend_aspect_ratio: this.textendAspectRatio,
    gravity: this.tgravity,
    crop: this.tcrop,
    padding: this.tpadding,
    background: this.tbackground,
    trim: this.ttrim,
    adjust: this.tadjust,
    watermark: this.twatermark,
    jpeg_options: this.tjpegOptions,
    png_options: this.tpngOptions,
    gif_options: this.tgifOptions,
    unsharp_masking: this.tunsharpMasking,
    blur_detections: this.tblurDetections,
    draw_detections: this.tdrawDetections,
    skip_processing: this.tskipProcessing,
    zoom: this.zoomOptions,
    gradient: this.tgradient,
  };

  constructor({ url, key, salt, autoreset }: Settings, options: Options = {}) {
    super();

    this.options.config = { key, salt, url, autoreset: autoreset !== true ? !!autoreset : true };

    this.isObject(options);

    for (const key in options) {
      this.setOption(key as keyof Options, options[key]);
    }
  }

  setAutoreset(autoreset: boolean): this {
    this.options.config.autoreset = autoreset;
    return this;
  }

  setOption(option: keyof Options, value: ValueOf<Options>): this {
    if (value === null) {
      return this.resetOption(option);
    }

    this.options.settings[option] = `${this.abbreviations?.[option] ?? option}:${
      this.transformers?.[option]?.call?.(this, value) ?? value
    }`;

    return this;
  }

  private setOptions(options: Options) {
    this.isObject(options);
    for (const key in options) {
      this.setOption(key as keyof Options, options[key]);
    }
  }

  setDefaultOptions(options: Options): this {
    this.isObject(options);
    this.options.defaultOpts = options;
    this.setOptions(options);

    return this;
  }

  resetDefaultOptions(): this {
    this.options.defaultOpts = {};
    return this;
  }

  resetOptions(): this {
    this.options.settings = {};
    this.setOptions(this.options.defaultOpts);
    return this;
  }

  resetOption(option: ValueOf<Abbreviations>): this {
    delete this.options.settings?.[this.abbreviations?.[option] ?? option];
    return this;
  }

  resize(val: Options['resize']): this {
    return this.setOption('resize', val);
  }

  crop(val: Options['crop']): this {
    return this.setOption('crop', val);
  }

  size(val: Options['size']): this {
    return this.setOption('size', val);
  }

  fallbackImageUrl(val: Options['fallback_image_url']): this {
    return this.setOption('fallback_image_url', val);
  }

  skipProcessing(val: Options['skip_processing']): this {
    return this.setOption('skip_processing', val);
  }

  expires(val: Options['expires']): this {
    return this.setOption('expires', val);
  }

  extend(val: Options['extend']): this {
    return this.setOption('extend', val);
  }

  trim(val: Options['trim']): this {
    return this.setOption('trim', val);
  }

  adjust(val: Options['adjust']): this {
    return this.setOption('adjust', val);
  }

  maxSrcResolution(val: Options['max_src_resolution']): this {
    return this.setOption('max_src_resolution', `${val}`);
  }

  maxSrcFileSize(val: Options['max_src_file_size']): this {
    return this.setOption('max_src_file_size', `${val}`);
  }

  maxAnimationFrames(val: Options['max_animation_frames']): this {
    return this.setOption('max_animation_frames', `${val}`);
  }

  maxAnimationFramesResolution(val: Options['max_animation_frame_resolution']): this {
    return this.setOption('max_animation_frame_resolution', `${val}`);
  }

  resizingType(val: Options['resizing_type']): this {
    return this.setOption('resizing_type', val);
  }

  enforceThumbnail(val: Options['enforce_thumbnail']): this {
    return this.setOption('enforce_thumbnail', `${val}`);
  }

  formatQuality(val: Options['format_quality']): this {
    return this.setOption('format_quality', val);
  }

  resizingAlgorithm(val: Options['resizing_algorithm']): this {
    return this.setOption('resizing_algorithm', val);
  }

  width(width: Options['width']): this {
    return this.setOption('width', `${width}`);
  }

  height(height: Options['height']): this {
    return this.setOption('height', `${height}`);
  }

  minWidth(minWidth: Options['min_width']): this {
    return this.setOption('min_width', `${minWidth}`);
  }

  minHeight(minHeight: Options['min_height']): this {
    return this.setOption('min_height', `${minHeight}`);
  }

  dpr(val: Options['dpr']): this {
    if (Number(val) > 0) {
      return this.setOption('dpr', `${val}`);
    }
    return this;
  }

  dpi(val: Options['dpi']): this {
    if (Number(val) > 0) {
      return this.setOption('dpi', `${val}`);
    }
    return this;
  }

  gradient(val: Options['gradient']): this {
    if (Number(val) > 0) {
      return this.setOption('gradient', val);
    }
    return this;
  }

  maxBytes(val: Options['max_bytes']): this {
    return this.setOption('max_bytes', `${val}`);
  }

  padding(val: Options['padding']): this {
    return this.setOption('padding', val);
  }

  enlarge(val: Options['enlarge']): this {
    return this.setOption('enlarge', `${val}`);
  }

  pixelate(val: Options['pixelate']): this {
    return this.setOption('pixelate', `${val}`);
  }

  gravity(val: Options['gravity']): this {
    return this.setOption('gravity', val);
  }

  quality(quality: Options['quality']): this {
    return this.setOption('quality', `${quality}`);
  }

  background(color: Options['background']): this {
    return this.setOption('background', color);
  }

  backgroundAlpha(val: Options['background_alpha']): this {
    return this.setOption('background_alpha', `${val}`);
  }

  blur(val: Options['blur']): this {
    return this.setOption('blur', `${val}`);
  }

  blurDetections(val: Options['blur_detections']): this {
    return this.setOption('blur_detections', val);
  }

  unsharpMasking(val: Options['unsharp_masking']): this {
    return this.setOption('unsharp_masking', val);
  }

  drawDetections(val: Options['draw_detections']): this {
    return this.setOption('draw_detections', val);
  }

  raw(val: Options['raw']): this {
    return this.setOption('raw', `${val}`);
  }

  returnAttachment(val: Options['return_attachment']): this {
    return this.setOption('return_attachment', `${val}`);
  }

  saturation(val: Options['saturation']): this {
    return this.setOption('saturation', `${val}`);
  }

  contrast(val: Options['contrast']): this {
    return this.setOption('contrast', `${val}`);
  }

  brightness(val: Options['brightness']): this {
    return this.setOption('brightness', `${val}`);
  }

  sharpen(val: Options['sharpen']): this {
    return this.setOption('sharpen', `${val}`);
  }

  watermark(val: Options['watermark']): this {
    return this.setOption('watermark', val);
  }

  watermarkUrl(val: Options['watermark_url']): this {
    return this.setOption('watermark_url', val);
  }

  preset(val: Options['preset']): this {
    return this.setOption('preset', val);
  }

  cacheBuster(val: Options['cachebuster']): this {
    return this.setOption('cachebuster', val);
  }

  format(val: Options['format']): this {
    return this.setOption('format', val);
  }

  filename(val: Options['filename']): this {
    return this.setOption('filename', val);
  }

  rotate(val: Options['rotate']): this {
    return this.setOption('rotate', val);
  }

  autoRotate(val: Options['auto_rotate']): this {
    return this.setOption('auto_rotate', val);
  }

  style(val: Options['style']): this {
    return this.setOption('style', val);
  }

  page(val: Options['page']): this {
    return this.setOption('page', `${val}`);
  }

  zoom(val: Options['zoom']): this {
    return this.setOption('zoom', val);
  }

  videoThumbnailSecond(val: Options['video_thumbnail_second']): this {
    return this.setOption('video_thumbnail_second', `${val}`);
  }

  webpOptions(val: Options['webp_options']): this {
    return this.setOption('webp_options', `${val}`);
  }

  stripMetadata(val: Options['strip_metadata']): this {
    return this.setOption('strip_metadata', `${val}`);
  }

  keepCopyright(val: Options['keep_copyright']): this {
    return this.setOption('keep_copyright', `${val}`);
  }

  stripColorProfile(val: Options['strip_color_profile']): this {
    return this.setOption('strip_color_profile', `${val}`);
  }

  gifOptions(val: Options['gif_options']): this {
    return this.setOption('gif_options', val);
  }

  pngOptions(val: Options['png_options']): this {
    return this.setOption('png_options', val);
  }

  private sign(target: string) {
    const { key, salt } = this.options?.config ?? {};

    if (!key || !salt) {
      throw Error('Missing required params: key, salt');
    }

    const hexKey = ImgProxy.hexDecode(key);
    const hexSalt = ImgProxy.hexDecode(salt);

    const hmac = createHmac('sha256', hexKey);
    hmac.update(hexSalt);
    hmac.update(target);
    return ImgProxy.urlSafeBase64(hmac.digest());
  }

  static hexDecode(hex: string) {
    return Buffer.from(hex, 'hex');
  }

  static urlSafeBase64(string: Buffer | string) {
    return Buffer.from(string).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  }

  public get(originalImage: string): string {
    const { settings, config } = this.options;

    if (!originalImage) {
      throw Error('Missing required param: image');
    }

    const encoded_url = ImgProxy.urlSafeBase64(originalImage);
    const options = Object.values(settings).join('/');
    const path = options ? `/${options}/${encoded_url}` : `/${encoded_url}`;

    let url: string;
    if (config.key && config.salt) {
      url = `${config.url}/${this.sign(path)}${path}`;
    } else {
      url = `${config.url}/insecure${path}`;
    }

    if (this.options.config.autoreset) {
      this.resetOptions();
    }

    return url;
  }
}

export default ImgProxy;
