import { Options } from './types';

export class Transformers {
  protected isObject(val) {
    if (!val || typeof val !== 'object') {
      throw new Error('Need to be an object param');
    }
  }

  private stringify(option: Array<string | number | boolean | undefined>) {
    return option.map((o) => o ?? '').join(':');
  }

  protected tresize(val: Options['resize']) {
    this.isObject(val);
    const { resizing_type, width, height, enlarge, extend } = val ?? {};
    return this.stringify([resizing_type, width, height, enlarge, extend]);
  }

  protected tsize(val: Options['size']) {
    this.isObject(val);
    const { width, height, enlarge, extend } = val ?? {};
    return this.stringify([width, height, enlarge, extend]);
  }

  protected textend(val: Options['extend']) {
    this.isObject(val);
    const { extend, gravity, x_offset, y_offset } = val ?? {};
    return this.stringify([extend, gravity, x_offset, y_offset]);
  }

  protected textendAspectRatio(val: Options['extend_aspect_ratio']) {
    this.isObject(val);
    const { extend, gravity, x_offset, y_offset } = val ?? {};
    return this.stringify([extend, gravity as string, x_offset, y_offset]);
  }

  protected tgravity(val: Options['gravity']) {
    this.isObject(val);
    const { gravity_type, x_offset, y_offset } = val ?? {};
    return this.stringify([gravity_type, x_offset, y_offset]);
  }

  protected tcrop(val: Options['crop']) {
    this.isObject(val);
    const { width, height, gravity, x_offset, y_offset } = val ?? {};
    return this.stringify([width, height, gravity, x_offset, y_offset]);
  }

  protected ttrim(val: Options['trim']) {
    this.isObject(val);
    const { threshold, color, equal_hor, equal_ver } = val ?? {};
    return this.stringify([threshold, color, equal_hor, equal_ver]);
  }

  protected tpadding(val: Options['padding']) {
    this.isObject(val);
    const { top, right, bottom, left } = val ?? {};
    return this.stringify([top, right, bottom, left]);
  }

  protected tbackground(val: Options['background']) {
    if (typeof val === 'object' && 'r' in val && 'g' in val && 'b' in val) {
      return `${val.r}:${val.g}:${val.b}`;
    }
    return val?.replace?.('#', '');
  }

  protected tadjust(val: Options['adjust']) {
    this.isObject(val);
    const { brightness, contrast, saturation } = val ?? {};
    return this.stringify([brightness, contrast, saturation]);
  }

  protected tunsharpMasking(val: Options['unsharp_masking']) {
    this.isObject(val);
    const { mode, weight, divider } = val ?? {};
    return this.stringify([mode, weight, divider]);
  }

  protected tblurDetections(val: Options['blur_detections']) {
    this.isObject(val);
    const { sigma, classNames } = val ?? {};
    return this.stringify([sigma, ...(classNames ?? [])]);
  }

  protected tdrawDetections(val: Options['draw_detections']) {
    this.isObject(val);
    const { draw, classNames } = val ?? {};
    return this.stringify([draw, ...(classNames ?? [])]);
  }

  protected tgradient(val: Options['gradient']) {
    this.isObject(val);
    const { opacity, color, direction, start, stop } = val ?? {};
    return this.stringify([opacity, color, direction, start, stop]);
  }

  protected tskipProcessing(val: Options['skip_processing']) {
    return this.stringify([...(val ?? [])]);
  }

  protected tpreset(val: Options['preset']) {
    return this.stringify([...(val ?? [])]);
  }

  protected twatermark(val: Options['watermark']) {
    this.isObject(val);
    const { opacity, position, x_offset, y_offset, scale } = val ?? {};
    return this.stringify([opacity, position, x_offset, y_offset, scale]);
  }

  protected tformatQuality(val: Options['format_quality']) {
    this.isObject(val);
    const options = val ?? {};
    return this.stringify(Object.entries(options).flat());
  }

  protected tjpegOptions(val: Options['jpeg_options']) {
    this.isObject(val);
    const { progressive, no_subsample, trellis_quant, overshoot_deringing, optimize_scans, quant_table } = val ?? {};
    return this.stringify([progressive, no_subsample, trellis_quant, overshoot_deringing, optimize_scans, quant_table]);
  }

  protected tpngOptions(val: Options['png_options']) {
    this.isObject(val);
    const { png_interlaced, png_quantize, png_quantization_colors } = val ?? {};
    return this.stringify([png_interlaced, png_quantize, png_quantization_colors]);
  }

  protected tgifOptions(val: Options['gif_options']) {
    this.isObject(val);
    const { gif_optimize_frames, gif_optimize_transparency } = val ?? {};
    return this.stringify([gif_optimize_frames, gif_optimize_transparency]);
  }

  protected zoomOptions(val: Options['zoom']) {
    this.isObject(val);
    const { zoom_x_y, zoom_x, zoom_y } = val ?? {};
    if (zoom_x_y !== undefined) {
      return this.stringify([zoom_x_y]);
    } else if (zoom_x !== undefined && zoom_y !== undefined) {
      return this.stringify([zoom_x, zoom_y]);
    }

    return this.stringify([1]);
  }
}
