(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.bongioviPost = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
// bongiovi-post.js

"use strict";


var bongiovi = _dereq_("./bongiovi");

/*/
var GLTools = require("./bongiovi/GLTools");
var bongiovi = {
	GL:GLTools,
	GLTools:GLTools,
	Scheduler:require("./bongiovi/Scheduler"),
	SimpleImageLoader:require("./bongiovi/SimpleImageLoader"),
	EaseNumber:require("./bongiovi/EaseNumber"),
	QuatRotation:require("./bongiovi/QuatRotation"),
	Scene:require("./bongiovi/Scene"),
	Camera:require("./bongiovi/Camera"),
	SimpleCamera:require("./bongiovi/SimpleCamera"),
	CameraPerspective:require("./bongiovi/CameraPerspective"),
	CameraOrtho:require("./bongiovi/CameraOrtho"),
	Mesh:require("./bongiovi/Mesh"),
	Face:require("./bongiovi/Face"),
	GLShader:require("./bongiovi/GLShader"),
	GLTexture:require("./bongiovi/GLTexture"),
	ShaderLibs:require("./bongiovi/ShaderLibs"),
	View:require("./bongiovi/View"),
	ViewCopy:require("./bongiovi/ViewCopy"),
	ViewAxis:require("./bongiovi/ViewAxis"),
	ViewDotPlane:require("./bongiovi/ViewDotPlanes"),
	MeshUtils:require("./bongiovi/MeshUtils"),
	FrameBuffer:require("./bongiovi/FrameBuffer"),
	EventDispatcher:require("./bongiovi/EventDispatcher"),
	glm:require("gl-matrix"),

	post: {
		Pass:require("./bongiovi/post/Pass"),
		EffectComposer:require("./bongiovi/post/EffectComposer"),
		PassGreyscale:require("./bongiovi/post/PassGreyscale")
	}
};
/*/
bongiovi.post = {
	Pass:_dereq_("./bongiovi/post/Pass"),
	EffectComposer:_dereq_("./bongiovi/post/EffectComposer"),
	PassGreyscale:_dereq_("./bongiovi/post/PassGreyscale")
};
//*/

module.exports = bongiovi;
},{"./bongiovi":3,"./bongiovi/post/EffectComposer":28,"./bongiovi/post/Pass":29,"./bongiovi/post/PassGreyscale":30}],2:[function(_dereq_,module,exports){
/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.2.1
 */

/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */


(function(_global) {
  "use strict";

  var shim = {};
  if (typeof(exports) === 'undefined') {
    if(typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
      shim.exports = {};
      define(function() {
        return shim.exports;
      });
    } else {
      // gl-matrix lives in a browser, define its namespaces in global
      shim.exports = typeof(window) !== 'undefined' ? window : _global;
    }
  }
  else {
    // gl-matrix lives in commonjs, define its namespaces in exports
    shim.exports = exports;
  }

  (function(exports) {
    /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */


if(!GLMAT_EPSILON) {
    var GLMAT_EPSILON = 0.000001;
}

if(!GLMAT_ARRAY_TYPE) {
    var GLMAT_ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
}

if(!GLMAT_RANDOM) {
    var GLMAT_RANDOM = Math.random;
}

/**
 * @class Common utilities
 * @name glMatrix
 */
var glMatrix = {};

/**
 * Sets the type of array used when creating new vectors and matricies
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */
glMatrix.setMatrixArrayType = function(type) {
    GLMAT_ARRAY_TYPE = type;
}

if(typeof(exports) !== 'undefined') {
    exports.glMatrix = glMatrix;
}

var degree = Math.PI / 180;

/**
* Convert Degree To Radian
*
* @param {Number} Angle in Degrees
*/
glMatrix.toRadian = function(a){
     return a * degree;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2 Dimensional Vector
 * @name vec2
 */

var vec2 = {};

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
vec2.create = function() {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = 0;
    out[1] = 0;
    return out;
};

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
vec2.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
vec2.fromValues = function(x, y) {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
vec2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
vec2.set = function(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
};

/**
 * Alias for {@link vec2.subtract}
 * @function
 */
vec2.sub = vec2.subtract;

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
};

/**
 * Alias for {@link vec2.multiply}
 * @function
 */
vec2.mul = vec2.multiply;

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
};

/**
 * Alias for {@link vec2.divide}
 * @function
 */
vec2.div = vec2.divide;

/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
};

/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
};

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
vec2.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
};

/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */
vec2.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
vec2.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.distance}
 * @function
 */
vec2.dist = vec2.distance;

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec2.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */
vec2.sqrDist = vec2.squaredDistance;

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
vec2.length = function (a) {
    var x = a[0],
        y = a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.length}
 * @function
 */
vec2.len = vec2.length;

/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec2.squaredLength = function (a) {
    var x = a[0],
        y = a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */
vec2.sqrLen = vec2.squaredLength;

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
vec2.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
};

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
vec2.normalize = function(out, a) {
    var x = a[0],
        y = a[1];
    var len = x*x + y*y;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
vec2.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1];
};

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */
vec2.cross = function(out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
};

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */
vec2.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */
vec2.random = function (out, scale) {
    scale = scale || 1.0;
    var r = GLMAT_RANDOM() * 2.0 * Math.PI;
    out[0] = Math.cos(r) * scale;
    out[1] = Math.sin(r) * scale;
    return out;
};

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
};

/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2d = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
};

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat3 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
};

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat4 = function(out, a, m) {
    var x = a[0], 
        y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
};

/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec2.forEach = (function() {
    var vec = vec2.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 2;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec2} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec2.str = function (a) {
    return 'vec2(' + a[0] + ', ' + a[1] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec2 = vec2;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 3 Dimensional Vector
 * @name vec3
 */

var vec3 = {};

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
vec3.create = function() {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
};

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
vec3.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
vec3.fromValues = function(x, y, z) {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
vec3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
vec3.set = function(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};

/**
 * Alias for {@link vec3.subtract}
 * @function
 */
vec3.sub = vec3.subtract;

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};

/**
 * Alias for {@link vec3.multiply}
 * @function
 */
vec3.mul = vec3.multiply;

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
};

/**
 * Alias for {@link vec3.divide}
 * @function
 */
vec3.div = vec3.divide;

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
};

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
};

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
vec3.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
};

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
vec3.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
vec3.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.distance}
 * @function
 */
vec3.dist = vec3.distance;

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec3.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */
vec3.sqrDist = vec3.squaredDistance;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
vec3.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.length}
 * @function
 */
vec3.len = vec3.length;

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec3.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */
vec3.sqrLen = vec3.squaredLength;

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
vec3.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
};

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
vec3.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var len = x*x + y*y + z*z;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
vec3.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.cross = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
};

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */
vec3.random = function (out, scale) {
    scale = scale || 1.0;

    var r = GLMAT_RANDOM() * 2.0 * Math.PI;
    var z = (GLMAT_RANDOM() * 2.0) - 1.0;
    var zScale = Math.sqrt(1.0-z*z) * scale;

    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale;
    return out;
};

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12];
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13];
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14];
    return out;
};

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat3 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
};

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
vec3.transformQuat = function(out, a, q) {
    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/*
* Rotate a 3D vector around the x-axis
* @param {vec3} out The receiving vec3
* @param {vec3} a The vec3 point to rotate
* @param {vec3} b The origin of the rotation
* @param {Number} c The angle of rotation
* @returns {vec3} out
*/
vec3.rotateX = function(out, a, b, c){
   var p = [], r=[];
	  //Translate point to the origin
	  p[0] = a[0] - b[0];
	  p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];

	  //perform rotation
	  r[0] = p[0];
	  r[1] = p[1]*Math.cos(c) - p[2]*Math.sin(c);
	  r[2] = p[1]*Math.sin(c) + p[2]*Math.cos(c);

	  //translate to correct position
	  out[0] = r[0] + b[0];
	  out[1] = r[1] + b[1];
	  out[2] = r[2] + b[2];

  	return out;
};

/*
* Rotate a 3D vector around the y-axis
* @param {vec3} out The receiving vec3
* @param {vec3} a The vec3 point to rotate
* @param {vec3} b The origin of the rotation
* @param {Number} c The angle of rotation
* @returns {vec3} out
*/
vec3.rotateY = function(out, a, b, c){
  	var p = [], r=[];
  	//Translate point to the origin
  	p[0] = a[0] - b[0];
  	p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];
  
  	//perform rotation
  	r[0] = p[2]*Math.sin(c) + p[0]*Math.cos(c);
  	r[1] = p[1];
  	r[2] = p[2]*Math.cos(c) - p[0]*Math.sin(c);
  
  	//translate to correct position
  	out[0] = r[0] + b[0];
  	out[1] = r[1] + b[1];
  	out[2] = r[2] + b[2];
  
  	return out;
};

/*
* Rotate a 3D vector around the z-axis
* @param {vec3} out The receiving vec3
* @param {vec3} a The vec3 point to rotate
* @param {vec3} b The origin of the rotation
* @param {Number} c The angle of rotation
* @returns {vec3} out
*/
vec3.rotateZ = function(out, a, b, c){
  	var p = [], r=[];
  	//Translate point to the origin
  	p[0] = a[0] - b[0];
  	p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];
  
  	//perform rotation
  	r[0] = p[0]*Math.cos(c) - p[1]*Math.sin(c);
  	r[1] = p[0]*Math.sin(c) + p[1]*Math.cos(c);
  	r[2] = p[2];
  
  	//translate to correct position
  	out[0] = r[0] + b[0];
  	out[1] = r[1] + b[1];
  	out[2] = r[2] + b[2];
  
  	return out;
};

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec3.forEach = (function() {
    var vec = vec3.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 3;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec3} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec3.str = function (a) {
    return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec3 = vec3;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 4 Dimensional Vector
 * @name vec4
 */

var vec4 = {};

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
vec4.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    return out;
};

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */
vec4.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */
vec4.fromValues = function(x, y, z, w) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */
vec4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
vec4.set = function(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
};

/**
 * Alias for {@link vec4.subtract}
 * @function
 */
vec4.sub = vec4.subtract;

/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];
    return out;
};

/**
 * Alias for {@link vec4.multiply}
 * @function
 */
vec4.mul = vec4.multiply;

/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];
    return out;
};

/**
 * Alias for {@link vec4.divide}
 * @function
 */
vec4.div = vec4.divide;

/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);
    return out;
};

/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);
    return out;
};

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
vec4.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
};

/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */
vec4.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} distance between a and b
 */
vec4.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.distance}
 * @function
 */
vec4.dist = vec4.distance;

/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec4.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */
vec4.sqrDist = vec4.squaredDistance;

/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */
vec4.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.length}
 * @function
 */
vec4.len = vec4.length;

/**
 * Calculates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec4.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */
vec4.sqrLen = vec4.squaredLength;

/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to negate
 * @returns {vec4} out
 */
vec4.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = -a[3];
    return out;
};

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
vec4.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    var len = x*x + y*y + z*z + w*w;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
        out[3] = a[3] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */
vec4.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
};

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */
vec4.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */
vec4.random = function (out, scale) {
    scale = scale || 1.0;

    //TODO: This is a pretty awful way of doing this. Find something better.
    out[0] = GLMAT_RANDOM();
    out[1] = GLMAT_RANDOM();
    out[2] = GLMAT_RANDOM();
    out[3] = GLMAT_RANDOM();
    vec4.normalize(out, out);
    vec4.scale(out, out, scale);
    return out;
};

/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */
vec4.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
};

/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec4} out
 */
vec4.transformQuat = function(out, a, q) {
    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec4.forEach = (function() {
    var vec = vec4.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 4;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2]; vec[3] = a[i+3];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2]; a[i+3] = vec[3];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec4} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec4.str = function (a) {
    return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec4 = vec4;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2x2 Matrix
 * @name mat2
 */

var mat2 = {};

/**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */
mat2.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {mat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */
mat2.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */
mat2.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a1 = a[1];
        out[1] = a[2];
        out[2] = a1;
    } else {
        out[0] = a[0];
        out[1] = a[2];
        out[2] = a[1];
        out[3] = a[3];
    }
    
    return out;
};

/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],

        // Calculate the determinant
        det = a0 * a3 - a2 * a1;

    if (!det) {
        return (function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.bongioviPost = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _dereq_=="function"&&_dereq_;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof _dereq_=="function"&&_dereq_;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
// bongiovi-post.js

"use strict";


var bongiovi = _dereq_("./bongiovi");

/*/
var GLTools = require("./bongiovi/GLTools");
var bongiovi = {
	GL:GLTools,
	GLTools:GLTools,
	Scheduler:require("./bongiovi/Scheduler"),
	SimpleImageLoader:require("./bongiovi/SimpleImageLoader"),
	EaseNumber:require("./bongiovi/EaseNumber"),
	QuatRotation:require("./bongiovi/QuatRotation"),
	Scene:require("./bongiovi/Scene"),
	Camera:require("./bongiovi/Camera"),
	SimpleCamera:require("./bongiovi/SimpleCamera"),
	CameraPerspective:require("./bongiovi/CameraPerspective"),
	CameraOrtho:require("./bongiovi/CameraOrtho"),
	Mesh:require("./bongiovi/Mesh"),
	Face:require("./bongiovi/Face"),
	GLShader:require("./bongiovi/GLShader"),
	GLTexture:require("./bongiovi/GLTexture"),
	ShaderLibs:require("./bongiovi/ShaderLibs"),
	View:require("./bongiovi/View"),
	ViewCopy:require("./bongiovi/ViewCopy"),
	ViewAxis:require("./bongiovi/ViewAxis"),
	ViewDotPlane:require("./bongiovi/ViewDotPlanes"),
	MeshUtils:require("./bongiovi/MeshUtils"),
	FrameBuffer:require("./bongiovi/FrameBuffer"),
	EventDispatcher:require("./bongiovi/EventDispatcher"),
	glm:require("gl-matrix"),

	post: {
		Pass:require("./bongiovi/post/Pass"),
		EffectComposer:require("./bongiovi/post/EffectComposer"),
		PassGreyscale:require("./bongiovi/post/PassGreyscale")
	}
};
/*/
bongiovi.post = {
	Pass:_dereq_("./bongiovi/post/Pass"),
	EffectComposer:_dereq_("./bongiovi/post/EffectComposer"),
	PassGreyscale:_dereq_("./bongiovi/post/PassGreyscale")
};
//*/

module.exports = bongiovi;
},{"./bongiovi":3,"./bongiovi/post/EffectComposer":28,"./bongiovi/post/Pass":29,"./bongiovi/post/PassGreyscale":30}],2:[function(_dereq_,module,exports){
/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.2.1
 */

/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */


(function(_global) {
  "use strict";

  var shim = {};
  if (typeof(exports) === 'undefined') {
    if(typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
      shim.exports = {};
      define(function() {
        return shim.exports;
      });
    } else {
      // gl-matrix lives in a browser, define its namespaces in global
      shim.exports = typeof(window) !== 'undefined' ? window : _global;
    }
  }
  else {
    // gl-matrix lives in commonjs, define its namespaces in exports
    shim.exports = exports;
  }

  (function(exports) {
    /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */


if(!GLMAT_EPSILON) {
    var GLMAT_EPSILON = 0.000001;
}

if(!GLMAT_ARRAY_TYPE) {
    var GLMAT_ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
}

if(!GLMAT_RANDOM) {
    var GLMAT_RANDOM = Math.random;
}

/**
 * @class Common utilities
 * @name glMatrix
 */
var glMatrix = {};

/**
 * Sets the type of array used when creating new vectors and matricies
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */
glMatrix.setMatrixArrayType = function(type) {
    GLMAT_ARRAY_TYPE = type;
}

if(typeof(exports) !== 'undefined') {
    exports.glMatrix = glMatrix;
}

var degree = Math.PI / 180;

/**
* Convert Degree To Radian
*
* @param {Number} Angle in Degrees
*/
glMatrix.toRadian = function(a){
     return a * degree;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2 Dimensional Vector
 * @name vec2
 */

var vec2 = {};

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
vec2.create = function() {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = 0;
    out[1] = 0;
    return out;
};

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
vec2.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
vec2.fromValues = function(x, y) {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
vec2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
vec2.set = function(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
};

/**
 * Alias for {@link vec2.subtract}
 * @function
 */
vec2.sub = vec2.subtract;

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
};

/**
 * Alias for {@link vec2.multiply}
 * @function
 */
vec2.mul = vec2.multiply;

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
};

/**
 * Alias for {@link vec2.divide}
 * @function
 */
vec2.div = vec2.divide;

/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
};

/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
};

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
vec2.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
};

/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */
vec2.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
vec2.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.distance}
 * @function
 */
vec2.dist = vec2.distance;

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec2.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */
vec2.sqrDist = vec2.squaredDistance;

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
vec2.length = function (a) {
    var x = a[0],
        y = a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.length}
 * @function
 */
vec2.len = vec2.length;

/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec2.squaredLength = function (a) {
    var x = a[0],
        y = a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */
vec2.sqrLen = vec2.squaredLength;

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
vec2.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
};

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
vec2.normalize = function(out, a) {
    var x = a[0],
        y = a[1];
    var len = x*x + y*y;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
vec2.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1];
};

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */
vec2.cross = function(out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
};

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */
vec2.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */
vec2.random = function (out, scale) {
    scale = scale || 1.0;
    var r = GLMAT_RANDOM() * 2.0 * Math.PI;
    out[0] = Math.cos(r) * scale;
    out[1] = Math.sin(r) * scale;
    return out;
};

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
};

/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2d = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
};

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat3 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
};

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat4 = function(out, a, m) {
    var x = a[0], 
        y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
};

/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec2.forEach = (function() {
    var vec = vec2.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 2;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec2} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec2.str = function (a) {
    return 'vec2(' + a[0] + ', ' + a[1] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec2 = vec2;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 3 Dimensional Vector
 * @name vec3
 */

var vec3 = {};

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
vec3.create = function() {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
};

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
vec3.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
vec3.fromValues = function(x, y, z) {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
vec3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
vec3.set = function(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};

/**
 * Alias for {@link vec3.subtract}
 * @function
 */
vec3.sub = vec3.subtract;

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};

/**
 * Alias for {@link vec3.multiply}
 * @function
 */
vec3.mul = vec3.multiply;

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
};

/**
 * Alias for {@link vec3.divide}
 * @function
 */
vec3.div = vec3.divide;

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
};

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
};

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
vec3.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
};

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
vec3.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
vec3.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.distance}
 * @function
 */
vec3.dist = vec3.distance;

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec3.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */
vec3.sqrDist = vec3.squaredDistance;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
vec3.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.length}
 * @function
 */
vec3.len = vec3.length;

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec3.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */
vec3.sqrLen = vec3.squaredLength;

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
vec3.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
};

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
vec3.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var len = x*x + y*y + z*z;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
vec3.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.cross = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
};

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */
vec3.random = function (out, scale) {
    scale = scale || 1.0;

    var r = GLMAT_RANDOM() * 2.0 * Math.PI;
    var z = (GLMAT_RANDOM() * 2.0) - 1.0;
    var zScale = Math.sqrt(1.0-z*z) * scale;

    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale;
    return out;
};

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12];
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13];
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14];
    return out;
};

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat3 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
};

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
vec3.transformQuat = function(out, a, q) {
    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/*
* Rotate a 3D vector around the x-axis
* @param {vec3} out The receiving vec3
* @param {vec3} a The vec3 point to rotate
* @param {vec3} b The origin of the rotation
* @param {Number} c The angle of rotation
* @returns {vec3} out
*/
vec3.rotateX = function(out, a, b, c){
   var p = [], r=[];
	  //Translate point to the origin
	  p[0] = a[0] - b[0];
	  p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];

	  //perform rotation
	  r[0] = p[0];
	  r[1] = p[1]*Math.cos(c) - p[2]*Math.sin(c);
	  r[2] = p[1]*Math.sin(c) + p[2]*Math.cos(c);

	  //translate to correct position
	  out[0] = r[0] + b[0];
	  out[1] = r[1] + b[1];
	  out[2] = r[2] + b[2];

  	return out;
};

/*
* Rotate a 3D vector around the y-axis
* @param {vec3} out The receiving vec3
* @param {vec3} a The vec3 point to rotate
* @param {vec3} b The origin of the rotation
* @param {Number} c The angle of rotation
* @returns {vec3} out
*/
vec3.rotateY = function(out, a, b, c){
  	var p = [], r=[];
  	//Translate point to the origin
  	p[0] = a[0] - b[0];
  	p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];
  
  	//perform rotation
  	r[0] = p[2]*Math.sin(c) + p[0]*Math.cos(c);
  	r[1] = p[1];
  	r[2] = p[2]*Math.cos(c) - p[0]*Math.sin(c);
  
  	//translate to correct position
  	out[0] = r[0] + b[0];
  	out[1] = r[1] + b[1];
  	out[2] = r[2] + b[2];
  
  	return out;
};

/*
* Rotate a 3D vector around the z-axis
* @param {vec3} out The receiving vec3
* @param {vec3} a The vec3 point to rotate
* @param {vec3} b The origin of the rotation
* @param {Number} c The angle of rotation
* @returns {vec3} out
*/
vec3.rotateZ = function(out, a, b, c){
  	var p = [], r=[];
  	//Translate point to the origin
  	p[0] = a[0] - b[0];
  	p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];
  
  	//perform rotation
  	r[0] = p[0]*Math.cos(c) - p[1]*Math.sin(c);
  	r[1] = p[0]*Math.sin(c) + p[1]*Math.cos(c);
  	r[2] = p[2];
  
  	//translate to correct position
  	out[0] = r[0] + b[0];
  	out[1] = r[1] + b[1];
  	out[2] = r[2] + b[2];
  
  	return out;
};

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec3.forEach = (function() {
    var vec = vec3.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 3;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec3} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec3.str = function (a) {
    return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec3 = vec3;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 4 Dimensional Vector
 * @name vec4
 */

var vec4 = {};

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
vec4.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    return out;
};

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */
vec4.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */
vec4.fromValues = function(x, y, z, w) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */
vec4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
vec4.set = function(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
};

/**
 * Alias for {@link vec4.subtract}
 * @function
 */
vec4.sub = vec4.subtract;

/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];
    return out;
};

/**
 * Alias for {@link vec4.multiply}
 * @function
 */
vec4.mul = vec4.multiply;

/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];
    return out;
};

/**
 * Alias for {@link vec4.divide}
 * @function
 */
vec4.div = vec4.divide;

/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);
    return out;
};

/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);
    return out;
};

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
vec4.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
};

/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */
vec4.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} distance between a and b
 */
vec4.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.distance}
 * @function
 */
vec4.dist = vec4.distance;

/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec4.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */
vec4.sqrDist = vec4.squaredDistance;

/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */
vec4.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.length}
 * @function
 */
vec4.len = vec4.length;

/**
 * Calculates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec4.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */
vec4.sqrLen = vec4.squaredLength;

/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to negate
 * @returns {vec4} out
 */
vec4.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = -a[3];
    return out;
};

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
vec4.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    var len = x*x + y*y + z*z + w*w;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
        out[3] = a[3] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */
vec4.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
};

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */
vec4.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */
vec4.random = function (out, scale) {
    scale = scale || 1.0;

    //TODO: This is a pretty awful way of doing this. Find something better.
    out[0] = GLMAT_RANDOM();
    out[1] = GLMAT_RANDOM();
    out[2] = GLMAT_RANDOM();
    out[3] = GLMAT_RANDOM();
    vec4.normalize(out, out);
    vec4.scale(out, out, scale);
    return out;
};

/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */
vec4.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
};

/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec4} out
 */
vec4.transformQuat = function(out, a, q) {
    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec4.forEach = (function() {
    var vec = vec4.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 4;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2]; vec[3] = a[i+3];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2]; a[i+3] = vec[3];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec4} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec4.str = function (a) {
    return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec4 = vec4;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2x2 Matrix
 * @name mat2
 */

var mat2 = {};

/**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */
mat2.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {mat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */
mat2.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */
mat2.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a1 = a[1];
        out[1] = a[2];
        out[2] = a1;
    } else {
        out[0] = a[0];
        out[1] = a[2];
        out[2] = a[1];
        out[3] = a[3];
    }
    
    return out;
};

/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],

        // Calculate the determinant
        det = a0 * a3 - a2 * a1;

    if (!det) {
        return null;
    }
    det = 1.0 / det;
    
    out[0] =  a3 * det;
    out[1] = -a1 * det;
    out[2] = -a2 * det;
    out[3] =  a0 * det;

    return out;
};

/**
 * Calculates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.adjoint = function(out, a) {
    // Caching this value is nessecary if out == a
    var a0 = a[0];
    out[0] =  a[3];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] =  a0;

    return out;
};

/**
 * Calculates the determinant of a mat2
 *
 * @param {mat2} a the source matrix
 * @returns {Number} determinant of a
 */
mat2.determinant = function (a) {
    return a[0] * a[3] - a[2] * a[1];
};

/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
mat2.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    return out;
};

/**
 * Alias for {@link mat2.multiply}
 * @function
 */
mat2.mul = mat2.multiply;

/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
mat2.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a2 * s;
    out[1] = a1 *  c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    return out;
};

/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/
mat2.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    return out;
};

/**
 * Returns a string representation of a mat2
 *
 * @param {mat2} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2.str = function (a) {
    return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

/**
 * Returns Frobenius norm of a mat2
 *
 * @param {mat2} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat2.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2)))
};

/**
 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
 * @param {mat2} L the lower triangular matrix 
 * @param {mat2} D the diagonal matrix 
 * @param {mat2} U the upper triangular matrix 
 * @param {mat2} a the input matrix to factorize
 */

mat2.LDU = function (L, D, U, a) { 
    L[2] = a[2]/a[0]; 
    U[0] = a[0]; 
    U[1] = a[1]; 
    U[3] = a[3] - L[2] * U[1]; 
    return [L, D, U];       
}; 

if(typeof(exports) !== 'undefined') {
    exports.mat2 = mat2;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2x3 Matrix
 * @name mat2d
 * 
 * @description 
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, c, tx,
 *  b, d, ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, c, tx,
 *  b, d, ty,
 *  0, 0, 1]
 * </pre>
 * The last row is ignored so the array is shorter and operations are faster.
 */

var mat2d = {};

/**
 * Creates a new identity mat2d
 *
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.create = function() {
    var out = new GLMAT_ARRAY_TYPE(6);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Creates a new mat2d initialized with values from an existing matrix
 *
 * @param {mat2d} a matrix to clone
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(6);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Copy the values from one mat2d to another
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Set a mat2d to the identity matrix
 *
 * @param {mat2d} out the receiving matrix
 * @returns {mat2d} out
 */
mat2d.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Inverts a mat2d
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.invert = function(out, a) {
    var aa = a[0], ab = a[1], ac = a[2], ad = a[3],
        atx = a[4], aty = a[5];

    var det = aa * ad - ab * ac;
    if(!det){
        return null;
    }
    det = 1.0 / det;

    out[0] = ad * det;
    out[1] = -ab * det;
    out[2] = -ac * det;
    out[3] = aa * det;
    out[4] = (ac * aty - ad * atx) * det;
    out[5] = (ab * atx - aa * aty) * det;
    return out;
};

/**
 * Calculates the determinant of a mat2d
 *
 * @param {mat2d} a the source matrix
 * @returns {Number} determinant of a
 */
mat2d.determinant = function (a) {
    return a[0] * a[3] - a[1] * a[2];
};

/**
 * Multiplies two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
mat2d.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    out[4] = a0 * b4 + a2 * b5 + a4;
    out[5] = a1 * b4 + a3 * b5 + a5;
    return out;
};

/**
 * Alias for {@link mat2d.multiply}
 * @function
 */
mat2d.mul = mat2d.multiply;


/**
 * Rotates a mat2d by the given angle
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
mat2d.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a2 * s;
    out[1] = a1 *  c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    out[4] = a4;
    out[5] = a5;
    return out;
};

/**
 * Scales the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2d} out
 **/
mat2d.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    out[4] = a4;
    out[5] = a5;
    return out;
};

/**
 * Translates the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to translate the matrix by
 * @returns {mat2d} out
 **/
mat2d.translate = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        v0 = v[0], v1 = v[1];
    out[0] = a0;
    out[1] = a1;
    out[2] = a2;
    out[3] = a3;
    out[4] = a0 * v0 + a2 * v1 + a4;
    out[5] = a1 * v0 + a3 * v1 + a5;
    return out;
};

/**
 * Returns a string representation of a mat2d
 *
 * @param {mat2d} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2d.str = function (a) {
    return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ')';
};

/**
 * Returns Frobenius norm of a mat2d
 *
 * @param {mat2d} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat2d.frob = function (a) { 
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1))
}; 

if(typeof(exports) !== 'undefined') {
    exports.mat2d = mat2d;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 3x3 Matrix
 * @name mat3
 */

var mat3 = {};

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */
mat3.create = function() {
    var out = new GLMAT_ARRAY_TYPE(9);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
mat3.fromMat4 = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
};

/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */
mat3.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
mat3.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a12 = a[5];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a01;
        out[5] = a[7];
        out[6] = a02;
        out[7] = a12;
    } else {
        out[0] = a[0];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a[1];
        out[4] = a[4];
        out[5] = a[7];
        out[6] = a[2];
        out[7] = a[5];
        out[8] = a[8];
    }
    
    return out;
};

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b01 = a22 * a11 - a12 * a21,
        b11 = -a22 * a10 + a12 * a20,
        b21 = a21 * a10 - a11 * a20,

        // Calculate the determinant
        det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
};

/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    out[0] = (a11 * a22 - a12 * a21);
    out[1] = (a02 * a21 - a01 * a22);
    out[2] = (a01 * a12 - a02 * a11);
    out[3] = (a12 * a20 - a10 * a22);
    out[4] = (a00 * a22 - a02 * a20);
    out[5] = (a02 * a10 - a00 * a12);
    out[6] = (a10 * a21 - a11 * a20);
    out[7] = (a01 * a20 - a00 * a21);
    out[8] = (a00 * a11 - a01 * a10);
    return out;
};

/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
mat3.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
};

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b00 = b[0], b01 = b[1], b02 = b[2],
        b10 = b[3], b11 = b[4], b12 = b[5],
        b20 = b[6], b21 = b[7], b22 = b[8];

    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
};

/**
 * Alias for {@link mat3.multiply}
 * @function
 */
mat3.mul = mat3.multiply;

/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */
mat3.translate = function(out, a, v) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],
        x = v[0], y = v[1];

    out[0] = a00;
    out[1] = a01;
    out[2] = a02;

    out[3] = a10;
    out[4] = a11;
    out[5] = a12;

    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
};

/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
mat3.rotate = function (out, a, rad) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        s = Math.sin(rad),
        c = Math.cos(rad);

    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;

    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;

    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
};

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
mat3.scale = function(out, a, v) {
    var x = v[0], y = v[1];

    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];

    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];

    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {mat3} out
 **/
mat3.fromMat2d = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = 0;

    out[3] = a[2];
    out[4] = a[3];
    out[5] = 0;

    out[6] = a[4];
    out[7] = a[5];
    out[8] = 1;
    return out;
};

/**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/
mat3.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[3] = yx - wz;
    out[6] = zx + wy;

    out[1] = yx + wz;
    out[4] = 1 - xx - zz;
    out[7] = zy - wx;

    out[2] = zx - wy;
    out[5] = zy + wx;
    out[8] = 1 - xx - yy;

    return out;
};

/**
* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
*
* @param {mat3} out mat3 receiving operation result
* @param {mat4} a Mat4 to derive the normal matrix from
*
* @returns {mat3} out
*/
mat3.normalFromMat4 = function (out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

    return out;
};

/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat3.str = function (a) {
    return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + 
                    a[6] + ', ' + a[7] + ', ' + a[8] + ')';
};

/**
 * Returns Frobenius norm of a mat3
 *
 * @param {mat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat3.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2)))
};


if(typeof(exports) !== 'undefined') {
    exports.mat3 = mat3;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 4x4 Matrix
 * @name mat4
 */

var mat4 = {};

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
mat4.create = function() {
    var out = new GLMAT_ARRAY_TYPE(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
mat4.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
mat4.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3],
            a12 = a[6], a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }
    
    return out;
};

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};

/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
    return out;
};

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
mat4.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};

/**
 * Multiplies two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];  
    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    return out;
};

/**
 * Alias for {@link mat4.multiply}
 * @function
 */
mat4.mul = mat4.multiply;

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.translate = function (out, a, v) {
    var x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};

/**
 * Scales the mat4 by the dimensions in the given vec3
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4.scale = function(out, a, v) {
    var x = v[0], y = v[1], z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Rotates a mat4 by the given angle
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.rotate = function (out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (Math.abs(len) < GLMAT_EPSILON) { return null; }
    
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateX = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[0]  = a[0];
        out[1]  = a[1];
        out[2]  = a[2];
        out[3]  = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateY = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateZ = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslation = function (out, q, v) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    
    return out;
};

mat4.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.frustum = function (out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);
    out[0] = (near * 2) * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = (near * 2) * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (far * near * 2) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspective = function (out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (2 * far * near) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.ortho = function (out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
mat4.lookAt = function (out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < GLMAT_EPSILON &&
        Math.abs(eyey - centery) < GLMAT_EPSILON &&
        Math.abs(eyez - centerz) < GLMAT_EPSILON) {
        return mat4.identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat4.str = function (a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + 
                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};

/**
 * Returns Frobenius norm of a mat4
 *
 * @param {mat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat4.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2) ))
};


if(typeof(exports) !== 'undefined') {
    exports.mat4 = mat4;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class Quaternion
 * @name quat
 */

var quat = {};

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */
quat.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {vec3} a the initial vector
 * @param {vec3} b the destination vector
 * @returns {quat} out
 */
quat.rotationTo = (function() {
    var tmpvec3 = vec3.create();
    var xUnitVec3 = vec3.fromValues(1,0,0);
    var yUnitVec3 = vec3.fromValues(0,1,0);

    return function(out, a, b) {
        var dot = vec3.dot(a, b);
        if (dot < -0.999999) {
            vec3.cross(tmpvec3, xUnitVec3, a);
            if (vec3.length(tmpvec3) < 0.000001)
                vec3.cross(tmpvec3, yUnitVec3, a);
            vec3.normalize(tmpvec3, tmpvec3);
            quat.setAxisAngle(out, tmpvec3, Math.PI);
            return out;
        } else if (dot > 0.999999) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        } else {
            vec3.cross(tmpvec3, a, b);
            out[0] = tmpvec3[0];
            out[1] = tmpvec3[1];
            out[2] = tmpvec3[2];
            out[3] = 1 + dot;
            return quat.normalize(out, out);
        }
    };
})();

/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {vec3} view  the vector representing the viewing direction
 * @param {vec3} right the vector representing the local "right" direction
 * @param {vec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */
quat.setAxes = (function() {
    var matr = mat3.create();

    return function(out, view, right, up) {
        matr[0] = right[0];
        matr[3] = right[1];
        matr[6] = right[2];

        matr[1] = up[0];
        matr[4] = up[1];
        matr[7] = up[2];

        matr[2] = -view[0];
        matr[5] = -view[1];
        matr[8] = -view[2];

        return quat.normalize(out, quat.fromMat3(out, matr));
    };
})();

/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */
quat.clone = vec4.clone;

/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */
quat.fromValues = vec4.fromValues;

/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */
quat.copy = vec4.copy;

/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */
quat.set = vec4.set;

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
quat.identity = function(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
quat.setAxisAngle = function(out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
};

/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */
quat.add = vec4.add;

/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */
quat.multiply = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
};

/**
 * Alias for {@link quat.multiply}
 * @function
 */
quat.mul = quat.multiply;

/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */
quat.scale = vec4.scale;

/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateX = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateY = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        by = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateZ = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bz = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
};

/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate W component of
 * @returns {quat} out
 */
quat.calculateW = function (out, a) {
    var x = a[0], y = a[1], z = a[2];

    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = -Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
    return out;
};

/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
quat.dot = vec4.dot;

/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 * @function
 */
quat.lerp = vec4.lerp;

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */
quat.slerp = function (out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    var        omega, cosom, sinom, scale0, scale1;

    // calc cosine
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    // adjust signs (if necessary)
    if ( cosom < 0.0 ) {
        cosom = -cosom;
        bx = - bx;
        by = - by;
        bz = - bz;
        bw = - bw;
    }
    // calculate coefficients
    if ( (1.0 - cosom) > 0.000001 ) {
        // standard case (slerp)
        omega  = Math.acos(cosom);
        sinom  = Math.sin(omega);
        scale0 = Math.sin((1.0 - t) * omega) / sinom;
        scale1 = Math.sin(t * omega) / sinom;
    } else {        
        // "from" and "to" quaternions are very close 
        //  ... so we can do a linear interpolation
        scale0 = 1.0 - t;
        scale1 = t;
    }
    // calculate final values
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;
    
    return out;
};

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */
quat.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        dot = a0*a0 + a1*a1 + a2*a2 + a3*a3,
        invDot = dot ? 1.0/dot : 0;
    
    // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

    out[0] = -a0*invDot;
    out[1] = -a1*invDot;
    out[2] = -a2*invDot;
    out[3] = a3*invDot;
    return out;
};

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */
quat.conjugate = function (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
};

/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 * @function
 */
quat.length = vec4.length;

/**
 * Alias for {@link quat.length}
 * @function
 */
quat.len = quat.length;

/**
 * Calculates the squared length of a quat
 *
 * @param {quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
quat.squaredLength = vec4.squaredLength;

/**
 * Alias for {@link quat.squaredLength}
 * @function
 */
quat.sqrLen = quat.squaredLength;

/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
quat.normalize = vec4.normalize;

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
quat.fromMat3 = function(out, m) {
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    var fTrace = m[0] + m[4] + m[8];
    var fRoot;

    if ( fTrace > 0.0 ) {
        // |w| > 1/2, may as well choose w > 1/2
        fRoot = Math.sqrt(fTrace + 1.0);  // 2w
        out[3] = 0.5 * fRoot;
        fRoot = 0.5/fRoot;  // 1/(4w)
        out[0] = (m[7]-m[5])*fRoot;
        out[1] = (m[2]-m[6])*fRoot;
        out[2] = (m[3]-m[1])*fRoot;
    } else {
        // |w| <= 1/2
        var i = 0;
        if ( m[4] > m[0] )
          i = 1;
        if ( m[8] > m[i*3+i] )
          i = 2;
        var j = (i+1)%3;
        var k = (i+2)%3;
        
        fRoot = Math.sqrt(m[i*3+i]-m[j*3+j]-m[k*3+k] + 1.0);
        out[i] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot;
        out[3] = (m[k*3+j] - m[j*3+k]) * fRoot;
        out[j] = (m[j*3+i] + m[i*3+j]) * fRoot;
        out[k] = (m[k*3+i] + m[i*3+k]) * fRoot;
    }
    
    return out;
};

/**
 * Returns a string representation of a quatenion
 *
 * @param {quat} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
quat.str = function (a) {
    return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.quat = quat;
}
;













  })(shim.exports);
})(this);

},{}],3:[function(_dereq_,module,exports){
"use strict";

var GLTools = _dereq_("./bongiovi/GLTools");

var bongiovi = {
	GL:GLTools,
	GLTools:GLTools,
	Scheduler:_dereq_("./bongiovi/Scheduler"),
	SimpleImageLoader:_dereq_("./bongiovi/SimpleImageLoader"),
	EaseNumber:_dereq_("./bongiovi/EaseNumber"),
	QuatRotation:_dereq_("./bongiovi/QuatRotation"),
	Scene:_dereq_("./bongiovi/Scene"),
	Camera:_dereq_("./bongiovi/Camera"),
	SimpleCamera:_dereq_("./bongiovi/SimpleCamera"),
	CameraOrtho:_dereq_("./bongiovi/CameraOrtho"),
	CameraPerspective:_dereq_("./bongiovi/CameraPerspective"),
	Mesh:_dereq_("./bongiovi/Mesh"),
	Face:_dereq_("./bongiovi/Face"),
	GLShader:_dereq_("./bongiovi/GLShader"),
	GLTexture:_dereq_("./bongiovi/GLTexture"),
	GLCubeTexture:_dereq_("./bongiovi/GLCubeTexture"),
	ShaderLibs:_dereq_("./bongiovi/ShaderLibs"),
	View:_dereq_("./bongiovi/View"),
	ViewCopy:_dereq_("./bongiovi/ViewCopy"),
	ViewAxis:_dereq_("./bongiovi/ViewAxis"),
	ViewDotPlane:_dereq_("./bongiovi/ViewDotPlanes"),
	MeshUtils:_dereq_("./bongiovi/MeshUtils"),
	FrameBuffer:_dereq_("./bongiovi/FrameBuffer"),
	EventDispatcher:_dereq_("./bongiovi/EventDispatcher"),
	ObjLoader:_dereq_("./bongiovi/ObjLoader"),
	glm:_dereq_("gl-matrix")
};

module.exports = bongiovi;
},{"./bongiovi/Camera":4,"./bongiovi/CameraOrtho":5,"./bongiovi/CameraPerspective":6,"./bongiovi/EaseNumber":7,"./bongiovi/EventDispatcher":8,"./bongiovi/Face":9,"./bongiovi/FrameBuffer":10,"./bongiovi/GLCubeTexture":11,"./bongiovi/GLShader":12,"./bongiovi/GLTexture":13,"./bongiovi/GLTools":14,"./bongiovi/Mesh":15,"./bongiovi/MeshUtils":16,"./bongiovi/ObjLoader":17,"./bongiovi/QuatRotation":18,"./bongiovi/Scene":19,"./bongiovi/Scheduler":20,"./bongiovi/ShaderLibs":21,"./bongiovi/SimpleCamera":22,"./bongiovi/SimpleImageLoader":23,"./bongiovi/View":24,"./bongiovi/ViewAxis":25,"./bongiovi/ViewCopy":26,"./bongiovi/ViewDotPlanes":27,"gl-matrix":2}],4:[function(_dereq_,module,exports){
"use strict";

var glm = _dereq_("gl-matrix");

var Camera = function() {
	this.matrix = glm.mat4.create();
	glm.mat4.identity(this.matrix);

	this.position = glm.vec3.create();
};

var p = Camera.prototype;

p.lookAt = function(aEye, aCenter, aUp) {
	glm.vec3.copy(this.position, aEye);
	glm.mat4.identity(this.matrix);
	glm.mat4.lookAt(this.matrix, aEye, aCenter, aUp);
};

p.getMatrix = function() {
	return this.matrix;
};

module.exports = Camera;
},{"gl-matrix":2}],5:[function(_dereq_,module,exports){
// CameraOrtho.js

"use strict";

var Camera = _dereq_("./Camera");
var glm = _dereq_("gl-matrix");


var CameraOrtho = function() {
	Camera.call(this);

	var eye            = glm.vec3.clone([0, 0, 500]  );
	var center         = glm.vec3.create( );
	var up             = glm.vec3.clone( [0,-1,0] );
	this.lookAt(eye, center, up);

	this.projection = glm.mat4.create();
};

var p = CameraOrtho.prototype = new Camera();


p.setBoundary = function(left, right, top, bottom) {
	this.left = left;
	this.right = right;
	this.top = top;
	this.bottom = bottom;
	glm.mat4.ortho(this.projection, left, right, top, bottom, 0, 10000);
};


p.ortho = p.setBoundary;

p.getMatrix = function() {
	return this.matrix;
};


p.resize = function() {
	glm.mat4.ortho(this.projection, this.left, this.right, this.top, this.bottom, 0, 10000);
};


module.exports = CameraOrtho;
},{"./Camera":4,"gl-matrix":2}],6:[function(_dereq_,module,exports){
// CameraPerspective.js
"use strict";

var Camera = _dereq_("./Camera");
var glm = _dereq_("gl-matrix");

var CameraPerspective = function() {
	Camera.call(this);

	this.projection = glm.mat4.create();
	this.mtxFinal = glm.mat4.create();
};

var p = CameraPerspective.prototype = new Camera();

p.setPerspective = function(aFov, aAspectRatio, aNear, aFar) {
	this._fov = aFov;
	this._near = aNear;
	this._far = aFar;
	this._aspect = aAspectRatio;
	glm.mat4.perspective(this.projection, aFov, aAspectRatio, aNear, aFar);
};

p.getMatrix = function() {
	// mat4.multiply(this.mtxFinal, this.projection, this.matrix);
	return this.matrix;
};

p.resize = function(aAspectRatio) {
	this._aspect = aAspectRatio;
	glm.mat4.perspective(this.projection, this._fov, aAspectRatio, this._near, this._far);
};

p.__defineGetter__("near", function() {
	return this._near;
});

p.__defineGetter__("far", function() {
	return this._far;
});

module.exports = CameraPerspective;
},{"./Camera":4,"gl-matrix":2}],7:[function(_dereq_,module,exports){
// EaseNumber.js

"use strict";

var Scheduler = _dereq_("./Scheduler");

function EaseNumber(mValue, mEasing) {
	this._easing = mEasing || 0.1;
	this._value = mValue;
	this._targetValue = mValue;

	Scheduler.addEF(this, this._update);
}

var p = EaseNumber.prototype;


p._update = function() {
	this._checkLimit();
	this._value += (this._targetValue - this._value) * this._easing;	
};


p.setTo = function(mValue) {
	this._targetValue = this._value = mValue;
};


p.add = function(mAdd) {
	this._targetValue += mAdd;
};

p.limit = function(mMin, mMax) {
	this._min = mMin;
	this._max = mMax;

	this._checkLimit();
};

p.setEasing = function(mValue) {
	this._easing = mValue;
};

p._checkLimit = function() {
	if(this._min !== undefined && this._targetValue < this._min) {
		this._targetValue = this._min;
	} 

	if(this._max !== undefined && this._targetValue > this._max) {
		this._targetValue = this._max;
	} 
};


p.__defineGetter__("value", function() {
	return this._value;
});


p.__defineGetter__("targetValue", function() {
	return this._targetValue;
});


p.__defineSetter__("value", function(mValue) {
	this._targetValue = mValue;
});


module.exports = EaseNumber;
},{"./Scheduler":20}],8:[function(_dereq_,module,exports){
// EventDispatcher.js

"use strict";

var supportsCustomEvents = true;
try {
	var newTestCustomEvent = document.createEvent("CustomEvent");
	newTestCustomEvent = null;
} catch(e){
	supportsCustomEvents = false;
}

function EventDispatcher() {
	this._eventListeners = null;
}


var p = EventDispatcher.prototype;


p.addEventListener = function(aEventType, aFunction) {

	if(this._eventListeners === null) {
		this._eventListeners = {};
	}
	if(!this._eventListeners[aEventType]){
		this._eventListeners[aEventType] = [];
	}
	this._eventListeners[aEventType].push(aFunction);
	
	return this;
};

p.removeEventListener = function(aEventType, aFunction) {
	if(this._eventListeners === null) {
		this._eventListeners = {};
	}
	var currentArray = this._eventListeners[aEventType];
	
	if (typeof(currentArray) === "undefined") {
		// console.warn("EventDispatcher :: removeEventListener :: Tried to remove an event handler (for " + aEventType +") that doesn't exist");
		return this;
	}
	
	var currentArrayLength = currentArray.length;
	for(var i = 0; i < currentArrayLength; i++){
		if(currentArray[i] === aFunction){
			currentArray.splice(i, 1);
			i--;
			currentArrayLength--;
		}
	}
	return this;
};

p.dispatchEvent = function(aEvent) {
	if(this._eventListeners === null) {
		this._eventListeners = {};
	}
	var eventType = aEvent.type;
	
	try {
		if(aEvent.target === null) {
			aEvent.target = this;
		}
		aEvent.currentTarget = this;
	}
	catch(theError) {
		var newEvent = {"type" : eventType, "detail" : aEvent.detail, "dispatcher" : this };
		return this.dispatchEvent(newEvent);
	}
	
	var currentEventListeners = this._eventListeners[eventType];
	if(currentEventListeners !== null && currentEventListeners !== undefined) {
		var currentArray = this._copyArray(currentEventListeners);
		var currentArrayLength = currentArray.length;
		for(var i = 0; i < currentArrayLength; i++){
			var currentFunction = currentArray[i];
			currentFunction.call(this, aEvent);
		}
	}
	return this;
};

p.dispatchCustomEvent = function(aEventType, aDetail) {
	var newEvent;
	if (supportsCustomEvents){
		newEvent = document.createEvent("CustomEvent");
		newEvent.dispatcher = this;
		newEvent.initCustomEvent(aEventType, false, false, aDetail);
	}
	else {
		newEvent = {"type" : aEventType, "detail" : aDetail, "dispatcher" : this };
	}
	return this.dispatchEvent(newEvent);
};

p._destroy = function() {
	if(this._eventListeners !== null) {
		for(var objectName in this._eventListeners) {
			if(this._eventListeners.hasOwnProperty(objectName)) {
				var currentArray = this._eventListeners[objectName];
				var currentArrayLength = currentArray.length;
				for(var i = 0; i < currentArrayLength; i++) {
					currentArray[i] = null;
				}
				delete this._eventListeners[objectName];	
			}
		}
		this._eventListeners = null;
	}
};

p._copyArray = function(aArray) {
	var currentArray = new Array(aArray.length);
	var currentArrayLength = currentArray.length;
	for(var i = 0; i < currentArrayLength; i++) {
		currentArray[i] = aArray[i];
	}
	return currentArray;
};

module.exports = EventDispatcher;
},{}],9:[function(_dereq_,module,exports){
"use strict";

var glm = _dereq_("gl-matrix");

var Face = function(mA, mB, mC) {
	this._vertexA = mA;
	this._vertexB = mB;
	this._vertexC = mC;

	this._init();
};

var p = Face.prototype;


p._init = function() {
	var BA = glm.vec3.create();
	var CA = glm.vec3.create();
	glm.vec3.sub(BA, this._vertexB, this._vertexA);
	glm.vec3.sub(CA, this._vertexC, this._vertexA);

	this._faceNormal = glm.vec3.create();
	glm.vec3.cross(this._faceNormal, BA, CA);
	glm.vec3.normalize(this._faceNormal, this._faceNormal);
};


p.contains = function(mVertex) {
	return ( equal(mVertex, this._vertexA) || equal(mVertex, this._vertexB) || equal(mVertex, this._vertexC) );
};


p.__defineGetter__("faceNormal", function() {
	return this._faceNormal;
});

var equal = function(mV0, mV1) {
	return ( (mV0[0] === mV1[0]) && (mV0[1] === mV1[1]) && (mV0[2] === mV1[2]) );
};

module.exports = Face;
},{"gl-matrix":2}],10:[function(_dereq_,module,exports){
"use strict";

var gl, GL = _dereq_("./GLTools");
var GLTexture = _dereq_("./GLTexture");
var isPowerOfTwo = function(x) {	
	return (x !== 0) && !(x & (x - 1));	
};

var FrameBuffer = function(width, height, options) {
	gl = GL.gl;
	options        = options || {};
	this.width     = width;
	this.height    = height;
	this.magFilter = options.magFilter || gl.LINEAR;
	this.minFilter = options.minFilter || gl.LINEAR;
	this.wrapS     = options.wrapS || gl.MIRRORED_REPEAT;
	this.wrapT     = options.wrapT || gl.MIRRORED_REPEAT;

	if(!isPowerOfTwo(width) || !isPowerOfTwo(height)) {
		this.wrapS = this.wrapT = gl.CLAMP_TO_EDGE;

		if(this.minFilter === gl.LINEAR_MIPMAP_NEAREST) {
			this.minFilter = gl.LINEAR;
		}
	} 

	this._init();
};

var p = FrameBuffer.prototype;

p._init = function() {
	this.texture            = gl.createTexture();
	
	this.glTexture			= new GLTexture(this.texture, true);
	
	this.frameBuffer        = gl.createFramebuffer();		
	gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
	this.frameBuffer.width  = this.width;
	this.frameBuffer.height = this.height;

	gl.bindTexture(gl.TEXTURE_2D, this.texture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.magFilter);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.minFilter);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);


	// gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.frameBuffer.width, this.frameBuffer.height, 0, gl.RGBA, gl.FLOAT, null);
	if(GL.depthTextureExt) {
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.frameBuffer.width, this.frameBuffer.height, 0, gl.RGBA, gl.FLOAT, null);
	} else {
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.frameBuffer.width, this.frameBuffer.height, 0, gl.RGBA, gl.FLOAT, null);
	}
	
	// gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.frameBuffer.width, this.frameBuffer.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

	// if(this.magFilter == gl.NEAREST && this.minFilter == gl.NEAREST) {
	// 	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.frameBuffer.width, this.frameBuffer.height, 0, gl.RGBA, gl.FLOAT, null);
	// 	console.debug("Both Nearest", this.floatTextureExt);
	// } else {
	// 	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.frameBuffer.width, this.frameBuffer.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	// }

	if(this.minFilter === gl.LINEAR_MIPMAP_NEAREST)	{
		gl.generateMipmap(gl.TEXTURE_2D);
	}

	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
	if(GL.depthTextureExt === null) {
		var renderbuffer = gl.createRenderbuffer();
		gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
		gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.frameBuffer.width, this.frameBuffer.height);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
    	gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);
		// gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);	
		// if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) != gl.FRAMEBUFFER_COMPLETE) {
	 //      throw new Error('Rendering to this texture is not supported (incomplete framebuffer)');
	 //    }

	 	// gl.renderbufferStorage( gl.RENDERBUFFER, gl.RGBA4, this.frameBuffer.width, this.frameBuffer.height );
	} else {
		this.depthTexture       = gl.createTexture();
		this.glDepthTexture		= new GLTexture(this.depthTexture, true);

		gl.bindTexture(gl.TEXTURE_2D, this.depthTexture);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, this.width, this.height, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);

		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthTexture, 0);
	}

	gl.bindTexture(gl.TEXTURE_2D, null);
	gl.bindRenderbuffer(gl.RENDERBUFFER, null);
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
};


p.bind = function() {
	gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
};


p.unbind = function() {
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	
};


p.getTexture = function() {
	return this.glTexture;
};


p.getDepthTexture = function() {
	return this.glDepthTexture;
};


p.destroy = function() {
	gl.deleteFramebuffer(this.frameBuffer);

	this.glTexture.destroy();
	if(this.glDepthTexture) {
		this.glDepthTexture.destroy();
	}
};

module.exports = FrameBuffer;
},{"./GLTexture":13,"./GLTools":14}],11:[function(_dereq_,module,exports){
"use strict";

var gl;
var GL = _dereq_("./GLTools");

var GLCubeTexture = function(sources, options) {
	// [posx, negx, posy, negy, posz, negz]
	options = options || {};
	gl = GL.gl;
	this.texture = gl.createTexture();
	
	this.magFilter = options.magFilter || gl.LINEAR;
	this.minFilter = options.minFilter || gl.LINEAR_MIPMAP_NEAREST;
	this.wrapS     = options.wrapS || gl.CLAMP_TO_EDGE;
	this.wrapT     = options.wrapT || gl.CLAMP_TO_EDGE;

	gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);
	var targets = [
		gl.TEXTURE_CUBE_MAP_POSITIVE_X, gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 
		gl.TEXTURE_CUBE_MAP_POSITIVE_Y, gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 
		gl.TEXTURE_CUBE_MAP_POSITIVE_Z, gl.TEXTURE_CUBE_MAP_NEGATIVE_Z 
	];

	for (var j = 0; j < 6; j++) {
	    gl.texImage2D(targets[j], 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sources[j]);
	    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, this.wrapS);
	    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, this.wrapT);
	}
	gl.generateMipmap(gl.TEXTURE_CUBE_MAP);

	gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
};

var p = GLCubeTexture.prototype;


p.bind = function(index) {
	if(index === undefined) {index = 0;}
	if(!GL.shader) {return;}

	gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);
	gl.uniform1i(GL.shader.uniformTextures[index], index);
	this._bindIndex = index;
};


p.unbind = function() {
	gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);	
};

p.destroy = function() {
	gl.deleteTexture(this.texture);
};

module.exports = GLCubeTexture;
},{"./GLTools":14}],12:[function(_dereq_,module,exports){
"use strict";

var GL = _dereq_("./GLTools");
var gl;
var ShaderLibs = _dereq_("./ShaderLibs");

var addLineNumbers = function ( string ) {
	var lines = string.split( '\n' );
	for ( var i = 0; i < lines.length; i ++ ) {
		lines[ i ] = ( i + 1 ) + ': ' + lines[ i ];
	}
	return lines.join( '\n' );
};

var GLShader = function(aVertexShaderId, aFragmentShaderId) {
	gl              	 = GL.gl;
	this.idVertex        = aVertexShaderId;
	this.idFragment      = aFragmentShaderId;
	this.parameters      = [];
	this.uniformValues   = {};
	
	this.uniformTextures = [];
	
	this.vertexShader    = undefined;
	this.fragmentShader  = undefined;
	this._isReady        = false;
	this._loadedCount    = 0;

	if(aVertexShaderId === undefined || aVertexShaderId === null ) {
		this.createVertexShaderProgram(ShaderLibs.getShader("copyVert"));
	}

	if(aFragmentShaderId === undefined || aVertexShaderId === null ) {
		this.createFragmentShaderProgram(ShaderLibs.getShader("copyFrag"));
	}

	this.init();
};


var p = GLShader.prototype;

p.init = function() {
	if(this.idVertex && this.idVertex.indexOf("main(void)") > -1) {
		this.createVertexShaderProgram(this.idVertex);
	} else {
		this.getShader(this.idVertex, true);	
	}
	
	if(this.idFragment && this.idFragment.indexOf("main(void)") > -1) {
		this.createFragmentShaderProgram(this.idFragment);
	} else {
		this.getShader(this.idFragment, false);	
	}
};

p.getShader = function(aId, aIsVertexShader) {
	if(!aId) {return;}
	var req = new XMLHttpRequest();
	req.hasCompleted = false;
	var that = this;
	req.onreadystatechange = function(e) {
		if(e.target.readyState === 4) {
			if(aIsVertexShader) {
				that.createVertexShaderProgram(e.target.responseText);
			} else {
				that.createFragmentShaderProgram(e.target.responseText);
			}
		}
	};
	req.open("GET", aId, true);
	req.send(null);
};

p.createVertexShaderProgram = function(aStr) {
	if(!gl) {	return;	}
	var shader = gl.createShader(gl.VERTEX_SHADER);

	gl.shaderSource(shader, aStr);
	gl.compileShader(shader);

	if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.warn("Error in Vertex Shader : ", this.idVertex, ":", gl.getShaderInfoLog(shader));
		console.log(addLineNumbers(aStr));
		return null;
	}

	this.vertexShader = shader;
	
	if(this.vertexShader !== undefined && this.fragmentShader !== undefined) {
		this.attachShaderProgram();
	}

	this._loadedCount++;
};


p.createFragmentShaderProgram = function(aStr) {
	if(!gl) {	return;	}
	var shader = gl.createShader(gl.FRAGMENT_SHADER);

	gl.shaderSource(shader, aStr);
	gl.compileShader(shader);

	if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.warn("Error in Fragment Shader: ", this.idFragment, ":" , gl.getShaderInfoLog(shader));
		console.log(addLineNumbers(aStr));
		return null;
	}

	this.fragmentShader = shader;

	if(this.vertexShader !== undefined && this.fragmentShader !== undefined) {
		this.attachShaderProgram();
	}

	this._loadedCount++;
};

p.attachShaderProgram = function() {
	this._isReady = true;
	this.shaderProgram = gl.createProgram();
	gl.attachShader(this.shaderProgram, this.vertexShader);
	gl.attachShader(this.shaderProgram, this.fragmentShader);
	gl.linkProgram(this.shaderProgram);
};

p.bind = function() {
	if(!this._isReady) {return;}
	gl.useProgram(this.shaderProgram);

	if(this.shaderProgram.pMatrixUniform === undefined) {	this.shaderProgram.pMatrixUniform = gl.getUniformLocation(this.shaderProgram, "uPMatrix");}
	if(this.shaderProgram.mvMatrixUniform === undefined) {	this.shaderProgram.mvMatrixUniform = gl.getUniformLocation(this.shaderProgram, "uMVMatrix");}
	if(this.shaderProgram.normalMatrixUniform === undefined) {	this.shaderProgram.normalMatrixUniform = gl.getUniformLocation(this.shaderProgram, "normalMatrix");}
	if(this.shaderProgram.invertMVMatrixUniform === undefined) {	this.shaderProgram.invertMVMatrixUniform = gl.getUniformLocation(this.shaderProgram, "invertMVMatrix");}

	GL.setShader(this);
	GL.setShaderProgram(this.shaderProgram);

	this.uniformTextures = [];
};

p.isReady = function() {	return this._isReady;	};


p.clearUniforms = function() {
	this.parameters    = [];
	this.uniformValues = {};
};

p.uniform = function(aName, aType, aValue) {
	if(!this._isReady) {return;}

	if(aType === "texture") {aType = "uniform1i";}

	var hasUniform = false;
	var oUniform;
	for(var i=0; i<this.parameters.length; i++) {
		oUniform = this.parameters[i];
		if(oUniform.name === aName) {
			oUniform.value = aValue;
			hasUniform = true;
			break;
		}
	}

	if(!hasUniform) {
		this.shaderProgram[aName] = gl.getUniformLocation(this.shaderProgram, aName);
		this.parameters.push({name : aName, type: aType, value: aValue, uniformLoc: this.shaderProgram[aName]});
	} else {
		this.shaderProgram[aName] = oUniform.uniformLoc;
	}


	if(aType.indexOf("Matrix") === -1) {
		if(!hasUniform) {
			var isArray = Array.isArray(aValue);
			if(isArray) {
				this.uniformValues[aName] = aValue.concat();
			} else {
				this.uniformValues[aName] = aValue;	
			}
			gl[aType](this.shaderProgram[aName], aValue);
		} else {
			// if(aName == 'position') console.log('Has uniform', this.checkUniform(aName, aType, aValue));
			if(this.checkUniform(aName, aType, aValue)) {
				gl[aType](this.shaderProgram[aName], aValue);
				// console.debug('Set uniform', aName, aType, aValue);
			}
		}
	} else {
		gl[aType](this.shaderProgram[aName], false, aValue);
		if(!hasUniform) {
			gl[aType](this.shaderProgram[aName], false, aValue);
			this.uniformValues[aName] = aValue;
			// console.debug('Set uniform', aName, aType, aValue);
		}
	}

	if(aType === "uniform1i") {
		// Texture
		this.uniformTextures[aValue] = this.shaderProgram[aName];
	}
};

p.checkUniform = function(aName, aType, aValue) {
	var isArray = Array.isArray(aValue);

	if(!this.uniformValues[aName]) {
		this.uniformValues[aName] = aValue;
		return true;
	}

	if(aType === "uniform1i") {
		this.uniformValues[aName] = aValue;
		return true;
	}

	var uniformValue = this.uniformValues[aName];
	var hasChanged = false;

	if(isArray) {
		for(var i=0; i<uniformValue.length; i++) {
			if(uniformValue[i] !== aValue[i]) {
				hasChanged = true;
				break;
			}
		}	
	} else {
		hasChanged = uniformValue !== aValue;
	}
	
	
	if(hasChanged) {
		if(isArray) {
			this.uniformValues[aName] = aValue.concat();
		} else {
			this.uniformValues[aName] = aValue;	
		}
		
	}

	return hasChanged;
};


p.unbind = function() {

};


p.destroy = function() {
	gl.detachShader(this.shaderProgram, this.vertexShader);
	gl.detachShader(this.shaderProgram, this.fragmentShader);
	gl.deleteShader(this.vertexShader);
	gl.deleteShader(this.fragmentShader);
	gl.deleteProgram(this.shaderProgram);
};

module.exports = GLShader;
},{"./GLTools":14,"./ShaderLibs":21}],13:[function(_dereq_,module,exports){
// GLTexture.js
"use strict";

var gl;
var GL = _dereq_("./GLTools");
var _isPowerOfTwo = function(x) {	
	var check = (x !== 0) && (!(x & (x - 1)));
	return check;
};
var isPowerOfTwo = function(obj) {	
	var w = obj.width || obj.videoWidth;
	var h = obj.height || obj.videoHeight;

	if(!w || !h) {return false;}

	return _isPowerOfTwo(w) && _isPowerOfTwo(h);
};

var GLTexture = function(source, isTexture, options) {
	isTexture = isTexture || false;
	options = options || {};
	gl = GL.gl;
	if(isTexture) {
		this.texture = source;
	} else {
		this._source   = source;
		this.texture   = gl.createTexture();
		this._isVideo  = (source.tagName === "VIDEO");
		this.magFilter = options.magFilter || gl.LINEAR;
		this.minFilter = options.minFilter || gl.LINEAR_MIPMAP_NEAREST;
		
		this.wrapS     = options.wrapS || gl.MIRRORED_REPEAT;
		this.wrapT     = options.wrapT || gl.MIRRORED_REPEAT;
		var width      = source.width || source.videoWidth;

		if(width) {
			if(!isPowerOfTwo(source)) {
				this.wrapS = this.wrapT = gl.CLAMP_TO_EDGE;
				if(this.minFilter === gl.LINEAR_MIPMAP_NEAREST) {
					this.minFilter = gl.LINEAR;
				}
			} 	
		} else {
			this.wrapS = this.wrapT = gl.CLAMP_TO_EDGE;
			if(this.minFilter === gl.LINEAR_MIPMAP_NEAREST) {
				this.minFilter = gl.LINEAR;
			}
		}

		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);

		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.magFilter);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.minFilter);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.wrapS);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.wrapT);
		
		if(this.minFilter === gl.LINEAR_MIPMAP_NEAREST)	{
			gl.generateMipmap(gl.TEXTURE_2D);
		}

		gl.bindTexture(gl.TEXTURE_2D, null);
	}
};

var p = GLTexture.prototype;


p.updateTexture = function(source) {
	if(source){ this._source = source; }
	gl.bindTexture(gl.TEXTURE_2D, this.texture);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._source);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.magFilter);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.minFilter);
	if(this.minFilter === gl.LINEAR_MIPMAP_NEAREST)	{
		gl.generateMipmap(gl.TEXTURE_2D);
	}

	gl.bindTexture(gl.TEXTURE_2D, null);
};


p.bind = function(index) {
	if(index === undefined) {index = 0;}
	if(!GL.shader) {return;}

	gl.activeTexture(gl.TEXTURE0 + index);
	gl.bindTexture(gl.TEXTURE_2D, this.texture);
	gl.uniform1i(GL.shader.uniformTextures[index], index);
	this._bindIndex = index;
};


p.unbind = function() {
	gl.bindTexture(gl.TEXTURE_2D, null);
};

p.destroy = function() {
	gl.deleteTexture(this.texture);
};

module.exports = GLTexture;
},{"./GLTools":14}],14:[function(_dereq_,module,exports){
// GLTools.js
"use strict";

var glm = _dereq_("gl-matrix");

function GLTools() {
	this.aspectRatio   = 1;
	this.fieldOfView   = 45;
	this.zNear         = 5;
	this.zFar          = 3000;

	this.canvas        = null;
	this.gl            = null;

	this.shader        = null;
	this.shaderProgram = null;
}

var p = GLTools.prototype;

p.init = function(mCanvas, mWidth, mHeight, parameters) {
	if(this.canvas === null) {
		this.canvas      = mCanvas || document.createElement("canvas");
	}
	var params       = parameters || {};
	params.antialias = true;

	this.gl          = this.canvas.getContext("webgl", params) || this.canvas.getContext("experimental-webgl", params);
	console.log('GL TOOLS : ', this.gl);
	
	
	if(mWidth !== undefined && mHeight !== undefined) {
		this.setSize(mWidth, mHeight);
	} else {
		this.setSize(window.innerWidth, window.innerHeight);	
	}

	this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.enable(this.gl.BLEND);
	this.gl.clearColor( 0, 0, 0, 1 );
	this.gl.clearDepth( 1 );

	this.matrix                 = glm.mat4.create();
	glm.mat4.identity(this.matrix);
	this.normalMatrix           = glm.mat3.create();
	this.invertMVMatrix         = glm.mat3.create();
	this.depthTextureExt        = this.gl.getExtension("WEBKIT_WEBGL_depth_texture"); // Or browser-appropriate prefix
	this.floatTextureExt        = this.gl.getExtension("OES_texture_float"); // Or browser-appropriate prefix
	this.floatTextureLinearExt  = this.gl.getExtension("OES_texture_float_linear"); // Or browser-appropriate prefix
	this.standardDerivativesExt = this.gl.getExtension("OES_standard_derivatives"); // Or browser-appropriate prefix

	this.enabledVertexAttribute = [];
	this.enableAlphaBlending();
	this._viewport = [0, 0, this.width, this.height];
};


p.getGL = function() {	return this.gl;	};

p.setShader = function(aShader) {
	this.shader = aShader;
};

p.setShaderProgram = function(aShaderProgram) {
	this.shaderProgram = aShaderProgram;
};

p.setViewport = function(aX, aY, aW, aH) {
	var hasChanged = false;
	if(aX!==this._viewport[0]) {hasChanged = true;}
	if(aY!==this._viewport[1]) {hasChanged = true;}
	if(aW!==this._viewport[2]) {hasChanged = true;}
	if(aH!==this._viewport[3]) {hasChanged = true;}

	if(hasChanged) {
		this.gl.viewport(aX, aY, aW, aH);
		this._viewport = [aX, aY, aW, aH];
	}
};

p.setMatrices = function(aCamera) {
	this.camera = aCamera;	
};

p.rotate = function(aRotation) {
	glm.mat4.copy(this.matrix, aRotation);

	glm.mat4.multiply(this.matrix, this.camera.getMatrix(), this.matrix);
	glm.mat3.fromMat4(this.normalMatrix, this.matrix);
	glm.mat3.invert(this.normalMatrix, this.normalMatrix);
	glm.mat3.transpose(this.normalMatrix, this.normalMatrix);

	glm.mat3.fromMat4(this.invertMVMatrix, this.matrix);
	glm.mat3.invert(this.invertMVMatrix, this.invertMVMatrix);
};


//	BLEND MODES
p.enableAlphaBlending = function() {
	this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);	
};

p.enableAdditiveBlending = function() {
	this.gl.blendFunc(this.gl.ONE, this.gl.ONE);
};

//	CLEAR CANVAS
p.clear = function(r, g, b, a) {
	this.gl.clearColor( r, g, b, a );
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
};

//	DRAWING ELEMENTS
p.draw = function(aMesh) {
	if(!this.shaderProgram) {
		console.warn("Shader program not ready yet");
		return;
	}

	//	PROJECTION MATRIX
	if(!this.shaderProgram.pMatrixValue) {
		this.shaderProgram.pMatrixValue = glm.mat4.create();
		this.gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, this.camera.projection || this.camera.getMatrix() );
		glm.mat4.copy(this.shaderProgram.pMatrixValue, this.camera.projection || this.camera.getMatrix());
	} else {
		var pMatrix = this.camera.projection || this.camera.getMatrix();
		if(glm.mat4.str(this.shaderProgram.pMatrixValue) !== glm.mat4.str(pMatrix)) {
			this.gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, this.camera.projection || this.camera.getMatrix() );
			glm.mat4.copy(this.shaderProgram.pMatrixValue, pMatrix);
		}
	}

	//	MODEL-VIEW MATRIX
	if(!this.shaderProgram.mvMatrixValue) {
		this.shaderProgram.mvMatrixValue = glm.mat4.create();
		this.gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, this.matrix );
		glm.mat4.copy(this.shaderProgram.mvMatrixValue, this.matrix);
	} else {
		if(glm.mat4.str(this.shaderProgram.mvMatrixValue) !== glm.mat4.str(this.matrix)) {
			this.gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, this.matrix );
			glm.mat4.copy(this.shaderProgram.mvMatrixValue, this.matrix);
		}
	}
	
	
    //	INVERT MODEL-VIEW MATRIX
	if(!this.shaderProgram.invertMVMatrixValue) {
		this.shaderProgram.invertMVMatrixValue = glm.mat3.create();
		this.gl.uniformMatrix3fv(this.shaderProgram.invertMVMatrixUniform, false, this.invertMVMatrix );
		glm.mat3.copy(this.shaderProgram.invertMVMatrixValue, this.invertMVMatrix);
	} else {
		if(glm.mat3.str(this.shaderProgram.invertMVMatrixValue) !== glm.mat3.str(this.invertMVMatrix)) {
			this.gl.uniformMatrix3fv(this.shaderProgram.invertMVMatrixUniform, false, this.invertMVMatrix );
			glm.mat3.copy(this.shaderProgram.invertMVMatrixValue, this.invertMVMatrix);
		}
	}

	//	NORMAL MATRIX
	if(!this.shaderProgram.normalMatrixValue) {
		this.shaderProgram.normalMatrixValue = glm.mat4.create();
		this.gl.uniformMatrix3fv(this.shaderProgram.normalMatrixUniform, false, this.normalMatrix );
		glm.mat3.copy(this.shaderProgram.normalMatrixValue, this.normalMatrix);
	} else {
		if(glm.mat3.str(this.shaderProgram.normalMatrixValue) !== glm.mat3.str(this.normalMatrix)) {
			this.gl.uniformMatrix3fv(this.shaderProgram.normalMatrixUniform, false, this.normalMatrix );
			glm.mat3.copy(this.shaderProgram.normalMatrixValue, this.normalMatrix);
		}
	}



	// 	VERTEX POSITIONS
	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, aMesh.vBufferPos);
	var vertexPositionAttribute = getAttribLoc(this.gl, this.shaderProgram, "aVertexPosition");
	this.gl.vertexAttribPointer(vertexPositionAttribute, aMesh.vBufferPos.itemSize, this.gl.FLOAT, false, 0, 0);
	if(this.enabledVertexAttribute.indexOf(vertexPositionAttribute) === -1) {
		this.gl.enableVertexAttribArray(vertexPositionAttribute);	
		this.enabledVertexAttribute.push(vertexPositionAttribute);
	}
	

	//	TEXTURE COORDS
	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, aMesh.vBufferUV);
	var textureCoordAttribute = getAttribLoc(this.gl, this.shaderProgram, "aTextureCoord");
	this.gl.vertexAttribPointer(textureCoordAttribute, aMesh.vBufferUV.itemSize, this.gl.FLOAT, false, 0, 0);
	
	if(this.enabledVertexAttribute.indexOf(textureCoordAttribute) === -1) {
		this.gl.enableVertexAttribArray(textureCoordAttribute);
		this.enabledVertexAttribute.push(textureCoordAttribute);
	}

	//	INDICES
	this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, aMesh.iBuffer);

	//	EXTRA ATTRIBUTES
	for(var i=0; i<aMesh.extraAttributes.length; i++) {
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, aMesh.extraAttributes[i].buffer);
		var attrPosition = getAttribLoc(this.gl, this.shaderProgram, aMesh.extraAttributes[i].name);
		this.gl.vertexAttribPointer(attrPosition, aMesh.extraAttributes[i].itemSize, this.gl.FLOAT, false, 0, 0);
		// this.gl.enableVertexAttribArray(attrPosition);	
		if(this.enabledVertexAttribute.indexOf(attrPosition) === -1) {
			this.gl.enableVertexAttribArray(attrPosition);
			this.enabledVertexAttribute.push(attrPosition);
		}	
	}

	//	DRAWING
	if(aMesh.drawType === this.gl.POINTS ) {
		this.gl.drawArrays(aMesh.drawType, 0, aMesh.vertexSize);	
	} else {
		this.gl.drawElements(aMesh.drawType, aMesh.iBuffer.numItems, this.gl.UNSIGNED_SHORT, 0);	
	}


	function getAttribLoc(gl, shaderProgram, name) {
		if(shaderProgram.cacheAttribLoc === undefined) {	shaderProgram.cacheAttribLoc = {};	}
		if(shaderProgram.cacheAttribLoc[name] === undefined) {
			shaderProgram.cacheAttribLoc[name] = gl.getAttribLocation(shaderProgram, name);
		}

		return shaderProgram.cacheAttribLoc[name];
	}

};

//	CANVAS RESIZING
p.setSize = function(mWidth, mHeight) {
	this._width = mWidth;
	this._height = mHeight;

	this.canvas.width      = this._width;
	this.canvas.height     = this._height;
	this.gl.viewportWidth  = this._width;
	this.gl.viewportHeight = this._height;

	this.gl.viewport(0, 0, this._width, this._height);
	this.aspectRatio       = this._width / this._height;
};


p.__defineGetter__("width", function() {
	return this._width;
});

p.__defineGetter__("height", function() {
	return this._height;
});

p.__defineGetter__("viewport", function() {
	return this._viewport;
});

var instance = null;

GLTools.getInstance = function() {
	if(instance === null) {
		instance = new GLTools();
	}
	return instance;
};


module.exports = GLTools.getInstance();
},{"gl-matrix":2}],15:[function(_dereq_,module,exports){
"use strict";

var Face = _dereq_("./Face");
var GL = _dereq_("./GLTools");
var glm = _dereq_("gl-matrix");

var Mesh = function(aVertexSize, aIndexSize, aDrawType) {

	this.gl = GL.gl;
	this.vertexSize = aVertexSize;
	this.indexSize = aIndexSize;
	this.drawType = aDrawType;
	this.extraAttributes = [];
	
	this.vBufferPos = undefined;
	this._floatArrayVertex = undefined;

	this._init();
};

var p = Mesh.prototype;

p._init = function() {

};

p.bufferVertex = function(aArrayVertices, isDynamic) {
	var vertices = [];
	var drawType = isDynamic ? this.gl.DYNAMIC_DRAW : this.gl.STATIC_DRAW;
	this._vertices = [];

	for(var i=0; i<aArrayVertices.length; i++) {
		for(var j=0; j<aArrayVertices[i].length; j++) {
			vertices.push(aArrayVertices[i][j]);
		}
		this._vertices.push(glm.vec3.clone(aArrayVertices[i]));
	}

	if(this.vBufferPos === undefined) {
		this.vBufferPos = this.gl.createBuffer();
	}
	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vBufferPos);

	if(this._floatArrayVertex === undefined) {
		this._floatArrayVertex = new Float32Array(vertices);
	} else {
		if(aArrayVertices.length !== this._floatArrayVertex.length) {
			this._floatArrayVertex = new Float32Array(vertices);
		} else {
			for(var k=0; k<aArrayVertices.length; k++) {
				this._floatArrayVertex[k] = aArrayVertices[k];
			}
		}
	}

	this.gl.bufferData(this.gl.ARRAY_BUFFER, this._floatArrayVertex, drawType);
	this.vBufferPos.itemSize = 3;
};

p.bufferTexCoords = function(aArrayTexCoords) {
	var coords = [];

	for(var i=0; i<aArrayTexCoords.length; i++) {
		for(var j=0; j<aArrayTexCoords[i].length; j++) {
			coords.push(aArrayTexCoords[i][j]);
		}
	}

	this.vBufferUV = this.gl.createBuffer();
	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vBufferUV);
	this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(coords), this.gl.STATIC_DRAW);
	this.vBufferUV.itemSize = 2;
};

p.bufferData = function(aData, aName, aItemSize, isDynamic) {
	var index = -1;
	var drawType = isDynamic ? this.gl.DYNAMIC_DRAW : this.gl.STATIC_DRAW;
	var i=0;

	for(i=0; i<this.extraAttributes.length; i++) {
		if(this.extraAttributes[i].name === aName) {
			this.extraAttributes[i].data = aData;
			index = i;
			break;
		}
	}

	var bufferData = [];
	for(i=0; i<aData.length; i++) {
		for(var j=0; j<aData[i].length; j++) {
			bufferData.push(aData[i][j]);
		}
	}

	var buffer, floatArray;
	if(index === -1) {
		buffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
		floatArray = new Float32Array(bufferData);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, floatArray, drawType);
		this.extraAttributes.push({name:aName, data:aData, itemSize: aItemSize, buffer:buffer, floatArray:floatArray});
	} else {
		buffer = this.extraAttributes[index].buffer;
		// console.debug("Buffer exist", buffer);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
		floatArray = this.extraAttributes[index].floatArray;
		for(i=0; i<bufferData.length; i++) {
			floatArray[i] = bufferData[i];
		}
		this.gl.bufferData(this.gl.ARRAY_BUFFER, floatArray, drawType);
	}

};

p.bufferIndices = function(aArrayIndices) {
	this._indices = aArrayIndices;
	this.iBuffer = this.gl.createBuffer();
	this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.iBuffer);
	this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(aArrayIndices), this.gl.STATIC_DRAW);
	this.iBuffer.itemSize = 1;
	this.iBuffer.numItems = aArrayIndices.length;
};


p.computeNormals = function() {
	if(this.drawType !== this.gl.TRIANGLES) {return;}

	if(this._faces === undefined) {	this._generateFaces();	}
	console.log("Start computing");

	var time = new Date().getTime();
	var j=0;

	this._normals = [];
	for(var i=0; i<this._vertices.length; i++) {
		var normal = glm.vec3.create();
		var faceCount = 0;
		for(j=0; j<this._faces.length; j++) {
			if(this._faces[j].contains(this._vertices[i])) {
				glm.vec3.add(normal, normal, this._faces[j].faceNormal);
				faceCount ++;
			}
		}

		glm.vec3.normalize(normal, normal);
		this._normals.push(normal);
	}

	this.bufferData(this._normals, "aNormal", 3);

	var totalTime = new Date().getTime() - time;
	console.log("Total Time : ", totalTime);
};


p.computeTangent = function() {
	
};


p._generateFaces = function() {
	this._faces = [];

	for(var i=0; i<this._indices.length; i+=3) {
		var p0 = this._vertices[this._indices[i+0]];
		var p1 = this._vertices[this._indices[i+1]];
		var p2 = this._vertices[this._indices[i+2]];

		this._faces.push(new Face(p0, p1, p2));
	}
};

module.exports = Mesh;
},{"./Face":9,"./GLTools":14,"gl-matrix":2}],16:[function(_dereq_,module,exports){
"use strict";

var GL = _dereq_("./GLTools");
var Mesh = _dereq_("./Mesh");
var MeshUtils = {};

MeshUtils.createPlane = function(width, height, numSegments, withNormals, axis) {
	axis          = axis === undefined ? "xy" : axis;
	withNormals   = withNormals === undefined ? false : withNormals;
	var positions = [];
	var coords    = [];
	var indices   = [];
	var normals   = [];

	var gapX  = width/numSegments;
	var gapY  = height/numSegments;
	var gapUV = 1/numSegments;
	var index = 0;
	var sx    = -width * 0.5;
	var sy    = -height * 0.5;

	for(var i=0; i<numSegments; i++) {
		for (var j=0; j<numSegments; j++) {
			var tx = gapX * i + sx;
			var ty = gapY * j + sy;

			if(axis === 'xz') {
				positions.push([tx, 		0, 	ty+gapY	]);
				positions.push([tx+gapX, 	0, 	ty+gapY	]);
				positions.push([tx+gapX, 	0, 	ty	]);
				positions.push([tx, 		0, 	ty	]);	

				normals.push([0, 1, 0]);
				normals.push([0, 1, 0]);
				normals.push([0, 1, 0]);
				normals.push([0, 1, 0]);
			} else if(axis === 'yz') {
				positions.push([0, tx, 		ty]);
				positions.push([0, tx+gapX, ty]);
				positions.push([0, tx+gapX, ty+gapY]);
				positions.push([0, tx, 		ty+gapY]);	

				normals.push([1, 0, 0]);
				normals.push([1, 0, 0]);
				normals.push([1, 0, 0]);
				normals.push([1, 0, 0]);
			} else {
				positions.push([tx, 		ty, 	0]);
				positions.push([tx+gapX, 	ty, 	0]);
				positions.push([tx+gapX, 	ty+gapY, 	0]);
				positions.push([tx, 		ty+gapY, 	0]);	

				normals.push([0, 0, 1]);
				normals.push([0, 0, 1]);
				normals.push([0, 0, 1]);
				normals.push([0, 0, 1]);
			} 

			var u = i/numSegments;
			var v = j/numSegments;
			coords.push([u, v]);
			coords.push([u+gapUV, v]);
			coords.push([u+gapUV, v+gapUV]);
			coords.push([u, v+gapUV]);

			indices.push(index*4 + 0);
			indices.push(index*4 + 1);
			indices.push(index*4 + 2);
			indices.push(index*4 + 0);
			indices.push(index*4 + 2);
			indices.push(index*4 + 3);

			index++;
		}
	}

	var mesh = new Mesh(positions.length, indices.length, GL.gl.TRIANGLES);
	mesh.bufferVertex(positions);
	mesh.bufferTexCoords(coords);
	mesh.bufferIndices(indices);
	if(withNormals) {
		mesh.bufferData(normals, "aNormal", 3);
	}

	return mesh;
};

MeshUtils.createSphere = function(size, numSegments, withNormals) {
	withNormals   = withNormals === undefined ? false : withNormals;
	var positions = [];
	var coords    = [];
	var indices   = [];
	var normals   = [];
	var index     = 0;
	var gapUV     = 1/numSegments;

	var getPosition = function(i, j, isNormal) {	//	rx : -90 ~ 90 , ry : 0 ~ 360
		isNormal = isNormal === undefined ? false : isNormal;
		var rx = i/numSegments * Math.PI - Math.PI * 0.5;
		var ry = j/numSegments * Math.PI * 2;
		var r = isNormal ? 1 : size;
		var pos = [];
		pos[1] = Math.sin(rx) * r;
		var t = Math.cos(rx) * r;
		pos[0] = Math.cos(ry) * t;
		pos[2] = Math.sin(ry) * t;

		var precision = 10000;
		pos[0] = Math.floor(pos[0] * precision) / precision;
		pos[1] = Math.floor(pos[1] * precision) / precision;
		pos[2] = Math.floor(pos[2] * precision) / precision;

		return pos;
	};

	
	for(var i=0; i<numSegments; i++) {
		for(var j=0; j<numSegments; j++) {
			positions.push(getPosition(i, j));
			positions.push(getPosition(i+1, j));
			positions.push(getPosition(i+1, j+1));
			positions.push(getPosition(i, j+1));

			if(withNormals) {
				normals.push(getPosition(i, j, true));
				normals.push(getPosition(i+1, j, true));
				normals.push(getPosition(i+1, j+1, true));
				normals.push(getPosition(i, j+1, true));	
			}
			

			var u = j/numSegments;
			var v = i/numSegments;
			
			
			coords.push([1.0 - u, v]);
			coords.push([1.0 - u, v+gapUV]);
			coords.push([1.0 - u - gapUV, v+gapUV]);
			coords.push([1.0 - u - gapUV, v]);

			indices.push(index*4 + 0);
			indices.push(index*4 + 1);
			indices.push(index*4 + 2);
			indices.push(index*4 + 0);
			indices.push(index*4 + 2);
			indices.push(index*4 + 3);

			index++;
		}
	}


	var mesh = new Mesh(positions.length, indices.length, GL.gl.TRIANGLES);
	mesh.bufferVertex(positions);
	mesh.bufferTexCoords(coords);
	mesh.bufferIndices(indices);
	console.log('With normals :', withNormals);
	if(withNormals) {
		mesh.bufferData(normals, "aNormal", 3);
	}

	return mesh;
};

MeshUtils.createCube = function(w,h,d, withNormals) {
	withNormals   = withNormals === undefined ? false : withNormals;
	h = h || w;
	d = d || w;

	var x = w/2;
	var y = h/2;
	var z = d/2;

	var positions = [];
	var coords    = [];
	var indices   = []; 
	var normals   = []; 
	var count     = 0;


	// BACK
	positions.push([-x,  y, -z]);
	positions.push([ x,  y, -z]);
	positions.push([ x, -y, -z]);
	positions.push([-x, -y, -z]);

	normals.push([0, 0, -1]);
	normals.push([0, 0, -1]);
	normals.push([0, 0, -1]);
	normals.push([0, 0, -1]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count*4 + 0);
	indices.push(count*4 + 1);
	indices.push(count*4 + 2);
	indices.push(count*4 + 0);
	indices.push(count*4 + 2);
	indices.push(count*4 + 3);

	count ++;

	// RIGHT
	positions.push([ x,  y, -z]);
	positions.push([ x,  y,  z]);
	positions.push([ x, -y,  z]);
	positions.push([ x, -y, -z]);

	normals.push([1, 0, 0]);
	normals.push([1, 0, 0]);
	normals.push([1, 0, 0]);
	normals.push([1, 0, 0]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count*4 + 0);
	indices.push(count*4 + 1);
	indices.push(count*4 + 2);
	indices.push(count*4 + 0);
	indices.push(count*4 + 2);
	indices.push(count*4 + 3);

	count ++;

	// FRONT
	positions.push([ x,  y,  z]);
	positions.push([-x,  y,  z]);
	positions.push([-x, -y,  z]);
	positions.push([ x, -y,  z]);

	normals.push([0, 0, 1]);
	normals.push([0, 0, 1]);
	normals.push([0, 0, 1]);
	normals.push([0, 0, 1]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count*4 + 0);
	indices.push(count*4 + 1);
	indices.push(count*4 + 2);
	indices.push(count*4 + 0);
	indices.push(count*4 + 2);
	indices.push(count*4 + 3);

	count ++;


	// LEFT
	positions.push([-x,  y,  z]);
	positions.push([-x,  y, -z]);
	positions.push([-x, -y, -z]);
	positions.push([-x, -y,  z]);

	normals.push([-1, 0, 0]);
	normals.push([-1, 0, 0]);
	normals.push([-1, 0, 0]);
	normals.push([-1, 0, 0]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count*4 + 0);
	indices.push(count*4 + 1);
	indices.push(count*4 + 2);
	indices.push(count*4 + 0);
	indices.push(count*4 + 2);
	indices.push(count*4 + 3);

	count ++;

	// TOP
	positions.push([-x,  y,  z]);
	positions.push([ x,  y,  z]);
	positions.push([ x,  y, -z]);
	positions.push([-x,  y, -z]);

	normals.push([0, 1, 0]);
	normals.push([0, 1, 0]);
	normals.push([0, 1, 0]);
	normals.push([0, 1, 0]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count*4 + 0);
	indices.push(count*4 + 1);
	indices.push(count*4 + 2);
	indices.push(count*4 + 0);
	indices.push(count*4 + 2);
	indices.push(count*4 + 3);

	count ++;

	// BOTTOM
	positions.push([-x, -y, -z]);
	positions.push([ x, -y, -z]);
	positions.push([ x, -y,  z]);
	positions.push([-x, -y,  z]);

	normals.push([0, -1, 0]);
	normals.push([0, -1, 0]);
	normals.push([0, -1, 0]);
	normals.push([0, -1, 0]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count*4 + 0);
	indices.push(count*4 + 1);
	indices.push(count*4 + 2);
	indices.push(count*4 + 0);
	indices.push(count*4 + 2);
	indices.push(count*4 + 3);

	count ++;


	var mesh = new Mesh(positions.length, indices.length, GL.gl.TRIANGLES);
	mesh.bufferVertex(positions);
	mesh.bufferTexCoords(coords);
	mesh.bufferIndices(indices);
	if(withNormals) {
		mesh.bufferData(normals, "aNormal", 3);
	}

	return mesh;
};

MeshUtils.createSkyBox = function(size, withNormals) {
	withNormals   = withNormals === undefined ? false : withNormals;

	var positions = [];
	var coords    = [];
	var indices   = []; 
	var normals   = []; 
	var count     = 0;

	// BACK
	positions.push([ size,  size, -size]);
	positions.push([-size,  size, -size]);
	positions.push([-size, -size, -size]);
	positions.push([ size, -size, -size]);

	normals.push([0, 0, -1]);
	normals.push([0, 0, -1]);
	normals.push([0, 0, -1]);
	normals.push([0, 0, -1]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count*4 + 0);
	indices.push(count*4 + 1);
	indices.push(count*4 + 2);
	indices.push(count*4 + 0);
	indices.push(count*4 + 2);
	indices.push(count*4 + 3);

	count ++;

	// RIGHT
	positions.push([ size, -size, -size]);
	positions.push([ size, -size,  size]);
	positions.push([ size,  size,  size]);
	positions.push([ size,  size, -size]);

	normals.push([1, 0, 0]);
	normals.push([1, 0, 0]);
	normals.push([1, 0, 0]);
	normals.push([1, 0, 0]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count*4 + 0);
	indices.push(count*4 + 1);
	indices.push(count*4 + 2);
	indices.push(count*4 + 0);
	indices.push(count*4 + 2);
	indices.push(count*4 + 3);

	count ++;

	// FRONT
	positions.push([-size,  size,  size]);
	positions.push([ size,  size,  size]);
	positions.push([ size, -size,  size]);
	positions.push([-size, -size,  size]);

	normals.push([0, 0, 1]);
	normals.push([0, 0, 1]);
	normals.push([0, 0, 1]);
	normals.push([0, 0, 1]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count*4 + 0);
	indices.push(count*4 + 1);
	indices.push(count*4 + 2);
	indices.push(count*4 + 0);
	indices.push(count*4 + 2);
	indices.push(count*4 + 3);

	count ++;

	// LEFT
	positions.push([-size, -size,  size]);
	positions.push([-size, -size, -size]);
	positions.push([-size,  size, -size]);
	positions.push([-size,  size,  size]);

	normals.push([-1, 0, 0]);
	normals.push([-1, 0, 0]);
	normals.push([-1, 0, 0]);
	normals.push([-1, 0, 0]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count*4 + 0);
	indices.push(count*4 + 1);
	indices.push(count*4 + 2);
	indices.push(count*4 + 0);
	indices.push(count*4 + 2);
	indices.push(count*4 + 3);

	count ++;

	// TOP
	positions.push([ size,  size,  size]);
	positions.push([-size,  size,  size]);
	positions.push([-size,  size, -size]);
	positions.push([ size,  size, -size]);

	normals.push([0, 1, 0]);
	normals.push([0, 1, 0]);
	normals.push([0, 1, 0]);
	normals.push([0, 1, 0]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count*4 + 0);
	indices.push(count*4 + 1);
	indices.push(count*4 + 2);
	indices.push(count*4 + 0);
	indices.push(count*4 + 2);
	indices.push(count*4 + 3);

	count ++;

	// BOTTOM
	positions.push([ size, -size, -size]);
	positions.push([-size, -size, -size]);
	positions.push([-size, -size,  size]);
	positions.push([ size, -size,  size]);

	normals.push([0, -1, 0]);
	normals.push([0, -1, 0]);
	normals.push([0, -1, 0]);
	normals.push([0, -1, 0]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count*4 + 0);
	indices.push(count*4 + 1);
	indices.push(count*4 + 2);
	indices.push(count*4 + 0);
	indices.push(count*4 + 2);
	indices.push(count*4 + 3);

	var mesh = new Mesh(positions.length, indices.length, GL.gl.TRIANGLES);
	mesh.bufferVertex(positions);
	mesh.bufferTexCoords(coords);
	mesh.bufferIndices(indices);
	if(withNormals) {
		mesh.bufferData(normals, "aNormal", 3);
	}

	return mesh;
};

module.exports = MeshUtils;
},{"./GLTools":14,"./Mesh":15}],17:[function(_dereq_,module,exports){
// ObjLoader.js

"use strict";

var GL = _dereq_("./GLTools");
var Mesh = _dereq_("./Mesh");
var gl;


function ObjLoader() {
	this._clearAll();
}


var p = ObjLoader.prototype;

p._clearAll = function() {
	this._callback      = null;
	this._callbackError = null;
	this._mesh          = [];	
	this._drawingType 	= "";
};

p.load = function(url, callback, callbackError, ignoreNormals, drawingType) {
	this._clearAll();
	if(!gl) {	gl = GL.gl;	}
	this._drawingType = drawingType === undefined ? gl.TRIANGLES : drawingType;
	this._ignoreNormals = ignoreNormals === undefined ? true : ignoreNormals;

	this._callback = callback;
	this._callbackError = callbackError;

	var request = new XMLHttpRequest();
	request.onreadystatechange = this._onXHTPState.bind(this);
	request.open("GET", url, true);
	request.send();
};

p._onXHTPState = function(e) {
	if(e.target.readyState === 4) {
		this._parseObj(e.target.response);
	}
};


p.parse = function(objStr, callback, callbackError, ignoreNormals, drawingType) {
	this._clearAll();
	this._drawingType = drawingType === undefined ? gl.TRIANGLES : drawingType;
	this._ignoreNormals = ignoreNormals === undefined ? true : ignoreNormals;

	this._parseObj(objStr);
};


p._parseObj = function(objStr) {
	var lines = objStr.split('\n');

	var positions    = [];
	var coords       = [];
	var finalNormals = [];
	var vertices     = [];
	var normals      = [];
	var uvs          = [];
	var indices      = [];
	var count        = 0;
	var result;

	// v float float float
	var vertex_pattern = /v( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;

	// vn float float float
	var normal_pattern = /vn( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;

	// vt float float
	var uv_pattern = /vt( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;

	// f vertex vertex vertex ...
	var face_pattern1 = /f( +-?\d+)( +-?\d+)( +-?\d+)( +-?\d+)?/;

	// f vertex/uv vertex/uv vertex/uv ...
	var face_pattern2 = /f( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))?/;

	// f vertex/uv/normal vertex/uv/normal vertex/uv/normal ...
	var face_pattern3 = /f( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))?/;

	// f vertex//normal vertex//normal vertex//normal ... 
	var face_pattern4 = /f( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))?/;


	function parseVertexIndex( value ) {
		var index = parseInt( value );
		return ( index >= 0 ? index - 1 : index + vertices.length / 3 ) * 3;
	}

	function parseNormalIndex( value ) {
		var index = parseInt( value );
		return ( index >= 0 ? index - 1 : index + normals.length / 3 ) * 3;
	}

	function parseUVIndex( value ) {
		var index = parseInt( value );
		return ( index >= 0 ? index - 1 : index + uvs.length / 2 ) * 2;
	}


	function addVertex(a, b ,c) {
		positions.push([vertices[a], vertices[a+1], vertices[a+2]]);
		positions.push([vertices[b], vertices[b+1], vertices[b+2]]);
		positions.push([vertices[c], vertices[c+1], vertices[c+2]]);

		indices.push(count * 3 + 0);
		indices.push(count * 3 + 1);
		indices.push(count * 3 + 2);

		count ++;
	}


	function addUV(a, b, c) {
		coords.push([uvs[a], uvs[a+1]]);
		coords.push([uvs[b], uvs[b+1]]);
		coords.push([uvs[c], uvs[c+1]]);
	}


	function addNormal(a, b, c) {
		finalNormals.push([normals[a], normals[a+1], normals[a+2]]);
		finalNormals.push([normals[b], normals[b+1], normals[b+2]]);
		finalNormals.push([normals[c], normals[c+1], normals[c+2]]);
	}

	function addFace( a, b, c, d,  ua, ub, uc, ud,  na, nb, nc, nd ) {
		var ia = parseVertexIndex( a );
		var ib = parseVertexIndex( b );
		var ic = parseVertexIndex( c );
		var id;

		if ( d === undefined ) {

			addVertex( ia, ib, ic );

		} else {

			id = parseVertexIndex( d );

			addVertex( ia, ib, id );
			addVertex( ib, ic, id );

		}


		if ( ua !== undefined ) {

			ia = parseUVIndex( ua );
			ib = parseUVIndex( ub );
			ic = parseUVIndex( uc );

			if ( d === undefined ) {

				addUV( ia, ib, ic );

			} else {

				id = parseUVIndex( ud );

				addUV( ia, ib, id );
				addUV( ib, ic, id );

			}

		}

		if ( na !== undefined ) {

			ia = parseNormalIndex( na );
			ib = parseNormalIndex( nb );
			ic = parseNormalIndex( nc );

			if ( d === undefined ) {

				addNormal( ia, ib, ic );

			} else {

				id = parseNormalIndex( nd );

				addNormal( ia, ib, id );
				addNormal( ib, ic, id );

			}

		}
	}


	for ( var i = 0; i < lines.length; i ++ ) {
		var line = lines[ i ];
		line = line.trim();

		if ( line.length === 0 || line.charAt( 0 ) === '#' ) {

			continue;

		} else if ( ( result = vertex_pattern.exec( line ) ) !== null ) {

			vertices.push(
				parseFloat( result[ 1 ] ),
				parseFloat( result[ 2 ] ),
				parseFloat( result[ 3 ] )
			);

		} else if ( ( result = normal_pattern.exec( line ) ) !== null ) {

			normals.push(
				parseFloat( result[ 1 ] ),
				parseFloat( result[ 2 ] ),
				parseFloat( result[ 3 ] )
			);

		} else if ( ( result = uv_pattern.exec( line ) ) !== null ) {

			uvs.push(
				parseFloat( result[ 1 ] ),
				parseFloat( result[ 2 ] )
			);

		} else if ( ( result = face_pattern1.exec( line ) ) !== null ) {

			addFace(
				result[ 1 ], result[ 2 ], result[ 3 ], result[ 4 ]
			);

		} else if ( ( result = face_pattern2.exec( line ) ) !== null ) {

			addFace(
				result[ 2 ], result[ 5 ], result[ 8 ], result[ 11 ],
				result[ 3 ], result[ 6 ], result[ 9 ], result[ 12 ]
			);

		} else if ( ( result = face_pattern3.exec( line ) ) !== null ) {
			addFace(
				result[ 2 ], result[ 6 ], result[ 10 ], result[ 14 ],
				result[ 3 ], result[ 7 ], result[ 11 ], result[ 15 ],
				result[ 4 ], result[ 8 ], result[ 12 ], result[ 16 ]
			);

		} else if ( ( result = face_pattern4.exec( line ) ) !== null ) {
			addFace(
				result[ 2 ], result[ 5 ], result[ 8 ], result[ 11 ],
				undefined, undefined, undefined, undefined,
				result[ 3 ], result[ 6 ], result[ 9 ], result[ 12 ]
			);

		} 
	}

	this._generateMeshes({	
		positions:positions,
		coords:coords,
		normals:finalNormals,
		indices:indices
	});
	
};


p._generateMeshes = function(o) {
	gl = GL.gl;

	var mesh = new Mesh(o.positions.length, o.indices.length, this._drawingType);
	mesh.bufferVertex(o.positions);
	mesh.bufferTexCoords(o.coords);
	mesh.bufferIndices(o.indices);
	if(!this._ignoreNormals) {
		mesh.bufferData(o.normals, "aNormal", 3);
	}

	if(this._callback) {
		this._callback(mesh, o);
	}
};

// var loader = new ObjLoader();

module.exports = ObjLoader;
},{"./GLTools":14,"./Mesh":15}],18:[function(_dereq_,module,exports){
"use strict";

var glm = _dereq_("gl-matrix");

function QuatRotation(mListenerTarget) {
	if(mListenerTarget === undefined) {	mListenerTarget = document;	}
	this._isRotateZ     = 0;
	this.matrix         = glm.mat4.create();
	this.m              = glm.mat4.create();
	this._vZaxis        = glm.vec3.clone([0, 0, 0]);
	this._zAxis         = glm.vec3.clone([0, 0, -1]);
	this.preMouse       = {x:0, y:0};
	this.mouse          = {x:0, y:0};
	this._isMouseDown   = false;
	this._rotation      = glm.quat.clone([0, 0, 1, 0]);
	this.tempRotation   = glm.quat.clone([0, 0, 0, 0]);
	this._rotateZMargin = 0;
	this.diffX          = 0;
	this.diffY          = 0;
	this._currDiffX     = 0;
	this._currDiffY     = 0;
	this._offset        = 0.004;
	this._easing        = 0.1;
	this._slerp			= -1;
	this._isLocked 		= false;

	var that = this;
	mListenerTarget.addEventListener("mousedown", function(aEvent) { that._onMouseDown(aEvent); });
	mListenerTarget.addEventListener("touchstart", function(aEvent) {	that._onMouseDown(aEvent); });
	mListenerTarget.addEventListener("mouseup", function(aEvent) { that._onMouseUp(aEvent); });
	mListenerTarget.addEventListener("touchend", function(aEvent) { that._onMouseUp(aEvent); });
	mListenerTarget.addEventListener("mousemove", function(aEvent) { that._onMouseMove(aEvent); });
	mListenerTarget.addEventListener("touchmove", function(aEvent) { that._onMouseMove(aEvent); });
}


var p = QuatRotation.prototype;

p.inverseControl = function(value) {
	if(value === undefined) {	
		this._isInvert = true;	
	} else {
		this._isInvert = value;
	}
};

p.lock = function(value) {
	if(value === undefined) {	
		this._isLocked = true;	
	} else {	
		this._isLocked = value;	
	}
};

p.getMousePos = function(aEvent) {
	var mouseX, mouseY;

	if(aEvent.changedTouches !== undefined) {
		mouseX = aEvent.changedTouches[0].pageX;
		mouseY = aEvent.changedTouches[0].pageY;
	} else {
		mouseX = aEvent.clientX;
		mouseY = aEvent.clientY;
	}
	
	return {x:mouseX, y:mouseY};
};

p._onMouseDown = function(aEvent) {
	if(this._isLocked) {return;}
	if(this._isMouseDown) {return;}

	var mouse = this.getMousePos(aEvent);
	var tempRotation = glm.quat.clone(this._rotation);
	this._updateRotation(tempRotation);
	this._rotation = tempRotation;

	this._isMouseDown = true;
	this._isRotateZ = 0;
	this.preMouse = {x:mouse.x, y:mouse.y};

	if(mouse.y < this._rotateZMargin || mouse.y > (window.innerHeight - this._rotateZMargin) ) {	this._isRotateZ = 1;	}
	else if(mouse.x < this._rotateZMargin || mouse.x > (window.innerWidth - this._rotateZMargin) ) {	this._isRotateZ = 2;	}

	this._currDiffX = this.diffX = 0;
	this._currDiffY = this.diffY = 0;
};

p._onMouseMove = function(aEvent) {
	if(this._isLocked) {return;}
	if(aEvent.touches) {aEvent.preventDefault();}
	this.mouse = this.getMousePos(aEvent);
};

p._onMouseUp = function() {
	if(this._isLocked) {return;}
	if(!this._isMouseDown) {return;}
	this._isMouseDown = false;
};

p.setCameraPos = function(mQuat, speed) {
	speed             = speed || this._easing;
	this._easing      = speed;
	if(this._slerp > 0) {return;}
	
	var tempRotation  = glm.quat.clone(this._rotation);
	this._updateRotation(tempRotation);
	this._rotation    = glm.quat.clone(tempRotation);
	this._currDiffX   = this.diffX = 0;
	this._currDiffY   = this.diffY = 0;
	
	this._isMouseDown = false;
	this._isRotateZ   = 0;
	
	this._targetQuat  = glm.quat.clone(mQuat);
	this._slerp       = 1;
};

p.resetQuat = function() {
	this._rotation    = glm.quat.clone([0, 0, 1, 0]);
	this.tempRotation = glm.quat.clone([0, 0, 0, 0]);
	this._targetQuat  = undefined;
	this._slerp       = -1;
};

p.update = function() {
	glm.mat4.identity(this.m);

	if(this._targetQuat === undefined) { 
		glm.quat.set(this.tempRotation, this._rotation[0], this._rotation[1], this._rotation[2], this._rotation[3]);
		this._updateRotation(this.tempRotation);
	} else {
		this._slerp += (0 - this._slerp) * 0.1;

		if(this._slerp < 0.001) {
			// quat.set(this._targetQuat, this._rotation);
			glm.quat.set(this._rotation, this._targetQuat[0], this._targetQuat[1], this._targetQuat[2], this._targetQuat[3]);
			this._targetQuat = undefined;
			this._slerp = -1;
		} else {
			glm.quat.set(this.tempRotation, 0, 0, 0, 0);
			glm.quat.slerp(this.tempRotation, this._targetQuat, this._rotation, this._slerp);
		}
	}

	glm.vec3.transformQuat(this._vZaxis, this._vZaxis, this.tempRotation);

	glm.mat4.fromQuat(this.matrix, this.tempRotation);
};

p._updateRotation = function(aTempRotation) {
	if(this._isMouseDown && !this._isLocked) {
		this.diffX = -(this.mouse.x - this.preMouse.x);
		this.diffY = (this.mouse.y - this.preMouse.y);

		if(this._isInvert) {
			this.diffX = -this.diffX;
			this.diffY = -this.diffY;
		}
	}
	
	this._currDiffX += (this.diffX - this._currDiffX) * this._easing;
	this._currDiffY += (this.diffY - this._currDiffY) * this._easing;

	var angle, _quat;

	if(this._isRotateZ > 0) {
		if(this._isRotateZ === 1) {
			angle = -this._currDiffX * this._offset; 
			angle *= (this.preMouse.y < this._rotateZMargin) ? -1 : 1;
			_quat = glm.quat.clone( [0, 0, Math.sin(angle), Math.cos(angle) ] );
			glm.quat.multiply(_quat, aTempRotation, _quat);
		} else {
			angle = -this._currDiffY * this._offset; 
			angle *= (this.preMouse.x < this._rotateZMargin) ? 1 : -1;
			_quat = glm.quat.clone( [0, 0, Math.sin(angle), Math.cos(angle) ] );
			glm.quat.multiply(_quat, aTempRotation, _quat);
		}
	} else {
		var v = glm.vec3.clone([this._currDiffX, this._currDiffY, 0]);
		var axis = glm.vec3.create();
		glm.vec3.cross(axis, v, this._zAxis);
		glm.vec3.normalize(axis, axis);
		angle = glm.vec3.length(v) * this._offset;
		_quat = glm.quat.clone( [Math.sin(angle) * axis[0], Math.sin(angle) * axis[1], Math.sin(angle) * axis[2], Math.cos(angle) ] );
		glm.quat.multiply(aTempRotation, _quat, aTempRotation);
	}

};


module.exports = QuatRotation;
},{"gl-matrix":2}],19:[function(_dereq_,module,exports){
"use strict";

var GL = _dereq_("./GLTools");
var QuatRotation = _dereq_("./QuatRotation");
var CameraOrtho = _dereq_("./CameraOrtho");
var SimpleCamera = _dereq_("./SimpleCamera");
var glm = _dereq_("gl-matrix");

var Scene = function() {
	if(GL.canvas === null) {return;}
	this.gl = GL.gl;
	this._children = [];
	this._init();
};

var p = Scene.prototype;

p._init = function() {
	this.camera = new SimpleCamera(GL.canvas);
	this.camera.setPerspective(45*Math.PI/180, GL.aspectRatio, 5, 3000);
	this.camera.lockRotation();

	var eye                = glm.vec3.clone([0, 0, 500]  );
	var center             = glm.vec3.create( );
	var up                 = glm.vec3.clone( [0,-1,0] );
	this.camera.lookAt(eye, center, up);
	
	this.sceneRotation     = new QuatRotation(GL.canvas);
	this.rotationFront     = glm.mat4.create();
	glm.mat4.identity(this.rotationFront);
	
	this.cameraOrtho       = new CameraOrtho();
	this.cameraOrthoScreen = new CameraOrtho();
	this.cameraOtho        = this.cameraOrtho;

	this.cameraOrtho.lookAt(eye, center, up);
	this.cameraOrtho.ortho( 1, -1, 1, -1);

	this.cameraOrthoScreen.lookAt(eye, center, up);
	this.cameraOrthoScreen.ortho( 0, GL.width, GL.height, 0);

	// In SuperClass should call following functions.
	this._initTextures();
	this._initViews();

	window.addEventListener("resize", this._onResize.bind(this));
};

p._initTextures = function() {
	// console.log("Should be overwritten by SuperClass");
};

p._initViews = function() {
	// console.log("Should be overwritten by SuperClass");
};

p.loop = function() {
	this.update();
	this.render();
};

p.update = function() {
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
	this.sceneRotation.update();
	GL.setViewport(0, 0, GL.width, GL.height);
	GL.setMatrices(this.camera );
	GL.rotate(this.sceneRotation.matrix);

};

p.resize = function() {
	// if(this.camera.resize) {
	// 	this.camera.resize(GL.aspectRatio);
	// }
};

p.render = function() {

};

p._onResize = function() {
	this.cameraOrthoScreen.ortho( 0, GL.width, GL.height, 0);
};

module.exports = Scene;
},{"./CameraOrtho":5,"./GLTools":14,"./QuatRotation":18,"./SimpleCamera":22,"gl-matrix":2}],20:[function(_dereq_,module,exports){
// Scheduler.js

"use strict";

if(window.requestAnimFrame === undefined) {
	window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame       || 
		window.webkitRequestAnimationFrame || 
		window.mozRequestAnimationFrame    || 
		window.oRequestAnimationFrame      || 
		window.msRequestAnimationFrame     || 
		function( callback ){
		window.setTimeout(callback, 1000 / 60);
		};
	})();
}

function Scheduler() {
	this.FRAMERATE = 60;
	this._delayTasks = [];
	this._nextTasks = [];
	this._deferTasks = [];
	this._highTasks = [];
	this._usurpTask = [];
	this._enterframeTasks = [];
	this._idTable = 0;

	window.requestAnimFrame( this._loop.bind(this) );
}

var p = Scheduler.prototype;

p._loop = function() {
	window.requestAnimFrame( this._loop.bind(this) );
	this._process();
};


p._process = function() {
	var i = 0,
		task, interval, current;
	for ( i=0; i<this._enterframeTasks.length; i++) {
		task = this._enterframeTasks[i];
		if(task !== null && task !== undefined) {
			task.func.apply(task.scope, task.params);
		}
	}
	
	while ( this._highTasks.length > 0) {
		task = this._highTasks.pop();
		task.func.apply(task.scope, task.params);
	}
	

	var startTime = new Date().getTime();

	for ( i=0; i<this._delayTasks.length; i++) {
		task = this._delayTasks[i];
		if(startTime-task.time > task.delay) {
			task.func.apply(task.scope, task.params);
			this._delayTasks.splice(i, 1);
		}
	}

	startTime = new Date().getTime();
	interval = 1000 / this.FRAMERATE;
	while(this._deferTasks.length > 0) {
		task = this._deferTasks.shift();
		current = new Date().getTime();
		if(current - startTime < interval ) {
			task.func.apply(task.scope, task.params);
		} else {
			this._deferTasks.unshift(task);
			break;
		}
	}


	startTime = new Date().getTime();
	interval = 1000 / this.FRAMERATE;
	while(this._usurpTask.length > 0) {
		task = this._usurpTask.shift();
		current = new Date().getTime();
		if(current - startTime < interval ) {
			task.func.apply(task.scope, task.params);
		} else {
			// this._usurpTask.unshift(task);
			break;
		}
	}



	this._highTasks = this._highTasks.concat(this._nextTasks);
	this._nextTasks = [];
	this._usurpTask = [];
};


p.addEF = function(scope, func, params) {
	params = params || [];
	var id = this._idTable;
	this._enterframeTasks[id] = {scope:scope, func:func, params:params};
	this._idTable ++;
	return id;
};


p.removeEF = function(id) {
	if(this._enterframeTasks[id] !== undefined) {
		this._enterframeTasks[id] = null;
	}
	return -1;
};


p.delay = function(scope, func, params, delay) {
	var time = new Date().getTime();
	var t = {scope:scope, func:func, params:params, delay:delay, time:time};
	this._delayTasks.push(t);
};


p.defer = function(scope, func, params) {
	var t = {scope:scope, func:func, params:params};
	this._deferTasks.push(t);
};


p.next = function(scope, func, params) {
	var t = {scope:scope, func:func, params:params};
	this._nextTasks.push(t);
};


p.usurp = function(scope, func, params) {
	var t = {scope:scope, func:func, params:params};
	this._usurpTask.push(t);
};


var instance = null;

Scheduler.getInstance = function() {
	if(instance === null) {
		instance = new Scheduler();
	}
	return instance;
};

module.exports = Scheduler.getInstance();
},{}],21:[function(_dereq_,module,exports){
"use strict";


var ShaderLibs = function() { };

ShaderLibs.shaders = {};

ShaderLibs.shaders.copyVert = "#define GLSLIFY 1\n\n#define SHADER_NAME BASIC_VERTEX\n\nprecision highp float;\nattribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void) {\n    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
ShaderLibs.shaders.copyNormalVert = "#define GLSLIFY 1\n\n// copyWithNormals.vert\n\n#define SHADER_NAME BASIC_VERTEX\n\nprecision highp float;\nattribute vec3 aVertexPosition;\nattribute vec3 aNormal;\nattribute vec2 aTextureCoord;\n\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec3 vNormal;\nvarying vec3 vVertex;\n\nvoid main(void) {\n\tgl_Position   = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n\tvTextureCoord = aTextureCoord;\n\tvNormal       = aNormal;\n\tvVertex \t  = aVertexPosition;\n}";

ShaderLibs.shaders.generalVert = "#define GLSLIFY 1\n\n#define SHADER_NAME GENERAL_VERTEX\n\nprecision highp float;\nattribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\nuniform vec3 position;\nuniform vec3 scale;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void) {\n    vec3 pos = aVertexPosition;\n    pos *= scale;\n    pos += position;\n    gl_Position = uPMatrix * uMVMatrix * vec4(pos, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
ShaderLibs.shaders.generalNormalVert = "#define GLSLIFY 1\n\n#define SHADER_NAME GENERAL_VERTEX\n\nprecision highp float;\nattribute vec3 aVertexPosition;\nattribute vec3 aNormal;\nattribute vec2 aTextureCoord;\n\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\nuniform vec3 position;\nuniform vec3 scale;\n\nvarying vec3 vVertex;\nvarying vec3 vNormal;\nvarying vec2 vTextureCoord;\n\nvoid main(void) {\n\tvec3 pos      = aVertexPosition;\n\tpos           *= scale;\n\tpos           += position;\n\tgl_Position   = uPMatrix * uMVMatrix * vec4(pos, 1.0);\n\tvTextureCoord = aTextureCoord;\n\t\n\tvNormal       = aNormal;\n\tvVertex       = pos;\n}";
ShaderLibs.shaders.generalWithNormalVert = "#define GLSLIFY 1\n\n#define SHADER_NAME GENERAL_VERTEX\n\nprecision highp float;\nattribute vec3 aVertexPosition;\nattribute vec3 aNormal;\nattribute vec2 aTextureCoord;\n\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\nuniform vec3 position;\nuniform vec3 scale;\n\nvarying vec3 vVertex;\nvarying vec3 vNormal;\nvarying vec2 vTextureCoord;\n\nvoid main(void) {\n\tvec3 pos      = aVertexPosition;\n\tpos           *= scale;\n\tpos           += position;\n\tgl_Position   = uPMatrix * uMVMatrix * vec4(pos, 1.0);\n\tvTextureCoord = aTextureCoord;\n\t\n\tvNormal       = aNormal;\n\tvVertex       = pos;\n}";

ShaderLibs.shaders.copyFrag = "#define GLSLIFY 1\n\n#define SHADER_NAME SIMPLE_TEXTURE\n\nprecision highp float;\nvarying vec2 vTextureCoord;\nuniform sampler2D texture;\n\nvoid main(void) {\n    gl_FragColor = texture2D(texture, vTextureCoord);\n}\n";


ShaderLibs.shaders.alphaFrag = "#define GLSLIFY 1\n\n#define SHADER_NAME TEXTURE_WITH_ALPHA\n\nprecision highp float;\nvarying vec2 vTextureCoord;\nuniform sampler2D texture;\nuniform float opacity;\n\nvoid main(void) {\n    gl_FragColor = texture2D(texture, vTextureCoord);\n    gl_FragColor.a *= opacity;\n}";

ShaderLibs.shaders.simpleColorFrag = "#define GLSLIFY 1\n\n#define SHADER_NAME SIMPLE_COLOR_FRAGMENT\n\nprecision highp float;\nuniform vec3 color;\nuniform float opacity;\n\nvoid main(void) {\n    gl_FragColor = vec4(color, opacity);\n}";

ShaderLibs.shaders.depthFrag = "#define GLSLIFY 1\n\nprecision highp float;\nvarying vec2 vTextureCoord;\nuniform sampler2D texture;\nuniform float n;\nuniform float f;\n\nfloat getDepth(float z) {\n\treturn (6.0 * n) / (f + n - z*(f-n));\n}\n\nvoid main(void) {\n    float r = texture2D(texture, vTextureCoord).r;\n    float grey = getDepth(r);\n    gl_FragColor = vec4(grey, grey, grey, 1.0);\n}";

ShaderLibs.shaders.simpleCopyLighting = "#define GLSLIFY 1\n\n#define SHADER_NAME SIMPLE_TEXTURE_LIGHTING\n\nprecision highp float;\n\nuniform vec3 ambient;\nuniform vec3 lightPosition;\nuniform vec3 lightColor;\nuniform float lightWeight;\n\nuniform sampler2D texture;\n\nvarying vec2 vTextureCoord;\nvarying vec3 vVertex;\nvarying vec3 vNormal;\n\nvoid main(void) {\n\tvec3 L        = normalize(lightPosition-vVertex);\n\tfloat lambert = max(dot(vNormal, L), .0);\n\tvec3 light    = ambient + lightColor * lambert * lightWeight;\n\tvec4 color \t  = texture2D(texture, vTextureCoord);\n\tcolor.rgb \t  *= light;\n\t\n\tgl_FragColor  = color;\n}";
ShaderLibs.shaders.simpleColorLighting = "#define GLSLIFY 1\n\n// simpleColorLighting.frag\n\n#define SHADER_NAME SIMPLE_COLOR_LIGHTING\n\nprecision highp float;\n\nuniform vec3 ambient;\nuniform vec3 lightPosition;\nuniform vec3 lightColor;\nuniform float lightWeight;\n\nuniform vec3 color;\nuniform float opacity;\n\nvarying vec3 vVertex;\nvarying vec3 vNormal;\n\nvoid main(void) {\n\tvec3 L        = normalize(lightPosition-vVertex);\n\tfloat lambert = max(dot(vNormal, L), .0);\n\tvec3 light    = ambient + lightColor * lambert * lightWeight;\n\t\n\tgl_FragColor  = vec4(color * light, opacity);\n}";



ShaderLibs.getShader = function(mId) {
	return this.shaders[mId];
};

ShaderLibs.get = ShaderLibs.getShader;
module.exports = ShaderLibs;
},{}],22:[function(_dereq_,module,exports){
"use strict";

var glm = _dereq_("gl-matrix");
var CameraPerspective = _dereq_("./CameraPerspective");
var EaseNumber = _dereq_("./EaseNumber");

var SimpleCamera = function(mListenerTarget) {
	this._listenerTarget = mListenerTarget || window;
	CameraPerspective.call(this);
	// this._isLocked = false;
	this._init();
};

var p = SimpleCamera.prototype = new CameraPerspective();
var s = CameraPerspective.prototype;

p._init = function() {
	this.radius          = new EaseNumber(500);
	this.position[2]     = this.radius.value;
	this.center          = glm.vec3.create( );
	this.up              = glm.vec3.clone( [0,-1,0] );
	this.lookAt(this.position, this.center, this.up);
	this._mouse          = {};
	this._preMouse       = {};
	this._isMouseDown    = false;
	
	this._rx             = new EaseNumber(0);
	this._rx.limit(-Math.PI/2, Math.PI/2);
	this._ry             = new EaseNumber(0);
	this._preRX          = 0;
	this._preRY          = 0;
	// this._isLocked       = false;
	this._isLockZoom 	 = false;
	this._isLockRotation = false;
	this._isInvert       = false;

	this._listenerTarget.addEventListener("mousewheel", this._onWheel.bind(this));
	this._listenerTarget.addEventListener("DOMMouseScroll", this._onWheel.bind(this));

	this._listenerTarget.addEventListener("mousedown", this._onMouseDown.bind(this));
	this._listenerTarget.addEventListener("touchstart", this._onMouseDown.bind(this));
	this._listenerTarget.addEventListener("mousemove", this._onMouseMove.bind(this));
	this._listenerTarget.addEventListener("touchmove", this._onMouseMove.bind(this));
	window.addEventListener("mouseup", this._onMouseUp.bind(this));
	window.addEventListener("touchend", this._onMouseUp.bind(this));
};

p.inverseControl = function(value) {
	if(value === undefined) {
		this._isInvert = true;
	} else {
		this._isInvert = value;
	}
};

p.lock = function(value) {
	if(value === undefined) {
		// this._isLocked = true;
		this._isLockZoom = true;
		this._isLockRotation = true;
	} else {
		this._isLockZoom = value;
		this._isLockRotation = value;
	}
};

p.lockRotation = function(value) {
	if(value === undefined) {
		this._isLockRotation = true;
	} else {
		this._isLockRotation = value;
	}
};

p.lockZoom = function(value) {
	this._isLockZoom = value === undefined ? true : value;
};

p._onMouseDown = function(mEvent) {
	if(this._isLockRotation) {return;}
	this._isMouseDown = true;
	getMouse(mEvent, this._mouse);
	getMouse(mEvent, this._preMouse);
	this._preRX = this._rx.targetValue;
	this._preRY = this._ry.targetValue;
};


p._onMouseMove = function(mEvent) {
	if(this._isLockRotation) {return;}
	getMouse(mEvent, this._mouse);
	if(mEvent.touches) {mEvent.preventDefault();}
	if(this._isMouseDown) {
		var diffX = this._mouse.x - this._preMouse.x;
		if(this._isInvert) {diffX *= -1;}
		this._ry.value = this._preRY - diffX * 0.01;

		var diffY = this._mouse.y - this._preMouse.y;
		if(this._isInvert) {diffY *= -1;}
		this._rx.value = this._preRX - diffY * 0.01;

		// if(this._rx.targetValue > Math.PI * 0.5) {this._rx.targetValue = Math;	}
	}
};


p._onMouseUp = function() {
	if(this._isLockRotation) {return;}
	this._isMouseDown = false;
	// getMouse(mEvent, this._mouse);
};


p._onWheel = function(aEvent) {
	if(this._isLockZoom) {	return;	}
	var w = aEvent.wheelDelta;
	var d = aEvent.detail;
	var value = 0;
	if (d){
		if (w) {
			value = w/d/40*d>0?1:-1; // Opera
		} else {
			value = -d/3;              // Firefox;         TODO: do not /3 for OS X
		}
	} else {
		value = w/120; 
	}

	// this._targetRadius -= value * 5;
	this.radius.add( -value * 5);
	
};


p.getMatrix = function() {
	this._updateCameraPosition();
	this.lookAt(this.position, this.center, this.up);
	return s.getMatrix.call(this);
};


p._updateCameraPosition = function() {
	this.position[2] 	= this.radius.value;

	this.position[1] = Math.sin(this._rx.value) * this.radius.value;
	var tr = Math.cos(this._rx.value) * this.radius.value;
	this.position[0] = Math.cos(this._ry.value + Math.PI*0.5) * tr;
	this.position[2] = Math.sin(this._ry.value + Math.PI*0.5) * tr;
};


var getMouse = function(mEvent, mTarget) {
	var o = mTarget || {};
	if(mEvent.touches) {
		o.x = mEvent.touches[0].pageX;
		o.y = mEvent.touches[0].pageY;
	} else {
		o.x = mEvent.clientX;
		o.y = mEvent.clientY;
	}

	return o;
};


p.__defineGetter__("rx", function() {
	return this._rx.targetValue;
});
 
p.__defineSetter__("rx", function(mValue) {
	this._rx.value = mValue;
});

p.__defineGetter__("ry", function() {
	return this._ry.targetValue;
});
 
p.__defineSetter__("ry", function(mValue) {
	this._ry.value = mValue;
});

module.exports = SimpleCamera;
},{"./CameraPerspective":6,"./EaseNumber":7,"gl-matrix":2}],23:[function(_dereq_,module,exports){
"use strict";

var SimpleImageLoader = function() {
	this._imgs             = {};
	this._loadedCount      = 0;
	this._toLoadCount      = 0;
	this._scope            = undefined;
	this._callback         = undefined;
	this._callbackProgress = undefined;
};

var p = SimpleImageLoader.prototype;


p.load = function(imgs, scope, callback, progressCallback) {
	this._imgs = {};
	this._loadedCount = 0;
	this._toLoadCount = imgs.length;
	this._scope = scope;
	this._callback = callback;
	this._callbackProgress = progressCallback;

	this._imgLoadedBind = this._onImageLoaded.bind(this);

	for ( var i=0; i<imgs.length ; i++) {
		var img         = new Image();
		img.onload      = this._imgLoadedBind;
		var path        = imgs[i];
		var tmp         = path.split("/");
		var ref         = tmp[tmp.length-1].split(".")[0];
		this._imgs[ref] = img;
		img.src         = path;
	}
};


p._onImageLoaded = function() {
	this._loadedCount++;

	if(this._loadedCount === this._toLoadCount) {
		this._callback.call(this._scope, this._imgs);
	} else {
		var p = this._loadedCount / this._toLoadCount;
		if(this._callbackProgress) {
			this._callbackProgress.call(this._scope, p);
		}
	}
};

module.exports = SimpleImageLoader;
},{}],24:[function(_dereq_,module,exports){
// View.js
"use strict";

var GLShader = _dereq_("./GLShader");

var View = function(aPathVert, aPathFrag) {
	this.shader = new GLShader(aPathVert, aPathFrag);
	this._init();
};

var p = View.prototype;

p._init = function() {
	// console.log("Should be overwritten by SuperClass");
};

p.render = function() {
	// console.log("Should be overwritten by SuperClass");
};

module.exports = View;


},{"./GLShader":12}],25:[function(_dereq_,module,exports){
// ViewAxis.js

"use strict";
var GL = _dereq_("./GLTools");
var View = _dereq_("./View");
var Mesh = _dereq_("./Mesh");

var vertShader = "precision highp float;attribute vec3 aVertexPosition;attribute vec2 aTextureCoord;attribute vec3 aColor;uniform mat4 uMVMatrix;uniform mat4 uPMatrix;varying vec2 vTextureCoord;varying vec3 vColor;void main(void) {    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);    vTextureCoord = aTextureCoord;    vColor = aColor;}";
var fragShader = "precision mediump float;varying vec3 vColor;void main(void) {    gl_FragColor = vec4(vColor, 1.0);}";

var ViewAxis = function(lineWidth, mFragShader) {
	this.lineWidth = lineWidth === undefined ? 2.0 : lineWidth;
	var fs = mFragShader === undefined ? fragShader : mFragShader;
	View.call(this, vertShader, fs);
};

var p = ViewAxis.prototype = new View();

p._init = function() {
	// this.mesh = bongiovi.MeshUtils.createPlane(2, 2, 1);

	var positions = [];
	var colors = [];
	var coords = [];
	var indices = [0, 1, 2, 3, 4, 5];
	var r = 9999;

	positions.push([-r,  0,  0]);
	positions.push([ r,  0,  0]);
	positions.push([ 0, -r,  0]);
	positions.push([ 0,  r,  0]);
	positions.push([ 0,  0, -r]);
	positions.push([ 0,  0,  r]);


	colors.push([1, 0, 0]);
	colors.push([1, 0, 0]);
	colors.push([0, 1, 0]);
	colors.push([0, 1, 0]);
	colors.push([0, 0, 1]);
	colors.push([0, 0, 1]);


	coords.push([0, 0]);
	coords.push([0, 0]);
	coords.push([0, 0]);
	coords.push([0, 0]);
	coords.push([0, 0]);
	coords.push([0, 0]);


	this.mesh = new Mesh(positions.length, indices.length, GL.gl.LINES);
	this.mesh.bufferVertex(positions);
	this.mesh.bufferTexCoords(coords);
	this.mesh.bufferIndices(indices);
	this.mesh.bufferData(colors, "aColor", 3, false);
};

p.render = function() {
	if(!this.shader.isReady()) {return;}

	this.shader.bind();
	GL.gl.lineWidth(this.lineWidth);
	GL.draw(this.mesh);
	GL.gl.lineWidth(1.0);
};

module.exports = ViewAxis;

},{"./GLTools":14,"./Mesh":15,"./View":24}],26:[function(_dereq_,module,exports){
"use strict";

var View = _dereq_("./View");
var GL = _dereq_("./GLTools");
var MeshUtils = _dereq_("./MeshUtils");

var ViewCopy = function(aPathVert, aPathFrag) {
	View.call(this, aPathVert, aPathFrag);
};

var p = ViewCopy.prototype = new View();

p._init = function() {
	if(!GL.gl) { return;	}
	this.mesh = MeshUtils.createPlane(2, 2, 1);
};

p.render = function(aTexture) {
	if(!this.shader.isReady()) {return;}
	this.shader.bind();
	this.shader.uniform("texture", "uniform1i", 0);
	// console.log('Render', aTexture);
	aTexture.bind(0);
	GL.draw(this.mesh);
};

module.exports = ViewCopy;

},{"./GLTools":14,"./MeshUtils":16,"./View":24}],27:[function(_dereq_,module,exports){
// ViewDotPlanes.js

"use strict";

var GL = _dereq_("./GLTools");
var View = _dereq_("./View");
var ShaderLibs = _dereq_("./ShaderLibs");
var Mesh = _dereq_("./Mesh");

// var vertShader = "precision highp float;attribute vec3 aVertexPosition;attribute vec2 aTextureCoord;attribute vec3 aColor;uniform mat4 uMVMatrix;uniform mat4 uPMatrix;varying vec2 vTextureCoord;varying vec3 vColor;void main(void) {    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);    vTextureCoord = aTextureCoord;    vColor = aColor;}";
// var fragShader = "precision mediump float;varying vec3 vColor;void main(void) {    gl_FragColor = vec4(vColor, 1.0);}";

var ViewDotPlanes = function(color, fragShader) {
	var grey = 0.75;
	this.color = color === undefined ? [grey, grey, grey] : color;
	var fs = fragShader === undefined ? ShaderLibs.get("simpleColorFrag") : fragShader;
	View.call(this, null, fs);
};

var p = ViewDotPlanes.prototype = new View();

p._init = function() {
	var positions = [];
	var coords = [];
	var indices = [];
	var index = 0;


	var numDots = 100;
	var size = 3000;
	var gap = size / numDots;
	var i, j;


	for(i=-size/2; i<size; i+=gap) {
		for(j=-size/2; j<size; j+=gap) {
			positions.push([i, j, 0]);
			coords.push([0, 0]);
			indices.push(index);
			index++;

			positions.push([i, 0, j]);
			coords.push([0, 0]);
			indices.push(index);
			index++;
		}
	}

	this.mesh = new Mesh(positions.length, indices.length, GL.gl.DOTS);
	this.mesh.bufferVertex(positions);
	this.mesh.bufferTexCoords(coords);
	this.mesh.bufferIndices(indices);
};

p.render = function() {
	this.shader.bind();
	this.shader.uniform("color", "uniform3fv", this.color);
	this.shader.uniform("opacity", "uniform1f", 1);
	GL.draw(this.mesh);
};

module.exports = ViewDotPlanes;

},{"./GLTools":14,"./Mesh":15,"./ShaderLibs":21,"./View":24}],28:[function(_dereq_,module,exports){
"use strict";

var Pass = _dereq_("./Pass");

var EffectComposer = function() {
	this._passes = [];
};

var p = EffectComposer.prototype = new Pass();


p.addPass = function(pass) {
	this._passes.push(pass);
};


p.render = function(texture) {
	this.texture = texture;
	for(var i=0; i<this._passes.length; i++) {
		this.texture = this._passes[i].render(this.texture);
	}

	return this.texture;
};

p.getTexture = function() {
	return this.texture;	
};


module.exports =EffectComposer;
},{"./Pass":29}],29:[function(_dereq_,module,exports){
"use strict";

var gl,GL = _dereq_("../GLTools");
var ViewCopy = _dereq_("../ViewCopy");
var FrameBuffer = _dereq_("../FrameBuffer");

var Pass = function(mParams, mWidth, mHeight, mFboParams) {
	mWidth = mWidth === undefined ? 512 : mWidth;
	mHeight = mHeight === undefined ? 512 : mHeight;
	gl = GL.gl;
	if(!mParams) {	return;	}
	if( (typeof mParams) === "string") {
		this.view = new ViewCopy(null, mParams);
	} else {
		this.view = mParams;
	}

	this.width = mWidth;
	this.height = mHeight;
	this._fboParams = mFboParams;

	this._init();
};

var p = Pass.prototype;


p._init = function() {
	this._fbo = new FrameBuffer(this.width, this.height, this._fboParams);
	this._fbo.bind();
	GL.setViewport(0, 0, this._fbo.width, this._fbo.height);
	GL.clear(0, 0, 0, 0);
	this._fbo.unbind();
	GL.setViewport(0, 0, GL.canvas.width, GL.canvas.height);

};


p.render = function(texture) {
	this._fbo.bind();
	GL.setViewport(0, 0, this._fbo.width, this._fbo.height);
	GL.clear(0, 0, 0, 0);
	this.view.render(texture);
	this._fbo.unbind();
	GL.setViewport(0, 0, GL.canvas.width, GL.canvas.height);

	return this._fbo.getTexture();
};

p.getTexture = function() {
	return this._fbo.getTexture();
};

p.getFbo = function() {
	return this._fbo;
};

module.exports = Pass;
},{"../FrameBuffer":10,"../GLTools":14,"../ViewCopy":26}],30:[function(_dereq_,module,exports){
// PassGreyscale.js

"use strict";
var Pass = _dereq_("./Pass");


var PassGreyscale = function(mWidth, mHeight, mFboParams) {
	Pass.call(this, "#define GLSLIFY 1\n\n// greyscale.frag\n\n#define SHADER_NAME FRAGMENT_GREYSCALE\n\nprecision highp float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D texture;\n\nvoid main(void) {\n\tvec4 color = texture2D(texture, vTextureCoord);\n\tfloat grey = (color.r + color.g + color.b) / 3.0;\n\tgl_FragColor = vec4(vec3(grey), color.a);\n}", mWidth, mHeight, mFboParams);
};

PassGreyscale.prototype = new Pass();

module.exports = PassGreyscale;
},{"./Pass":29}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYm9uZ2lvdmktcG9zdC5qcyIsIm5vZGVfbW9kdWxlcy9nbC1tYXRyaXgvZGlzdC9nbC1tYXRyaXguanMiLCJzcmMvYm9uZ2lvdmkuanMiLCJzcmMvYm9uZ2lvdmkvQ2FtZXJhLmpzIiwic3JjL2Jvbmdpb3ZpL0NhbWVyYU9ydGhvLmpzIiwic3JjL2Jvbmdpb3ZpL0NhbWVyYVBlcnNwZWN0aXZlLmpzIiwic3JjL2Jvbmdpb3ZpL0Vhc2VOdW1iZXIuanMiLCJzcmMvYm9uZ2lvdmkvRXZlbnREaXNwYXRjaGVyLmpzIiwic3JjL2Jvbmdpb3ZpL0ZhY2UuanMiLCJzcmMvYm9uZ2lvdmkvRnJhbWVCdWZmZXIuanMiLCJzcmMvYm9uZ2lvdmkvR0xDdWJlVGV4dHVyZS5qcyIsInNyYy9ib25naW92aS9HTFNoYWRlci5qcyIsInNyYy9ib25naW92aS9HTFRleHR1cmUuanMiLCJzcmMvYm9uZ2lvdmkvR0xUb29scy5qcyIsInNyYy9ib25naW92aS9NZXNoLmpzIiwic3JjL2Jvbmdpb3ZpL01lc2hVdGlscy5qcyIsInNyYy9ib25naW92aS9PYmpMb2FkZXIuanMiLCJzcmMvYm9uZ2lvdmkvUXVhdFJvdGF0aW9uLmpzIiwic3JjL2Jvbmdpb3ZpL1NjZW5lLmpzIiwic3JjL2Jvbmdpb3ZpL1NjaGVkdWxlci5qcyIsInNyYy9ib25naW92aS9TaGFkZXJMaWJzLmpzIiwic3JjL2Jvbmdpb3ZpL1NpbXBsZUNhbWVyYS5qcyIsInNyYy9ib25naW92aS9TaW1wbGVJbWFnZUxvYWRlci5qcyIsInNyYy9ib25naW92aS9WaWV3LmpzIiwic3JjL2Jvbmdpb3ZpL1ZpZXdBeGlzLmpzIiwic3JjL2Jvbmdpb3ZpL1ZpZXdDb3B5LmpzIiwic3JjL2Jvbmdpb3ZpL1ZpZXdEb3RQbGFuZXMuanMiLCJzcmMvYm9uZ2lvdmkvcG9zdC9FZmZlY3RDb21wb3Nlci5qcyIsInNyYy9ib25naW92aS9wb3N0L1Bhc3MuanMiLCJzcmMvYm9uZ2lvdmkvcG9zdC9QYXNzR3JleXNjYWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeHBJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDblFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9mQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNVJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIGJvbmdpb3ZpLXBvc3QuanNcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxudmFyIGJvbmdpb3ZpID0gcmVxdWlyZShcIi4vYm9uZ2lvdmlcIik7XG5cbi8qL1xudmFyIEdMVG9vbHMgPSByZXF1aXJlKFwiLi9ib25naW92aS9HTFRvb2xzXCIpO1xudmFyIGJvbmdpb3ZpID0ge1xuXHRHTDpHTFRvb2xzLFxuXHRHTFRvb2xzOkdMVG9vbHMsXG5cdFNjaGVkdWxlcjpyZXF1aXJlKFwiLi9ib25naW92aS9TY2hlZHVsZXJcIiksXG5cdFNpbXBsZUltYWdlTG9hZGVyOnJlcXVpcmUoXCIuL2Jvbmdpb3ZpL1NpbXBsZUltYWdlTG9hZGVyXCIpLFxuXHRFYXNlTnVtYmVyOnJlcXVpcmUoXCIuL2Jvbmdpb3ZpL0Vhc2VOdW1iZXJcIiksXG5cdFF1YXRSb3RhdGlvbjpyZXF1aXJlKFwiLi9ib25naW92aS9RdWF0Um90YXRpb25cIiksXG5cdFNjZW5lOnJlcXVpcmUoXCIuL2Jvbmdpb3ZpL1NjZW5lXCIpLFxuXHRDYW1lcmE6cmVxdWlyZShcIi4vYm9uZ2lvdmkvQ2FtZXJhXCIpLFxuXHRTaW1wbGVDYW1lcmE6cmVxdWlyZShcIi4vYm9uZ2lvdmkvU2ltcGxlQ2FtZXJhXCIpLFxuXHRDYW1lcmFQZXJzcGVjdGl2ZTpyZXF1aXJlKFwiLi9ib25naW92aS9DYW1lcmFQZXJzcGVjdGl2ZVwiKSxcblx0Q2FtZXJhT3J0aG86cmVxdWlyZShcIi4vYm9uZ2lvdmkvQ2FtZXJhT3J0aG9cIiksXG5cdE1lc2g6cmVxdWlyZShcIi4vYm9uZ2lvdmkvTWVzaFwiKSxcblx0RmFjZTpyZXF1aXJlKFwiLi9ib25naW92aS9GYWNlXCIpLFxuXHRHTFNoYWRlcjpyZXF1aXJlKFwiLi9ib25naW92aS9HTFNoYWRlclwiKSxcblx0R0xUZXh0dXJlOnJlcXVpcmUoXCIuL2Jvbmdpb3ZpL0dMVGV4dHVyZVwiKSxcblx0U2hhZGVyTGliczpyZXF1aXJlKFwiLi9ib25naW92aS9TaGFkZXJMaWJzXCIpLFxuXHRWaWV3OnJlcXVpcmUoXCIuL2Jvbmdpb3ZpL1ZpZXdcIiksXG5cdFZpZXdDb3B5OnJlcXVpcmUoXCIuL2Jvbmdpb3ZpL1ZpZXdDb3B5XCIpLFxuXHRWaWV3QXhpczpyZXF1aXJlKFwiLi9ib25naW92aS9WaWV3QXhpc1wiKSxcblx0Vmlld0RvdFBsYW5lOnJlcXVpcmUoXCIuL2Jvbmdpb3ZpL1ZpZXdEb3RQbGFuZXNcIiksXG5cdE1lc2hVdGlsczpyZXF1aXJlKFwiLi9ib25naW92aS9NZXNoVXRpbHNcIiksXG5cdEZyYW1lQnVmZmVyOnJlcXVpcmUoXCIuL2Jvbmdpb3ZpL0ZyYW1lQnVmZmVyXCIpLFxuXHRFdmVudERpc3BhdGNoZXI6cmVxdWlyZShcIi4vYm9uZ2lvdmkvRXZlbnREaXNwYXRjaGVyXCIpLFxuXHRnbG06cmVxdWlyZShcImdsLW1hdHJpeFwiKSxcblxuXHRwb3N0OiB7XG5cdFx0UGFzczpyZXF1aXJlKFwiLi9ib25naW92aS9wb3N0L1Bhc3NcIiksXG5cdFx0RWZmZWN0Q29tcG9zZXI6cmVxdWlyZShcIi4vYm9uZ2lvdmkvcG9zdC9FZmZlY3RDb21wb3NlclwiKSxcblx0XHRQYXNzR3JleXNjYWxlOnJlcXVpcmUoXCIuL2Jvbmdpb3ZpL3Bvc3QvUGFzc0dyZXlzY2FsZVwiKVxuXHR9XG59O1xuLyovXG5ib25naW92aS5wb3N0ID0ge1xuXHRQYXNzOnJlcXVpcmUoXCIuL2Jvbmdpb3ZpL3Bvc3QvUGFzc1wiKSxcblx0RWZmZWN0Q29tcG9zZXI6cmVxdWlyZShcIi4vYm9uZ2lvdmkvcG9zdC9FZmZlY3RDb21wb3NlclwiKSxcblx0UGFzc0dyZXlzY2FsZTpyZXF1aXJlKFwiLi9ib25naW92aS9wb3N0L1Bhc3NHcmV5c2NhbGVcIilcbn07XG4vLyovXG5cbm1vZHVsZS5leHBvcnRzID0gYm9uZ2lvdmk7IiwiLyoqXG4gKiBAZmlsZW92ZXJ2aWV3IGdsLW1hdHJpeCAtIEhpZ2ggcGVyZm9ybWFuY2UgbWF0cml4IGFuZCB2ZWN0b3Igb3BlcmF0aW9uc1xuICogQGF1dGhvciBCcmFuZG9uIEpvbmVzXG4gKiBAYXV0aG9yIENvbGluIE1hY0tlbnppZSBJVlxuICogQHZlcnNpb24gMi4yLjFcbiAqL1xuXG4vKiBDb3B5cmlnaHQgKGMpIDIwMTMsIEJyYW5kb24gSm9uZXMsIENvbGluIE1hY0tlbnppZSBJVi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cblxuUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0IG1vZGlmaWNhdGlvbixcbmFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcblxuICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpc1xuICAgIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uXG4gICAgYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG5cblRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiIEFORFxuQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbldBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkVcbkRJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SXG5BTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcbihJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUztcbkxPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTlxuQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcbihJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTXG5TT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS4gKi9cblxuXG4oZnVuY3Rpb24oX2dsb2JhbCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgc2hpbSA9IHt9O1xuICBpZiAodHlwZW9mKGV4cG9ydHMpID09PSAndW5kZWZpbmVkJykge1xuICAgIGlmKHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICBzaGltLmV4cG9ydHMgPSB7fTtcbiAgICAgIGRlZmluZShmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHNoaW0uZXhwb3J0cztcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBnbC1tYXRyaXggbGl2ZXMgaW4gYSBicm93c2VyLCBkZWZpbmUgaXRzIG5hbWVzcGFjZXMgaW4gZ2xvYmFsXG4gICAgICBzaGltLmV4cG9ydHMgPSB0eXBlb2Yod2luZG93KSAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBfZ2xvYmFsO1xuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICAvLyBnbC1tYXRyaXggbGl2ZXMgaW4gY29tbW9uanMsIGRlZmluZSBpdHMgbmFtZXNwYWNlcyBpbiBleHBvcnRzXG4gICAgc2hpbS5leHBvcnRzID0gZXhwb3J0cztcbiAgfVxuXG4gIChmdW5jdGlvbihleHBvcnRzKSB7XG4gICAgLyogQ29weXJpZ2h0IChjKSAyMDEzLCBCcmFuZG9uIEpvbmVzLCBDb2xpbiBNYWNLZW56aWUgSVYuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5cblJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dCBtb2RpZmljYXRpb24sXG5hcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbiAgICBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBcbiAgICBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cblxuVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EXG5BTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBcbkRJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SXG5BTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcbihJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUztcbkxPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTlxuQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcbihJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTXG5TT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS4gKi9cblxuXG5pZighR0xNQVRfRVBTSUxPTikge1xuICAgIHZhciBHTE1BVF9FUFNJTE9OID0gMC4wMDAwMDE7XG59XG5cbmlmKCFHTE1BVF9BUlJBWV9UWVBFKSB7XG4gICAgdmFyIEdMTUFUX0FSUkFZX1RZUEUgPSAodHlwZW9mIEZsb2F0MzJBcnJheSAhPT0gJ3VuZGVmaW5lZCcpID8gRmxvYXQzMkFycmF5IDogQXJyYXk7XG59XG5cbmlmKCFHTE1BVF9SQU5ET00pIHtcbiAgICB2YXIgR0xNQVRfUkFORE9NID0gTWF0aC5yYW5kb207XG59XG5cbi8qKlxuICogQGNsYXNzIENvbW1vbiB1dGlsaXRpZXNcbiAqIEBuYW1lIGdsTWF0cml4XG4gKi9cbnZhciBnbE1hdHJpeCA9IHt9O1xuXG4vKipcbiAqIFNldHMgdGhlIHR5cGUgb2YgYXJyYXkgdXNlZCB3aGVuIGNyZWF0aW5nIG5ldyB2ZWN0b3JzIGFuZCBtYXRyaWNpZXNcbiAqXG4gKiBAcGFyYW0ge1R5cGV9IHR5cGUgQXJyYXkgdHlwZSwgc3VjaCBhcyBGbG9hdDMyQXJyYXkgb3IgQXJyYXlcbiAqL1xuZ2xNYXRyaXguc2V0TWF0cml4QXJyYXlUeXBlID0gZnVuY3Rpb24odHlwZSkge1xuICAgIEdMTUFUX0FSUkFZX1RZUEUgPSB0eXBlO1xufVxuXG5pZih0eXBlb2YoZXhwb3J0cykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZXhwb3J0cy5nbE1hdHJpeCA9IGdsTWF0cml4O1xufVxuXG52YXIgZGVncmVlID0gTWF0aC5QSSAvIDE4MDtcblxuLyoqXG4qIENvbnZlcnQgRGVncmVlIFRvIFJhZGlhblxuKlxuKiBAcGFyYW0ge051bWJlcn0gQW5nbGUgaW4gRGVncmVlc1xuKi9cbmdsTWF0cml4LnRvUmFkaWFuID0gZnVuY3Rpb24oYSl7XG4gICAgIHJldHVybiBhICogZGVncmVlO1xufVxuO1xuLyogQ29weXJpZ2h0IChjKSAyMDEzLCBCcmFuZG9uIEpvbmVzLCBDb2xpbiBNYWNLZW56aWUgSVYuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5cblJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dCBtb2RpZmljYXRpb24sXG5hcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbiAgICBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBcbiAgICBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cblxuVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EXG5BTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBcbkRJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SXG5BTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcbihJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUztcbkxPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTlxuQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcbihJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTXG5TT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS4gKi9cblxuLyoqXG4gKiBAY2xhc3MgMiBEaW1lbnNpb25hbCBWZWN0b3JcbiAqIEBuYW1lIHZlYzJcbiAqL1xuXG52YXIgdmVjMiA9IHt9O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcsIGVtcHR5IHZlYzJcbiAqXG4gKiBAcmV0dXJucyB7dmVjMn0gYSBuZXcgMkQgdmVjdG9yXG4gKi9cbnZlYzIuY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG91dCA9IG5ldyBHTE1BVF9BUlJBWV9UWVBFKDIpO1xuICAgIG91dFswXSA9IDA7XG4gICAgb3V0WzFdID0gMDtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHZlYzIgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdmVjdG9yIHRvIGNsb25lXG4gKiBAcmV0dXJucyB7dmVjMn0gYSBuZXcgMkQgdmVjdG9yXG4gKi9cbnZlYzIuY2xvbmUgPSBmdW5jdGlvbihhKSB7XG4gICAgdmFyIG91dCA9IG5ldyBHTE1BVF9BUlJBWV9UWVBFKDIpO1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHZlYzIgaW5pdGlhbGl6ZWQgd2l0aCB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gKiBAcmV0dXJucyB7dmVjMn0gYSBuZXcgMkQgdmVjdG9yXG4gKi9cbnZlYzIuZnJvbVZhbHVlcyA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEdMTUFUX0FSUkFZX1RZUEUoMik7XG4gICAgb3V0WzBdID0geDtcbiAgICBvdXRbMV0gPSB5O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSB2ZWMyIHRvIGFub3RoZXJcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBzb3VyY2UgdmVjdG9yXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIuY29weSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMyIHRvIHRoZSBnaXZlbiB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIuc2V0ID0gZnVuY3Rpb24ob3V0LCB4LCB5KSB7XG4gICAgb3V0WzBdID0geDtcbiAgICBvdXRbMV0gPSB5O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFkZHMgdHdvIHZlYzInc1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi5hZGQgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICsgYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdICsgYlsxXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTdWJ0cmFjdHMgdmVjdG9yIGIgZnJvbSB2ZWN0b3IgYVxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi5zdWJ0cmFjdCA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gLSBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gLSBiWzFdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5zdWJ0cmFjdH1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMyLnN1YiA9IHZlYzIuc3VidHJhY3Q7XG5cbi8qKlxuICogTXVsdGlwbGllcyB0d28gdmVjMidzXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLm11bHRpcGx5ID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAqIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSAqIGJbMV07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLm11bHRpcGx5fVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzIubXVsID0gdmVjMi5tdWx0aXBseTtcblxuLyoqXG4gKiBEaXZpZGVzIHR3byB2ZWMyJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIuZGl2aWRlID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAvIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSAvIGJbMV07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLmRpdmlkZX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMyLmRpdiA9IHZlYzIuZGl2aWRlO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIG1pbmltdW0gb2YgdHdvIHZlYzInc1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi5taW4gPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBNYXRoLm1pbihhWzBdLCBiWzBdKTtcbiAgICBvdXRbMV0gPSBNYXRoLm1pbihhWzFdLCBiWzFdKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtYXhpbXVtIG9mIHR3byB2ZWMyJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIubWF4ID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gTWF0aC5tYXgoYVswXSwgYlswXSk7XG4gICAgb3V0WzFdID0gTWF0aC5tYXgoYVsxXSwgYlsxXSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2NhbGVzIGEgdmVjMiBieSBhIHNjYWxhciBudW1iZXJcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSB2ZWN0b3IgdG8gc2NhbGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBiIGFtb3VudCB0byBzY2FsZSB0aGUgdmVjdG9yIGJ5XG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIuc2NhbGUgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICogYjtcbiAgICBvdXRbMV0gPSBhWzFdICogYjtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBZGRzIHR3byB2ZWMyJ3MgYWZ0ZXIgc2NhbGluZyB0aGUgc2Vjb25kIG9wZXJhbmQgYnkgYSBzY2FsYXIgdmFsdWVcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGUgdGhlIGFtb3VudCB0byBzY2FsZSBiIGJ5IGJlZm9yZSBhZGRpbmdcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi5zY2FsZUFuZEFkZCA9IGZ1bmN0aW9uKG91dCwgYSwgYiwgc2NhbGUpIHtcbiAgICBvdXRbMF0gPSBhWzBdICsgKGJbMF0gKiBzY2FsZSk7XG4gICAgb3V0WzFdID0gYVsxXSArIChiWzFdICogc2NhbGUpO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWMyJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxuICovXG52ZWMyLmRpc3RhbmNlID0gZnVuY3Rpb24oYSwgYikge1xuICAgIHZhciB4ID0gYlswXSAtIGFbMF0sXG4gICAgICAgIHkgPSBiWzFdIC0gYVsxXTtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHgqeCArIHkqeSk7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5kaXN0YW5jZX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMyLmRpc3QgPSB2ZWMyLmRpc3RhbmNlO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzInc1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcbiAqL1xudmVjMi5zcXVhcmVkRGlzdGFuY2UgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIHggPSBiWzBdIC0gYVswXSxcbiAgICAgICAgeSA9IGJbMV0gLSBhWzFdO1xuICAgIHJldHVybiB4KnggKyB5Knk7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5zcXVhcmVkRGlzdGFuY2V9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMi5zcXJEaXN0ID0gdmVjMi5zcXVhcmVkRGlzdGFuY2U7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIGEgdmVjMlxuICpcbiAqIEBwYXJhbSB7dmVjMn0gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIGxlbmd0aCBvZlxuICogQHJldHVybnMge051bWJlcn0gbGVuZ3RoIG9mIGFcbiAqL1xudmVjMi5sZW5ndGggPSBmdW5jdGlvbiAoYSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV07XG4gICAgcmV0dXJuIE1hdGguc3FydCh4KnggKyB5KnkpO1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzIubGVuZ3RofVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzIubGVuID0gdmVjMi5sZW5ndGg7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBsZW5ndGggb2YgYSB2ZWMyXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBhIHZlY3RvciB0byBjYWxjdWxhdGUgc3F1YXJlZCBsZW5ndGggb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgbGVuZ3RoIG9mIGFcbiAqL1xudmVjMi5zcXVhcmVkTGVuZ3RoID0gZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgeCA9IGFbMF0sXG4gICAgICAgIHkgPSBhWzFdO1xuICAgIHJldHVybiB4KnggKyB5Knk7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5zcXVhcmVkTGVuZ3RofVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzIuc3FyTGVuID0gdmVjMi5zcXVhcmVkTGVuZ3RoO1xuXG4vKipcbiAqIE5lZ2F0ZXMgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMyXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB2ZWN0b3IgdG8gbmVnYXRlXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIubmVnYXRlID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gLWFbMF07XG4gICAgb3V0WzFdID0gLWFbMV07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogTm9ybWFsaXplIGEgdmVjMlxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdmVjdG9yIHRvIG5vcm1hbGl6ZVxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV07XG4gICAgdmFyIGxlbiA9IHgqeCArIHkqeTtcbiAgICBpZiAobGVuID4gMCkge1xuICAgICAgICAvL1RPRE86IGV2YWx1YXRlIHVzZSBvZiBnbG1faW52c3FydCBoZXJlP1xuICAgICAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbik7XG4gICAgICAgIG91dFswXSA9IGFbMF0gKiBsZW47XG4gICAgICAgIG91dFsxXSA9IGFbMV0gKiBsZW47XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHR3byB2ZWMyJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRvdCBwcm9kdWN0IG9mIGEgYW5kIGJcbiAqL1xudmVjMi5kb3QgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBhWzBdICogYlswXSArIGFbMV0gKiBiWzFdO1xufTtcblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgY3Jvc3MgcHJvZHVjdCBvZiB0d28gdmVjMidzXG4gKiBOb3RlIHRoYXQgdGhlIGNyb3NzIHByb2R1Y3QgbXVzdCBieSBkZWZpbml0aW9uIHByb2R1Y2UgYSAzRCB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzIuY3Jvc3MgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICB2YXIgeiA9IGFbMF0gKiBiWzFdIC0gYVsxXSAqIGJbMF07XG4gICAgb3V0WzBdID0gb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSB6O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiB0d28gdmVjMidzXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLmxlcnAgPSBmdW5jdGlvbiAob3V0LCBhLCBiLCB0KSB7XG4gICAgdmFyIGF4ID0gYVswXSxcbiAgICAgICAgYXkgPSBhWzFdO1xuICAgIG91dFswXSA9IGF4ICsgdCAqIChiWzBdIC0gYXgpO1xuICAgIG91dFsxXSA9IGF5ICsgdCAqIChiWzFdIC0gYXkpO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhIHJhbmRvbSB2ZWN0b3Igd2l0aCB0aGUgZ2l2ZW4gc2NhbGVcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IFtzY2FsZV0gTGVuZ3RoIG9mIHRoZSByZXN1bHRpbmcgdmVjdG9yLiBJZiBvbW1pdHRlZCwgYSB1bml0IHZlY3RvciB3aWxsIGJlIHJldHVybmVkXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIucmFuZG9tID0gZnVuY3Rpb24gKG91dCwgc2NhbGUpIHtcbiAgICBzY2FsZSA9IHNjYWxlIHx8IDEuMDtcbiAgICB2YXIgciA9IEdMTUFUX1JBTkRPTSgpICogMi4wICogTWF0aC5QSTtcbiAgICBvdXRbMF0gPSBNYXRoLmNvcyhyKSAqIHNjYWxlO1xuICAgIG91dFsxXSA9IE1hdGguc2luKHIpICogc2NhbGU7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjMiB3aXRoIGEgbWF0MlxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7bWF0Mn0gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi50cmFuc2Zvcm1NYXQyID0gZnVuY3Rpb24ob3V0LCBhLCBtKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXTtcbiAgICBvdXRbMF0gPSBtWzBdICogeCArIG1bMl0gKiB5O1xuICAgIG91dFsxXSA9IG1bMV0gKiB4ICsgbVszXSAqIHk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjMiB3aXRoIGEgbWF0MmRcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge21hdDJkfSBtIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLnRyYW5zZm9ybU1hdDJkID0gZnVuY3Rpb24ob3V0LCBhLCBtKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXTtcbiAgICBvdXRbMF0gPSBtWzBdICogeCArIG1bMl0gKiB5ICsgbVs0XTtcbiAgICBvdXRbMV0gPSBtWzFdICogeCArIG1bM10gKiB5ICsgbVs1XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMyIHdpdGggYSBtYXQzXG4gKiAzcmQgdmVjdG9yIGNvbXBvbmVudCBpcyBpbXBsaWNpdGx5ICcxJ1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7bWF0M30gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi50cmFuc2Zvcm1NYXQzID0gZnVuY3Rpb24ob3V0LCBhLCBtKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXTtcbiAgICBvdXRbMF0gPSBtWzBdICogeCArIG1bM10gKiB5ICsgbVs2XTtcbiAgICBvdXRbMV0gPSBtWzFdICogeCArIG1bNF0gKiB5ICsgbVs3XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMyIHdpdGggYSBtYXQ0XG4gKiAzcmQgdmVjdG9yIGNvbXBvbmVudCBpcyBpbXBsaWNpdGx5ICcwJ1xuICogNHRoIHZlY3RvciBjb21wb25lbnQgaXMgaW1wbGljaXRseSAnMSdcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge21hdDR9IG0gbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIudHJhbnNmb3JtTWF0NCA9IGZ1bmN0aW9uKG91dCwgYSwgbSkge1xuICAgIHZhciB4ID0gYVswXSwgXG4gICAgICAgIHkgPSBhWzFdO1xuICAgIG91dFswXSA9IG1bMF0gKiB4ICsgbVs0XSAqIHkgKyBtWzEyXTtcbiAgICBvdXRbMV0gPSBtWzFdICogeCArIG1bNV0gKiB5ICsgbVsxM107XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUGVyZm9ybSBzb21lIG9wZXJhdGlvbiBvdmVyIGFuIGFycmF5IG9mIHZlYzJzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGEgdGhlIGFycmF5IG9mIHZlY3RvcnMgdG8gaXRlcmF0ZSBvdmVyXG4gKiBAcGFyYW0ge051bWJlcn0gc3RyaWRlIE51bWJlciBvZiBlbGVtZW50cyBiZXR3ZWVuIHRoZSBzdGFydCBvZiBlYWNoIHZlYzIuIElmIDAgYXNzdW1lcyB0aWdodGx5IHBhY2tlZFxuICogQHBhcmFtIHtOdW1iZXJ9IG9mZnNldCBOdW1iZXIgb2YgZWxlbWVudHMgdG8gc2tpcCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBhcnJheVxuICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50IE51bWJlciBvZiB2ZWMycyB0byBpdGVyYXRlIG92ZXIuIElmIDAgaXRlcmF0ZXMgb3ZlciBlbnRpcmUgYXJyYXlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggdmVjdG9yIGluIHRoZSBhcnJheVxuICogQHBhcmFtIHtPYmplY3R9IFthcmddIGFkZGl0aW9uYWwgYXJndW1lbnQgdG8gcGFzcyB0byBmblxuICogQHJldHVybnMge0FycmF5fSBhXG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMi5mb3JFYWNoID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ZWMgPSB2ZWMyLmNyZWF0ZSgpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKGEsIHN0cmlkZSwgb2Zmc2V0LCBjb3VudCwgZm4sIGFyZykge1xuICAgICAgICB2YXIgaSwgbDtcbiAgICAgICAgaWYoIXN0cmlkZSkge1xuICAgICAgICAgICAgc3RyaWRlID0gMjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFvZmZzZXQpIHtcbiAgICAgICAgICAgIG9mZnNldCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKGNvdW50KSB7XG4gICAgICAgICAgICBsID0gTWF0aC5taW4oKGNvdW50ICogc3RyaWRlKSArIG9mZnNldCwgYS5sZW5ndGgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbCA9IGEubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGkgPSBvZmZzZXQ7IGkgPCBsOyBpICs9IHN0cmlkZSkge1xuICAgICAgICAgICAgdmVjWzBdID0gYVtpXTsgdmVjWzFdID0gYVtpKzFdO1xuICAgICAgICAgICAgZm4odmVjLCB2ZWMsIGFyZyk7XG4gICAgICAgICAgICBhW2ldID0gdmVjWzBdOyBhW2krMV0gPSB2ZWNbMV07XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBhO1xuICAgIH07XG59KSgpO1xuXG4vKipcbiAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IHZlYyB2ZWN0b3IgdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxuICovXG52ZWMyLnN0ciA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuICd2ZWMyKCcgKyBhWzBdICsgJywgJyArIGFbMV0gKyAnKSc7XG59O1xuXG5pZih0eXBlb2YoZXhwb3J0cykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZXhwb3J0cy52ZWMyID0gdmVjMjtcbn1cbjtcbi8qIENvcHlyaWdodCAoYykgMjAxMywgQnJhbmRvbiBKb25lcywgQ29saW4gTWFjS2VuemllIElWLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuXG5SZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXQgbW9kaWZpY2F0aW9uLFxuYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuXG4gICogUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzXG4gICAgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gICogUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb24gXG4gICAgYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG5cblRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiIEFORFxuQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbldBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkUgXG5ESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIEhPTERFUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUlxuQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTXG4oSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7XG5MT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT05cbkFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUXG4oSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJU1xuU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuICovXG5cbi8qKlxuICogQGNsYXNzIDMgRGltZW5zaW9uYWwgVmVjdG9yXG4gKiBAbmFtZSB2ZWMzXG4gKi9cblxudmFyIHZlYzMgPSB7fTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3LCBlbXB0eSB2ZWMzXG4gKlxuICogQHJldHVybnMge3ZlYzN9IGEgbmV3IDNEIHZlY3RvclxuICovXG52ZWMzLmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvdXQgPSBuZXcgR0xNQVRfQVJSQVlfVFlQRSgzKTtcbiAgICBvdXRbMF0gPSAwO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHZlYzMgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdmVjdG9yIHRvIGNsb25lXG4gKiBAcmV0dXJucyB7dmVjM30gYSBuZXcgM0QgdmVjdG9yXG4gKi9cbnZlYzMuY2xvbmUgPSBmdW5jdGlvbihhKSB7XG4gICAgdmFyIG91dCA9IG5ldyBHTE1BVF9BUlJBWV9UWVBFKDMpO1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgdmVjMyBpbml0aWFsaXplZCB3aXRoIHRoZSBnaXZlbiB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0geCBYIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB6IFogY29tcG9uZW50XG4gKiBAcmV0dXJucyB7dmVjM30gYSBuZXcgM0QgdmVjdG9yXG4gKi9cbnZlYzMuZnJvbVZhbHVlcyA9IGZ1bmN0aW9uKHgsIHksIHopIHtcbiAgICB2YXIgb3V0ID0gbmV3IEdMTUFUX0FSUkFZX1RZUEUoMyk7XG4gICAgb3V0WzBdID0geDtcbiAgICBvdXRbMV0gPSB5O1xuICAgIG91dFsyXSA9IHo7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIHZlYzMgdG8gYW5vdGhlclxuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIHNvdXJjZSB2ZWN0b3JcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5jb3B5ID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMyB0byB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5zZXQgPSBmdW5jdGlvbihvdXQsIHgsIHksIHopIHtcbiAgICBvdXRbMF0gPSB4O1xuICAgIG91dFsxXSA9IHk7XG4gICAgb3V0WzJdID0gejtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBZGRzIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMuYWRkID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSArIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSArIGJbMV07XG4gICAgb3V0WzJdID0gYVsyXSArIGJbMl07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU3VidHJhY3RzIHZlY3RvciBiIGZyb20gdmVjdG9yIGFcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMuc3VidHJhY3QgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdIC0gYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdIC0gYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdIC0gYlsyXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzMuc3VidHJhY3R9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMy5zdWIgPSB2ZWMzLnN1YnRyYWN0O1xuXG4vKipcbiAqIE11bHRpcGxpZXMgdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5tdWx0aXBseSA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKiBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gKiBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gKiBiWzJdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMy5tdWx0aXBseX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMzLm11bCA9IHZlYzMubXVsdGlwbHk7XG5cbi8qKlxuICogRGl2aWRlcyB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLmRpdmlkZSA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gLyBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gLyBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gLyBiWzJdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMy5kaXZpZGV9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMy5kaXYgPSB2ZWMzLmRpdmlkZTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtaW5pbXVtIG9mIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMubWluID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gTWF0aC5taW4oYVswXSwgYlswXSk7XG4gICAgb3V0WzFdID0gTWF0aC5taW4oYVsxXSwgYlsxXSk7XG4gICAgb3V0WzJdID0gTWF0aC5taW4oYVsyXSwgYlsyXSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbWF4aW11bSBvZiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLm1heCA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IE1hdGgubWF4KGFbMF0sIGJbMF0pO1xuICAgIG91dFsxXSA9IE1hdGgubWF4KGFbMV0sIGJbMV0pO1xuICAgIG91dFsyXSA9IE1hdGgubWF4KGFbMl0sIGJbMl0pO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFNjYWxlcyBhIHZlYzMgYnkgYSBzY2FsYXIgbnVtYmVyXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgdmVjdG9yIHRvIHNjYWxlXG4gKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIHZlY3RvciBieVxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLnNjYWxlID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAqIGI7XG4gICAgb3V0WzFdID0gYVsxXSAqIGI7XG4gICAgb3V0WzJdID0gYVsyXSAqIGI7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWRkcyB0d28gdmVjMydzIGFmdGVyIHNjYWxpbmcgdGhlIHNlY29uZCBvcGVyYW5kIGJ5IGEgc2NhbGFyIHZhbHVlXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxlIHRoZSBhbW91bnQgdG8gc2NhbGUgYiBieSBiZWZvcmUgYWRkaW5nXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMuc2NhbGVBbmRBZGQgPSBmdW5jdGlvbihvdXQsIGEsIGIsIHNjYWxlKSB7XG4gICAgb3V0WzBdID0gYVswXSArIChiWzBdICogc2NhbGUpO1xuICAgIG91dFsxXSA9IGFbMV0gKyAoYlsxXSAqIHNjYWxlKTtcbiAgICBvdXRbMl0gPSBhWzJdICsgKGJbMl0gKiBzY2FsZSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gZGlzdGFuY2UgYmV0d2VlbiBhIGFuZCBiXG4gKi9cbnZlYzMuZGlzdGFuY2UgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIHggPSBiWzBdIC0gYVswXSxcbiAgICAgICAgeSA9IGJbMV0gLSBhWzFdLFxuICAgICAgICB6ID0gYlsyXSAtIGFbMl07XG4gICAgcmV0dXJuIE1hdGguc3FydCh4KnggKyB5KnkgKyB6KnopO1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzMuZGlzdGFuY2V9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMy5kaXN0ID0gdmVjMy5kaXN0YW5jZTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgZGlzdGFuY2UgYmV0d2VlbiBhIGFuZCBiXG4gKi9cbnZlYzMuc3F1YXJlZERpc3RhbmNlID0gZnVuY3Rpb24oYSwgYikge1xuICAgIHZhciB4ID0gYlswXSAtIGFbMF0sXG4gICAgICAgIHkgPSBiWzFdIC0gYVsxXSxcbiAgICAgICAgeiA9IGJbMl0gLSBhWzJdO1xuICAgIHJldHVybiB4KnggKyB5KnkgKyB6Kno7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMy5zcXVhcmVkRGlzdGFuY2V9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMy5zcXJEaXN0ID0gdmVjMy5zcXVhcmVkRGlzdGFuY2U7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIGEgdmVjM1xuICpcbiAqIEBwYXJhbSB7dmVjM30gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIGxlbmd0aCBvZlxuICogQHJldHVybnMge051bWJlcn0gbGVuZ3RoIG9mIGFcbiAqL1xudmVjMy5sZW5ndGggPSBmdW5jdGlvbiAoYSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV0sXG4gICAgICAgIHogPSBhWzJdO1xuICAgIHJldHVybiBNYXRoLnNxcnQoeCp4ICsgeSp5ICsgeip6KTtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLmxlbmd0aH1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMzLmxlbiA9IHZlYzMubGVuZ3RoO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIGEgdmVjM1xuICpcbiAqIEBwYXJhbSB7dmVjM30gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIHNxdWFyZWQgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGxlbmd0aCBvZiBhXG4gKi9cbnZlYzMuc3F1YXJlZExlbmd0aCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXSxcbiAgICAgICAgeiA9IGFbMl07XG4gICAgcmV0dXJuIHgqeCArIHkqeSArIHoqejtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLnNxdWFyZWRMZW5ndGh9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMy5zcXJMZW4gPSB2ZWMzLnNxdWFyZWRMZW5ndGg7XG5cbi8qKlxuICogTmVnYXRlcyB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzNcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHZlY3RvciB0byBuZWdhdGVcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5uZWdhdGUgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSAtYVswXTtcbiAgICBvdXRbMV0gPSAtYVsxXTtcbiAgICBvdXRbMl0gPSAtYVsyXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBOb3JtYWxpemUgYSB2ZWMzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB2ZWN0b3IgdG8gbm9ybWFsaXplXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMubm9ybWFsaXplID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXSxcbiAgICAgICAgeiA9IGFbMl07XG4gICAgdmFyIGxlbiA9IHgqeCArIHkqeSArIHoqejtcbiAgICBpZiAobGVuID4gMCkge1xuICAgICAgICAvL1RPRE86IGV2YWx1YXRlIHVzZSBvZiBnbG1faW52c3FydCBoZXJlP1xuICAgICAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbik7XG4gICAgICAgIG91dFswXSA9IGFbMF0gKiBsZW47XG4gICAgICAgIG91dFsxXSA9IGFbMV0gKiBsZW47XG4gICAgICAgIG91dFsyXSA9IGFbMl0gKiBsZW47XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRvdCBwcm9kdWN0IG9mIGEgYW5kIGJcbiAqL1xudmVjMy5kb3QgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBhWzBdICogYlswXSArIGFbMV0gKiBiWzFdICsgYVsyXSAqIGJbMl07XG59O1xuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBjcm9zcyBwcm9kdWN0IG9mIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMuY3Jvc3MgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICB2YXIgYXggPSBhWzBdLCBheSA9IGFbMV0sIGF6ID0gYVsyXSxcbiAgICAgICAgYnggPSBiWzBdLCBieSA9IGJbMV0sIGJ6ID0gYlsyXTtcblxuICAgIG91dFswXSA9IGF5ICogYnogLSBheiAqIGJ5O1xuICAgIG91dFsxXSA9IGF6ICogYnggLSBheCAqIGJ6O1xuICAgIG91dFsyXSA9IGF4ICogYnkgLSBheSAqIGJ4O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLmxlcnAgPSBmdW5jdGlvbiAob3V0LCBhLCBiLCB0KSB7XG4gICAgdmFyIGF4ID0gYVswXSxcbiAgICAgICAgYXkgPSBhWzFdLFxuICAgICAgICBheiA9IGFbMl07XG4gICAgb3V0WzBdID0gYXggKyB0ICogKGJbMF0gLSBheCk7XG4gICAgb3V0WzFdID0gYXkgKyB0ICogKGJbMV0gLSBheSk7XG4gICAgb3V0WzJdID0gYXogKyB0ICogKGJbMl0gLSBheik7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgcmFuZG9tIHZlY3RvciB3aXRoIHRoZSBnaXZlbiBzY2FsZVxuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge051bWJlcn0gW3NjYWxlXSBMZW5ndGggb2YgdGhlIHJlc3VsdGluZyB2ZWN0b3IuIElmIG9tbWl0dGVkLCBhIHVuaXQgdmVjdG9yIHdpbGwgYmUgcmV0dXJuZWRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5yYW5kb20gPSBmdW5jdGlvbiAob3V0LCBzY2FsZSkge1xuICAgIHNjYWxlID0gc2NhbGUgfHwgMS4wO1xuXG4gICAgdmFyIHIgPSBHTE1BVF9SQU5ET00oKSAqIDIuMCAqIE1hdGguUEk7XG4gICAgdmFyIHogPSAoR0xNQVRfUkFORE9NKCkgKiAyLjApIC0gMS4wO1xuICAgIHZhciB6U2NhbGUgPSBNYXRoLnNxcnQoMS4wLXoqeikgKiBzY2FsZTtcblxuICAgIG91dFswXSA9IE1hdGguY29zKHIpICogelNjYWxlO1xuICAgIG91dFsxXSA9IE1hdGguc2luKHIpICogelNjYWxlO1xuICAgIG91dFsyXSA9IHogKiBzY2FsZTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMzIHdpdGggYSBtYXQ0LlxuICogNHRoIHZlY3RvciBjb21wb25lbnQgaXMgaW1wbGljaXRseSAnMSdcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge21hdDR9IG0gbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMudHJhbnNmb3JtTWF0NCA9IGZ1bmN0aW9uKG91dCwgYSwgbSkge1xuICAgIHZhciB4ID0gYVswXSwgeSA9IGFbMV0sIHogPSBhWzJdO1xuICAgIG91dFswXSA9IG1bMF0gKiB4ICsgbVs0XSAqIHkgKyBtWzhdICogeiArIG1bMTJdO1xuICAgIG91dFsxXSA9IG1bMV0gKiB4ICsgbVs1XSAqIHkgKyBtWzldICogeiArIG1bMTNdO1xuICAgIG91dFsyXSA9IG1bMl0gKiB4ICsgbVs2XSAqIHkgKyBtWzEwXSAqIHogKyBtWzE0XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMzIHdpdGggYSBtYXQzLlxuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7bWF0NH0gbSB0aGUgM3gzIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLnRyYW5zZm9ybU1hdDMgPSBmdW5jdGlvbihvdXQsIGEsIG0pIHtcbiAgICB2YXIgeCA9IGFbMF0sIHkgPSBhWzFdLCB6ID0gYVsyXTtcbiAgICBvdXRbMF0gPSB4ICogbVswXSArIHkgKiBtWzNdICsgeiAqIG1bNl07XG4gICAgb3V0WzFdID0geCAqIG1bMV0gKyB5ICogbVs0XSArIHogKiBtWzddO1xuICAgIG91dFsyXSA9IHggKiBtWzJdICsgeSAqIG1bNV0gKyB6ICogbVs4XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMzIHdpdGggYSBxdWF0XG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIHtxdWF0fSBxIHF1YXRlcm5pb24gdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy50cmFuc2Zvcm1RdWF0ID0gZnVuY3Rpb24ob3V0LCBhLCBxKSB7XG4gICAgLy8gYmVuY2htYXJrczogaHR0cDovL2pzcGVyZi5jb20vcXVhdGVybmlvbi10cmFuc2Zvcm0tdmVjMy1pbXBsZW1lbnRhdGlvbnNcblxuICAgIHZhciB4ID0gYVswXSwgeSA9IGFbMV0sIHogPSBhWzJdLFxuICAgICAgICBxeCA9IHFbMF0sIHF5ID0gcVsxXSwgcXogPSBxWzJdLCBxdyA9IHFbM10sXG5cbiAgICAgICAgLy8gY2FsY3VsYXRlIHF1YXQgKiB2ZWNcbiAgICAgICAgaXggPSBxdyAqIHggKyBxeSAqIHogLSBxeiAqIHksXG4gICAgICAgIGl5ID0gcXcgKiB5ICsgcXogKiB4IC0gcXggKiB6LFxuICAgICAgICBpeiA9IHF3ICogeiArIHF4ICogeSAtIHF5ICogeCxcbiAgICAgICAgaXcgPSAtcXggKiB4IC0gcXkgKiB5IC0gcXogKiB6O1xuXG4gICAgLy8gY2FsY3VsYXRlIHJlc3VsdCAqIGludmVyc2UgcXVhdFxuICAgIG91dFswXSA9IGl4ICogcXcgKyBpdyAqIC1xeCArIGl5ICogLXF6IC0gaXogKiAtcXk7XG4gICAgb3V0WzFdID0gaXkgKiBxdyArIGl3ICogLXF5ICsgaXogKiAtcXggLSBpeCAqIC1xejtcbiAgICBvdXRbMl0gPSBpeiAqIHF3ICsgaXcgKiAtcXogKyBpeCAqIC1xeSAtIGl5ICogLXF4O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKlxuKiBSb3RhdGUgYSAzRCB2ZWN0b3IgYXJvdW5kIHRoZSB4LWF4aXNcbiogQHBhcmFtIHt2ZWMzfSBvdXQgVGhlIHJlY2VpdmluZyB2ZWMzXG4qIEBwYXJhbSB7dmVjM30gYSBUaGUgdmVjMyBwb2ludCB0byByb3RhdGVcbiogQHBhcmFtIHt2ZWMzfSBiIFRoZSBvcmlnaW4gb2YgdGhlIHJvdGF0aW9uXG4qIEBwYXJhbSB7TnVtYmVyfSBjIFRoZSBhbmdsZSBvZiByb3RhdGlvblxuKiBAcmV0dXJucyB7dmVjM30gb3V0XG4qL1xudmVjMy5yb3RhdGVYID0gZnVuY3Rpb24ob3V0LCBhLCBiLCBjKXtcbiAgIHZhciBwID0gW10sIHI9W107XG5cdCAgLy9UcmFuc2xhdGUgcG9pbnQgdG8gdGhlIG9yaWdpblxuXHQgIHBbMF0gPSBhWzBdIC0gYlswXTtcblx0ICBwWzFdID0gYVsxXSAtIGJbMV07XG4gIFx0cFsyXSA9IGFbMl0gLSBiWzJdO1xuXG5cdCAgLy9wZXJmb3JtIHJvdGF0aW9uXG5cdCAgclswXSA9IHBbMF07XG5cdCAgclsxXSA9IHBbMV0qTWF0aC5jb3MoYykgLSBwWzJdKk1hdGguc2luKGMpO1xuXHQgIHJbMl0gPSBwWzFdKk1hdGguc2luKGMpICsgcFsyXSpNYXRoLmNvcyhjKTtcblxuXHQgIC8vdHJhbnNsYXRlIHRvIGNvcnJlY3QgcG9zaXRpb25cblx0ICBvdXRbMF0gPSByWzBdICsgYlswXTtcblx0ICBvdXRbMV0gPSByWzFdICsgYlsxXTtcblx0ICBvdXRbMl0gPSByWzJdICsgYlsyXTtcblxuICBcdHJldHVybiBvdXQ7XG59O1xuXG4vKlxuKiBSb3RhdGUgYSAzRCB2ZWN0b3IgYXJvdW5kIHRoZSB5LWF4aXNcbiogQHBhcmFtIHt2ZWMzfSBvdXQgVGhlIHJlY2VpdmluZyB2ZWMzXG4qIEBwYXJhbSB7dmVjM30gYSBUaGUgdmVjMyBwb2ludCB0byByb3RhdGVcbiogQHBhcmFtIHt2ZWMzfSBiIFRoZSBvcmlnaW4gb2YgdGhlIHJvdGF0aW9uXG4qIEBwYXJhbSB7TnVtYmVyfSBjIFRoZSBhbmdsZSBvZiByb3RhdGlvblxuKiBAcmV0dXJucyB7dmVjM30gb3V0XG4qL1xudmVjMy5yb3RhdGVZID0gZnVuY3Rpb24ob3V0LCBhLCBiLCBjKXtcbiAgXHR2YXIgcCA9IFtdLCByPVtdO1xuICBcdC8vVHJhbnNsYXRlIHBvaW50IHRvIHRoZSBvcmlnaW5cbiAgXHRwWzBdID0gYVswXSAtIGJbMF07XG4gIFx0cFsxXSA9IGFbMV0gLSBiWzFdO1xuICBcdHBbMl0gPSBhWzJdIC0gYlsyXTtcbiAgXG4gIFx0Ly9wZXJmb3JtIHJvdGF0aW9uXG4gIFx0clswXSA9IHBbMl0qTWF0aC5zaW4oYykgKyBwWzBdKk1hdGguY29zKGMpO1xuICBcdHJbMV0gPSBwWzFdO1xuICBcdHJbMl0gPSBwWzJdKk1hdGguY29zKGMpIC0gcFswXSpNYXRoLnNpbihjKTtcbiAgXG4gIFx0Ly90cmFuc2xhdGUgdG8gY29ycmVjdCBwb3NpdGlvblxuICBcdG91dFswXSA9IHJbMF0gKyBiWzBdO1xuICBcdG91dFsxXSA9IHJbMV0gKyBiWzFdO1xuICBcdG91dFsyXSA9IHJbMl0gKyBiWzJdO1xuICBcbiAgXHRyZXR1cm4gb3V0O1xufTtcblxuLypcbiogUm90YXRlIGEgM0QgdmVjdG9yIGFyb3VuZCB0aGUgei1heGlzXG4qIEBwYXJhbSB7dmVjM30gb3V0IFRoZSByZWNlaXZpbmcgdmVjM1xuKiBAcGFyYW0ge3ZlYzN9IGEgVGhlIHZlYzMgcG9pbnQgdG8gcm90YXRlXG4qIEBwYXJhbSB7dmVjM30gYiBUaGUgb3JpZ2luIG9mIHRoZSByb3RhdGlvblxuKiBAcGFyYW0ge051bWJlcn0gYyBUaGUgYW5nbGUgb2Ygcm90YXRpb25cbiogQHJldHVybnMge3ZlYzN9IG91dFxuKi9cbnZlYzMucm90YXRlWiA9IGZ1bmN0aW9uKG91dCwgYSwgYiwgYyl7XG4gIFx0dmFyIHAgPSBbXSwgcj1bXTtcbiAgXHQvL1RyYW5zbGF0ZSBwb2ludCB0byB0aGUgb3JpZ2luXG4gIFx0cFswXSA9IGFbMF0gLSBiWzBdO1xuICBcdHBbMV0gPSBhWzFdIC0gYlsxXTtcbiAgXHRwWzJdID0gYVsyXSAtIGJbMl07XG4gIFxuICBcdC8vcGVyZm9ybSByb3RhdGlvblxuICBcdHJbMF0gPSBwWzBdKk1hdGguY29zKGMpIC0gcFsxXSpNYXRoLnNpbihjKTtcbiAgXHRyWzFdID0gcFswXSpNYXRoLnNpbihjKSArIHBbMV0qTWF0aC5jb3MoYyk7XG4gIFx0clsyXSA9IHBbMl07XG4gIFxuICBcdC8vdHJhbnNsYXRlIHRvIGNvcnJlY3QgcG9zaXRpb25cbiAgXHRvdXRbMF0gPSByWzBdICsgYlswXTtcbiAgXHRvdXRbMV0gPSByWzFdICsgYlsxXTtcbiAgXHRvdXRbMl0gPSByWzJdICsgYlsyXTtcbiAgXG4gIFx0cmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUGVyZm9ybSBzb21lIG9wZXJhdGlvbiBvdmVyIGFuIGFycmF5IG9mIHZlYzNzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGEgdGhlIGFycmF5IG9mIHZlY3RvcnMgdG8gaXRlcmF0ZSBvdmVyXG4gKiBAcGFyYW0ge051bWJlcn0gc3RyaWRlIE51bWJlciBvZiBlbGVtZW50cyBiZXR3ZWVuIHRoZSBzdGFydCBvZiBlYWNoIHZlYzMuIElmIDAgYXNzdW1lcyB0aWdodGx5IHBhY2tlZFxuICogQHBhcmFtIHtOdW1iZXJ9IG9mZnNldCBOdW1iZXIgb2YgZWxlbWVudHMgdG8gc2tpcCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBhcnJheVxuICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50IE51bWJlciBvZiB2ZWMzcyB0byBpdGVyYXRlIG92ZXIuIElmIDAgaXRlcmF0ZXMgb3ZlciBlbnRpcmUgYXJyYXlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggdmVjdG9yIGluIHRoZSBhcnJheVxuICogQHBhcmFtIHtPYmplY3R9IFthcmddIGFkZGl0aW9uYWwgYXJndW1lbnQgdG8gcGFzcyB0byBmblxuICogQHJldHVybnMge0FycmF5fSBhXG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMy5mb3JFYWNoID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ZWMgPSB2ZWMzLmNyZWF0ZSgpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKGEsIHN0cmlkZSwgb2Zmc2V0LCBjb3VudCwgZm4sIGFyZykge1xuICAgICAgICB2YXIgaSwgbDtcbiAgICAgICAgaWYoIXN0cmlkZSkge1xuICAgICAgICAgICAgc3RyaWRlID0gMztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFvZmZzZXQpIHtcbiAgICAgICAgICAgIG9mZnNldCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKGNvdW50KSB7XG4gICAgICAgICAgICBsID0gTWF0aC5taW4oKGNvdW50ICogc3RyaWRlKSArIG9mZnNldCwgYS5sZW5ndGgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbCA9IGEubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGkgPSBvZmZzZXQ7IGkgPCBsOyBpICs9IHN0cmlkZSkge1xuICAgICAgICAgICAgdmVjWzBdID0gYVtpXTsgdmVjWzFdID0gYVtpKzFdOyB2ZWNbMl0gPSBhW2krMl07XG4gICAgICAgICAgICBmbih2ZWMsIHZlYywgYXJnKTtcbiAgICAgICAgICAgIGFbaV0gPSB2ZWNbMF07IGFbaSsxXSA9IHZlY1sxXTsgYVtpKzJdID0gdmVjWzJdO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gYTtcbiAgICB9O1xufSkoKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgdmVjdG9yXG4gKlxuICogQHBhcmFtIHt2ZWMzfSB2ZWMgdmVjdG9yIHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xuICogQHJldHVybnMge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB2ZWN0b3JcbiAqL1xudmVjMy5zdHIgPSBmdW5jdGlvbiAoYSkge1xuICAgIHJldHVybiAndmVjMygnICsgYVswXSArICcsICcgKyBhWzFdICsgJywgJyArIGFbMl0gKyAnKSc7XG59O1xuXG5pZih0eXBlb2YoZXhwb3J0cykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZXhwb3J0cy52ZWMzID0gdmVjMztcbn1cbjtcbi8qIENvcHlyaWdodCAoYykgMjAxMywgQnJhbmRvbiBKb25lcywgQ29saW4gTWFjS2VuemllIElWLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuXG5SZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXQgbW9kaWZpY2F0aW9uLFxuYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuXG4gICogUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzXG4gICAgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gICogUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb24gXG4gICAgYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG5cblRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiIEFORFxuQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbldBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkUgXG5ESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIEhPTERFUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUlxuQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTXG4oSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7XG5MT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT05cbkFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUXG4oSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJU1xuU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuICovXG5cbi8qKlxuICogQGNsYXNzIDQgRGltZW5zaW9uYWwgVmVjdG9yXG4gKiBAbmFtZSB2ZWM0XG4gKi9cblxudmFyIHZlYzQgPSB7fTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3LCBlbXB0eSB2ZWM0XG4gKlxuICogQHJldHVybnMge3ZlYzR9IGEgbmV3IDREIHZlY3RvclxuICovXG52ZWM0LmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvdXQgPSBuZXcgR0xNQVRfQVJSQVlfVFlQRSg0KTtcbiAgICBvdXRbMF0gPSAwO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgdmVjNCBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIHZlY3RvclxuICpcbiAqIEBwYXJhbSB7dmVjNH0gYSB2ZWN0b3IgdG8gY2xvbmVcbiAqIEByZXR1cm5zIHt2ZWM0fSBhIG5ldyA0RCB2ZWN0b3JcbiAqL1xudmVjNC5jbG9uZSA9IGZ1bmN0aW9uKGEpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEdMTUFUX0FSUkFZX1RZUEUoNCk7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHZlYzQgaW5pdGlhbGl6ZWQgd2l0aCB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geiBaIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHcgVyBjb21wb25lbnRcbiAqIEByZXR1cm5zIHt2ZWM0fSBhIG5ldyA0RCB2ZWN0b3JcbiAqL1xudmVjNC5mcm9tVmFsdWVzID0gZnVuY3Rpb24oeCwgeSwgeiwgdykge1xuICAgIHZhciBvdXQgPSBuZXcgR0xNQVRfQVJSQVlfVFlQRSg0KTtcbiAgICBvdXRbMF0gPSB4O1xuICAgIG91dFsxXSA9IHk7XG4gICAgb3V0WzJdID0gejtcbiAgICBvdXRbM10gPSB3O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSB2ZWM0IHRvIGFub3RoZXJcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBzb3VyY2UgdmVjdG9yXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQuY29weSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgdmVjNCB0byB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB3IFcgY29tcG9uZW50XG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQuc2V0ID0gZnVuY3Rpb24ob3V0LCB4LCB5LCB6LCB3KSB7XG4gICAgb3V0WzBdID0geDtcbiAgICBvdXRbMV0gPSB5O1xuICAgIG91dFsyXSA9IHo7XG4gICAgb3V0WzNdID0gdztcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBZGRzIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQuYWRkID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSArIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSArIGJbMV07XG4gICAgb3V0WzJdID0gYVsyXSArIGJbMl07XG4gICAgb3V0WzNdID0gYVszXSArIGJbM107XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU3VidHJhY3RzIHZlY3RvciBiIGZyb20gdmVjdG9yIGFcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQuc3VidHJhY3QgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdIC0gYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdIC0gYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdIC0gYlsyXTtcbiAgICBvdXRbM10gPSBhWzNdIC0gYlszXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzQuc3VidHJhY3R9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjNC5zdWIgPSB2ZWM0LnN1YnRyYWN0O1xuXG4vKipcbiAqIE11bHRpcGxpZXMgdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC5tdWx0aXBseSA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKiBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gKiBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gKiBiWzJdO1xuICAgIG91dFszXSA9IGFbM10gKiBiWzNdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5tdWx0aXBseX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWM0Lm11bCA9IHZlYzQubXVsdGlwbHk7XG5cbi8qKlxuICogRGl2aWRlcyB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0LmRpdmlkZSA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gLyBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gLyBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gLyBiWzJdO1xuICAgIG91dFszXSA9IGFbM10gLyBiWzNdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5kaXZpZGV9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjNC5kaXYgPSB2ZWM0LmRpdmlkZTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtaW5pbXVtIG9mIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQubWluID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gTWF0aC5taW4oYVswXSwgYlswXSk7XG4gICAgb3V0WzFdID0gTWF0aC5taW4oYVsxXSwgYlsxXSk7XG4gICAgb3V0WzJdID0gTWF0aC5taW4oYVsyXSwgYlsyXSk7XG4gICAgb3V0WzNdID0gTWF0aC5taW4oYVszXSwgYlszXSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbWF4aW11bSBvZiB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0Lm1heCA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IE1hdGgubWF4KGFbMF0sIGJbMF0pO1xuICAgIG91dFsxXSA9IE1hdGgubWF4KGFbMV0sIGJbMV0pO1xuICAgIG91dFsyXSA9IE1hdGgubWF4KGFbMl0sIGJbMl0pO1xuICAgIG91dFszXSA9IE1hdGgubWF4KGFbM10sIGJbM10pO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFNjYWxlcyBhIHZlYzQgYnkgYSBzY2FsYXIgbnVtYmVyXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgdmVjdG9yIHRvIHNjYWxlXG4gKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIHZlY3RvciBieVxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0LnNjYWxlID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAqIGI7XG4gICAgb3V0WzFdID0gYVsxXSAqIGI7XG4gICAgb3V0WzJdID0gYVsyXSAqIGI7XG4gICAgb3V0WzNdID0gYVszXSAqIGI7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWRkcyB0d28gdmVjNCdzIGFmdGVyIHNjYWxpbmcgdGhlIHNlY29uZCBvcGVyYW5kIGJ5IGEgc2NhbGFyIHZhbHVlXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxlIHRoZSBhbW91bnQgdG8gc2NhbGUgYiBieSBiZWZvcmUgYWRkaW5nXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQuc2NhbGVBbmRBZGQgPSBmdW5jdGlvbihvdXQsIGEsIGIsIHNjYWxlKSB7XG4gICAgb3V0WzBdID0gYVswXSArIChiWzBdICogc2NhbGUpO1xuICAgIG91dFsxXSA9IGFbMV0gKyAoYlsxXSAqIHNjYWxlKTtcbiAgICBvdXRbMl0gPSBhWzJdICsgKGJbMl0gKiBzY2FsZSk7XG4gICAgb3V0WzNdID0gYVszXSArIChiWzNdICogc2NhbGUpO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxuICovXG52ZWM0LmRpc3RhbmNlID0gZnVuY3Rpb24oYSwgYikge1xuICAgIHZhciB4ID0gYlswXSAtIGFbMF0sXG4gICAgICAgIHkgPSBiWzFdIC0gYVsxXSxcbiAgICAgICAgeiA9IGJbMl0gLSBhWzJdLFxuICAgICAgICB3ID0gYlszXSAtIGFbM107XG4gICAgcmV0dXJuIE1hdGguc3FydCh4KnggKyB5KnkgKyB6KnogKyB3KncpO1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzQuZGlzdGFuY2V9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjNC5kaXN0ID0gdmVjNC5kaXN0YW5jZTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgZGlzdGFuY2UgYmV0d2VlbiBhIGFuZCBiXG4gKi9cbnZlYzQuc3F1YXJlZERpc3RhbmNlID0gZnVuY3Rpb24oYSwgYikge1xuICAgIHZhciB4ID0gYlswXSAtIGFbMF0sXG4gICAgICAgIHkgPSBiWzFdIC0gYVsxXSxcbiAgICAgICAgeiA9IGJbMl0gLSBhWzJdLFxuICAgICAgICB3ID0gYlszXSAtIGFbM107XG4gICAgcmV0dXJuIHgqeCArIHkqeSArIHoqeiArIHcqdztcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWM0LnNxdWFyZWREaXN0YW5jZX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWM0LnNxckRpc3QgPSB2ZWM0LnNxdWFyZWREaXN0YW5jZTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgYSB2ZWM0XG4gKlxuICogQHBhcmFtIHt2ZWM0fSBhIHZlY3RvciB0byBjYWxjdWxhdGUgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBsZW5ndGggb2YgYVxuICovXG52ZWM0Lmxlbmd0aCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXSxcbiAgICAgICAgeiA9IGFbMl0sXG4gICAgICAgIHcgPSBhWzNdO1xuICAgIHJldHVybiBNYXRoLnNxcnQoeCp4ICsgeSp5ICsgeip6ICsgdyp3KTtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWM0Lmxlbmd0aH1cbiAqIEBmdW5jdGlvblxuICovXG52ZWM0LmxlbiA9IHZlYzQubGVuZ3RoO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIGEgdmVjNFxuICpcbiAqIEBwYXJhbSB7dmVjNH0gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIHNxdWFyZWQgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGxlbmd0aCBvZiBhXG4gKi9cbnZlYzQuc3F1YXJlZExlbmd0aCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXSxcbiAgICAgICAgeiA9IGFbMl0sXG4gICAgICAgIHcgPSBhWzNdO1xuICAgIHJldHVybiB4KnggKyB5KnkgKyB6KnogKyB3Knc7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5zcXVhcmVkTGVuZ3RofVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzQuc3FyTGVuID0gdmVjNC5zcXVhcmVkTGVuZ3RoO1xuXG4vKipcbiAqIE5lZ2F0ZXMgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWM0XG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB2ZWN0b3IgdG8gbmVnYXRlXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQubmVnYXRlID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gLWFbMF07XG4gICAgb3V0WzFdID0gLWFbMV07XG4gICAgb3V0WzJdID0gLWFbMl07XG4gICAgb3V0WzNdID0gLWFbM107XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogTm9ybWFsaXplIGEgdmVjNFxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdmVjdG9yIHRvIG5vcm1hbGl6ZVxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0Lm5vcm1hbGl6ZSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV0sXG4gICAgICAgIHogPSBhWzJdLFxuICAgICAgICB3ID0gYVszXTtcbiAgICB2YXIgbGVuID0geCp4ICsgeSp5ICsgeip6ICsgdyp3O1xuICAgIGlmIChsZW4gPiAwKSB7XG4gICAgICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKTtcbiAgICAgICAgb3V0WzBdID0gYVswXSAqIGxlbjtcbiAgICAgICAgb3V0WzFdID0gYVsxXSAqIGxlbjtcbiAgICAgICAgb3V0WzJdID0gYVsyXSAqIGxlbjtcbiAgICAgICAgb3V0WzNdID0gYVszXSAqIGxlbjtcbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3Qgb2YgdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gZG90IHByb2R1Y3Qgb2YgYSBhbmQgYlxuICovXG52ZWM0LmRvdCA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGFbMF0gKiBiWzBdICsgYVsxXSAqIGJbMV0gKyBhWzJdICogYlsyXSArIGFbM10gKiBiWzNdO1xufTtcblxuLyoqXG4gKiBQZXJmb3JtcyBhIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IGludGVycG9sYXRpb24gYW1vdW50IGJldHdlZW4gdGhlIHR3byBpbnB1dHNcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC5sZXJwID0gZnVuY3Rpb24gKG91dCwgYSwgYiwgdCkge1xuICAgIHZhciBheCA9IGFbMF0sXG4gICAgICAgIGF5ID0gYVsxXSxcbiAgICAgICAgYXogPSBhWzJdLFxuICAgICAgICBhdyA9IGFbM107XG4gICAgb3V0WzBdID0gYXggKyB0ICogKGJbMF0gLSBheCk7XG4gICAgb3V0WzFdID0gYXkgKyB0ICogKGJbMV0gLSBheSk7XG4gICAgb3V0WzJdID0gYXogKyB0ICogKGJbMl0gLSBheik7XG4gICAgb3V0WzNdID0gYXcgKyB0ICogKGJbM10gLSBhdyk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgcmFuZG9tIHZlY3RvciB3aXRoIHRoZSBnaXZlbiBzY2FsZVxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge051bWJlcn0gW3NjYWxlXSBMZW5ndGggb2YgdGhlIHJlc3VsdGluZyB2ZWN0b3IuIElmIG9tbWl0dGVkLCBhIHVuaXQgdmVjdG9yIHdpbGwgYmUgcmV0dXJuZWRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC5yYW5kb20gPSBmdW5jdGlvbiAob3V0LCBzY2FsZSkge1xuICAgIHNjYWxlID0gc2NhbGUgfHwgMS4wO1xuXG4gICAgLy9UT0RPOiBUaGlzIGlzIGEgcHJldHR5IGF3ZnVsIHdheSBvZiBkb2luZyB0aGlzLiBGaW5kIHNvbWV0aGluZyBiZXR0ZXIuXG4gICAgb3V0WzBdID0gR0xNQVRfUkFORE9NKCk7XG4gICAgb3V0WzFdID0gR0xNQVRfUkFORE9NKCk7XG4gICAgb3V0WzJdID0gR0xNQVRfUkFORE9NKCk7XG4gICAgb3V0WzNdID0gR0xNQVRfUkFORE9NKCk7XG4gICAgdmVjNC5ub3JtYWxpemUob3V0LCBvdXQpO1xuICAgIHZlYzQuc2NhbGUob3V0LCBvdXQsIHNjYWxlKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWM0IHdpdGggYSBtYXQ0LlxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7bWF0NH0gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC50cmFuc2Zvcm1NYXQ0ID0gZnVuY3Rpb24ob3V0LCBhLCBtKSB7XG4gICAgdmFyIHggPSBhWzBdLCB5ID0gYVsxXSwgeiA9IGFbMl0sIHcgPSBhWzNdO1xuICAgIG91dFswXSA9IG1bMF0gKiB4ICsgbVs0XSAqIHkgKyBtWzhdICogeiArIG1bMTJdICogdztcbiAgICBvdXRbMV0gPSBtWzFdICogeCArIG1bNV0gKiB5ICsgbVs5XSAqIHogKyBtWzEzXSAqIHc7XG4gICAgb3V0WzJdID0gbVsyXSAqIHggKyBtWzZdICogeSArIG1bMTBdICogeiArIG1bMTRdICogdztcbiAgICBvdXRbM10gPSBtWzNdICogeCArIG1bN10gKiB5ICsgbVsxMV0gKiB6ICsgbVsxNV0gKiB3O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzQgd2l0aCBhIHF1YXRcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge3F1YXR9IHEgcXVhdGVybmlvbiB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0LnRyYW5zZm9ybVF1YXQgPSBmdW5jdGlvbihvdXQsIGEsIHEpIHtcbiAgICB2YXIgeCA9IGFbMF0sIHkgPSBhWzFdLCB6ID0gYVsyXSxcbiAgICAgICAgcXggPSBxWzBdLCBxeSA9IHFbMV0sIHF6ID0gcVsyXSwgcXcgPSBxWzNdLFxuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSBxdWF0ICogdmVjXG4gICAgICAgIGl4ID0gcXcgKiB4ICsgcXkgKiB6IC0gcXogKiB5LFxuICAgICAgICBpeSA9IHF3ICogeSArIHF6ICogeCAtIHF4ICogeixcbiAgICAgICAgaXogPSBxdyAqIHogKyBxeCAqIHkgLSBxeSAqIHgsXG4gICAgICAgIGl3ID0gLXF4ICogeCAtIHF5ICogeSAtIHF6ICogejtcblxuICAgIC8vIGNhbGN1bGF0ZSByZXN1bHQgKiBpbnZlcnNlIHF1YXRcbiAgICBvdXRbMF0gPSBpeCAqIHF3ICsgaXcgKiAtcXggKyBpeSAqIC1xeiAtIGl6ICogLXF5O1xuICAgIG91dFsxXSA9IGl5ICogcXcgKyBpdyAqIC1xeSArIGl6ICogLXF4IC0gaXggKiAtcXo7XG4gICAgb3V0WzJdID0gaXogKiBxdyArIGl3ICogLXF6ICsgaXggKiAtcXkgLSBpeSAqIC1xeDtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBQZXJmb3JtIHNvbWUgb3BlcmF0aW9uIG92ZXIgYW4gYXJyYXkgb2YgdmVjNHMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gYSB0aGUgYXJyYXkgb2YgdmVjdG9ycyB0byBpdGVyYXRlIG92ZXJcbiAqIEBwYXJhbSB7TnVtYmVyfSBzdHJpZGUgTnVtYmVyIG9mIGVsZW1lbnRzIGJldHdlZW4gdGhlIHN0YXJ0IG9mIGVhY2ggdmVjNC4gSWYgMCBhc3N1bWVzIHRpZ2h0bHkgcGFja2VkXG4gKiBAcGFyYW0ge051bWJlcn0gb2Zmc2V0IE51bWJlciBvZiBlbGVtZW50cyB0byBza2lwIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGFycmF5XG4gKiBAcGFyYW0ge051bWJlcn0gY291bnQgTnVtYmVyIG9mIHZlYzJzIHRvIGl0ZXJhdGUgb3Zlci4gSWYgMCBpdGVyYXRlcyBvdmVyIGVudGlyZSBhcnJheVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gRnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCB2ZWN0b3IgaW4gdGhlIGFycmF5XG4gKiBAcGFyYW0ge09iamVjdH0gW2FyZ10gYWRkaXRpb25hbCBhcmd1bWVudCB0byBwYXNzIHRvIGZuXG4gKiBAcmV0dXJucyB7QXJyYXl9IGFcbiAqIEBmdW5jdGlvblxuICovXG52ZWM0LmZvckVhY2ggPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIHZlYyA9IHZlYzQuY3JlYXRlKCk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24oYSwgc3RyaWRlLCBvZmZzZXQsIGNvdW50LCBmbiwgYXJnKSB7XG4gICAgICAgIHZhciBpLCBsO1xuICAgICAgICBpZighc3RyaWRlKSB7XG4gICAgICAgICAgICBzdHJpZGUgPSA0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIW9mZnNldCkge1xuICAgICAgICAgICAgb2Zmc2V0ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYoY291bnQpIHtcbiAgICAgICAgICAgIGwgPSBNYXRoLm1pbigoY291bnQgKiBzdHJpZGUpICsgb2Zmc2V0LCBhLmxlbmd0aCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsID0gYS5sZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IoaSA9IG9mZnNldDsgaSA8IGw7IGkgKz0gc3RyaWRlKSB7XG4gICAgICAgICAgICB2ZWNbMF0gPSBhW2ldOyB2ZWNbMV0gPSBhW2krMV07IHZlY1syXSA9IGFbaSsyXTsgdmVjWzNdID0gYVtpKzNdO1xuICAgICAgICAgICAgZm4odmVjLCB2ZWMsIGFyZyk7XG4gICAgICAgICAgICBhW2ldID0gdmVjWzBdOyBhW2krMV0gPSB2ZWNbMV07IGFbaSsyXSA9IHZlY1syXTsgYVtpKzNdID0gdmVjWzNdO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gYTtcbiAgICB9O1xufSkoKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgdmVjdG9yXG4gKlxuICogQHBhcmFtIHt2ZWM0fSB2ZWMgdmVjdG9yIHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xuICogQHJldHVybnMge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB2ZWN0b3JcbiAqL1xudmVjNC5zdHIgPSBmdW5jdGlvbiAoYSkge1xuICAgIHJldHVybiAndmVjNCgnICsgYVswXSArICcsICcgKyBhWzFdICsgJywgJyArIGFbMl0gKyAnLCAnICsgYVszXSArICcpJztcbn07XG5cbmlmKHR5cGVvZihleHBvcnRzKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBleHBvcnRzLnZlYzQgPSB2ZWM0O1xufVxuO1xuLyogQ29weXJpZ2h0IChjKSAyMDEzLCBCcmFuZG9uIEpvbmVzLCBDb2xpbiBNYWNLZW56aWUgSVYuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5cblJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dCBtb2RpZmljYXRpb24sXG5hcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbiAgICBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBcbiAgICBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cblxuVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EXG5BTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBcbkRJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SXG5BTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcbihJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUztcbkxPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTlxuQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcbihJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTXG5TT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS4gKi9cblxuLyoqXG4gKiBAY2xhc3MgMngyIE1hdHJpeFxuICogQG5hbWUgbWF0MlxuICovXG5cbnZhciBtYXQyID0ge307XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBpZGVudGl0eSBtYXQyXG4gKlxuICogQHJldHVybnMge21hdDJ9IGEgbmV3IDJ4MiBtYXRyaXhcbiAqL1xubWF0Mi5jcmVhdGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEdMTUFUX0FSUkFZX1RZUEUoNCk7XG4gICAgb3V0WzBdID0gMTtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IG1hdDIgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyBtYXRyaXhcbiAqXG4gKiBAcGFyYW0ge21hdDJ9IGEgbWF0cml4IHRvIGNsb25lXG4gKiBAcmV0dXJucyB7bWF0Mn0gYSBuZXcgMngyIG1hdHJpeFxuICovXG5tYXQyLmNsb25lID0gZnVuY3Rpb24oYSkge1xuICAgIHZhciBvdXQgPSBuZXcgR0xNQVRfQVJSQVlfVFlQRSg0KTtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSBtYXQyIHRvIGFub3RoZXJcbiAqXG4gKiBAcGFyYW0ge21hdDJ9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQyfSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0Mn0gb3V0XG4gKi9cbm1hdDIuY29weSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2V0IGEgbWF0MiB0byB0aGUgaWRlbnRpdHkgbWF0cml4XG4gKlxuICogQHBhcmFtIHttYXQyfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQyfSBvdXRcbiAqL1xubWF0Mi5pZGVudGl0eSA9IGZ1bmN0aW9uKG91dCkge1xuICAgIG91dFswXSA9IDE7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogVHJhbnNwb3NlIHRoZSB2YWx1ZXMgb2YgYSBtYXQyXG4gKlxuICogQHBhcmFtIHttYXQyfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0Mn0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDJ9IG91dFxuICovXG5tYXQyLnRyYW5zcG9zZSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIC8vIElmIHdlIGFyZSB0cmFuc3Bvc2luZyBvdXJzZWx2ZXMgd2UgY2FuIHNraXAgYSBmZXcgc3RlcHMgYnV0IGhhdmUgdG8gY2FjaGUgc29tZSB2YWx1ZXNcbiAgICBpZiAob3V0ID09PSBhKSB7XG4gICAgICAgIHZhciBhMSA9IGFbMV07XG4gICAgICAgIG91dFsxXSA9IGFbMl07XG4gICAgICAgIG91dFsyXSA9IGExO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG91dFswXSA9IGFbMF07XG4gICAgICAgIG91dFsxXSA9IGFbMl07XG4gICAgICAgIG91dFsyXSA9IGFbMV07XG4gICAgICAgIG91dFszXSA9IGFbM107XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEludmVydHMgYSBtYXQyXG4gKlxuICogQHBhcmFtIHttYXQyfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0Mn0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDJ9IG91dFxuICovXG5tYXQyLmludmVydCA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIHZhciBhMCA9IGFbMF0sIGExID0gYVsxXSwgYTIgPSBhWzJdLCBhMyA9IGFbM10sXG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxuICAgICAgICBkZXQgPSBhMCAqIGEzIC0gYTIgKiBhMTtcblxuICAgIGlmICghZGV0KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBkZXQgPSAxLjAgLyBkZXQ7XG4gICAgXG4gICAgb3V0WzBdID0gIGEzICogZGV0O1xuICAgIG91dFsxXSA9IC1hMSAqIGRldDtcbiAgICBvdXRbMl0gPSAtYTIgKiBkZXQ7XG4gICAgb3V0WzNdID0gIGEwICogZGV0O1xuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgYWRqdWdhdGUgb2YgYSBtYXQyXG4gKlxuICogQHBhcmFtIHttYXQyfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0Mn0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDJ9IG91dFxuICovXG5tYXQyLmFkam9pbnQgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICAvLyBDYWNoaW5nIHRoaXMgdmFsdWUgaXMgbmVzc2VjYXJ5IGlmIG91dCA9PSBhXG4gICAgdmFyIGEwID0gYVswXTtcbiAgICBvdXRbMF0gPSAgYVszXTtcbiAgICBvdXRbMV0gPSAtYVsxXTtcbiAgICBvdXRbMl0gPSAtYVsyXTtcbiAgICBvdXRbM10gPSAgYTA7XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkZXRlcm1pbmFudCBvZiBhIG1hdDJcbiAqXG4gKiBAcGFyYW0ge21hdDJ9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRldGVybWluYW50IG9mIGFcbiAqL1xubWF0Mi5kZXRlcm1pbmFudCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuIGFbMF0gKiBhWzNdIC0gYVsyXSAqIGFbMV07XG59O1xuXG4vKipcbiAqIE11bHRpcGxpZXMgdHdvIG1hdDInc1xuICpcbiAqIEBwYXJhbSB7bWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7bWF0Mn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHttYXQyfSBvdXRcbiAqL1xubWF0Mi5tdWx0aXBseSA9IGZ1bmN0aW9uIChvdXQsIGEsIGIpIHtcbiAgICB2YXIgYTAgPSBhWzBdLCBhMSA9IGFbMV0sIGEyID0gYVsyXSwgYTMgPSBhWzNdO1xuICAgIHZhciBiMCA9IGJbMF0sIGIxID0gYlsxXSwgYjIgPSBiWzJdLCBiMyA9IGJbM107XG4gICAgb3V0WzBdID0gYTAgKiBiMCArIGEyICogYjE7XG4gICAgb3V0WzFdID0gYTEgKiBiMCArIGEzICogYjE7XG4gICAgb3V0WzJdID0gYTAgKiBiMiArIGEyICogYjM7XG4gICAgb3V0WzNdID0gYTEgKiBiMiArIGEzICogYjM7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayBtYXQyLm11bHRpcGx5fVxuICogQGZ1bmN0aW9uXG4gKi9cbm1hdDIubXVsID0gbWF0Mi5tdWx0aXBseTtcblxuLyoqXG4gKiBSb3RhdGVzIGEgbWF0MiBieSB0aGUgZ2l2ZW4gYW5nbGVcbiAqXG4gKiBAcGFyYW0ge21hdDJ9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQyfSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDJ9IG91dFxuICovXG5tYXQyLnJvdGF0ZSA9IGZ1bmN0aW9uIChvdXQsIGEsIHJhZCkge1xuICAgIHZhciBhMCA9IGFbMF0sIGExID0gYVsxXSwgYTIgPSBhWzJdLCBhMyA9IGFbM10sXG4gICAgICAgIHMgPSBNYXRoLnNpbihyYWQpLFxuICAgICAgICBjID0gTWF0aC5jb3MocmFkKTtcbiAgICBvdXRbMF0gPSBhMCAqICBjICsgYTIgKiBzO1xuICAgIG91dFsxXSA9IGExICogIGMgKyBhMyAqIHM7XG4gICAgb3V0WzJdID0gYTAgKiAtcyArIGEyICogYztcbiAgICBvdXRbM10gPSBhMSAqIC1zICsgYTMgKiBjO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFNjYWxlcyB0aGUgbWF0MiBieSB0aGUgZGltZW5zaW9ucyBpbiB0aGUgZ2l2ZW4gdmVjMlxuICpcbiAqIEBwYXJhbSB7bWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDJ9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAqIEBwYXJhbSB7dmVjMn0gdiB0aGUgdmVjMiB0byBzY2FsZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0Mn0gb3V0XG4gKiovXG5tYXQyLnNjYWxlID0gZnVuY3Rpb24ob3V0LCBhLCB2KSB7XG4gICAgdmFyIGEwID0gYVswXSwgYTEgPSBhWzFdLCBhMiA9IGFbMl0sIGEzID0gYVszXSxcbiAgICAgICAgdjAgPSB2WzBdLCB2MSA9IHZbMV07XG4gICAgb3V0WzBdID0gYTAgKiB2MDtcbiAgICBvdXRbMV0gPSBhMSAqIHYwO1xuICAgIG91dFsyXSA9IGEyICogdjE7XG4gICAgb3V0WzNdID0gYTMgKiB2MTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgbWF0MlxuICpcbiAqIEBwYXJhbSB7bWF0Mn0gbWF0IG1hdHJpeCB0byByZXByZXNlbnQgYXMgYSBzdHJpbmdcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgbWF0cml4XG4gKi9cbm1hdDIuc3RyID0gZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4gJ21hdDIoJyArIGFbMF0gKyAnLCAnICsgYVsxXSArICcsICcgKyBhWzJdICsgJywgJyArIGFbM10gKyAnKSc7XG59O1xuXG4vKipcbiAqIFJldHVybnMgRnJvYmVuaXVzIG5vcm0gb2YgYSBtYXQyXG4gKlxuICogQHBhcmFtIHttYXQyfSBhIHRoZSBtYXRyaXggdG8gY2FsY3VsYXRlIEZyb2Jlbml1cyBub3JtIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBGcm9iZW5pdXMgbm9ybVxuICovXG5tYXQyLmZyb2IgPSBmdW5jdGlvbiAoYSkge1xuICAgIHJldHVybihNYXRoLnNxcnQoTWF0aC5wb3coYVswXSwgMikgKyBNYXRoLnBvdyhhWzFdLCAyKSArIE1hdGgucG93KGFbMl0sIDIpICsgTWF0aC5wb3coYVszXSwgMikpKVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIEwsIEQgYW5kIFUgbWF0cmljZXMgKExvd2VyIHRyaWFuZ3VsYXIsIERpYWdvbmFsIGFuZCBVcHBlciB0cmlhbmd1bGFyKSBieSBmYWN0b3JpemluZyB0aGUgaW5wdXQgbWF0cml4XG4gKiBAcGFyYW0ge21hdDJ9IEwgdGhlIGxvd2VyIHRyaWFuZ3VsYXIgbWF0cml4IFxuICogQHBhcmFtIHttYXQyfSBEIHRoZSBkaWFnb25hbCBtYXRyaXggXG4gKiBAcGFyYW0ge21hdDJ9IFUgdGhlIHVwcGVyIHRyaWFuZ3VsYXIgbWF0cml4IFxuICogQHBhcmFtIHttYXQyfSBhIHRoZSBpbnB1dCBtYXRyaXggdG8gZmFjdG9yaXplXG4gKi9cblxubWF0Mi5MRFUgPSBmdW5jdGlvbiAoTCwgRCwgVSwgYSkgeyBcbiAgICBMWzJdID0gYVsyXS9hWzBdOyBcbiAgICBVWzBdID0gYVswXTsgXG4gICAgVVsxXSA9IGFbMV07IFxuICAgIFVbM10gPSBhWzNdIC0gTFsyXSAqIFVbMV07IFxuICAgIHJldHVybiBbTCwgRCwgVV07ICAgICAgIFxufTsgXG5cbmlmKHR5cGVvZihleHBvcnRzKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBleHBvcnRzLm1hdDIgPSBtYXQyO1xufVxuO1xuLyogQ29weXJpZ2h0IChjKSAyMDEzLCBCcmFuZG9uIEpvbmVzLCBDb2xpbiBNYWNLZW56aWUgSVYuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5cblJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dCBtb2RpZmljYXRpb24sXG5hcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbiAgICBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBcbiAgICBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cblxuVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EXG5BTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBcbkRJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SXG5BTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcbihJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUztcbkxPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTlxuQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcbihJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTXG5TT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS4gKi9cblxuLyoqXG4gKiBAY2xhc3MgMngzIE1hdHJpeFxuICogQG5hbWUgbWF0MmRcbiAqIFxuICogQGRlc2NyaXB0aW9uIFxuICogQSBtYXQyZCBjb250YWlucyBzaXggZWxlbWVudHMgZGVmaW5lZCBhczpcbiAqIDxwcmU+XG4gKiBbYSwgYywgdHgsXG4gKiAgYiwgZCwgdHldXG4gKiA8L3ByZT5cbiAqIFRoaXMgaXMgYSBzaG9ydCBmb3JtIGZvciB0aGUgM3gzIG1hdHJpeDpcbiAqIDxwcmU+XG4gKiBbYSwgYywgdHgsXG4gKiAgYiwgZCwgdHksXG4gKiAgMCwgMCwgMV1cbiAqIDwvcHJlPlxuICogVGhlIGxhc3Qgcm93IGlzIGlnbm9yZWQgc28gdGhlIGFycmF5IGlzIHNob3J0ZXIgYW5kIG9wZXJhdGlvbnMgYXJlIGZhc3Rlci5cbiAqL1xuXG52YXIgbWF0MmQgPSB7fTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGlkZW50aXR5IG1hdDJkXG4gKlxuICogQHJldHVybnMge21hdDJkfSBhIG5ldyAyeDMgbWF0cml4XG4gKi9cbm1hdDJkLmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvdXQgPSBuZXcgR0xNQVRfQVJSQVlfVFlQRSg2KTtcbiAgICBvdXRbMF0gPSAxO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAxO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gMDtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IG1hdDJkIGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgbWF0cml4XG4gKlxuICogQHBhcmFtIHttYXQyZH0gYSBtYXRyaXggdG8gY2xvbmVcbiAqIEByZXR1cm5zIHttYXQyZH0gYSBuZXcgMngzIG1hdHJpeFxuICovXG5tYXQyZC5jbG9uZSA9IGZ1bmN0aW9uKGEpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEdMTUFUX0FSUkFZX1RZUEUoNik7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICBvdXRbNF0gPSBhWzRdO1xuICAgIG91dFs1XSA9IGFbNV07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIG1hdDJkIHRvIGFub3RoZXJcbiAqXG4gKiBAcGFyYW0ge21hdDJkfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0MmR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQyZH0gb3V0XG4gKi9cbm1hdDJkLmNvcHkgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIG91dFs0XSA9IGFbNF07XG4gICAgb3V0WzVdID0gYVs1XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTZXQgYSBtYXQyZCB0byB0aGUgaWRlbnRpdHkgbWF0cml4XG4gKlxuICogQHBhcmFtIHttYXQyZH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0MmR9IG91dFxuICovXG5tYXQyZC5pZGVudGl0eSA9IGZ1bmN0aW9uKG91dCkge1xuICAgIG91dFswXSA9IDE7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDE7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSAwO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEludmVydHMgYSBtYXQyZFxuICpcbiAqIEBwYXJhbSB7bWF0MmR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQyZH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDJkfSBvdXRcbiAqL1xubWF0MmQuaW52ZXJ0ID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgdmFyIGFhID0gYVswXSwgYWIgPSBhWzFdLCBhYyA9IGFbMl0sIGFkID0gYVszXSxcbiAgICAgICAgYXR4ID0gYVs0XSwgYXR5ID0gYVs1XTtcblxuICAgIHZhciBkZXQgPSBhYSAqIGFkIC0gYWIgKiBhYztcbiAgICBpZighZGV0KXtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGRldCA9IDEuMCAvIGRldDtcblxuICAgIG91dFswXSA9IGFkICogZGV0O1xuICAgIG91dFsxXSA9IC1hYiAqIGRldDtcbiAgICBvdXRbMl0gPSAtYWMgKiBkZXQ7XG4gICAgb3V0WzNdID0gYWEgKiBkZXQ7XG4gICAgb3V0WzRdID0gKGFjICogYXR5IC0gYWQgKiBhdHgpICogZGV0O1xuICAgIG91dFs1XSA9IChhYiAqIGF0eCAtIGFhICogYXR5KSAqIGRldDtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkZXRlcm1pbmFudCBvZiBhIG1hdDJkXG4gKlxuICogQHBhcmFtIHttYXQyZH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge051bWJlcn0gZGV0ZXJtaW5hbnQgb2YgYVxuICovXG5tYXQyZC5kZXRlcm1pbmFudCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuIGFbMF0gKiBhWzNdIC0gYVsxXSAqIGFbMl07XG59O1xuXG4vKipcbiAqIE11bHRpcGxpZXMgdHdvIG1hdDJkJ3NcbiAqXG4gKiBAcGFyYW0ge21hdDJkfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0MmR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7bWF0MmR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7bWF0MmR9IG91dFxuICovXG5tYXQyZC5tdWx0aXBseSA9IGZ1bmN0aW9uIChvdXQsIGEsIGIpIHtcbiAgICB2YXIgYTAgPSBhWzBdLCBhMSA9IGFbMV0sIGEyID0gYVsyXSwgYTMgPSBhWzNdLCBhNCA9IGFbNF0sIGE1ID0gYVs1XSxcbiAgICAgICAgYjAgPSBiWzBdLCBiMSA9IGJbMV0sIGIyID0gYlsyXSwgYjMgPSBiWzNdLCBiNCA9IGJbNF0sIGI1ID0gYls1XTtcbiAgICBvdXRbMF0gPSBhMCAqIGIwICsgYTIgKiBiMTtcbiAgICBvdXRbMV0gPSBhMSAqIGIwICsgYTMgKiBiMTtcbiAgICBvdXRbMl0gPSBhMCAqIGIyICsgYTIgKiBiMztcbiAgICBvdXRbM10gPSBhMSAqIGIyICsgYTMgKiBiMztcbiAgICBvdXRbNF0gPSBhMCAqIGI0ICsgYTIgKiBiNSArIGE0O1xuICAgIG91dFs1XSA9IGExICogYjQgKyBhMyAqIGI1ICsgYTU7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayBtYXQyZC5tdWx0aXBseX1cbiAqIEBmdW5jdGlvblxuICovXG5tYXQyZC5tdWwgPSBtYXQyZC5tdWx0aXBseTtcblxuXG4vKipcbiAqIFJvdGF0ZXMgYSBtYXQyZCBieSB0aGUgZ2l2ZW4gYW5nbGVcbiAqXG4gKiBAcGFyYW0ge21hdDJkfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0MmR9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0MmR9IG91dFxuICovXG5tYXQyZC5yb3RhdGUgPSBmdW5jdGlvbiAob3V0LCBhLCByYWQpIHtcbiAgICB2YXIgYTAgPSBhWzBdLCBhMSA9IGFbMV0sIGEyID0gYVsyXSwgYTMgPSBhWzNdLCBhNCA9IGFbNF0sIGE1ID0gYVs1XSxcbiAgICAgICAgcyA9IE1hdGguc2luKHJhZCksXG4gICAgICAgIGMgPSBNYXRoLmNvcyhyYWQpO1xuICAgIG91dFswXSA9IGEwICogIGMgKyBhMiAqIHM7XG4gICAgb3V0WzFdID0gYTEgKiAgYyArIGEzICogcztcbiAgICBvdXRbMl0gPSBhMCAqIC1zICsgYTIgKiBjO1xuICAgIG91dFszXSA9IGExICogLXMgKyBhMyAqIGM7XG4gICAgb3V0WzRdID0gYTQ7XG4gICAgb3V0WzVdID0gYTU7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2NhbGVzIHRoZSBtYXQyZCBieSB0aGUgZGltZW5zaW9ucyBpbiB0aGUgZ2l2ZW4gdmVjMlxuICpcbiAqIEBwYXJhbSB7bWF0MmR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQyZH0gYSB0aGUgbWF0cml4IHRvIHRyYW5zbGF0ZVxuICogQHBhcmFtIHt2ZWMyfSB2IHRoZSB2ZWMyIHRvIHNjYWxlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQyZH0gb3V0XG4gKiovXG5tYXQyZC5zY2FsZSA9IGZ1bmN0aW9uKG91dCwgYSwgdikge1xuICAgIHZhciBhMCA9IGFbMF0sIGExID0gYVsxXSwgYTIgPSBhWzJdLCBhMyA9IGFbM10sIGE0ID0gYVs0XSwgYTUgPSBhWzVdLFxuICAgICAgICB2MCA9IHZbMF0sIHYxID0gdlsxXTtcbiAgICBvdXRbMF0gPSBhMCAqIHYwO1xuICAgIG91dFsxXSA9IGExICogdjA7XG4gICAgb3V0WzJdID0gYTIgKiB2MTtcbiAgICBvdXRbM10gPSBhMyAqIHYxO1xuICAgIG91dFs0XSA9IGE0O1xuICAgIG91dFs1XSA9IGE1O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFRyYW5zbGF0ZXMgdGhlIG1hdDJkIGJ5IHRoZSBkaW1lbnNpb25zIGluIHRoZSBnaXZlbiB2ZWMyXG4gKlxuICogQHBhcmFtIHttYXQyZH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDJkfSBhIHRoZSBtYXRyaXggdG8gdHJhbnNsYXRlXG4gKiBAcGFyYW0ge3ZlYzJ9IHYgdGhlIHZlYzIgdG8gdHJhbnNsYXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQyZH0gb3V0XG4gKiovXG5tYXQyZC50cmFuc2xhdGUgPSBmdW5jdGlvbihvdXQsIGEsIHYpIHtcbiAgICB2YXIgYTAgPSBhWzBdLCBhMSA9IGFbMV0sIGEyID0gYVsyXSwgYTMgPSBhWzNdLCBhNCA9IGFbNF0sIGE1ID0gYVs1XSxcbiAgICAgICAgdjAgPSB2WzBdLCB2MSA9IHZbMV07XG4gICAgb3V0WzBdID0gYTA7XG4gICAgb3V0WzFdID0gYTE7XG4gICAgb3V0WzJdID0gYTI7XG4gICAgb3V0WzNdID0gYTM7XG4gICAgb3V0WzRdID0gYTAgKiB2MCArIGEyICogdjEgKyBhNDtcbiAgICBvdXRbNV0gPSBhMSAqIHYwICsgYTMgKiB2MSArIGE1O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSBtYXQyZFxuICpcbiAqIEBwYXJhbSB7bWF0MmR9IGEgbWF0cml4IHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xuICogQHJldHVybnMge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBtYXRyaXhcbiAqL1xubWF0MmQuc3RyID0gZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4gJ21hdDJkKCcgKyBhWzBdICsgJywgJyArIGFbMV0gKyAnLCAnICsgYVsyXSArICcsICcgKyBcbiAgICAgICAgICAgICAgICAgICAgYVszXSArICcsICcgKyBhWzRdICsgJywgJyArIGFbNV0gKyAnKSc7XG59O1xuXG4vKipcbiAqIFJldHVybnMgRnJvYmVuaXVzIG5vcm0gb2YgYSBtYXQyZFxuICpcbiAqIEBwYXJhbSB7bWF0MmR9IGEgdGhlIG1hdHJpeCB0byBjYWxjdWxhdGUgRnJvYmVuaXVzIG5vcm0gb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IEZyb2Jlbml1cyBub3JtXG4gKi9cbm1hdDJkLmZyb2IgPSBmdW5jdGlvbiAoYSkgeyBcbiAgICByZXR1cm4oTWF0aC5zcXJ0KE1hdGgucG93KGFbMF0sIDIpICsgTWF0aC5wb3coYVsxXSwgMikgKyBNYXRoLnBvdyhhWzJdLCAyKSArIE1hdGgucG93KGFbM10sIDIpICsgTWF0aC5wb3coYVs0XSwgMikgKyBNYXRoLnBvdyhhWzVdLCAyKSArIDEpKVxufTsgXG5cbmlmKHR5cGVvZihleHBvcnRzKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBleHBvcnRzLm1hdDJkID0gbWF0MmQ7XG59XG47XG4vKiBDb3B5cmlnaHQgKGMpIDIwMTMsIEJyYW5kb24gSm9uZXMsIENvbGluIE1hY0tlbnppZSBJVi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cblxuUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0IG1vZGlmaWNhdGlvbixcbmFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcblxuICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpc1xuICAgIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIFxuICAgIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuXG5USElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIiBBTkRcbkFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEXG5XQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIFxuRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1JcbkFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFU1xuKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTO1xuTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OXG5BTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVFxuKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVNcblNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLiAqL1xuXG4vKipcbiAqIEBjbGFzcyAzeDMgTWF0cml4XG4gKiBAbmFtZSBtYXQzXG4gKi9cblxudmFyIG1hdDMgPSB7fTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGlkZW50aXR5IG1hdDNcbiAqXG4gKiBAcmV0dXJucyB7bWF0M30gYSBuZXcgM3gzIG1hdHJpeFxuICovXG5tYXQzLmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvdXQgPSBuZXcgR0xNQVRfQVJSQVlfVFlQRSg5KTtcbiAgICBvdXRbMF0gPSAxO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDE7XG4gICAgb3V0WzVdID0gMDtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDb3BpZXMgdGhlIHVwcGVyLWxlZnQgM3gzIHZhbHVlcyBpbnRvIHRoZSBnaXZlbiBtYXQzLlxuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgM3gzIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhICAgdGhlIHNvdXJjZSA0eDQgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cbm1hdDMuZnJvbU1hdDQgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzRdO1xuICAgIG91dFs0XSA9IGFbNV07XG4gICAgb3V0WzVdID0gYVs2XTtcbiAgICBvdXRbNl0gPSBhWzhdO1xuICAgIG91dFs3XSA9IGFbOV07XG4gICAgb3V0WzhdID0gYVsxMF07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBtYXQzIGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgbWF0cml4XG4gKlxuICogQHBhcmFtIHttYXQzfSBhIG1hdHJpeCB0byBjbG9uZVxuICogQHJldHVybnMge21hdDN9IGEgbmV3IDN4MyBtYXRyaXhcbiAqL1xubWF0My5jbG9uZSA9IGZ1bmN0aW9uKGEpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEdMTUFUX0FSUkFZX1RZUEUoOSk7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICBvdXRbNF0gPSBhWzRdO1xuICAgIG91dFs1XSA9IGFbNV07XG4gICAgb3V0WzZdID0gYVs2XTtcbiAgICBvdXRbN10gPSBhWzddO1xuICAgIG91dFs4XSA9IGFbOF07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIG1hdDMgdG8gYW5vdGhlclxuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My5jb3B5ID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICBvdXRbNF0gPSBhWzRdO1xuICAgIG91dFs1XSA9IGFbNV07XG4gICAgb3V0WzZdID0gYVs2XTtcbiAgICBvdXRbN10gPSBhWzddO1xuICAgIG91dFs4XSA9IGFbOF07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2V0IGEgbWF0MyB0byB0aGUgaWRlbnRpdHkgbWF0cml4XG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My5pZGVudGl0eSA9IGZ1bmN0aW9uKG91dCkge1xuICAgIG91dFswXSA9IDE7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMTtcbiAgICBvdXRbNV0gPSAwO1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAxO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFRyYW5zcG9zZSB0aGUgdmFsdWVzIG9mIGEgbWF0M1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My50cmFuc3Bvc2UgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICAvLyBJZiB3ZSBhcmUgdHJhbnNwb3Npbmcgb3Vyc2VsdmVzIHdlIGNhbiBza2lwIGEgZmV3IHN0ZXBzIGJ1dCBoYXZlIHRvIGNhY2hlIHNvbWUgdmFsdWVzXG4gICAgaWYgKG91dCA9PT0gYSkge1xuICAgICAgICB2YXIgYTAxID0gYVsxXSwgYTAyID0gYVsyXSwgYTEyID0gYVs1XTtcbiAgICAgICAgb3V0WzFdID0gYVszXTtcbiAgICAgICAgb3V0WzJdID0gYVs2XTtcbiAgICAgICAgb3V0WzNdID0gYTAxO1xuICAgICAgICBvdXRbNV0gPSBhWzddO1xuICAgICAgICBvdXRbNl0gPSBhMDI7XG4gICAgICAgIG91dFs3XSA9IGExMjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBvdXRbMF0gPSBhWzBdO1xuICAgICAgICBvdXRbMV0gPSBhWzNdO1xuICAgICAgICBvdXRbMl0gPSBhWzZdO1xuICAgICAgICBvdXRbM10gPSBhWzFdO1xuICAgICAgICBvdXRbNF0gPSBhWzRdO1xuICAgICAgICBvdXRbNV0gPSBhWzddO1xuICAgICAgICBvdXRbNl0gPSBhWzJdO1xuICAgICAgICBvdXRbN10gPSBhWzVdO1xuICAgICAgICBvdXRbOF0gPSBhWzhdO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBJbnZlcnRzIGEgbWF0M1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My5pbnZlcnQgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSxcbiAgICAgICAgYTEwID0gYVszXSwgYTExID0gYVs0XSwgYTEyID0gYVs1XSxcbiAgICAgICAgYTIwID0gYVs2XSwgYTIxID0gYVs3XSwgYTIyID0gYVs4XSxcblxuICAgICAgICBiMDEgPSBhMjIgKiBhMTEgLSBhMTIgKiBhMjEsXG4gICAgICAgIGIxMSA9IC1hMjIgKiBhMTAgKyBhMTIgKiBhMjAsXG4gICAgICAgIGIyMSA9IGEyMSAqIGExMCAtIGExMSAqIGEyMCxcblxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XG4gICAgICAgIGRldCA9IGEwMCAqIGIwMSArIGEwMSAqIGIxMSArIGEwMiAqIGIyMTtcblxuICAgIGlmICghZGV0KSB7IFxuICAgICAgICByZXR1cm4gbnVsbDsgXG4gICAgfVxuICAgIGRldCA9IDEuMCAvIGRldDtcblxuICAgIG91dFswXSA9IGIwMSAqIGRldDtcbiAgICBvdXRbMV0gPSAoLWEyMiAqIGEwMSArIGEwMiAqIGEyMSkgKiBkZXQ7XG4gICAgb3V0WzJdID0gKGExMiAqIGEwMSAtIGEwMiAqIGExMSkgKiBkZXQ7XG4gICAgb3V0WzNdID0gYjExICogZGV0O1xuICAgIG91dFs0XSA9IChhMjIgKiBhMDAgLSBhMDIgKiBhMjApICogZGV0O1xuICAgIG91dFs1XSA9ICgtYTEyICogYTAwICsgYTAyICogYTEwKSAqIGRldDtcbiAgICBvdXRbNl0gPSBiMjEgKiBkZXQ7XG4gICAgb3V0WzddID0gKC1hMjEgKiBhMDAgKyBhMDEgKiBhMjApICogZGV0O1xuICAgIG91dFs4XSA9IChhMTEgKiBhMDAgLSBhMDEgKiBhMTApICogZGV0O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGFkanVnYXRlIG9mIGEgbWF0M1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My5hZGpvaW50ID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgdmFyIGEwMCA9IGFbMF0sIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sXG4gICAgICAgIGExMCA9IGFbM10sIGExMSA9IGFbNF0sIGExMiA9IGFbNV0sXG4gICAgICAgIGEyMCA9IGFbNl0sIGEyMSA9IGFbN10sIGEyMiA9IGFbOF07XG5cbiAgICBvdXRbMF0gPSAoYTExICogYTIyIC0gYTEyICogYTIxKTtcbiAgICBvdXRbMV0gPSAoYTAyICogYTIxIC0gYTAxICogYTIyKTtcbiAgICBvdXRbMl0gPSAoYTAxICogYTEyIC0gYTAyICogYTExKTtcbiAgICBvdXRbM10gPSAoYTEyICogYTIwIC0gYTEwICogYTIyKTtcbiAgICBvdXRbNF0gPSAoYTAwICogYTIyIC0gYTAyICogYTIwKTtcbiAgICBvdXRbNV0gPSAoYTAyICogYTEwIC0gYTAwICogYTEyKTtcbiAgICBvdXRbNl0gPSAoYTEwICogYTIxIC0gYTExICogYTIwKTtcbiAgICBvdXRbN10gPSAoYTAxICogYTIwIC0gYTAwICogYTIxKTtcbiAgICBvdXRbOF0gPSAoYTAwICogYTExIC0gYTAxICogYTEwKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkZXRlcm1pbmFudCBvZiBhIG1hdDNcbiAqXG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRldGVybWluYW50IG9mIGFcbiAqL1xubWF0My5kZXRlcm1pbmFudCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIGEwMCA9IGFbMF0sIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sXG4gICAgICAgIGExMCA9IGFbM10sIGExMSA9IGFbNF0sIGExMiA9IGFbNV0sXG4gICAgICAgIGEyMCA9IGFbNl0sIGEyMSA9IGFbN10sIGEyMiA9IGFbOF07XG5cbiAgICByZXR1cm4gYTAwICogKGEyMiAqIGExMSAtIGExMiAqIGEyMSkgKyBhMDEgKiAoLWEyMiAqIGExMCArIGExMiAqIGEyMCkgKyBhMDIgKiAoYTIxICogYTEwIC0gYTExICogYTIwKTtcbn07XG5cbi8qKlxuICogTXVsdGlwbGllcyB0d28gbWF0MydzXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHttYXQzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5tYXQzLm11bHRpcGx5ID0gZnVuY3Rpb24gKG91dCwgYSwgYikge1xuICAgIHZhciBhMDAgPSBhWzBdLCBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLFxuICAgICAgICBhMTAgPSBhWzNdLCBhMTEgPSBhWzRdLCBhMTIgPSBhWzVdLFxuICAgICAgICBhMjAgPSBhWzZdLCBhMjEgPSBhWzddLCBhMjIgPSBhWzhdLFxuXG4gICAgICAgIGIwMCA9IGJbMF0sIGIwMSA9IGJbMV0sIGIwMiA9IGJbMl0sXG4gICAgICAgIGIxMCA9IGJbM10sIGIxMSA9IGJbNF0sIGIxMiA9IGJbNV0sXG4gICAgICAgIGIyMCA9IGJbNl0sIGIyMSA9IGJbN10sIGIyMiA9IGJbOF07XG5cbiAgICBvdXRbMF0gPSBiMDAgKiBhMDAgKyBiMDEgKiBhMTAgKyBiMDIgKiBhMjA7XG4gICAgb3V0WzFdID0gYjAwICogYTAxICsgYjAxICogYTExICsgYjAyICogYTIxO1xuICAgIG91dFsyXSA9IGIwMCAqIGEwMiArIGIwMSAqIGExMiArIGIwMiAqIGEyMjtcblxuICAgIG91dFszXSA9IGIxMCAqIGEwMCArIGIxMSAqIGExMCArIGIxMiAqIGEyMDtcbiAgICBvdXRbNF0gPSBiMTAgKiBhMDEgKyBiMTEgKiBhMTEgKyBiMTIgKiBhMjE7XG4gICAgb3V0WzVdID0gYjEwICogYTAyICsgYjExICogYTEyICsgYjEyICogYTIyO1xuXG4gICAgb3V0WzZdID0gYjIwICogYTAwICsgYjIxICogYTEwICsgYjIyICogYTIwO1xuICAgIG91dFs3XSA9IGIyMCAqIGEwMSArIGIyMSAqIGExMSArIGIyMiAqIGEyMTtcbiAgICBvdXRbOF0gPSBiMjAgKiBhMDIgKyBiMjEgKiBhMTIgKyBiMjIgKiBhMjI7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayBtYXQzLm11bHRpcGx5fVxuICogQGZ1bmN0aW9uXG4gKi9cbm1hdDMubXVsID0gbWF0My5tdWx0aXBseTtcblxuLyoqXG4gKiBUcmFuc2xhdGUgYSBtYXQzIGJ5IHRoZSBnaXZlbiB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQzfSBhIHRoZSBtYXRyaXggdG8gdHJhbnNsYXRlXG4gKiBAcGFyYW0ge3ZlYzJ9IHYgdmVjdG9yIHRvIHRyYW5zbGF0ZSBieVxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5tYXQzLnRyYW5zbGF0ZSA9IGZ1bmN0aW9uKG91dCwgYSwgdikge1xuICAgIHZhciBhMDAgPSBhWzBdLCBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLFxuICAgICAgICBhMTAgPSBhWzNdLCBhMTEgPSBhWzRdLCBhMTIgPSBhWzVdLFxuICAgICAgICBhMjAgPSBhWzZdLCBhMjEgPSBhWzddLCBhMjIgPSBhWzhdLFxuICAgICAgICB4ID0gdlswXSwgeSA9IHZbMV07XG5cbiAgICBvdXRbMF0gPSBhMDA7XG4gICAgb3V0WzFdID0gYTAxO1xuICAgIG91dFsyXSA9IGEwMjtcblxuICAgIG91dFszXSA9IGExMDtcbiAgICBvdXRbNF0gPSBhMTE7XG4gICAgb3V0WzVdID0gYTEyO1xuXG4gICAgb3V0WzZdID0geCAqIGEwMCArIHkgKiBhMTAgKyBhMjA7XG4gICAgb3V0WzddID0geCAqIGEwMSArIHkgKiBhMTEgKyBhMjE7XG4gICAgb3V0WzhdID0geCAqIGEwMiArIHkgKiBhMTIgKyBhMjI7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUm90YXRlcyBhIG1hdDMgYnkgdGhlIGdpdmVuIGFuZ2xlXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My5yb3RhdGUgPSBmdW5jdGlvbiAob3V0LCBhLCByYWQpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSxcbiAgICAgICAgYTEwID0gYVszXSwgYTExID0gYVs0XSwgYTEyID0gYVs1XSxcbiAgICAgICAgYTIwID0gYVs2XSwgYTIxID0gYVs3XSwgYTIyID0gYVs4XSxcblxuICAgICAgICBzID0gTWF0aC5zaW4ocmFkKSxcbiAgICAgICAgYyA9IE1hdGguY29zKHJhZCk7XG5cbiAgICBvdXRbMF0gPSBjICogYTAwICsgcyAqIGExMDtcbiAgICBvdXRbMV0gPSBjICogYTAxICsgcyAqIGExMTtcbiAgICBvdXRbMl0gPSBjICogYTAyICsgcyAqIGExMjtcblxuICAgIG91dFszXSA9IGMgKiBhMTAgLSBzICogYTAwO1xuICAgIG91dFs0XSA9IGMgKiBhMTEgLSBzICogYTAxO1xuICAgIG91dFs1XSA9IGMgKiBhMTIgLSBzICogYTAyO1xuXG4gICAgb3V0WzZdID0gYTIwO1xuICAgIG91dFs3XSA9IGEyMTtcbiAgICBvdXRbOF0gPSBhMjI7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2NhbGVzIHRoZSBtYXQzIGJ5IHRoZSBkaW1lbnNpb25zIGluIHRoZSBnaXZlbiB2ZWMyXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHt2ZWMyfSB2IHRoZSB2ZWMyIHRvIHNjYWxlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqKi9cbm1hdDMuc2NhbGUgPSBmdW5jdGlvbihvdXQsIGEsIHYpIHtcbiAgICB2YXIgeCA9IHZbMF0sIHkgPSB2WzFdO1xuXG4gICAgb3V0WzBdID0geCAqIGFbMF07XG4gICAgb3V0WzFdID0geCAqIGFbMV07XG4gICAgb3V0WzJdID0geCAqIGFbMl07XG5cbiAgICBvdXRbM10gPSB5ICogYVszXTtcbiAgICBvdXRbNF0gPSB5ICogYVs0XTtcbiAgICBvdXRbNV0gPSB5ICogYVs1XTtcblxuICAgIG91dFs2XSA9IGFbNl07XG4gICAgb3V0WzddID0gYVs3XTtcbiAgICBvdXRbOF0gPSBhWzhdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENvcGllcyB0aGUgdmFsdWVzIGZyb20gYSBtYXQyZCBpbnRvIGEgbWF0M1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDJkfSBhIHRoZSBtYXRyaXggdG8gY29weVxuICogQHJldHVybnMge21hdDN9IG91dFxuICoqL1xubWF0My5mcm9tTWF0MmQgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gMDtcblxuICAgIG91dFszXSA9IGFbMl07XG4gICAgb3V0WzRdID0gYVszXTtcbiAgICBvdXRbNV0gPSAwO1xuXG4gICAgb3V0WzZdID0gYVs0XTtcbiAgICBvdXRbN10gPSBhWzVdO1xuICAgIG91dFs4XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuKiBDYWxjdWxhdGVzIGEgM3gzIG1hdHJpeCBmcm9tIHRoZSBnaXZlbiBxdWF0ZXJuaW9uXG4qXG4qIEBwYXJhbSB7bWF0M30gb3V0IG1hdDMgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiogQHBhcmFtIHtxdWF0fSBxIFF1YXRlcm5pb24gdG8gY3JlYXRlIG1hdHJpeCBmcm9tXG4qXG4qIEByZXR1cm5zIHttYXQzfSBvdXRcbiovXG5tYXQzLmZyb21RdWF0ID0gZnVuY3Rpb24gKG91dCwgcSkge1xuICAgIHZhciB4ID0gcVswXSwgeSA9IHFbMV0sIHogPSBxWzJdLCB3ID0gcVszXSxcbiAgICAgICAgeDIgPSB4ICsgeCxcbiAgICAgICAgeTIgPSB5ICsgeSxcbiAgICAgICAgejIgPSB6ICsgeixcblxuICAgICAgICB4eCA9IHggKiB4MixcbiAgICAgICAgeXggPSB5ICogeDIsXG4gICAgICAgIHl5ID0geSAqIHkyLFxuICAgICAgICB6eCA9IHogKiB4MixcbiAgICAgICAgenkgPSB6ICogeTIsXG4gICAgICAgIHp6ID0geiAqIHoyLFxuICAgICAgICB3eCA9IHcgKiB4MixcbiAgICAgICAgd3kgPSB3ICogeTIsXG4gICAgICAgIHd6ID0gdyAqIHoyO1xuXG4gICAgb3V0WzBdID0gMSAtIHl5IC0geno7XG4gICAgb3V0WzNdID0geXggLSB3ejtcbiAgICBvdXRbNl0gPSB6eCArIHd5O1xuXG4gICAgb3V0WzFdID0geXggKyB3ejtcbiAgICBvdXRbNF0gPSAxIC0geHggLSB6ejtcbiAgICBvdXRbN10gPSB6eSAtIHd4O1xuXG4gICAgb3V0WzJdID0genggLSB3eTtcbiAgICBvdXRbNV0gPSB6eSArIHd4O1xuICAgIG91dFs4XSA9IDEgLSB4eCAtIHl5O1xuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuKiBDYWxjdWxhdGVzIGEgM3gzIG5vcm1hbCBtYXRyaXggKHRyYW5zcG9zZSBpbnZlcnNlKSBmcm9tIHRoZSA0eDQgbWF0cml4XG4qXG4qIEBwYXJhbSB7bWF0M30gb3V0IG1hdDMgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiogQHBhcmFtIHttYXQ0fSBhIE1hdDQgdG8gZGVyaXZlIHRoZSBub3JtYWwgbWF0cml4IGZyb21cbipcbiogQHJldHVybnMge21hdDN9IG91dFxuKi9cbm1hdDMubm9ybWFsRnJvbU1hdDQgPSBmdW5jdGlvbiAob3V0LCBhKSB7XG4gICAgdmFyIGEwMCA9IGFbMF0sIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sIGEwMyA9IGFbM10sXG4gICAgICAgIGExMCA9IGFbNF0sIGExMSA9IGFbNV0sIGExMiA9IGFbNl0sIGExMyA9IGFbN10sXG4gICAgICAgIGEyMCA9IGFbOF0sIGEyMSA9IGFbOV0sIGEyMiA9IGFbMTBdLCBhMjMgPSBhWzExXSxcbiAgICAgICAgYTMwID0gYVsxMl0sIGEzMSA9IGFbMTNdLCBhMzIgPSBhWzE0XSwgYTMzID0gYVsxNV0sXG5cbiAgICAgICAgYjAwID0gYTAwICogYTExIC0gYTAxICogYTEwLFxuICAgICAgICBiMDEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTAsXG4gICAgICAgIGIwMiA9IGEwMCAqIGExMyAtIGEwMyAqIGExMCxcbiAgICAgICAgYjAzID0gYTAxICogYTEyIC0gYTAyICogYTExLFxuICAgICAgICBiMDQgPSBhMDEgKiBhMTMgLSBhMDMgKiBhMTEsXG4gICAgICAgIGIwNSA9IGEwMiAqIGExMyAtIGEwMyAqIGExMixcbiAgICAgICAgYjA2ID0gYTIwICogYTMxIC0gYTIxICogYTMwLFxuICAgICAgICBiMDcgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzAsXG4gICAgICAgIGIwOCA9IGEyMCAqIGEzMyAtIGEyMyAqIGEzMCxcbiAgICAgICAgYjA5ID0gYTIxICogYTMyIC0gYTIyICogYTMxLFxuICAgICAgICBiMTAgPSBhMjEgKiBhMzMgLSBhMjMgKiBhMzEsXG4gICAgICAgIGIxMSA9IGEyMiAqIGEzMyAtIGEyMyAqIGEzMixcblxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XG4gICAgICAgIGRldCA9IGIwMCAqIGIxMSAtIGIwMSAqIGIxMCArIGIwMiAqIGIwOSArIGIwMyAqIGIwOCAtIGIwNCAqIGIwNyArIGIwNSAqIGIwNjtcblxuICAgIGlmICghZGV0KSB7IFxuICAgICAgICByZXR1cm4gbnVsbDsgXG4gICAgfVxuICAgIGRldCA9IDEuMCAvIGRldDtcblxuICAgIG91dFswXSA9IChhMTEgKiBiMTEgLSBhMTIgKiBiMTAgKyBhMTMgKiBiMDkpICogZGV0O1xuICAgIG91dFsxXSA9IChhMTIgKiBiMDggLSBhMTAgKiBiMTEgLSBhMTMgKiBiMDcpICogZGV0O1xuICAgIG91dFsyXSA9IChhMTAgKiBiMTAgLSBhMTEgKiBiMDggKyBhMTMgKiBiMDYpICogZGV0O1xuXG4gICAgb3V0WzNdID0gKGEwMiAqIGIxMCAtIGEwMSAqIGIxMSAtIGEwMyAqIGIwOSkgKiBkZXQ7XG4gICAgb3V0WzRdID0gKGEwMCAqIGIxMSAtIGEwMiAqIGIwOCArIGEwMyAqIGIwNykgKiBkZXQ7XG4gICAgb3V0WzVdID0gKGEwMSAqIGIwOCAtIGEwMCAqIGIxMCAtIGEwMyAqIGIwNikgKiBkZXQ7XG5cbiAgICBvdXRbNl0gPSAoYTMxICogYjA1IC0gYTMyICogYjA0ICsgYTMzICogYjAzKSAqIGRldDtcbiAgICBvdXRbN10gPSAoYTMyICogYjAyIC0gYTMwICogYjA1IC0gYTMzICogYjAxKSAqIGRldDtcbiAgICBvdXRbOF0gPSAoYTMwICogYjA0IC0gYTMxICogYjAyICsgYTMzICogYjAwKSAqIGRldDtcblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSBtYXQzXG4gKlxuICogQHBhcmFtIHttYXQzfSBtYXQgbWF0cml4IHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xuICogQHJldHVybnMge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBtYXRyaXhcbiAqL1xubWF0My5zdHIgPSBmdW5jdGlvbiAoYSkge1xuICAgIHJldHVybiAnbWF0MygnICsgYVswXSArICcsICcgKyBhWzFdICsgJywgJyArIGFbMl0gKyAnLCAnICsgXG4gICAgICAgICAgICAgICAgICAgIGFbM10gKyAnLCAnICsgYVs0XSArICcsICcgKyBhWzVdICsgJywgJyArIFxuICAgICAgICAgICAgICAgICAgICBhWzZdICsgJywgJyArIGFbN10gKyAnLCAnICsgYVs4XSArICcpJztcbn07XG5cbi8qKlxuICogUmV0dXJucyBGcm9iZW5pdXMgbm9ybSBvZiBhIG1hdDNcbiAqXG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIG1hdHJpeCB0byBjYWxjdWxhdGUgRnJvYmVuaXVzIG5vcm0gb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IEZyb2Jlbml1cyBub3JtXG4gKi9cbm1hdDMuZnJvYiA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuKE1hdGguc3FydChNYXRoLnBvdyhhWzBdLCAyKSArIE1hdGgucG93KGFbMV0sIDIpICsgTWF0aC5wb3coYVsyXSwgMikgKyBNYXRoLnBvdyhhWzNdLCAyKSArIE1hdGgucG93KGFbNF0sIDIpICsgTWF0aC5wb3coYVs1XSwgMikgKyBNYXRoLnBvdyhhWzZdLCAyKSArIE1hdGgucG93KGFbN10sIDIpICsgTWF0aC5wb3coYVs4XSwgMikpKVxufTtcblxuXG5pZih0eXBlb2YoZXhwb3J0cykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZXhwb3J0cy5tYXQzID0gbWF0Mztcbn1cbjtcbi8qIENvcHlyaWdodCAoYykgMjAxMywgQnJhbmRvbiBKb25lcywgQ29saW4gTWFjS2VuemllIElWLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuXG5SZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXQgbW9kaWZpY2F0aW9uLFxuYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuXG4gICogUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzXG4gICAgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gICogUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb24gXG4gICAgYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG5cblRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiIEFORFxuQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbldBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkUgXG5ESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIEhPTERFUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUlxuQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTXG4oSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7XG5MT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT05cbkFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUXG4oSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJU1xuU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuICovXG5cbi8qKlxuICogQGNsYXNzIDR4NCBNYXRyaXhcbiAqIEBuYW1lIG1hdDRcbiAqL1xuXG52YXIgbWF0NCA9IHt9O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgaWRlbnRpdHkgbWF0NFxuICpcbiAqIEByZXR1cm5zIHttYXQ0fSBhIG5ldyA0eDQgbWF0cml4XG4gKi9cbm1hdDQuY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG91dCA9IG5ldyBHTE1BVF9BUlJBWV9UWVBFKDE2KTtcbiAgICBvdXRbMF0gPSAxO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gMTtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMDtcbiAgICBvdXRbOV0gPSAwO1xuICAgIG91dFsxMF0gPSAxO1xuICAgIG91dFsxMV0gPSAwO1xuICAgIG91dFsxMl0gPSAwO1xuICAgIG91dFsxM10gPSAwO1xuICAgIG91dFsxNF0gPSAwO1xuICAgIG91dFsxNV0gPSAxO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgbWF0NCBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIG1hdHJpeFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gYSBtYXRyaXggdG8gY2xvbmVcbiAqIEByZXR1cm5zIHttYXQ0fSBhIG5ldyA0eDQgbWF0cml4XG4gKi9cbm1hdDQuY2xvbmUgPSBmdW5jdGlvbihhKSB7XG4gICAgdmFyIG91dCA9IG5ldyBHTE1BVF9BUlJBWV9UWVBFKDE2KTtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIG91dFs0XSA9IGFbNF07XG4gICAgb3V0WzVdID0gYVs1XTtcbiAgICBvdXRbNl0gPSBhWzZdO1xuICAgIG91dFs3XSA9IGFbN107XG4gICAgb3V0WzhdID0gYVs4XTtcbiAgICBvdXRbOV0gPSBhWzldO1xuICAgIG91dFsxMF0gPSBhWzEwXTtcbiAgICBvdXRbMTFdID0gYVsxMV07XG4gICAgb3V0WzEyXSA9IGFbMTJdO1xuICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgb3V0WzE1XSA9IGFbMTVdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSBtYXQ0IHRvIGFub3RoZXJcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuY29weSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgb3V0WzRdID0gYVs0XTtcbiAgICBvdXRbNV0gPSBhWzVdO1xuICAgIG91dFs2XSA9IGFbNl07XG4gICAgb3V0WzddID0gYVs3XTtcbiAgICBvdXRbOF0gPSBhWzhdO1xuICAgIG91dFs5XSA9IGFbOV07XG4gICAgb3V0WzEwXSA9IGFbMTBdO1xuICAgIG91dFsxMV0gPSBhWzExXTtcbiAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2V0IGEgbWF0NCB0byB0aGUgaWRlbnRpdHkgbWF0cml4XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5pZGVudGl0eSA9IGZ1bmN0aW9uKG91dCkge1xuICAgIG91dFswXSA9IDE7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSAxO1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAwO1xuICAgIG91dFs5XSA9IDA7XG4gICAgb3V0WzEwXSA9IDE7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9IDA7XG4gICAgb3V0WzE1XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogVHJhbnNwb3NlIHRoZSB2YWx1ZXMgb2YgYSBtYXQ0XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LnRyYW5zcG9zZSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIC8vIElmIHdlIGFyZSB0cmFuc3Bvc2luZyBvdXJzZWx2ZXMgd2UgY2FuIHNraXAgYSBmZXcgc3RlcHMgYnV0IGhhdmUgdG8gY2FjaGUgc29tZSB2YWx1ZXNcbiAgICBpZiAob3V0ID09PSBhKSB7XG4gICAgICAgIHZhciBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLCBhMDMgPSBhWzNdLFxuICAgICAgICAgICAgYTEyID0gYVs2XSwgYTEzID0gYVs3XSxcbiAgICAgICAgICAgIGEyMyA9IGFbMTFdO1xuXG4gICAgICAgIG91dFsxXSA9IGFbNF07XG4gICAgICAgIG91dFsyXSA9IGFbOF07XG4gICAgICAgIG91dFszXSA9IGFbMTJdO1xuICAgICAgICBvdXRbNF0gPSBhMDE7XG4gICAgICAgIG91dFs2XSA9IGFbOV07XG4gICAgICAgIG91dFs3XSA9IGFbMTNdO1xuICAgICAgICBvdXRbOF0gPSBhMDI7XG4gICAgICAgIG91dFs5XSA9IGExMjtcbiAgICAgICAgb3V0WzExXSA9IGFbMTRdO1xuICAgICAgICBvdXRbMTJdID0gYTAzO1xuICAgICAgICBvdXRbMTNdID0gYTEzO1xuICAgICAgICBvdXRbMTRdID0gYTIzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG91dFswXSA9IGFbMF07XG4gICAgICAgIG91dFsxXSA9IGFbNF07XG4gICAgICAgIG91dFsyXSA9IGFbOF07XG4gICAgICAgIG91dFszXSA9IGFbMTJdO1xuICAgICAgICBvdXRbNF0gPSBhWzFdO1xuICAgICAgICBvdXRbNV0gPSBhWzVdO1xuICAgICAgICBvdXRbNl0gPSBhWzldO1xuICAgICAgICBvdXRbN10gPSBhWzEzXTtcbiAgICAgICAgb3V0WzhdID0gYVsyXTtcbiAgICAgICAgb3V0WzldID0gYVs2XTtcbiAgICAgICAgb3V0WzEwXSA9IGFbMTBdO1xuICAgICAgICBvdXRbMTFdID0gYVsxNF07XG4gICAgICAgIG91dFsxMl0gPSBhWzNdO1xuICAgICAgICBvdXRbMTNdID0gYVs3XTtcbiAgICAgICAgb3V0WzE0XSA9IGFbMTFdO1xuICAgICAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEludmVydHMgYSBtYXQ0XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LmludmVydCA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIHZhciBhMDAgPSBhWzBdLCBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLCBhMDMgPSBhWzNdLFxuICAgICAgICBhMTAgPSBhWzRdLCBhMTEgPSBhWzVdLCBhMTIgPSBhWzZdLCBhMTMgPSBhWzddLFxuICAgICAgICBhMjAgPSBhWzhdLCBhMjEgPSBhWzldLCBhMjIgPSBhWzEwXSwgYTIzID0gYVsxMV0sXG4gICAgICAgIGEzMCA9IGFbMTJdLCBhMzEgPSBhWzEzXSwgYTMyID0gYVsxNF0sIGEzMyA9IGFbMTVdLFxuXG4gICAgICAgIGIwMCA9IGEwMCAqIGExMSAtIGEwMSAqIGExMCxcbiAgICAgICAgYjAxID0gYTAwICogYTEyIC0gYTAyICogYTEwLFxuICAgICAgICBiMDIgPSBhMDAgKiBhMTMgLSBhMDMgKiBhMTAsXG4gICAgICAgIGIwMyA9IGEwMSAqIGExMiAtIGEwMiAqIGExMSxcbiAgICAgICAgYjA0ID0gYTAxICogYTEzIC0gYTAzICogYTExLFxuICAgICAgICBiMDUgPSBhMDIgKiBhMTMgLSBhMDMgKiBhMTIsXG4gICAgICAgIGIwNiA9IGEyMCAqIGEzMSAtIGEyMSAqIGEzMCxcbiAgICAgICAgYjA3ID0gYTIwICogYTMyIC0gYTIyICogYTMwLFxuICAgICAgICBiMDggPSBhMjAgKiBhMzMgLSBhMjMgKiBhMzAsXG4gICAgICAgIGIwOSA9IGEyMSAqIGEzMiAtIGEyMiAqIGEzMSxcbiAgICAgICAgYjEwID0gYTIxICogYTMzIC0gYTIzICogYTMxLFxuICAgICAgICBiMTEgPSBhMjIgKiBhMzMgLSBhMjMgKiBhMzIsXG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxuICAgICAgICBkZXQgPSBiMDAgKiBiMTEgLSBiMDEgKiBiMTAgKyBiMDIgKiBiMDkgKyBiMDMgKiBiMDggLSBiMDQgKiBiMDcgKyBiMDUgKiBiMDY7XG5cbiAgICBpZiAoIWRldCkgeyBcbiAgICAgICAgcmV0dXJuIG51bGw7IFxuICAgIH1cbiAgICBkZXQgPSAxLjAgLyBkZXQ7XG5cbiAgICBvdXRbMF0gPSAoYTExICogYjExIC0gYTEyICogYjEwICsgYTEzICogYjA5KSAqIGRldDtcbiAgICBvdXRbMV0gPSAoYTAyICogYjEwIC0gYTAxICogYjExIC0gYTAzICogYjA5KSAqIGRldDtcbiAgICBvdXRbMl0gPSAoYTMxICogYjA1IC0gYTMyICogYjA0ICsgYTMzICogYjAzKSAqIGRldDtcbiAgICBvdXRbM10gPSAoYTIyICogYjA0IC0gYTIxICogYjA1IC0gYTIzICogYjAzKSAqIGRldDtcbiAgICBvdXRbNF0gPSAoYTEyICogYjA4IC0gYTEwICogYjExIC0gYTEzICogYjA3KSAqIGRldDtcbiAgICBvdXRbNV0gPSAoYTAwICogYjExIC0gYTAyICogYjA4ICsgYTAzICogYjA3KSAqIGRldDtcbiAgICBvdXRbNl0gPSAoYTMyICogYjAyIC0gYTMwICogYjA1IC0gYTMzICogYjAxKSAqIGRldDtcbiAgICBvdXRbN10gPSAoYTIwICogYjA1IC0gYTIyICogYjAyICsgYTIzICogYjAxKSAqIGRldDtcbiAgICBvdXRbOF0gPSAoYTEwICogYjEwIC0gYTExICogYjA4ICsgYTEzICogYjA2KSAqIGRldDtcbiAgICBvdXRbOV0gPSAoYTAxICogYjA4IC0gYTAwICogYjEwIC0gYTAzICogYjA2KSAqIGRldDtcbiAgICBvdXRbMTBdID0gKGEzMCAqIGIwNCAtIGEzMSAqIGIwMiArIGEzMyAqIGIwMCkgKiBkZXQ7XG4gICAgb3V0WzExXSA9IChhMjEgKiBiMDIgLSBhMjAgKiBiMDQgLSBhMjMgKiBiMDApICogZGV0O1xuICAgIG91dFsxMl0gPSAoYTExICogYjA3IC0gYTEwICogYjA5IC0gYTEyICogYjA2KSAqIGRldDtcbiAgICBvdXRbMTNdID0gKGEwMCAqIGIwOSAtIGEwMSAqIGIwNyArIGEwMiAqIGIwNikgKiBkZXQ7XG4gICAgb3V0WzE0XSA9IChhMzEgKiBiMDEgLSBhMzAgKiBiMDMgLSBhMzIgKiBiMDApICogZGV0O1xuICAgIG91dFsxNV0gPSAoYTIwICogYjAzIC0gYTIxICogYjAxICsgYTIyICogYjAwKSAqIGRldDtcblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGFkanVnYXRlIG9mIGEgbWF0NFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5hZGpvaW50ID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgdmFyIGEwMCA9IGFbMF0sIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sIGEwMyA9IGFbM10sXG4gICAgICAgIGExMCA9IGFbNF0sIGExMSA9IGFbNV0sIGExMiA9IGFbNl0sIGExMyA9IGFbN10sXG4gICAgICAgIGEyMCA9IGFbOF0sIGEyMSA9IGFbOV0sIGEyMiA9IGFbMTBdLCBhMjMgPSBhWzExXSxcbiAgICAgICAgYTMwID0gYVsxMl0sIGEzMSA9IGFbMTNdLCBhMzIgPSBhWzE0XSwgYTMzID0gYVsxNV07XG5cbiAgICBvdXRbMF0gID0gIChhMTEgKiAoYTIyICogYTMzIC0gYTIzICogYTMyKSAtIGEyMSAqIChhMTIgKiBhMzMgLSBhMTMgKiBhMzIpICsgYTMxICogKGExMiAqIGEyMyAtIGExMyAqIGEyMikpO1xuICAgIG91dFsxXSAgPSAtKGEwMSAqIChhMjIgKiBhMzMgLSBhMjMgKiBhMzIpIC0gYTIxICogKGEwMiAqIGEzMyAtIGEwMyAqIGEzMikgKyBhMzEgKiAoYTAyICogYTIzIC0gYTAzICogYTIyKSk7XG4gICAgb3V0WzJdICA9ICAoYTAxICogKGExMiAqIGEzMyAtIGExMyAqIGEzMikgLSBhMTEgKiAoYTAyICogYTMzIC0gYTAzICogYTMyKSArIGEzMSAqIChhMDIgKiBhMTMgLSBhMDMgKiBhMTIpKTtcbiAgICBvdXRbM10gID0gLShhMDEgKiAoYTEyICogYTIzIC0gYTEzICogYTIyKSAtIGExMSAqIChhMDIgKiBhMjMgLSBhMDMgKiBhMjIpICsgYTIxICogKGEwMiAqIGExMyAtIGEwMyAqIGExMikpO1xuICAgIG91dFs0XSAgPSAtKGExMCAqIChhMjIgKiBhMzMgLSBhMjMgKiBhMzIpIC0gYTIwICogKGExMiAqIGEzMyAtIGExMyAqIGEzMikgKyBhMzAgKiAoYTEyICogYTIzIC0gYTEzICogYTIyKSk7XG4gICAgb3V0WzVdICA9ICAoYTAwICogKGEyMiAqIGEzMyAtIGEyMyAqIGEzMikgLSBhMjAgKiAoYTAyICogYTMzIC0gYTAzICogYTMyKSArIGEzMCAqIChhMDIgKiBhMjMgLSBhMDMgKiBhMjIpKTtcbiAgICBvdXRbNl0gID0gLShhMDAgKiAoYTEyICogYTMzIC0gYTEzICogYTMyKSAtIGExMCAqIChhMDIgKiBhMzMgLSBhMDMgKiBhMzIpICsgYTMwICogKGEwMiAqIGExMyAtIGEwMyAqIGExMikpO1xuICAgIG91dFs3XSAgPSAgKGEwMCAqIChhMTIgKiBhMjMgLSBhMTMgKiBhMjIpIC0gYTEwICogKGEwMiAqIGEyMyAtIGEwMyAqIGEyMikgKyBhMjAgKiAoYTAyICogYTEzIC0gYTAzICogYTEyKSk7XG4gICAgb3V0WzhdICA9ICAoYTEwICogKGEyMSAqIGEzMyAtIGEyMyAqIGEzMSkgLSBhMjAgKiAoYTExICogYTMzIC0gYTEzICogYTMxKSArIGEzMCAqIChhMTEgKiBhMjMgLSBhMTMgKiBhMjEpKTtcbiAgICBvdXRbOV0gID0gLShhMDAgKiAoYTIxICogYTMzIC0gYTIzICogYTMxKSAtIGEyMCAqIChhMDEgKiBhMzMgLSBhMDMgKiBhMzEpICsgYTMwICogKGEwMSAqIGEyMyAtIGEwMyAqIGEyMSkpO1xuICAgIG91dFsxMF0gPSAgKGEwMCAqIChhMTEgKiBhMzMgLSBhMTMgKiBhMzEpIC0gYTEwICogKGEwMSAqIGEzMyAtIGEwMyAqIGEzMSkgKyBhMzAgKiAoYTAxICogYTEzIC0gYTAzICogYTExKSk7XG4gICAgb3V0WzExXSA9IC0oYTAwICogKGExMSAqIGEyMyAtIGExMyAqIGEyMSkgLSBhMTAgKiAoYTAxICogYTIzIC0gYTAzICogYTIxKSArIGEyMCAqIChhMDEgKiBhMTMgLSBhMDMgKiBhMTEpKTtcbiAgICBvdXRbMTJdID0gLShhMTAgKiAoYTIxICogYTMyIC0gYTIyICogYTMxKSAtIGEyMCAqIChhMTEgKiBhMzIgLSBhMTIgKiBhMzEpICsgYTMwICogKGExMSAqIGEyMiAtIGExMiAqIGEyMSkpO1xuICAgIG91dFsxM10gPSAgKGEwMCAqIChhMjEgKiBhMzIgLSBhMjIgKiBhMzEpIC0gYTIwICogKGEwMSAqIGEzMiAtIGEwMiAqIGEzMSkgKyBhMzAgKiAoYTAxICogYTIyIC0gYTAyICogYTIxKSk7XG4gICAgb3V0WzE0XSA9IC0oYTAwICogKGExMSAqIGEzMiAtIGExMiAqIGEzMSkgLSBhMTAgKiAoYTAxICogYTMyIC0gYTAyICogYTMxKSArIGEzMCAqIChhMDEgKiBhMTIgLSBhMDIgKiBhMTEpKTtcbiAgICBvdXRbMTVdID0gIChhMDAgKiAoYTExICogYTIyIC0gYTEyICogYTIxKSAtIGExMCAqIChhMDEgKiBhMjIgLSBhMDIgKiBhMjEpICsgYTIwICogKGEwMSAqIGExMiAtIGEwMiAqIGExMSkpO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRldGVybWluYW50IG9mIGEgbWF0NFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge051bWJlcn0gZGV0ZXJtaW5hbnQgb2YgYVxuICovXG5tYXQ0LmRldGVybWluYW50ID0gZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSwgYTAzID0gYVszXSxcbiAgICAgICAgYTEwID0gYVs0XSwgYTExID0gYVs1XSwgYTEyID0gYVs2XSwgYTEzID0gYVs3XSxcbiAgICAgICAgYTIwID0gYVs4XSwgYTIxID0gYVs5XSwgYTIyID0gYVsxMF0sIGEyMyA9IGFbMTFdLFxuICAgICAgICBhMzAgPSBhWzEyXSwgYTMxID0gYVsxM10sIGEzMiA9IGFbMTRdLCBhMzMgPSBhWzE1XSxcblxuICAgICAgICBiMDAgPSBhMDAgKiBhMTEgLSBhMDEgKiBhMTAsXG4gICAgICAgIGIwMSA9IGEwMCAqIGExMiAtIGEwMiAqIGExMCxcbiAgICAgICAgYjAyID0gYTAwICogYTEzIC0gYTAzICogYTEwLFxuICAgICAgICBiMDMgPSBhMDEgKiBhMTIgLSBhMDIgKiBhMTEsXG4gICAgICAgIGIwNCA9IGEwMSAqIGExMyAtIGEwMyAqIGExMSxcbiAgICAgICAgYjA1ID0gYTAyICogYTEzIC0gYTAzICogYTEyLFxuICAgICAgICBiMDYgPSBhMjAgKiBhMzEgLSBhMjEgKiBhMzAsXG4gICAgICAgIGIwNyA9IGEyMCAqIGEzMiAtIGEyMiAqIGEzMCxcbiAgICAgICAgYjA4ID0gYTIwICogYTMzIC0gYTIzICogYTMwLFxuICAgICAgICBiMDkgPSBhMjEgKiBhMzIgLSBhMjIgKiBhMzEsXG4gICAgICAgIGIxMCA9IGEyMSAqIGEzMyAtIGEyMyAqIGEzMSxcbiAgICAgICAgYjExID0gYTIyICogYTMzIC0gYTIzICogYTMyO1xuXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxuICAgIHJldHVybiBiMDAgKiBiMTEgLSBiMDEgKiBiMTAgKyBiMDIgKiBiMDkgKyBiMDMgKiBiMDggLSBiMDQgKiBiMDcgKyBiMDUgKiBiMDY7XG59O1xuXG4vKipcbiAqIE11bHRpcGxpZXMgdHdvIG1hdDQnc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7bWF0NH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5tdWx0aXBseSA9IGZ1bmN0aW9uIChvdXQsIGEsIGIpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSwgYTAzID0gYVszXSxcbiAgICAgICAgYTEwID0gYVs0XSwgYTExID0gYVs1XSwgYTEyID0gYVs2XSwgYTEzID0gYVs3XSxcbiAgICAgICAgYTIwID0gYVs4XSwgYTIxID0gYVs5XSwgYTIyID0gYVsxMF0sIGEyMyA9IGFbMTFdLFxuICAgICAgICBhMzAgPSBhWzEyXSwgYTMxID0gYVsxM10sIGEzMiA9IGFbMTRdLCBhMzMgPSBhWzE1XTtcblxuICAgIC8vIENhY2hlIG9ubHkgdGhlIGN1cnJlbnQgbGluZSBvZiB0aGUgc2Vjb25kIG1hdHJpeFxuICAgIHZhciBiMCAgPSBiWzBdLCBiMSA9IGJbMV0sIGIyID0gYlsyXSwgYjMgPSBiWzNdOyAgXG4gICAgb3V0WzBdID0gYjAqYTAwICsgYjEqYTEwICsgYjIqYTIwICsgYjMqYTMwO1xuICAgIG91dFsxXSA9IGIwKmEwMSArIGIxKmExMSArIGIyKmEyMSArIGIzKmEzMTtcbiAgICBvdXRbMl0gPSBiMCphMDIgKyBiMSphMTIgKyBiMiphMjIgKyBiMyphMzI7XG4gICAgb3V0WzNdID0gYjAqYTAzICsgYjEqYTEzICsgYjIqYTIzICsgYjMqYTMzO1xuXG4gICAgYjAgPSBiWzRdOyBiMSA9IGJbNV07IGIyID0gYls2XTsgYjMgPSBiWzddO1xuICAgIG91dFs0XSA9IGIwKmEwMCArIGIxKmExMCArIGIyKmEyMCArIGIzKmEzMDtcbiAgICBvdXRbNV0gPSBiMCphMDEgKyBiMSphMTEgKyBiMiphMjEgKyBiMyphMzE7XG4gICAgb3V0WzZdID0gYjAqYTAyICsgYjEqYTEyICsgYjIqYTIyICsgYjMqYTMyO1xuICAgIG91dFs3XSA9IGIwKmEwMyArIGIxKmExMyArIGIyKmEyMyArIGIzKmEzMztcblxuICAgIGIwID0gYls4XTsgYjEgPSBiWzldOyBiMiA9IGJbMTBdOyBiMyA9IGJbMTFdO1xuICAgIG91dFs4XSA9IGIwKmEwMCArIGIxKmExMCArIGIyKmEyMCArIGIzKmEzMDtcbiAgICBvdXRbOV0gPSBiMCphMDEgKyBiMSphMTEgKyBiMiphMjEgKyBiMyphMzE7XG4gICAgb3V0WzEwXSA9IGIwKmEwMiArIGIxKmExMiArIGIyKmEyMiArIGIzKmEzMjtcbiAgICBvdXRbMTFdID0gYjAqYTAzICsgYjEqYTEzICsgYjIqYTIzICsgYjMqYTMzO1xuXG4gICAgYjAgPSBiWzEyXTsgYjEgPSBiWzEzXTsgYjIgPSBiWzE0XTsgYjMgPSBiWzE1XTtcbiAgICBvdXRbMTJdID0gYjAqYTAwICsgYjEqYTEwICsgYjIqYTIwICsgYjMqYTMwO1xuICAgIG91dFsxM10gPSBiMCphMDEgKyBiMSphMTEgKyBiMiphMjEgKyBiMyphMzE7XG4gICAgb3V0WzE0XSA9IGIwKmEwMiArIGIxKmExMiArIGIyKmEyMiArIGIzKmEzMjtcbiAgICBvdXRbMTVdID0gYjAqYTAzICsgYjEqYTEzICsgYjIqYTIzICsgYjMqYTMzO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgbWF0NC5tdWx0aXBseX1cbiAqIEBmdW5jdGlvblxuICovXG5tYXQ0Lm11bCA9IG1hdDQubXVsdGlwbHk7XG5cbi8qKlxuICogVHJhbnNsYXRlIGEgbWF0NCBieSB0aGUgZ2l2ZW4gdmVjdG9yXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIHRyYW5zbGF0ZVxuICogQHBhcmFtIHt2ZWMzfSB2IHZlY3RvciB0byB0cmFuc2xhdGUgYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC50cmFuc2xhdGUgPSBmdW5jdGlvbiAob3V0LCBhLCB2KSB7XG4gICAgdmFyIHggPSB2WzBdLCB5ID0gdlsxXSwgeiA9IHZbMl0sXG4gICAgICAgIGEwMCwgYTAxLCBhMDIsIGEwMyxcbiAgICAgICAgYTEwLCBhMTEsIGExMiwgYTEzLFxuICAgICAgICBhMjAsIGEyMSwgYTIyLCBhMjM7XG5cbiAgICBpZiAoYSA9PT0gb3V0KSB7XG4gICAgICAgIG91dFsxMl0gPSBhWzBdICogeCArIGFbNF0gKiB5ICsgYVs4XSAqIHogKyBhWzEyXTtcbiAgICAgICAgb3V0WzEzXSA9IGFbMV0gKiB4ICsgYVs1XSAqIHkgKyBhWzldICogeiArIGFbMTNdO1xuICAgICAgICBvdXRbMTRdID0gYVsyXSAqIHggKyBhWzZdICogeSArIGFbMTBdICogeiArIGFbMTRdO1xuICAgICAgICBvdXRbMTVdID0gYVszXSAqIHggKyBhWzddICogeSArIGFbMTFdICogeiArIGFbMTVdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGEwMCA9IGFbMF07IGEwMSA9IGFbMV07IGEwMiA9IGFbMl07IGEwMyA9IGFbM107XG4gICAgICAgIGExMCA9IGFbNF07IGExMSA9IGFbNV07IGExMiA9IGFbNl07IGExMyA9IGFbN107XG4gICAgICAgIGEyMCA9IGFbOF07IGEyMSA9IGFbOV07IGEyMiA9IGFbMTBdOyBhMjMgPSBhWzExXTtcblxuICAgICAgICBvdXRbMF0gPSBhMDA7IG91dFsxXSA9IGEwMTsgb3V0WzJdID0gYTAyOyBvdXRbM10gPSBhMDM7XG4gICAgICAgIG91dFs0XSA9IGExMDsgb3V0WzVdID0gYTExOyBvdXRbNl0gPSBhMTI7IG91dFs3XSA9IGExMztcbiAgICAgICAgb3V0WzhdID0gYTIwOyBvdXRbOV0gPSBhMjE7IG91dFsxMF0gPSBhMjI7IG91dFsxMV0gPSBhMjM7XG5cbiAgICAgICAgb3V0WzEyXSA9IGEwMCAqIHggKyBhMTAgKiB5ICsgYTIwICogeiArIGFbMTJdO1xuICAgICAgICBvdXRbMTNdID0gYTAxICogeCArIGExMSAqIHkgKyBhMjEgKiB6ICsgYVsxM107XG4gICAgICAgIG91dFsxNF0gPSBhMDIgKiB4ICsgYTEyICogeSArIGEyMiAqIHogKyBhWzE0XTtcbiAgICAgICAgb3V0WzE1XSA9IGEwMyAqIHggKyBhMTMgKiB5ICsgYTIzICogeiArIGFbMTVdO1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFNjYWxlcyB0aGUgbWF0NCBieSB0aGUgZGltZW5zaW9ucyBpbiB0aGUgZ2l2ZW4gdmVjM1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIG1hdHJpeCB0byBzY2FsZVxuICogQHBhcmFtIHt2ZWMzfSB2IHRoZSB2ZWMzIHRvIHNjYWxlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqKi9cbm1hdDQuc2NhbGUgPSBmdW5jdGlvbihvdXQsIGEsIHYpIHtcbiAgICB2YXIgeCA9IHZbMF0sIHkgPSB2WzFdLCB6ID0gdlsyXTtcblxuICAgIG91dFswXSA9IGFbMF0gKiB4O1xuICAgIG91dFsxXSA9IGFbMV0gKiB4O1xuICAgIG91dFsyXSA9IGFbMl0gKiB4O1xuICAgIG91dFszXSA9IGFbM10gKiB4O1xuICAgIG91dFs0XSA9IGFbNF0gKiB5O1xuICAgIG91dFs1XSA9IGFbNV0gKiB5O1xuICAgIG91dFs2XSA9IGFbNl0gKiB5O1xuICAgIG91dFs3XSA9IGFbN10gKiB5O1xuICAgIG91dFs4XSA9IGFbOF0gKiB6O1xuICAgIG91dFs5XSA9IGFbOV0gKiB6O1xuICAgIG91dFsxMF0gPSBhWzEwXSAqIHo7XG4gICAgb3V0WzExXSA9IGFbMTFdICogejtcbiAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUm90YXRlcyBhIG1hdDQgYnkgdGhlIGdpdmVuIGFuZ2xlXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEBwYXJhbSB7dmVjM30gYXhpcyB0aGUgYXhpcyB0byByb3RhdGUgYXJvdW5kXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQucm90YXRlID0gZnVuY3Rpb24gKG91dCwgYSwgcmFkLCBheGlzKSB7XG4gICAgdmFyIHggPSBheGlzWzBdLCB5ID0gYXhpc1sxXSwgeiA9IGF4aXNbMl0sXG4gICAgICAgIGxlbiA9IE1hdGguc3FydCh4ICogeCArIHkgKiB5ICsgeiAqIHopLFxuICAgICAgICBzLCBjLCB0LFxuICAgICAgICBhMDAsIGEwMSwgYTAyLCBhMDMsXG4gICAgICAgIGExMCwgYTExLCBhMTIsIGExMyxcbiAgICAgICAgYTIwLCBhMjEsIGEyMiwgYTIzLFxuICAgICAgICBiMDAsIGIwMSwgYjAyLFxuICAgICAgICBiMTAsIGIxMSwgYjEyLFxuICAgICAgICBiMjAsIGIyMSwgYjIyO1xuXG4gICAgaWYgKE1hdGguYWJzKGxlbikgPCBHTE1BVF9FUFNJTE9OKSB7IHJldHVybiBudWxsOyB9XG4gICAgXG4gICAgbGVuID0gMSAvIGxlbjtcbiAgICB4ICo9IGxlbjtcbiAgICB5ICo9IGxlbjtcbiAgICB6ICo9IGxlbjtcblxuICAgIHMgPSBNYXRoLnNpbihyYWQpO1xuICAgIGMgPSBNYXRoLmNvcyhyYWQpO1xuICAgIHQgPSAxIC0gYztcblxuICAgIGEwMCA9IGFbMF07IGEwMSA9IGFbMV07IGEwMiA9IGFbMl07IGEwMyA9IGFbM107XG4gICAgYTEwID0gYVs0XTsgYTExID0gYVs1XTsgYTEyID0gYVs2XTsgYTEzID0gYVs3XTtcbiAgICBhMjAgPSBhWzhdOyBhMjEgPSBhWzldOyBhMjIgPSBhWzEwXTsgYTIzID0gYVsxMV07XG5cbiAgICAvLyBDb25zdHJ1Y3QgdGhlIGVsZW1lbnRzIG9mIHRoZSByb3RhdGlvbiBtYXRyaXhcbiAgICBiMDAgPSB4ICogeCAqIHQgKyBjOyBiMDEgPSB5ICogeCAqIHQgKyB6ICogczsgYjAyID0geiAqIHggKiB0IC0geSAqIHM7XG4gICAgYjEwID0geCAqIHkgKiB0IC0geiAqIHM7IGIxMSA9IHkgKiB5ICogdCArIGM7IGIxMiA9IHogKiB5ICogdCArIHggKiBzO1xuICAgIGIyMCA9IHggKiB6ICogdCArIHkgKiBzOyBiMjEgPSB5ICogeiAqIHQgLSB4ICogczsgYjIyID0geiAqIHogKiB0ICsgYztcblxuICAgIC8vIFBlcmZvcm0gcm90YXRpb24tc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgb3V0WzBdID0gYTAwICogYjAwICsgYTEwICogYjAxICsgYTIwICogYjAyO1xuICAgIG91dFsxXSA9IGEwMSAqIGIwMCArIGExMSAqIGIwMSArIGEyMSAqIGIwMjtcbiAgICBvdXRbMl0gPSBhMDIgKiBiMDAgKyBhMTIgKiBiMDEgKyBhMjIgKiBiMDI7XG4gICAgb3V0WzNdID0gYTAzICogYjAwICsgYTEzICogYjAxICsgYTIzICogYjAyO1xuICAgIG91dFs0XSA9IGEwMCAqIGIxMCArIGExMCAqIGIxMSArIGEyMCAqIGIxMjtcbiAgICBvdXRbNV0gPSBhMDEgKiBiMTAgKyBhMTEgKiBiMTEgKyBhMjEgKiBiMTI7XG4gICAgb3V0WzZdID0gYTAyICogYjEwICsgYTEyICogYjExICsgYTIyICogYjEyO1xuICAgIG91dFs3XSA9IGEwMyAqIGIxMCArIGExMyAqIGIxMSArIGEyMyAqIGIxMjtcbiAgICBvdXRbOF0gPSBhMDAgKiBiMjAgKyBhMTAgKiBiMjEgKyBhMjAgKiBiMjI7XG4gICAgb3V0WzldID0gYTAxICogYjIwICsgYTExICogYjIxICsgYTIxICogYjIyO1xuICAgIG91dFsxMF0gPSBhMDIgKiBiMjAgKyBhMTIgKiBiMjEgKyBhMjIgKiBiMjI7XG4gICAgb3V0WzExXSA9IGEwMyAqIGIyMCArIGExMyAqIGIyMSArIGEyMyAqIGIyMjtcblxuICAgIGlmIChhICE9PSBvdXQpIHsgLy8gSWYgdGhlIHNvdXJjZSBhbmQgZGVzdGluYXRpb24gZGlmZmVyLCBjb3B5IHRoZSB1bmNoYW5nZWQgbGFzdCByb3dcbiAgICAgICAgb3V0WzEyXSA9IGFbMTJdO1xuICAgICAgICBvdXRbMTNdID0gYVsxM107XG4gICAgICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICAgICAgb3V0WzE1XSA9IGFbMTVdO1xuICAgIH1cbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSb3RhdGVzIGEgbWF0cml4IGJ5IHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFggYXhpc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQucm90YXRlWCA9IGZ1bmN0aW9uIChvdXQsIGEsIHJhZCkge1xuICAgIHZhciBzID0gTWF0aC5zaW4ocmFkKSxcbiAgICAgICAgYyA9IE1hdGguY29zKHJhZCksXG4gICAgICAgIGExMCA9IGFbNF0sXG4gICAgICAgIGExMSA9IGFbNV0sXG4gICAgICAgIGExMiA9IGFbNl0sXG4gICAgICAgIGExMyA9IGFbN10sXG4gICAgICAgIGEyMCA9IGFbOF0sXG4gICAgICAgIGEyMSA9IGFbOV0sXG4gICAgICAgIGEyMiA9IGFbMTBdLFxuICAgICAgICBhMjMgPSBhWzExXTtcblxuICAgIGlmIChhICE9PSBvdXQpIHsgLy8gSWYgdGhlIHNvdXJjZSBhbmQgZGVzdGluYXRpb24gZGlmZmVyLCBjb3B5IHRoZSB1bmNoYW5nZWQgcm93c1xuICAgICAgICBvdXRbMF0gID0gYVswXTtcbiAgICAgICAgb3V0WzFdICA9IGFbMV07XG4gICAgICAgIG91dFsyXSAgPSBhWzJdO1xuICAgICAgICBvdXRbM10gID0gYVszXTtcbiAgICAgICAgb3V0WzEyXSA9IGFbMTJdO1xuICAgICAgICBvdXRbMTNdID0gYVsxM107XG4gICAgICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICAgICAgb3V0WzE1XSA9IGFbMTVdO1xuICAgIH1cblxuICAgIC8vIFBlcmZvcm0gYXhpcy1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cbiAgICBvdXRbNF0gPSBhMTAgKiBjICsgYTIwICogcztcbiAgICBvdXRbNV0gPSBhMTEgKiBjICsgYTIxICogcztcbiAgICBvdXRbNl0gPSBhMTIgKiBjICsgYTIyICogcztcbiAgICBvdXRbN10gPSBhMTMgKiBjICsgYTIzICogcztcbiAgICBvdXRbOF0gPSBhMjAgKiBjIC0gYTEwICogcztcbiAgICBvdXRbOV0gPSBhMjEgKiBjIC0gYTExICogcztcbiAgICBvdXRbMTBdID0gYTIyICogYyAtIGExMiAqIHM7XG4gICAgb3V0WzExXSA9IGEyMyAqIGMgLSBhMTMgKiBzO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJvdGF0ZXMgYSBtYXRyaXggYnkgdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWSBheGlzXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5yb3RhdGVZID0gZnVuY3Rpb24gKG91dCwgYSwgcmFkKSB7XG4gICAgdmFyIHMgPSBNYXRoLnNpbihyYWQpLFxuICAgICAgICBjID0gTWF0aC5jb3MocmFkKSxcbiAgICAgICAgYTAwID0gYVswXSxcbiAgICAgICAgYTAxID0gYVsxXSxcbiAgICAgICAgYTAyID0gYVsyXSxcbiAgICAgICAgYTAzID0gYVszXSxcbiAgICAgICAgYTIwID0gYVs4XSxcbiAgICAgICAgYTIxID0gYVs5XSxcbiAgICAgICAgYTIyID0gYVsxMF0sXG4gICAgICAgIGEyMyA9IGFbMTFdO1xuXG4gICAgaWYgKGEgIT09IG91dCkgeyAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCByb3dzXG4gICAgICAgIG91dFs0XSAgPSBhWzRdO1xuICAgICAgICBvdXRbNV0gID0gYVs1XTtcbiAgICAgICAgb3V0WzZdICA9IGFbNl07XG4gICAgICAgIG91dFs3XSAgPSBhWzddO1xuICAgICAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICAgICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgICAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgfVxuXG4gICAgLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuICAgIG91dFswXSA9IGEwMCAqIGMgLSBhMjAgKiBzO1xuICAgIG91dFsxXSA9IGEwMSAqIGMgLSBhMjEgKiBzO1xuICAgIG91dFsyXSA9IGEwMiAqIGMgLSBhMjIgKiBzO1xuICAgIG91dFszXSA9IGEwMyAqIGMgLSBhMjMgKiBzO1xuICAgIG91dFs4XSA9IGEwMCAqIHMgKyBhMjAgKiBjO1xuICAgIG91dFs5XSA9IGEwMSAqIHMgKyBhMjEgKiBjO1xuICAgIG91dFsxMF0gPSBhMDIgKiBzICsgYTIyICogYztcbiAgICBvdXRbMTFdID0gYTAzICogcyArIGEyMyAqIGM7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUm90YXRlcyBhIG1hdHJpeCBieSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBaIGF4aXNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LnJvdGF0ZVogPSBmdW5jdGlvbiAob3V0LCBhLCByYWQpIHtcbiAgICB2YXIgcyA9IE1hdGguc2luKHJhZCksXG4gICAgICAgIGMgPSBNYXRoLmNvcyhyYWQpLFxuICAgICAgICBhMDAgPSBhWzBdLFxuICAgICAgICBhMDEgPSBhWzFdLFxuICAgICAgICBhMDIgPSBhWzJdLFxuICAgICAgICBhMDMgPSBhWzNdLFxuICAgICAgICBhMTAgPSBhWzRdLFxuICAgICAgICBhMTEgPSBhWzVdLFxuICAgICAgICBhMTIgPSBhWzZdLFxuICAgICAgICBhMTMgPSBhWzddO1xuXG4gICAgaWYgKGEgIT09IG91dCkgeyAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCBsYXN0IHJvd1xuICAgICAgICBvdXRbOF0gID0gYVs4XTtcbiAgICAgICAgb3V0WzldICA9IGFbOV07XG4gICAgICAgIG91dFsxMF0gPSBhWzEwXTtcbiAgICAgICAgb3V0WzExXSA9IGFbMTFdO1xuICAgICAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICAgICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgICAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgfVxuXG4gICAgLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuICAgIG91dFswXSA9IGEwMCAqIGMgKyBhMTAgKiBzO1xuICAgIG91dFsxXSA9IGEwMSAqIGMgKyBhMTEgKiBzO1xuICAgIG91dFsyXSA9IGEwMiAqIGMgKyBhMTIgKiBzO1xuICAgIG91dFszXSA9IGEwMyAqIGMgKyBhMTMgKiBzO1xuICAgIG91dFs0XSA9IGExMCAqIGMgLSBhMDAgKiBzO1xuICAgIG91dFs1XSA9IGExMSAqIGMgLSBhMDEgKiBzO1xuICAgIG91dFs2XSA9IGExMiAqIGMgLSBhMDIgKiBzO1xuICAgIG91dFs3XSA9IGExMyAqIGMgLSBhMDMgKiBzO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSBhIHF1YXRlcm5pb24gcm90YXRpb24gYW5kIHZlY3RvciB0cmFuc2xhdGlvblxuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gKlxuICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XG4gKiAgICAgbWF0NC50cmFuc2xhdGUoZGVzdCwgdmVjKTtcbiAqICAgICB2YXIgcXVhdE1hdCA9IG1hdDQuY3JlYXRlKCk7XG4gKiAgICAgcXVhdDQudG9NYXQ0KHF1YXQsIHF1YXRNYXQpO1xuICogICAgIG1hdDQubXVsdGlwbHkoZGVzdCwgcXVhdE1hdCk7XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtxdWF0NH0gcSBSb3RhdGlvbiBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3ZlYzN9IHYgVHJhbnNsYXRpb24gdmVjdG9yXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuZnJvbVJvdGF0aW9uVHJhbnNsYXRpb24gPSBmdW5jdGlvbiAob3V0LCBxLCB2KSB7XG4gICAgLy8gUXVhdGVybmlvbiBtYXRoXG4gICAgdmFyIHggPSBxWzBdLCB5ID0gcVsxXSwgeiA9IHFbMl0sIHcgPSBxWzNdLFxuICAgICAgICB4MiA9IHggKyB4LFxuICAgICAgICB5MiA9IHkgKyB5LFxuICAgICAgICB6MiA9IHogKyB6LFxuXG4gICAgICAgIHh4ID0geCAqIHgyLFxuICAgICAgICB4eSA9IHggKiB5MixcbiAgICAgICAgeHogPSB4ICogejIsXG4gICAgICAgIHl5ID0geSAqIHkyLFxuICAgICAgICB5eiA9IHkgKiB6MixcbiAgICAgICAgenogPSB6ICogejIsXG4gICAgICAgIHd4ID0gdyAqIHgyLFxuICAgICAgICB3eSA9IHcgKiB5MixcbiAgICAgICAgd3ogPSB3ICogejI7XG5cbiAgICBvdXRbMF0gPSAxIC0gKHl5ICsgenopO1xuICAgIG91dFsxXSA9IHh5ICsgd3o7XG4gICAgb3V0WzJdID0geHogLSB3eTtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IHh5IC0gd3o7XG4gICAgb3V0WzVdID0gMSAtICh4eCArIHp6KTtcbiAgICBvdXRbNl0gPSB5eiArIHd4O1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0geHogKyB3eTtcbiAgICBvdXRbOV0gPSB5eiAtIHd4O1xuICAgIG91dFsxMF0gPSAxIC0gKHh4ICsgeXkpO1xuICAgIG91dFsxMV0gPSAwO1xuICAgIG91dFsxMl0gPSB2WzBdO1xuICAgIG91dFsxM10gPSB2WzFdO1xuICAgIG91dFsxNF0gPSB2WzJdO1xuICAgIG91dFsxNV0gPSAxO1xuICAgIFxuICAgIHJldHVybiBvdXQ7XG59O1xuXG5tYXQ0LmZyb21RdWF0ID0gZnVuY3Rpb24gKG91dCwgcSkge1xuICAgIHZhciB4ID0gcVswXSwgeSA9IHFbMV0sIHogPSBxWzJdLCB3ID0gcVszXSxcbiAgICAgICAgeDIgPSB4ICsgeCxcbiAgICAgICAgeTIgPSB5ICsgeSxcbiAgICAgICAgejIgPSB6ICsgeixcblxuICAgICAgICB4eCA9IHggKiB4MixcbiAgICAgICAgeXggPSB5ICogeDIsXG4gICAgICAgIHl5ID0geSAqIHkyLFxuICAgICAgICB6eCA9IHogKiB4MixcbiAgICAgICAgenkgPSB6ICogeTIsXG4gICAgICAgIHp6ID0geiAqIHoyLFxuICAgICAgICB3eCA9IHcgKiB4MixcbiAgICAgICAgd3kgPSB3ICogeTIsXG4gICAgICAgIHd6ID0gdyAqIHoyO1xuXG4gICAgb3V0WzBdID0gMSAtIHl5IC0geno7XG4gICAgb3V0WzFdID0geXggKyB3ejtcbiAgICBvdXRbMl0gPSB6eCAtIHd5O1xuICAgIG91dFszXSA9IDA7XG5cbiAgICBvdXRbNF0gPSB5eCAtIHd6O1xuICAgIG91dFs1XSA9IDEgLSB4eCAtIHp6O1xuICAgIG91dFs2XSA9IHp5ICsgd3g7XG4gICAgb3V0WzddID0gMDtcblxuICAgIG91dFs4XSA9IHp4ICsgd3k7XG4gICAgb3V0WzldID0genkgLSB3eDtcbiAgICBvdXRbMTBdID0gMSAtIHh4IC0geXk7XG4gICAgb3V0WzExXSA9IDA7XG5cbiAgICBvdXRbMTJdID0gMDtcbiAgICBvdXRbMTNdID0gMDtcbiAgICBvdXRbMTRdID0gMDtcbiAgICBvdXRbMTVdID0gMTtcblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhIGZydXN0dW0gbWF0cml4IHdpdGggdGhlIGdpdmVuIGJvdW5kc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAqIEBwYXJhbSB7TnVtYmVyfSBsZWZ0IExlZnQgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7TnVtYmVyfSByaWdodCBSaWdodCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtOdW1iZXJ9IGJvdHRvbSBCb3R0b20gYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7TnVtYmVyfSB0b3AgVG9wIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge051bWJlcn0gbmVhciBOZWFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge051bWJlcn0gZmFyIEZhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LmZydXN0dW0gPSBmdW5jdGlvbiAob3V0LCBsZWZ0LCByaWdodCwgYm90dG9tLCB0b3AsIG5lYXIsIGZhcikge1xuICAgIHZhciBybCA9IDEgLyAocmlnaHQgLSBsZWZ0KSxcbiAgICAgICAgdGIgPSAxIC8gKHRvcCAtIGJvdHRvbSksXG4gICAgICAgIG5mID0gMSAvIChuZWFyIC0gZmFyKTtcbiAgICBvdXRbMF0gPSAobmVhciAqIDIpICogcmw7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSAobmVhciAqIDIpICogdGI7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IChyaWdodCArIGxlZnQpICogcmw7XG4gICAgb3V0WzldID0gKHRvcCArIGJvdHRvbSkgKiB0YjtcbiAgICBvdXRbMTBdID0gKGZhciArIG5lYXIpICogbmY7XG4gICAgb3V0WzExXSA9IC0xO1xuICAgIG91dFsxMl0gPSAwO1xuICAgIG91dFsxM10gPSAwO1xuICAgIG91dFsxNF0gPSAoZmFyICogbmVhciAqIDIpICogbmY7XG4gICAgb3V0WzE1XSA9IDA7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgcGVyc3BlY3RpdmUgcHJvamVjdGlvbiBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gYm91bmRzXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICogQHBhcmFtIHtudW1iZXJ9IGZvdnkgVmVydGljYWwgZmllbGQgb2YgdmlldyBpbiByYWRpYW5zXG4gKiBAcGFyYW0ge251bWJlcn0gYXNwZWN0IEFzcGVjdCByYXRpby4gdHlwaWNhbGx5IHZpZXdwb3J0IHdpZHRoL2hlaWdodFxuICogQHBhcmFtIHtudW1iZXJ9IG5lYXIgTmVhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtudW1iZXJ9IGZhciBGYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5wZXJzcGVjdGl2ZSA9IGZ1bmN0aW9uIChvdXQsIGZvdnksIGFzcGVjdCwgbmVhciwgZmFyKSB7XG4gICAgdmFyIGYgPSAxLjAgLyBNYXRoLnRhbihmb3Z5IC8gMiksXG4gICAgICAgIG5mID0gMSAvIChuZWFyIC0gZmFyKTtcbiAgICBvdXRbMF0gPSBmIC8gYXNwZWN0O1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gZjtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMDtcbiAgICBvdXRbOV0gPSAwO1xuICAgIG91dFsxMF0gPSAoZmFyICsgbmVhcikgKiBuZjtcbiAgICBvdXRbMTFdID0gLTE7XG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9ICgyICogZmFyICogbmVhcikgKiBuZjtcbiAgICBvdXRbMTVdID0gMDtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBvcnRob2dvbmFsIHByb2plY3Rpb24gbWF0cml4IHdpdGggdGhlIGdpdmVuIGJvdW5kc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAqIEBwYXJhbSB7bnVtYmVyfSBsZWZ0IExlZnQgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSByaWdodCBSaWdodCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtudW1iZXJ9IGJvdHRvbSBCb3R0b20gYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSB0b3AgVG9wIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gbmVhciBOZWFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gZmFyIEZhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0Lm9ydGhvID0gZnVuY3Rpb24gKG91dCwgbGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIpIHtcbiAgICB2YXIgbHIgPSAxIC8gKGxlZnQgLSByaWdodCksXG4gICAgICAgIGJ0ID0gMSAvIChib3R0b20gLSB0b3ApLFxuICAgICAgICBuZiA9IDEgLyAobmVhciAtIGZhcik7XG4gICAgb3V0WzBdID0gLTIgKiBscjtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSAwO1xuICAgIG91dFs1XSA9IC0yICogYnQ7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IDA7XG4gICAgb3V0WzldID0gMDtcbiAgICBvdXRbMTBdID0gMiAqIG5mO1xuICAgIG91dFsxMV0gPSAwO1xuICAgIG91dFsxMl0gPSAobGVmdCArIHJpZ2h0KSAqIGxyO1xuICAgIG91dFsxM10gPSAodG9wICsgYm90dG9tKSAqIGJ0O1xuICAgIG91dFsxNF0gPSAoZmFyICsgbmVhcikgKiBuZjtcbiAgICBvdXRbMTVdID0gMTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBsb29rLWF0IG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBleWUgcG9zaXRpb24sIGZvY2FsIHBvaW50LCBhbmQgdXAgYXhpc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAqIEBwYXJhbSB7dmVjM30gZXllIFBvc2l0aW9uIG9mIHRoZSB2aWV3ZXJcbiAqIEBwYXJhbSB7dmVjM30gY2VudGVyIFBvaW50IHRoZSB2aWV3ZXIgaXMgbG9va2luZyBhdFxuICogQHBhcmFtIHt2ZWMzfSB1cCB2ZWMzIHBvaW50aW5nIHVwXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQubG9va0F0ID0gZnVuY3Rpb24gKG91dCwgZXllLCBjZW50ZXIsIHVwKSB7XG4gICAgdmFyIHgwLCB4MSwgeDIsIHkwLCB5MSwgeTIsIHowLCB6MSwgejIsIGxlbixcbiAgICAgICAgZXlleCA9IGV5ZVswXSxcbiAgICAgICAgZXlleSA9IGV5ZVsxXSxcbiAgICAgICAgZXlleiA9IGV5ZVsyXSxcbiAgICAgICAgdXB4ID0gdXBbMF0sXG4gICAgICAgIHVweSA9IHVwWzFdLFxuICAgICAgICB1cHogPSB1cFsyXSxcbiAgICAgICAgY2VudGVyeCA9IGNlbnRlclswXSxcbiAgICAgICAgY2VudGVyeSA9IGNlbnRlclsxXSxcbiAgICAgICAgY2VudGVyeiA9IGNlbnRlclsyXTtcblxuICAgIGlmIChNYXRoLmFicyhleWV4IC0gY2VudGVyeCkgPCBHTE1BVF9FUFNJTE9OICYmXG4gICAgICAgIE1hdGguYWJzKGV5ZXkgLSBjZW50ZXJ5KSA8IEdMTUFUX0VQU0lMT04gJiZcbiAgICAgICAgTWF0aC5hYnMoZXlleiAtIGNlbnRlcnopIDwgR0xNQVRfRVBTSUxPTikge1xuICAgICAgICByZXR1cm4gbWF0NC5pZGVudGl0eShvdXQpO1xuICAgIH1cblxuICAgIHowID0gZXlleCAtIGNlbnRlcng7XG4gICAgejEgPSBleWV5IC0gY2VudGVyeTtcbiAgICB6MiA9IGV5ZXogLSBjZW50ZXJ6O1xuXG4gICAgbGVuID0gMSAvIE1hdGguc3FydCh6MCAqIHowICsgejEgKiB6MSArIHoyICogejIpO1xuICAgIHowICo9IGxlbjtcbiAgICB6MSAqPSBsZW47XG4gICAgejIgKj0gbGVuO1xuXG4gICAgeDAgPSB1cHkgKiB6MiAtIHVweiAqIHoxO1xuICAgIHgxID0gdXB6ICogejAgLSB1cHggKiB6MjtcbiAgICB4MiA9IHVweCAqIHoxIC0gdXB5ICogejA7XG4gICAgbGVuID0gTWF0aC5zcXJ0KHgwICogeDAgKyB4MSAqIHgxICsgeDIgKiB4Mik7XG4gICAgaWYgKCFsZW4pIHtcbiAgICAgICAgeDAgPSAwO1xuICAgICAgICB4MSA9IDA7XG4gICAgICAgIHgyID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZW4gPSAxIC8gbGVuO1xuICAgICAgICB4MCAqPSBsZW47XG4gICAgICAgIHgxICo9IGxlbjtcbiAgICAgICAgeDIgKj0gbGVuO1xuICAgIH1cblxuICAgIHkwID0gejEgKiB4MiAtIHoyICogeDE7XG4gICAgeTEgPSB6MiAqIHgwIC0gejAgKiB4MjtcbiAgICB5MiA9IHowICogeDEgLSB6MSAqIHgwO1xuXG4gICAgbGVuID0gTWF0aC5zcXJ0KHkwICogeTAgKyB5MSAqIHkxICsgeTIgKiB5Mik7XG4gICAgaWYgKCFsZW4pIHtcbiAgICAgICAgeTAgPSAwO1xuICAgICAgICB5MSA9IDA7XG4gICAgICAgIHkyID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZW4gPSAxIC8gbGVuO1xuICAgICAgICB5MCAqPSBsZW47XG4gICAgICAgIHkxICo9IGxlbjtcbiAgICAgICAgeTIgKj0gbGVuO1xuICAgIH1cblxuICAgIG91dFswXSA9IHgwO1xuICAgIG91dFsxXSA9IHkwO1xuICAgIG91dFsyXSA9IHowO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0geDE7XG4gICAgb3V0WzVdID0geTE7XG4gICAgb3V0WzZdID0gejE7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSB4MjtcbiAgICBvdXRbOV0gPSB5MjtcbiAgICBvdXRbMTBdID0gejI7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IC0oeDAgKiBleWV4ICsgeDEgKiBleWV5ICsgeDIgKiBleWV6KTtcbiAgICBvdXRbMTNdID0gLSh5MCAqIGV5ZXggKyB5MSAqIGV5ZXkgKyB5MiAqIGV5ZXopO1xuICAgIG91dFsxNF0gPSAtKHowICogZXlleCArIHoxICogZXlleSArIHoyICogZXlleik7XG4gICAgb3V0WzE1XSA9IDE7XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgbWF0NFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gbWF0IG1hdHJpeCB0byByZXByZXNlbnQgYXMgYSBzdHJpbmdcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgbWF0cml4XG4gKi9cbm1hdDQuc3RyID0gZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4gJ21hdDQoJyArIGFbMF0gKyAnLCAnICsgYVsxXSArICcsICcgKyBhWzJdICsgJywgJyArIGFbM10gKyAnLCAnICtcbiAgICAgICAgICAgICAgICAgICAgYVs0XSArICcsICcgKyBhWzVdICsgJywgJyArIGFbNl0gKyAnLCAnICsgYVs3XSArICcsICcgK1xuICAgICAgICAgICAgICAgICAgICBhWzhdICsgJywgJyArIGFbOV0gKyAnLCAnICsgYVsxMF0gKyAnLCAnICsgYVsxMV0gKyAnLCAnICsgXG4gICAgICAgICAgICAgICAgICAgIGFbMTJdICsgJywgJyArIGFbMTNdICsgJywgJyArIGFbMTRdICsgJywgJyArIGFbMTVdICsgJyknO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIEZyb2Jlbml1cyBub3JtIG9mIGEgbWF0NFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIGNhbGN1bGF0ZSBGcm9iZW5pdXMgbm9ybSBvZlxuICogQHJldHVybnMge051bWJlcn0gRnJvYmVuaXVzIG5vcm1cbiAqL1xubWF0NC5mcm9iID0gZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4oTWF0aC5zcXJ0KE1hdGgucG93KGFbMF0sIDIpICsgTWF0aC5wb3coYVsxXSwgMikgKyBNYXRoLnBvdyhhWzJdLCAyKSArIE1hdGgucG93KGFbM10sIDIpICsgTWF0aC5wb3coYVs0XSwgMikgKyBNYXRoLnBvdyhhWzVdLCAyKSArIE1hdGgucG93KGFbNl0sIDIpICsgTWF0aC5wb3coYVs2XSwgMikgKyBNYXRoLnBvdyhhWzddLCAyKSArIE1hdGgucG93KGFbOF0sIDIpICsgTWF0aC5wb3coYVs5XSwgMikgKyBNYXRoLnBvdyhhWzEwXSwgMikgKyBNYXRoLnBvdyhhWzExXSwgMikgKyBNYXRoLnBvdyhhWzEyXSwgMikgKyBNYXRoLnBvdyhhWzEzXSwgMikgKyBNYXRoLnBvdyhhWzE0XSwgMikgKyBNYXRoLnBvdyhhWzE1XSwgMikgKSlcbn07XG5cblxuaWYodHlwZW9mKGV4cG9ydHMpICE9PSAndW5kZWZpbmVkJykge1xuICAgIGV4cG9ydHMubWF0NCA9IG1hdDQ7XG59XG47XG4vKiBDb3B5cmlnaHQgKGMpIDIwMTMsIEJyYW5kb24gSm9uZXMsIENvbGluIE1hY0tlbnppZSBJVi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cblxuUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0IG1vZGlmaWNhdGlvbixcbmFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcblxuICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpc1xuICAgIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIFxuICAgIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuXG5USElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIiBBTkRcbkFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEXG5XQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIFxuRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1JcbkFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFU1xuKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTO1xuTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OXG5BTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVFxuKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVNcblNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLiAqL1xuXG4vKipcbiAqIEBjbGFzcyBRdWF0ZXJuaW9uXG4gKiBAbmFtZSBxdWF0XG4gKi9cblxudmFyIHF1YXQgPSB7fTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGlkZW50aXR5IHF1YXRcbiAqXG4gKiBAcmV0dXJucyB7cXVhdH0gYSBuZXcgcXVhdGVybmlvblxuICovXG5xdWF0LmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvdXQgPSBuZXcgR0xNQVRfQVJSQVlfVFlQRSg0KTtcbiAgICBvdXRbMF0gPSAwO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAxO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFNldHMgYSBxdWF0ZXJuaW9uIHRvIHJlcHJlc2VudCB0aGUgc2hvcnRlc3Qgcm90YXRpb24gZnJvbSBvbmVcbiAqIHZlY3RvciB0byBhbm90aGVyLlxuICpcbiAqIEJvdGggdmVjdG9ycyBhcmUgYXNzdW1lZCB0byBiZSB1bml0IGxlbmd0aC5cbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb24uXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGluaXRpYWwgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIGRlc3RpbmF0aW9uIHZlY3RvclxuICogQHJldHVybnMge3F1YXR9IG91dFxuICovXG5xdWF0LnJvdGF0aW9uVG8gPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRtcHZlYzMgPSB2ZWMzLmNyZWF0ZSgpO1xuICAgIHZhciB4VW5pdFZlYzMgPSB2ZWMzLmZyb21WYWx1ZXMoMSwwLDApO1xuICAgIHZhciB5VW5pdFZlYzMgPSB2ZWMzLmZyb21WYWx1ZXMoMCwxLDApO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgICAgICB2YXIgZG90ID0gdmVjMy5kb3QoYSwgYik7XG4gICAgICAgIGlmIChkb3QgPCAtMC45OTk5OTkpIHtcbiAgICAgICAgICAgIHZlYzMuY3Jvc3ModG1wdmVjMywgeFVuaXRWZWMzLCBhKTtcbiAgICAgICAgICAgIGlmICh2ZWMzLmxlbmd0aCh0bXB2ZWMzKSA8IDAuMDAwMDAxKVxuICAgICAgICAgICAgICAgIHZlYzMuY3Jvc3ModG1wdmVjMywgeVVuaXRWZWMzLCBhKTtcbiAgICAgICAgICAgIHZlYzMubm9ybWFsaXplKHRtcHZlYzMsIHRtcHZlYzMpO1xuICAgICAgICAgICAgcXVhdC5zZXRBeGlzQW5nbGUob3V0LCB0bXB2ZWMzLCBNYXRoLlBJKTtcbiAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH0gZWxzZSBpZiAoZG90ID4gMC45OTk5OTkpIHtcbiAgICAgICAgICAgIG91dFswXSA9IDA7XG4gICAgICAgICAgICBvdXRbMV0gPSAwO1xuICAgICAgICAgICAgb3V0WzJdID0gMDtcbiAgICAgICAgICAgIG91dFszXSA9IDE7XG4gICAgICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmVjMy5jcm9zcyh0bXB2ZWMzLCBhLCBiKTtcbiAgICAgICAgICAgIG91dFswXSA9IHRtcHZlYzNbMF07XG4gICAgICAgICAgICBvdXRbMV0gPSB0bXB2ZWMzWzFdO1xuICAgICAgICAgICAgb3V0WzJdID0gdG1wdmVjM1syXTtcbiAgICAgICAgICAgIG91dFszXSA9IDEgKyBkb3Q7XG4gICAgICAgICAgICByZXR1cm4gcXVhdC5ub3JtYWxpemUob3V0LCBvdXQpO1xuICAgICAgICB9XG4gICAgfTtcbn0pKCk7XG5cbi8qKlxuICogU2V0cyB0aGUgc3BlY2lmaWVkIHF1YXRlcm5pb24gd2l0aCB2YWx1ZXMgY29ycmVzcG9uZGluZyB0byB0aGUgZ2l2ZW5cbiAqIGF4ZXMuIEVhY2ggYXhpcyBpcyBhIHZlYzMgYW5kIGlzIGV4cGVjdGVkIHRvIGJlIHVuaXQgbGVuZ3RoIGFuZFxuICogcGVycGVuZGljdWxhciB0byBhbGwgb3RoZXIgc3BlY2lmaWVkIGF4ZXMuXG4gKlxuICogQHBhcmFtIHt2ZWMzfSB2aWV3ICB0aGUgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgdmlld2luZyBkaXJlY3Rpb25cbiAqIEBwYXJhbSB7dmVjM30gcmlnaHQgdGhlIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIGxvY2FsIFwicmlnaHRcIiBkaXJlY3Rpb25cbiAqIEBwYXJhbSB7dmVjM30gdXAgICAgdGhlIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIGxvY2FsIFwidXBcIiBkaXJlY3Rpb25cbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xucXVhdC5zZXRBeGVzID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBtYXRyID0gbWF0My5jcmVhdGUoKTtcblxuICAgIHJldHVybiBmdW5jdGlvbihvdXQsIHZpZXcsIHJpZ2h0LCB1cCkge1xuICAgICAgICBtYXRyWzBdID0gcmlnaHRbMF07XG4gICAgICAgIG1hdHJbM10gPSByaWdodFsxXTtcbiAgICAgICAgbWF0cls2XSA9IHJpZ2h0WzJdO1xuXG4gICAgICAgIG1hdHJbMV0gPSB1cFswXTtcbiAgICAgICAgbWF0cls0XSA9IHVwWzFdO1xuICAgICAgICBtYXRyWzddID0gdXBbMl07XG5cbiAgICAgICAgbWF0clsyXSA9IC12aWV3WzBdO1xuICAgICAgICBtYXRyWzVdID0gLXZpZXdbMV07XG4gICAgICAgIG1hdHJbOF0gPSAtdmlld1syXTtcblxuICAgICAgICByZXR1cm4gcXVhdC5ub3JtYWxpemUob3V0LCBxdWF0LmZyb21NYXQzKG91dCwgbWF0cikpO1xuICAgIH07XG59KSgpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgcXVhdCBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIHF1YXRlcm5pb25cbiAqXG4gKiBAcGFyYW0ge3F1YXR9IGEgcXVhdGVybmlvbiB0byBjbG9uZVxuICogQHJldHVybnMge3F1YXR9IGEgbmV3IHF1YXRlcm5pb25cbiAqIEBmdW5jdGlvblxuICovXG5xdWF0LmNsb25lID0gdmVjNC5jbG9uZTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHF1YXQgaW5pdGlhbGl6ZWQgd2l0aCB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geiBaIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHcgVyBjb21wb25lbnRcbiAqIEByZXR1cm5zIHtxdWF0fSBhIG5ldyBxdWF0ZXJuaW9uXG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5mcm9tVmFsdWVzID0gdmVjNC5mcm9tVmFsdWVzO1xuXG4vKipcbiAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSBxdWF0IHRvIGFub3RoZXJcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7cXVhdH0gYSB0aGUgc291cmNlIHF1YXRlcm5pb25cbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqIEBmdW5jdGlvblxuICovXG5xdWF0LmNvcHkgPSB2ZWM0LmNvcHk7XG5cbi8qKlxuICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgcXVhdCB0byB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge051bWJlcn0geCBYIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB6IFogY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0gdyBXIGNvbXBvbmVudFxuICogQHJldHVybnMge3F1YXR9IG91dFxuICogQGZ1bmN0aW9uXG4gKi9cbnF1YXQuc2V0ID0gdmVjNC5zZXQ7XG5cbi8qKlxuICogU2V0IGEgcXVhdCB0byB0aGUgaWRlbnRpdHkgcXVhdGVybmlvblxuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICogQHJldHVybnMge3F1YXR9IG91dFxuICovXG5xdWF0LmlkZW50aXR5ID0gZnVuY3Rpb24ob3V0KSB7XG4gICAgb3V0WzBdID0gMDtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTZXRzIGEgcXVhdCBmcm9tIHRoZSBnaXZlbiBhbmdsZSBhbmQgcm90YXRpb24gYXhpcyxcbiAqIHRoZW4gcmV0dXJucyBpdC5cbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7dmVjM30gYXhpcyB0aGUgYXhpcyBhcm91bmQgd2hpY2ggdG8gcm90YXRlXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSBpbiByYWRpYW5zXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKiovXG5xdWF0LnNldEF4aXNBbmdsZSA9IGZ1bmN0aW9uKG91dCwgYXhpcywgcmFkKSB7XG4gICAgcmFkID0gcmFkICogMC41O1xuICAgIHZhciBzID0gTWF0aC5zaW4ocmFkKTtcbiAgICBvdXRbMF0gPSBzICogYXhpc1swXTtcbiAgICBvdXRbMV0gPSBzICogYXhpc1sxXTtcbiAgICBvdXRbMl0gPSBzICogYXhpc1syXTtcbiAgICBvdXRbM10gPSBNYXRoLmNvcyhyYWQpO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFkZHMgdHdvIHF1YXQnc1xuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICogQHBhcmFtIHtxdWF0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3F1YXR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5hZGQgPSB2ZWM0LmFkZDtcblxuLyoqXG4gKiBNdWx0aXBsaWVzIHR3byBxdWF0J3NcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7cXVhdH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtxdWF0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3F1YXR9IG91dFxuICovXG5xdWF0Lm11bHRpcGx5ID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgdmFyIGF4ID0gYVswXSwgYXkgPSBhWzFdLCBheiA9IGFbMl0sIGF3ID0gYVszXSxcbiAgICAgICAgYnggPSBiWzBdLCBieSA9IGJbMV0sIGJ6ID0gYlsyXSwgYncgPSBiWzNdO1xuXG4gICAgb3V0WzBdID0gYXggKiBidyArIGF3ICogYnggKyBheSAqIGJ6IC0gYXogKiBieTtcbiAgICBvdXRbMV0gPSBheSAqIGJ3ICsgYXcgKiBieSArIGF6ICogYnggLSBheCAqIGJ6O1xuICAgIG91dFsyXSA9IGF6ICogYncgKyBhdyAqIGJ6ICsgYXggKiBieSAtIGF5ICogYng7XG4gICAgb3V0WzNdID0gYXcgKiBidyAtIGF4ICogYnggLSBheSAqIGJ5IC0gYXogKiBiejtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHF1YXQubXVsdGlwbHl9XG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5tdWwgPSBxdWF0Lm11bHRpcGx5O1xuXG4vKipcbiAqIFNjYWxlcyBhIHF1YXQgYnkgYSBzY2FsYXIgbnVtYmVyXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7cXVhdH0gYSB0aGUgdmVjdG9yIHRvIHNjYWxlXG4gKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIHZlY3RvciBieVxuICogQHJldHVybnMge3F1YXR9IG91dFxuICogQGZ1bmN0aW9uXG4gKi9cbnF1YXQuc2NhbGUgPSB2ZWM0LnNjYWxlO1xuXG4vKipcbiAqIFJvdGF0ZXMgYSBxdWF0ZXJuaW9uIGJ5IHRoZSBnaXZlbiBhbmdsZSBhYm91dCB0aGUgWCBheGlzXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgcXVhdCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtxdWF0fSBhIHF1YXQgdG8gcm90YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gcmFkIGFuZ2xlIChpbiByYWRpYW5zKSB0byByb3RhdGVcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xucXVhdC5yb3RhdGVYID0gZnVuY3Rpb24gKG91dCwgYSwgcmFkKSB7XG4gICAgcmFkICo9IDAuNTsgXG5cbiAgICB2YXIgYXggPSBhWzBdLCBheSA9IGFbMV0sIGF6ID0gYVsyXSwgYXcgPSBhWzNdLFxuICAgICAgICBieCA9IE1hdGguc2luKHJhZCksIGJ3ID0gTWF0aC5jb3MocmFkKTtcblxuICAgIG91dFswXSA9IGF4ICogYncgKyBhdyAqIGJ4O1xuICAgIG91dFsxXSA9IGF5ICogYncgKyBheiAqIGJ4O1xuICAgIG91dFsyXSA9IGF6ICogYncgLSBheSAqIGJ4O1xuICAgIG91dFszXSA9IGF3ICogYncgLSBheCAqIGJ4O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJvdGF0ZXMgYSBxdWF0ZXJuaW9uIGJ5IHRoZSBnaXZlbiBhbmdsZSBhYm91dCB0aGUgWSBheGlzXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgcXVhdCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtxdWF0fSBhIHF1YXQgdG8gcm90YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gcmFkIGFuZ2xlIChpbiByYWRpYW5zKSB0byByb3RhdGVcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xucXVhdC5yb3RhdGVZID0gZnVuY3Rpb24gKG91dCwgYSwgcmFkKSB7XG4gICAgcmFkICo9IDAuNTsgXG5cbiAgICB2YXIgYXggPSBhWzBdLCBheSA9IGFbMV0sIGF6ID0gYVsyXSwgYXcgPSBhWzNdLFxuICAgICAgICBieSA9IE1hdGguc2luKHJhZCksIGJ3ID0gTWF0aC5jb3MocmFkKTtcblxuICAgIG91dFswXSA9IGF4ICogYncgLSBheiAqIGJ5O1xuICAgIG91dFsxXSA9IGF5ICogYncgKyBhdyAqIGJ5O1xuICAgIG91dFsyXSA9IGF6ICogYncgKyBheCAqIGJ5O1xuICAgIG91dFszXSA9IGF3ICogYncgLSBheSAqIGJ5O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJvdGF0ZXMgYSBxdWF0ZXJuaW9uIGJ5IHRoZSBnaXZlbiBhbmdsZSBhYm91dCB0aGUgWiBheGlzXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgcXVhdCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtxdWF0fSBhIHF1YXQgdG8gcm90YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gcmFkIGFuZ2xlIChpbiByYWRpYW5zKSB0byByb3RhdGVcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xucXVhdC5yb3RhdGVaID0gZnVuY3Rpb24gKG91dCwgYSwgcmFkKSB7XG4gICAgcmFkICo9IDAuNTsgXG5cbiAgICB2YXIgYXggPSBhWzBdLCBheSA9IGFbMV0sIGF6ID0gYVsyXSwgYXcgPSBhWzNdLFxuICAgICAgICBieiA9IE1hdGguc2luKHJhZCksIGJ3ID0gTWF0aC5jb3MocmFkKTtcblxuICAgIG91dFswXSA9IGF4ICogYncgKyBheSAqIGJ6O1xuICAgIG91dFsxXSA9IGF5ICogYncgLSBheCAqIGJ6O1xuICAgIG91dFsyXSA9IGF6ICogYncgKyBhdyAqIGJ6O1xuICAgIG91dFszXSA9IGF3ICogYncgLSBheiAqIGJ6O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIFcgY29tcG9uZW50IG9mIGEgcXVhdCBmcm9tIHRoZSBYLCBZLCBhbmQgWiBjb21wb25lbnRzLlxuICogQXNzdW1lcyB0aGF0IHF1YXRlcm5pb24gaXMgMSB1bml0IGluIGxlbmd0aC5cbiAqIEFueSBleGlzdGluZyBXIGNvbXBvbmVudCB3aWxsIGJlIGlnbm9yZWQuXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3F1YXR9IGEgcXVhdCB0byBjYWxjdWxhdGUgVyBjb21wb25lbnQgb2ZcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xucXVhdC5jYWxjdWxhdGVXID0gZnVuY3Rpb24gKG91dCwgYSkge1xuICAgIHZhciB4ID0gYVswXSwgeSA9IGFbMV0sIHogPSBhWzJdO1xuXG4gICAgb3V0WzBdID0geDtcbiAgICBvdXRbMV0gPSB5O1xuICAgIG91dFsyXSA9IHo7XG4gICAgb3V0WzNdID0gLU1hdGguc3FydChNYXRoLmFicygxLjAgLSB4ICogeCAtIHkgKiB5IC0geiAqIHopKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0d28gcXVhdCdzXG4gKlxuICogQHBhcmFtIHtxdWF0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3F1YXR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkb3QgcHJvZHVjdCBvZiBhIGFuZCBiXG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5kb3QgPSB2ZWM0LmRvdDtcblxuLyoqXG4gKiBQZXJmb3JtcyBhIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIHF1YXQnc1xuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICogQHBhcmFtIHtxdWF0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3F1YXR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcGFyYW0ge051bWJlcn0gdCBpbnRlcnBvbGF0aW9uIGFtb3VudCBiZXR3ZWVuIHRoZSB0d28gaW5wdXRzXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5sZXJwID0gdmVjNC5sZXJwO1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgc3BoZXJpY2FsIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIHF1YXRcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7cXVhdH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtxdWF0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICogQHJldHVybnMge3F1YXR9IG91dFxuICovXG5xdWF0LnNsZXJwID0gZnVuY3Rpb24gKG91dCwgYSwgYiwgdCkge1xuICAgIC8vIGJlbmNobWFya3M6XG4gICAgLy8gICAgaHR0cDovL2pzcGVyZi5jb20vcXVhdGVybmlvbi1zbGVycC1pbXBsZW1lbnRhdGlvbnNcblxuICAgIHZhciBheCA9IGFbMF0sIGF5ID0gYVsxXSwgYXogPSBhWzJdLCBhdyA9IGFbM10sXG4gICAgICAgIGJ4ID0gYlswXSwgYnkgPSBiWzFdLCBieiA9IGJbMl0sIGJ3ID0gYlszXTtcblxuICAgIHZhciAgICAgICAgb21lZ2EsIGNvc29tLCBzaW5vbSwgc2NhbGUwLCBzY2FsZTE7XG5cbiAgICAvLyBjYWxjIGNvc2luZVxuICAgIGNvc29tID0gYXggKiBieCArIGF5ICogYnkgKyBheiAqIGJ6ICsgYXcgKiBidztcbiAgICAvLyBhZGp1c3Qgc2lnbnMgKGlmIG5lY2Vzc2FyeSlcbiAgICBpZiAoIGNvc29tIDwgMC4wICkge1xuICAgICAgICBjb3NvbSA9IC1jb3NvbTtcbiAgICAgICAgYnggPSAtIGJ4O1xuICAgICAgICBieSA9IC0gYnk7XG4gICAgICAgIGJ6ID0gLSBiejtcbiAgICAgICAgYncgPSAtIGJ3O1xuICAgIH1cbiAgICAvLyBjYWxjdWxhdGUgY29lZmZpY2llbnRzXG4gICAgaWYgKCAoMS4wIC0gY29zb20pID4gMC4wMDAwMDEgKSB7XG4gICAgICAgIC8vIHN0YW5kYXJkIGNhc2UgKHNsZXJwKVxuICAgICAgICBvbWVnYSAgPSBNYXRoLmFjb3MoY29zb20pO1xuICAgICAgICBzaW5vbSAgPSBNYXRoLnNpbihvbWVnYSk7XG4gICAgICAgIHNjYWxlMCA9IE1hdGguc2luKCgxLjAgLSB0KSAqIG9tZWdhKSAvIHNpbm9tO1xuICAgICAgICBzY2FsZTEgPSBNYXRoLnNpbih0ICogb21lZ2EpIC8gc2lub207XG4gICAgfSBlbHNlIHsgICAgICAgIFxuICAgICAgICAvLyBcImZyb21cIiBhbmQgXCJ0b1wiIHF1YXRlcm5pb25zIGFyZSB2ZXJ5IGNsb3NlIFxuICAgICAgICAvLyAgLi4uIHNvIHdlIGNhbiBkbyBhIGxpbmVhciBpbnRlcnBvbGF0aW9uXG4gICAgICAgIHNjYWxlMCA9IDEuMCAtIHQ7XG4gICAgICAgIHNjYWxlMSA9IHQ7XG4gICAgfVxuICAgIC8vIGNhbGN1bGF0ZSBmaW5hbCB2YWx1ZXNcbiAgICBvdXRbMF0gPSBzY2FsZTAgKiBheCArIHNjYWxlMSAqIGJ4O1xuICAgIG91dFsxXSA9IHNjYWxlMCAqIGF5ICsgc2NhbGUxICogYnk7XG4gICAgb3V0WzJdID0gc2NhbGUwICogYXogKyBzY2FsZTEgKiBiejtcbiAgICBvdXRbM10gPSBzY2FsZTAgKiBhdyArIHNjYWxlMSAqIGJ3O1xuICAgIFxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGludmVyc2Ugb2YgYSBxdWF0XG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3F1YXR9IGEgcXVhdCB0byBjYWxjdWxhdGUgaW52ZXJzZSBvZlxuICogQHJldHVybnMge3F1YXR9IG91dFxuICovXG5xdWF0LmludmVydCA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIHZhciBhMCA9IGFbMF0sIGExID0gYVsxXSwgYTIgPSBhWzJdLCBhMyA9IGFbM10sXG4gICAgICAgIGRvdCA9IGEwKmEwICsgYTEqYTEgKyBhMiphMiArIGEzKmEzLFxuICAgICAgICBpbnZEb3QgPSBkb3QgPyAxLjAvZG90IDogMDtcbiAgICBcbiAgICAvLyBUT0RPOiBXb3VsZCBiZSBmYXN0ZXIgdG8gcmV0dXJuIFswLDAsMCwwXSBpbW1lZGlhdGVseSBpZiBkb3QgPT0gMFxuXG4gICAgb3V0WzBdID0gLWEwKmludkRvdDtcbiAgICBvdXRbMV0gPSAtYTEqaW52RG90O1xuICAgIG91dFsyXSA9IC1hMippbnZEb3Q7XG4gICAgb3V0WzNdID0gYTMqaW52RG90O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGNvbmp1Z2F0ZSBvZiBhIHF1YXRcbiAqIElmIHRoZSBxdWF0ZXJuaW9uIGlzIG5vcm1hbGl6ZWQsIHRoaXMgZnVuY3Rpb24gaXMgZmFzdGVyIHRoYW4gcXVhdC5pbnZlcnNlIGFuZCBwcm9kdWNlcyB0aGUgc2FtZSByZXN1bHQuXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3F1YXR9IGEgcXVhdCB0byBjYWxjdWxhdGUgY29uanVnYXRlIG9mXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKi9cbnF1YXQuY29uanVnYXRlID0gZnVuY3Rpb24gKG91dCwgYSkge1xuICAgIG91dFswXSA9IC1hWzBdO1xuICAgIG91dFsxXSA9IC1hWzFdO1xuICAgIG91dFsyXSA9IC1hWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIGEgcXVhdFxuICpcbiAqIEBwYXJhbSB7cXVhdH0gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIGxlbmd0aCBvZlxuICogQHJldHVybnMge051bWJlcn0gbGVuZ3RoIG9mIGFcbiAqIEBmdW5jdGlvblxuICovXG5xdWF0Lmxlbmd0aCA9IHZlYzQubGVuZ3RoO1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgcXVhdC5sZW5ndGh9XG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5sZW4gPSBxdWF0Lmxlbmd0aDtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiBhIHF1YXRcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IGEgdmVjdG9yIHRvIGNhbGN1bGF0ZSBzcXVhcmVkIGxlbmd0aCBvZlxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBsZW5ndGggb2YgYVxuICogQGZ1bmN0aW9uXG4gKi9cbnF1YXQuc3F1YXJlZExlbmd0aCA9IHZlYzQuc3F1YXJlZExlbmd0aDtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHF1YXQuc3F1YXJlZExlbmd0aH1cbiAqIEBmdW5jdGlvblxuICovXG5xdWF0LnNxckxlbiA9IHF1YXQuc3F1YXJlZExlbmd0aDtcblxuLyoqXG4gKiBOb3JtYWxpemUgYSBxdWF0XG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3F1YXR9IGEgcXVhdGVybmlvbiB0byBub3JtYWxpemVcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqIEBmdW5jdGlvblxuICovXG5xdWF0Lm5vcm1hbGl6ZSA9IHZlYzQubm9ybWFsaXplO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBxdWF0ZXJuaW9uIGZyb20gdGhlIGdpdmVuIDN4MyByb3RhdGlvbiBtYXRyaXguXG4gKlxuICogTk9URTogVGhlIHJlc3VsdGFudCBxdWF0ZXJuaW9uIGlzIG5vdCBub3JtYWxpemVkLCBzbyB5b3Ugc2hvdWxkIGJlIHN1cmVcbiAqIHRvIHJlbm9ybWFsaXplIHRoZSBxdWF0ZXJuaW9uIHlvdXJzZWxmIHdoZXJlIG5lY2Vzc2FyeS5cbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7bWF0M30gbSByb3RhdGlvbiBtYXRyaXhcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqIEBmdW5jdGlvblxuICovXG5xdWF0LmZyb21NYXQzID0gZnVuY3Rpb24ob3V0LCBtKSB7XG4gICAgLy8gQWxnb3JpdGhtIGluIEtlbiBTaG9lbWFrZSdzIGFydGljbGUgaW4gMTk4NyBTSUdHUkFQSCBjb3Vyc2Ugbm90ZXNcbiAgICAvLyBhcnRpY2xlIFwiUXVhdGVybmlvbiBDYWxjdWx1cyBhbmQgRmFzdCBBbmltYXRpb25cIi5cbiAgICB2YXIgZlRyYWNlID0gbVswXSArIG1bNF0gKyBtWzhdO1xuICAgIHZhciBmUm9vdDtcblxuICAgIGlmICggZlRyYWNlID4gMC4wICkge1xuICAgICAgICAvLyB8d3wgPiAxLzIsIG1heSBhcyB3ZWxsIGNob29zZSB3ID4gMS8yXG4gICAgICAgIGZSb290ID0gTWF0aC5zcXJ0KGZUcmFjZSArIDEuMCk7ICAvLyAyd1xuICAgICAgICBvdXRbM10gPSAwLjUgKiBmUm9vdDtcbiAgICAgICAgZlJvb3QgPSAwLjUvZlJvb3Q7ICAvLyAxLyg0dylcbiAgICAgICAgb3V0WzBdID0gKG1bN10tbVs1XSkqZlJvb3Q7XG4gICAgICAgIG91dFsxXSA9IChtWzJdLW1bNl0pKmZSb290O1xuICAgICAgICBvdXRbMl0gPSAobVszXS1tWzFdKSpmUm9vdDtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB8d3wgPD0gMS8yXG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgaWYgKCBtWzRdID4gbVswXSApXG4gICAgICAgICAgaSA9IDE7XG4gICAgICAgIGlmICggbVs4XSA+IG1baSozK2ldIClcbiAgICAgICAgICBpID0gMjtcbiAgICAgICAgdmFyIGogPSAoaSsxKSUzO1xuICAgICAgICB2YXIgayA9IChpKzIpJTM7XG4gICAgICAgIFxuICAgICAgICBmUm9vdCA9IE1hdGguc3FydChtW2kqMytpXS1tW2oqMytqXS1tW2sqMytrXSArIDEuMCk7XG4gICAgICAgIG91dFtpXSA9IDAuNSAqIGZSb290O1xuICAgICAgICBmUm9vdCA9IDAuNSAvIGZSb290O1xuICAgICAgICBvdXRbM10gPSAobVtrKjMral0gLSBtW2oqMytrXSkgKiBmUm9vdDtcbiAgICAgICAgb3V0W2pdID0gKG1baiozK2ldICsgbVtpKjMral0pICogZlJvb3Q7XG4gICAgICAgIG91dFtrXSA9IChtW2sqMytpXSArIG1baSozK2tdKSAqIGZSb290O1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgcXVhdGVuaW9uXG4gKlxuICogQHBhcmFtIHtxdWF0fSB2ZWMgdmVjdG9yIHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xuICogQHJldHVybnMge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB2ZWN0b3JcbiAqL1xucXVhdC5zdHIgPSBmdW5jdGlvbiAoYSkge1xuICAgIHJldHVybiAncXVhdCgnICsgYVswXSArICcsICcgKyBhWzFdICsgJywgJyArIGFbMl0gKyAnLCAnICsgYVszXSArICcpJztcbn07XG5cbmlmKHR5cGVvZihleHBvcnRzKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBleHBvcnRzLnF1YXQgPSBxdWF0O1xufVxuO1xuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4gIH0pKHNoaW0uZXhwb3J0cyk7XG59KSh0aGlzKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgR0xUb29scyA9IHJlcXVpcmUoXCIuL2Jvbmdpb3ZpL0dMVG9vbHNcIik7XG5cbnZhciBib25naW92aSA9IHtcblx0R0w6R0xUb29scyxcblx0R0xUb29sczpHTFRvb2xzLFxuXHRTY2hlZHVsZXI6cmVxdWlyZShcIi4vYm9uZ2lvdmkvU2NoZWR1bGVyXCIpLFxuXHRTaW1wbGVJbWFnZUxvYWRlcjpyZXF1aXJlKFwiLi9ib25naW92aS9TaW1wbGVJbWFnZUxvYWRlclwiKSxcblx0RWFzZU51bWJlcjpyZXF1aXJlKFwiLi9ib25naW92aS9FYXNlTnVtYmVyXCIpLFxuXHRRdWF0Um90YXRpb246cmVxdWlyZShcIi4vYm9uZ2lvdmkvUXVhdFJvdGF0aW9uXCIpLFxuXHRTY2VuZTpyZXF1aXJlKFwiLi9ib25naW92aS9TY2VuZVwiKSxcblx0Q2FtZXJhOnJlcXVpcmUoXCIuL2Jvbmdpb3ZpL0NhbWVyYVwiKSxcblx0U2ltcGxlQ2FtZXJhOnJlcXVpcmUoXCIuL2Jvbmdpb3ZpL1NpbXBsZUNhbWVyYVwiKSxcblx0Q2FtZXJhT3J0aG86cmVxdWlyZShcIi4vYm9uZ2lvdmkvQ2FtZXJhT3J0aG9cIiksXG5cdENhbWVyYVBlcnNwZWN0aXZlOnJlcXVpcmUoXCIuL2Jvbmdpb3ZpL0NhbWVyYVBlcnNwZWN0aXZlXCIpLFxuXHRNZXNoOnJlcXVpcmUoXCIuL2Jvbmdpb3ZpL01lc2hcIiksXG5cdEZhY2U6cmVxdWlyZShcIi4vYm9uZ2lvdmkvRmFjZVwiKSxcblx0R0xTaGFkZXI6cmVxdWlyZShcIi4vYm9uZ2lvdmkvR0xTaGFkZXJcIiksXG5cdEdMVGV4dHVyZTpyZXF1aXJlKFwiLi9ib25naW92aS9HTFRleHR1cmVcIiksXG5cdEdMQ3ViZVRleHR1cmU6cmVxdWlyZShcIi4vYm9uZ2lvdmkvR0xDdWJlVGV4dHVyZVwiKSxcblx0U2hhZGVyTGliczpyZXF1aXJlKFwiLi9ib25naW92aS9TaGFkZXJMaWJzXCIpLFxuXHRWaWV3OnJlcXVpcmUoXCIuL2Jvbmdpb3ZpL1ZpZXdcIiksXG5cdFZpZXdDb3B5OnJlcXVpcmUoXCIuL2Jvbmdpb3ZpL1ZpZXdDb3B5XCIpLFxuXHRWaWV3QXhpczpyZXF1aXJlKFwiLi9ib25naW92aS9WaWV3QXhpc1wiKSxcblx0Vmlld0RvdFBsYW5lOnJlcXVpcmUoXCIuL2Jvbmdpb3ZpL1ZpZXdEb3RQbGFuZXNcIiksXG5cdE1lc2hVdGlsczpyZXF1aXJlKFwiLi9ib25naW92aS9NZXNoVXRpbHNcIiksXG5cdEZyYW1lQnVmZmVyOnJlcXVpcmUoXCIuL2Jvbmdpb3ZpL0ZyYW1lQnVmZmVyXCIpLFxuXHRFdmVudERpc3BhdGNoZXI6cmVxdWlyZShcIi4vYm9uZ2lvdmkvRXZlbnREaXNwYXRjaGVyXCIpLFxuXHRPYmpMb2FkZXI6cmVxdWlyZShcIi4vYm9uZ2lvdmkvT2JqTG9hZGVyXCIpLFxuXHRnbG06cmVxdWlyZShcImdsLW1hdHJpeFwiKVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBib25naW92aTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGdsbSA9IHJlcXVpcmUoXCJnbC1tYXRyaXhcIik7XG5cbnZhciBDYW1lcmEgPSBmdW5jdGlvbigpIHtcblx0dGhpcy5tYXRyaXggPSBnbG0ubWF0NC5jcmVhdGUoKTtcblx0Z2xtLm1hdDQuaWRlbnRpdHkodGhpcy5tYXRyaXgpO1xuXG5cdHRoaXMucG9zaXRpb24gPSBnbG0udmVjMy5jcmVhdGUoKTtcbn07XG5cbnZhciBwID0gQ2FtZXJhLnByb3RvdHlwZTtcblxucC5sb29rQXQgPSBmdW5jdGlvbihhRXllLCBhQ2VudGVyLCBhVXApIHtcblx0Z2xtLnZlYzMuY29weSh0aGlzLnBvc2l0aW9uLCBhRXllKTtcblx0Z2xtLm1hdDQuaWRlbnRpdHkodGhpcy5tYXRyaXgpO1xuXHRnbG0ubWF0NC5sb29rQXQodGhpcy5tYXRyaXgsIGFFeWUsIGFDZW50ZXIsIGFVcCk7XG59O1xuXG5wLmdldE1hdHJpeCA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5tYXRyaXg7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbWVyYTsiLCIvLyBDYW1lcmFPcnRoby5qc1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIENhbWVyYSA9IHJlcXVpcmUoXCIuL0NhbWVyYVwiKTtcbnZhciBnbG0gPSByZXF1aXJlKFwiZ2wtbWF0cml4XCIpO1xuXG5cbnZhciBDYW1lcmFPcnRobyA9IGZ1bmN0aW9uKCkge1xuXHRDYW1lcmEuY2FsbCh0aGlzKTtcblxuXHR2YXIgZXllICAgICAgICAgICAgPSBnbG0udmVjMy5jbG9uZShbMCwgMCwgNTAwXSAgKTtcblx0dmFyIGNlbnRlciAgICAgICAgID0gZ2xtLnZlYzMuY3JlYXRlKCApO1xuXHR2YXIgdXAgICAgICAgICAgICAgPSBnbG0udmVjMy5jbG9uZSggWzAsLTEsMF0gKTtcblx0dGhpcy5sb29rQXQoZXllLCBjZW50ZXIsIHVwKTtcblxuXHR0aGlzLnByb2plY3Rpb24gPSBnbG0ubWF0NC5jcmVhdGUoKTtcbn07XG5cbnZhciBwID0gQ2FtZXJhT3J0aG8ucHJvdG90eXBlID0gbmV3IENhbWVyYSgpO1xuXG5cbnAuc2V0Qm91bmRhcnkgPSBmdW5jdGlvbihsZWZ0LCByaWdodCwgdG9wLCBib3R0b20pIHtcblx0dGhpcy5sZWZ0ID0gbGVmdDtcblx0dGhpcy5yaWdodCA9IHJpZ2h0O1xuXHR0aGlzLnRvcCA9IHRvcDtcblx0dGhpcy5ib3R0b20gPSBib3R0b207XG5cdGdsbS5tYXQ0Lm9ydGhvKHRoaXMucHJvamVjdGlvbiwgbGVmdCwgcmlnaHQsIHRvcCwgYm90dG9tLCAwLCAxMDAwMCk7XG59O1xuXG5cbnAub3J0aG8gPSBwLnNldEJvdW5kYXJ5O1xuXG5wLmdldE1hdHJpeCA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5tYXRyaXg7XG59O1xuXG5cbnAucmVzaXplID0gZnVuY3Rpb24oKSB7XG5cdGdsbS5tYXQ0Lm9ydGhvKHRoaXMucHJvamVjdGlvbiwgdGhpcy5sZWZ0LCB0aGlzLnJpZ2h0LCB0aGlzLnRvcCwgdGhpcy5ib3R0b20sIDAsIDEwMDAwKTtcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBDYW1lcmFPcnRobzsiLCIvLyBDYW1lcmFQZXJzcGVjdGl2ZS5qc1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBDYW1lcmEgPSByZXF1aXJlKFwiLi9DYW1lcmFcIik7XG52YXIgZ2xtID0gcmVxdWlyZShcImdsLW1hdHJpeFwiKTtcblxudmFyIENhbWVyYVBlcnNwZWN0aXZlID0gZnVuY3Rpb24oKSB7XG5cdENhbWVyYS5jYWxsKHRoaXMpO1xuXG5cdHRoaXMucHJvamVjdGlvbiA9IGdsbS5tYXQ0LmNyZWF0ZSgpO1xuXHR0aGlzLm10eEZpbmFsID0gZ2xtLm1hdDQuY3JlYXRlKCk7XG59O1xuXG52YXIgcCA9IENhbWVyYVBlcnNwZWN0aXZlLnByb3RvdHlwZSA9IG5ldyBDYW1lcmEoKTtcblxucC5zZXRQZXJzcGVjdGl2ZSA9IGZ1bmN0aW9uKGFGb3YsIGFBc3BlY3RSYXRpbywgYU5lYXIsIGFGYXIpIHtcblx0dGhpcy5fZm92ID0gYUZvdjtcblx0dGhpcy5fbmVhciA9IGFOZWFyO1xuXHR0aGlzLl9mYXIgPSBhRmFyO1xuXHR0aGlzLl9hc3BlY3QgPSBhQXNwZWN0UmF0aW87XG5cdGdsbS5tYXQ0LnBlcnNwZWN0aXZlKHRoaXMucHJvamVjdGlvbiwgYUZvdiwgYUFzcGVjdFJhdGlvLCBhTmVhciwgYUZhcik7XG59O1xuXG5wLmdldE1hdHJpeCA9IGZ1bmN0aW9uKCkge1xuXHQvLyBtYXQ0Lm11bHRpcGx5KHRoaXMubXR4RmluYWwsIHRoaXMucHJvamVjdGlvbiwgdGhpcy5tYXRyaXgpO1xuXHRyZXR1cm4gdGhpcy5tYXRyaXg7XG59O1xuXG5wLnJlc2l6ZSA9IGZ1bmN0aW9uKGFBc3BlY3RSYXRpbykge1xuXHR0aGlzLl9hc3BlY3QgPSBhQXNwZWN0UmF0aW87XG5cdGdsbS5tYXQ0LnBlcnNwZWN0aXZlKHRoaXMucHJvamVjdGlvbiwgdGhpcy5fZm92LCBhQXNwZWN0UmF0aW8sIHRoaXMuX25lYXIsIHRoaXMuX2Zhcik7XG59O1xuXG5wLl9fZGVmaW5lR2V0dGVyX18oXCJuZWFyXCIsIGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5fbmVhcjtcbn0pO1xuXG5wLl9fZGVmaW5lR2V0dGVyX18oXCJmYXJcIiwgZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLl9mYXI7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW1lcmFQZXJzcGVjdGl2ZTsiLCIvLyBFYXNlTnVtYmVyLmpzXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgU2NoZWR1bGVyID0gcmVxdWlyZShcIi4vU2NoZWR1bGVyXCIpO1xuXG5mdW5jdGlvbiBFYXNlTnVtYmVyKG1WYWx1ZSwgbUVhc2luZykge1xuXHR0aGlzLl9lYXNpbmcgPSBtRWFzaW5nIHx8IDAuMTtcblx0dGhpcy5fdmFsdWUgPSBtVmFsdWU7XG5cdHRoaXMuX3RhcmdldFZhbHVlID0gbVZhbHVlO1xuXG5cdFNjaGVkdWxlci5hZGRFRih0aGlzLCB0aGlzLl91cGRhdGUpO1xufVxuXG52YXIgcCA9IEVhc2VOdW1iZXIucHJvdG90eXBlO1xuXG5cbnAuX3VwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLl9jaGVja0xpbWl0KCk7XG5cdHRoaXMuX3ZhbHVlICs9ICh0aGlzLl90YXJnZXRWYWx1ZSAtIHRoaXMuX3ZhbHVlKSAqIHRoaXMuX2Vhc2luZztcdFxufTtcblxuXG5wLnNldFRvID0gZnVuY3Rpb24obVZhbHVlKSB7XG5cdHRoaXMuX3RhcmdldFZhbHVlID0gdGhpcy5fdmFsdWUgPSBtVmFsdWU7XG59O1xuXG5cbnAuYWRkID0gZnVuY3Rpb24obUFkZCkge1xuXHR0aGlzLl90YXJnZXRWYWx1ZSArPSBtQWRkO1xufTtcblxucC5saW1pdCA9IGZ1bmN0aW9uKG1NaW4sIG1NYXgpIHtcblx0dGhpcy5fbWluID0gbU1pbjtcblx0dGhpcy5fbWF4ID0gbU1heDtcblxuXHR0aGlzLl9jaGVja0xpbWl0KCk7XG59O1xuXG5wLnNldEVhc2luZyA9IGZ1bmN0aW9uKG1WYWx1ZSkge1xuXHR0aGlzLl9lYXNpbmcgPSBtVmFsdWU7XG59O1xuXG5wLl9jaGVja0xpbWl0ID0gZnVuY3Rpb24oKSB7XG5cdGlmKHRoaXMuX21pbiAhPT0gdW5kZWZpbmVkICYmIHRoaXMuX3RhcmdldFZhbHVlIDwgdGhpcy5fbWluKSB7XG5cdFx0dGhpcy5fdGFyZ2V0VmFsdWUgPSB0aGlzLl9taW47XG5cdH0gXG5cblx0aWYodGhpcy5fbWF4ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5fdGFyZ2V0VmFsdWUgPiB0aGlzLl9tYXgpIHtcblx0XHR0aGlzLl90YXJnZXRWYWx1ZSA9IHRoaXMuX21heDtcblx0fSBcbn07XG5cblxucC5fX2RlZmluZUdldHRlcl9fKFwidmFsdWVcIiwgZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLl92YWx1ZTtcbn0pO1xuXG5cbnAuX19kZWZpbmVHZXR0ZXJfXyhcInRhcmdldFZhbHVlXCIsIGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5fdGFyZ2V0VmFsdWU7XG59KTtcblxuXG5wLl9fZGVmaW5lU2V0dGVyX18oXCJ2YWx1ZVwiLCBmdW5jdGlvbihtVmFsdWUpIHtcblx0dGhpcy5fdGFyZ2V0VmFsdWUgPSBtVmFsdWU7XG59KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IEVhc2VOdW1iZXI7IiwiLy8gRXZlbnREaXNwYXRjaGVyLmpzXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgc3VwcG9ydHNDdXN0b21FdmVudHMgPSB0cnVlO1xudHJ5IHtcblx0dmFyIG5ld1Rlc3RDdXN0b21FdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiQ3VzdG9tRXZlbnRcIik7XG5cdG5ld1Rlc3RDdXN0b21FdmVudCA9IG51bGw7XG59IGNhdGNoKGUpe1xuXHRzdXBwb3J0c0N1c3RvbUV2ZW50cyA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBFdmVudERpc3BhdGNoZXIoKSB7XG5cdHRoaXMuX2V2ZW50TGlzdGVuZXJzID0gbnVsbDtcbn1cblxuXG52YXIgcCA9IEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGU7XG5cblxucC5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oYUV2ZW50VHlwZSwgYUZ1bmN0aW9uKSB7XG5cblx0aWYodGhpcy5fZXZlbnRMaXN0ZW5lcnMgPT09IG51bGwpIHtcblx0XHR0aGlzLl9ldmVudExpc3RlbmVycyA9IHt9O1xuXHR9XG5cdGlmKCF0aGlzLl9ldmVudExpc3RlbmVyc1thRXZlbnRUeXBlXSl7XG5cdFx0dGhpcy5fZXZlbnRMaXN0ZW5lcnNbYUV2ZW50VHlwZV0gPSBbXTtcblx0fVxuXHR0aGlzLl9ldmVudExpc3RlbmVyc1thRXZlbnRUeXBlXS5wdXNoKGFGdW5jdGlvbik7XG5cdFxuXHRyZXR1cm4gdGhpcztcbn07XG5cbnAucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGFFdmVudFR5cGUsIGFGdW5jdGlvbikge1xuXHRpZih0aGlzLl9ldmVudExpc3RlbmVycyA9PT0gbnVsbCkge1xuXHRcdHRoaXMuX2V2ZW50TGlzdGVuZXJzID0ge307XG5cdH1cblx0dmFyIGN1cnJlbnRBcnJheSA9IHRoaXMuX2V2ZW50TGlzdGVuZXJzW2FFdmVudFR5cGVdO1xuXHRcblx0aWYgKHR5cGVvZihjdXJyZW50QXJyYXkpID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0Ly8gY29uc29sZS53YXJuKFwiRXZlbnREaXNwYXRjaGVyIDo6IHJlbW92ZUV2ZW50TGlzdGVuZXIgOjogVHJpZWQgdG8gcmVtb3ZlIGFuIGV2ZW50IGhhbmRsZXIgKGZvciBcIiArIGFFdmVudFR5cGUgK1wiKSB0aGF0IGRvZXNuJ3QgZXhpc3RcIik7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0XG5cdHZhciBjdXJyZW50QXJyYXlMZW5ndGggPSBjdXJyZW50QXJyYXkubGVuZ3RoO1xuXHRmb3IodmFyIGkgPSAwOyBpIDwgY3VycmVudEFycmF5TGVuZ3RoOyBpKyspe1xuXHRcdGlmKGN1cnJlbnRBcnJheVtpXSA9PT0gYUZ1bmN0aW9uKXtcblx0XHRcdGN1cnJlbnRBcnJheS5zcGxpY2UoaSwgMSk7XG5cdFx0XHRpLS07XG5cdFx0XHRjdXJyZW50QXJyYXlMZW5ndGgtLTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHRoaXM7XG59O1xuXG5wLmRpc3BhdGNoRXZlbnQgPSBmdW5jdGlvbihhRXZlbnQpIHtcblx0aWYodGhpcy5fZXZlbnRMaXN0ZW5lcnMgPT09IG51bGwpIHtcblx0XHR0aGlzLl9ldmVudExpc3RlbmVycyA9IHt9O1xuXHR9XG5cdHZhciBldmVudFR5cGUgPSBhRXZlbnQudHlwZTtcblx0XG5cdHRyeSB7XG5cdFx0aWYoYUV2ZW50LnRhcmdldCA9PT0gbnVsbCkge1xuXHRcdFx0YUV2ZW50LnRhcmdldCA9IHRoaXM7XG5cdFx0fVxuXHRcdGFFdmVudC5jdXJyZW50VGFyZ2V0ID0gdGhpcztcblx0fVxuXHRjYXRjaCh0aGVFcnJvcikge1xuXHRcdHZhciBuZXdFdmVudCA9IHtcInR5cGVcIiA6IGV2ZW50VHlwZSwgXCJkZXRhaWxcIiA6IGFFdmVudC5kZXRhaWwsIFwiZGlzcGF0Y2hlclwiIDogdGhpcyB9O1xuXHRcdHJldHVybiB0aGlzLmRpc3BhdGNoRXZlbnQobmV3RXZlbnQpO1xuXHR9XG5cdFxuXHR2YXIgY3VycmVudEV2ZW50TGlzdGVuZXJzID0gdGhpcy5fZXZlbnRMaXN0ZW5lcnNbZXZlbnRUeXBlXTtcblx0aWYoY3VycmVudEV2ZW50TGlzdGVuZXJzICE9PSBudWxsICYmIGN1cnJlbnRFdmVudExpc3RlbmVycyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFyIGN1cnJlbnRBcnJheSA9IHRoaXMuX2NvcHlBcnJheShjdXJyZW50RXZlbnRMaXN0ZW5lcnMpO1xuXHRcdHZhciBjdXJyZW50QXJyYXlMZW5ndGggPSBjdXJyZW50QXJyYXkubGVuZ3RoO1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBjdXJyZW50QXJyYXlMZW5ndGg7IGkrKyl7XG5cdFx0XHR2YXIgY3VycmVudEZ1bmN0aW9uID0gY3VycmVudEFycmF5W2ldO1xuXHRcdFx0Y3VycmVudEZ1bmN0aW9uLmNhbGwodGhpcywgYUV2ZW50KTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHRoaXM7XG59O1xuXG5wLmRpc3BhdGNoQ3VzdG9tRXZlbnQgPSBmdW5jdGlvbihhRXZlbnRUeXBlLCBhRGV0YWlsKSB7XG5cdHZhciBuZXdFdmVudDtcblx0aWYgKHN1cHBvcnRzQ3VzdG9tRXZlbnRzKXtcblx0XHRuZXdFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiQ3VzdG9tRXZlbnRcIik7XG5cdFx0bmV3RXZlbnQuZGlzcGF0Y2hlciA9IHRoaXM7XG5cdFx0bmV3RXZlbnQuaW5pdEN1c3RvbUV2ZW50KGFFdmVudFR5cGUsIGZhbHNlLCBmYWxzZSwgYURldGFpbCk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0bmV3RXZlbnQgPSB7XCJ0eXBlXCIgOiBhRXZlbnRUeXBlLCBcImRldGFpbFwiIDogYURldGFpbCwgXCJkaXNwYXRjaGVyXCIgOiB0aGlzIH07XG5cdH1cblx0cmV0dXJuIHRoaXMuZGlzcGF0Y2hFdmVudChuZXdFdmVudCk7XG59O1xuXG5wLl9kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG5cdGlmKHRoaXMuX2V2ZW50TGlzdGVuZXJzICE9PSBudWxsKSB7XG5cdFx0Zm9yKHZhciBvYmplY3ROYW1lIGluIHRoaXMuX2V2ZW50TGlzdGVuZXJzKSB7XG5cdFx0XHRpZih0aGlzLl9ldmVudExpc3RlbmVycy5oYXNPd25Qcm9wZXJ0eShvYmplY3ROYW1lKSkge1xuXHRcdFx0XHR2YXIgY3VycmVudEFycmF5ID0gdGhpcy5fZXZlbnRMaXN0ZW5lcnNbb2JqZWN0TmFtZV07XG5cdFx0XHRcdHZhciBjdXJyZW50QXJyYXlMZW5ndGggPSBjdXJyZW50QXJyYXkubGVuZ3RoO1xuXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgY3VycmVudEFycmF5TGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRjdXJyZW50QXJyYXlbaV0gPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRlbGV0ZSB0aGlzLl9ldmVudExpc3RlbmVyc1tvYmplY3ROYW1lXTtcdFxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl9ldmVudExpc3RlbmVycyA9IG51bGw7XG5cdH1cbn07XG5cbnAuX2NvcHlBcnJheSA9IGZ1bmN0aW9uKGFBcnJheSkge1xuXHR2YXIgY3VycmVudEFycmF5ID0gbmV3IEFycmF5KGFBcnJheS5sZW5ndGgpO1xuXHR2YXIgY3VycmVudEFycmF5TGVuZ3RoID0gY3VycmVudEFycmF5Lmxlbmd0aDtcblx0Zm9yKHZhciBpID0gMDsgaSA8IGN1cnJlbnRBcnJheUxlbmd0aDsgaSsrKSB7XG5cdFx0Y3VycmVudEFycmF5W2ldID0gYUFycmF5W2ldO1xuXHR9XG5cdHJldHVybiBjdXJyZW50QXJyYXk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RGlzcGF0Y2hlcjsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGdsbSA9IHJlcXVpcmUoXCJnbC1tYXRyaXhcIik7XG5cbnZhciBGYWNlID0gZnVuY3Rpb24obUEsIG1CLCBtQykge1xuXHR0aGlzLl92ZXJ0ZXhBID0gbUE7XG5cdHRoaXMuX3ZlcnRleEIgPSBtQjtcblx0dGhpcy5fdmVydGV4QyA9IG1DO1xuXG5cdHRoaXMuX2luaXQoKTtcbn07XG5cbnZhciBwID0gRmFjZS5wcm90b3R5cGU7XG5cblxucC5faW5pdCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgQkEgPSBnbG0udmVjMy5jcmVhdGUoKTtcblx0dmFyIENBID0gZ2xtLnZlYzMuY3JlYXRlKCk7XG5cdGdsbS52ZWMzLnN1YihCQSwgdGhpcy5fdmVydGV4QiwgdGhpcy5fdmVydGV4QSk7XG5cdGdsbS52ZWMzLnN1YihDQSwgdGhpcy5fdmVydGV4QywgdGhpcy5fdmVydGV4QSk7XG5cblx0dGhpcy5fZmFjZU5vcm1hbCA9IGdsbS52ZWMzLmNyZWF0ZSgpO1xuXHRnbG0udmVjMy5jcm9zcyh0aGlzLl9mYWNlTm9ybWFsLCBCQSwgQ0EpO1xuXHRnbG0udmVjMy5ub3JtYWxpemUodGhpcy5fZmFjZU5vcm1hbCwgdGhpcy5fZmFjZU5vcm1hbCk7XG59O1xuXG5cbnAuY29udGFpbnMgPSBmdW5jdGlvbihtVmVydGV4KSB7XG5cdHJldHVybiAoIGVxdWFsKG1WZXJ0ZXgsIHRoaXMuX3ZlcnRleEEpIHx8IGVxdWFsKG1WZXJ0ZXgsIHRoaXMuX3ZlcnRleEIpIHx8IGVxdWFsKG1WZXJ0ZXgsIHRoaXMuX3ZlcnRleEMpICk7XG59O1xuXG5cbnAuX19kZWZpbmVHZXR0ZXJfXyhcImZhY2VOb3JtYWxcIiwgZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLl9mYWNlTm9ybWFsO1xufSk7XG5cbnZhciBlcXVhbCA9IGZ1bmN0aW9uKG1WMCwgbVYxKSB7XG5cdHJldHVybiAoIChtVjBbMF0gPT09IG1WMVswXSkgJiYgKG1WMFsxXSA9PT0gbVYxWzFdKSAmJiAobVYwWzJdID09PSBtVjFbMl0pICk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZhY2U7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBnbCwgR0wgPSByZXF1aXJlKFwiLi9HTFRvb2xzXCIpO1xudmFyIEdMVGV4dHVyZSA9IHJlcXVpcmUoXCIuL0dMVGV4dHVyZVwiKTtcbnZhciBpc1Bvd2VyT2ZUd28gPSBmdW5jdGlvbih4KSB7XHRcblx0cmV0dXJuICh4ICE9PSAwKSAmJiAhKHggJiAoeCAtIDEpKTtcdFxufTtcblxudmFyIEZyYW1lQnVmZmVyID0gZnVuY3Rpb24od2lkdGgsIGhlaWdodCwgb3B0aW9ucykge1xuXHRnbCA9IEdMLmdsO1xuXHRvcHRpb25zICAgICAgICA9IG9wdGlvbnMgfHwge307XG5cdHRoaXMud2lkdGggICAgID0gd2lkdGg7XG5cdHRoaXMuaGVpZ2h0ICAgID0gaGVpZ2h0O1xuXHR0aGlzLm1hZ0ZpbHRlciA9IG9wdGlvbnMubWFnRmlsdGVyIHx8IGdsLkxJTkVBUjtcblx0dGhpcy5taW5GaWx0ZXIgPSBvcHRpb25zLm1pbkZpbHRlciB8fCBnbC5MSU5FQVI7XG5cdHRoaXMud3JhcFMgICAgID0gb3B0aW9ucy53cmFwUyB8fCBnbC5NSVJST1JFRF9SRVBFQVQ7XG5cdHRoaXMud3JhcFQgICAgID0gb3B0aW9ucy53cmFwVCB8fCBnbC5NSVJST1JFRF9SRVBFQVQ7XG5cblx0aWYoIWlzUG93ZXJPZlR3byh3aWR0aCkgfHwgIWlzUG93ZXJPZlR3byhoZWlnaHQpKSB7XG5cdFx0dGhpcy53cmFwUyA9IHRoaXMud3JhcFQgPSBnbC5DTEFNUF9UT19FREdFO1xuXG5cdFx0aWYodGhpcy5taW5GaWx0ZXIgPT09IGdsLkxJTkVBUl9NSVBNQVBfTkVBUkVTVCkge1xuXHRcdFx0dGhpcy5taW5GaWx0ZXIgPSBnbC5MSU5FQVI7XG5cdFx0fVxuXHR9IFxuXG5cdHRoaXMuX2luaXQoKTtcbn07XG5cbnZhciBwID0gRnJhbWVCdWZmZXIucHJvdG90eXBlO1xuXG5wLl9pbml0ID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMudGV4dHVyZSAgICAgICAgICAgID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xuXHRcblx0dGhpcy5nbFRleHR1cmVcdFx0XHQ9IG5ldyBHTFRleHR1cmUodGhpcy50ZXh0dXJlLCB0cnVlKTtcblx0XG5cdHRoaXMuZnJhbWVCdWZmZXIgICAgICAgID0gZ2wuY3JlYXRlRnJhbWVidWZmZXIoKTtcdFx0XG5cdGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgdGhpcy5mcmFtZUJ1ZmZlcik7XG5cdHRoaXMuZnJhbWVCdWZmZXIud2lkdGggID0gdGhpcy53aWR0aDtcblx0dGhpcy5mcmFtZUJ1ZmZlci5oZWlnaHQgPSB0aGlzLmhlaWdodDtcblxuXHRnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLnRleHR1cmUpO1xuXHRnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgdGhpcy5tYWdGaWx0ZXIpO1xuXHRnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgdGhpcy5taW5GaWx0ZXIpO1xuXHRnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9TLCBnbC5DTEFNUF9UT19FREdFKTtcblx0Z2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuQ0xBTVBfVE9fRURHRSk7XG5cblxuXHQvLyBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLlJHQkEsIHRoaXMuZnJhbWVCdWZmZXIud2lkdGgsIHRoaXMuZnJhbWVCdWZmZXIuaGVpZ2h0LCAwLCBnbC5SR0JBLCBnbC5GTE9BVCwgbnVsbCk7XG5cdGlmKEdMLmRlcHRoVGV4dHVyZUV4dCkge1xuXHRcdGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuUkdCQSwgdGhpcy5mcmFtZUJ1ZmZlci53aWR0aCwgdGhpcy5mcmFtZUJ1ZmZlci5oZWlnaHQsIDAsIGdsLlJHQkEsIGdsLkZMT0FULCBudWxsKTtcblx0fSBlbHNlIHtcblx0XHRnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLlJHQkEsIHRoaXMuZnJhbWVCdWZmZXIud2lkdGgsIHRoaXMuZnJhbWVCdWZmZXIuaGVpZ2h0LCAwLCBnbC5SR0JBLCBnbC5GTE9BVCwgbnVsbCk7XG5cdH1cblx0XG5cdC8vIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuUkdCQSwgdGhpcy5mcmFtZUJ1ZmZlci53aWR0aCwgdGhpcy5mcmFtZUJ1ZmZlci5oZWlnaHQsIDAsIGdsLlJHQkEsIGdsLlVOU0lHTkVEX0JZVEUsIG51bGwpO1xuXG5cdC8vIGlmKHRoaXMubWFnRmlsdGVyID09IGdsLk5FQVJFU1QgJiYgdGhpcy5taW5GaWx0ZXIgPT0gZ2wuTkVBUkVTVCkge1xuXHQvLyBcdGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuUkdCQSwgdGhpcy5mcmFtZUJ1ZmZlci53aWR0aCwgdGhpcy5mcmFtZUJ1ZmZlci5oZWlnaHQsIDAsIGdsLlJHQkEsIGdsLkZMT0FULCBudWxsKTtcblx0Ly8gXHRjb25zb2xlLmRlYnVnKFwiQm90aCBOZWFyZXN0XCIsIHRoaXMuZmxvYXRUZXh0dXJlRXh0KTtcblx0Ly8gfSBlbHNlIHtcblx0Ly8gXHRnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLlJHQkEsIHRoaXMuZnJhbWVCdWZmZXIud2lkdGgsIHRoaXMuZnJhbWVCdWZmZXIuaGVpZ2h0LCAwLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCBudWxsKTtcblx0Ly8gfVxuXG5cdGlmKHRoaXMubWluRmlsdGVyID09PSBnbC5MSU5FQVJfTUlQTUFQX05FQVJFU1QpXHR7XG5cdFx0Z2wuZ2VuZXJhdGVNaXBtYXAoZ2wuVEVYVFVSRV8yRCk7XG5cdH1cblxuXHRnbC5mcmFtZWJ1ZmZlclRleHR1cmUyRChnbC5GUkFNRUJVRkZFUiwgZ2wuQ09MT1JfQVRUQUNITUVOVDAsIGdsLlRFWFRVUkVfMkQsIHRoaXMudGV4dHVyZSwgMCk7XG5cdGlmKEdMLmRlcHRoVGV4dHVyZUV4dCA9PT0gbnVsbCkge1xuXHRcdHZhciByZW5kZXJidWZmZXIgPSBnbC5jcmVhdGVSZW5kZXJidWZmZXIoKTtcblx0XHRnbC5iaW5kUmVuZGVyYnVmZmVyKGdsLlJFTkRFUkJVRkZFUiwgcmVuZGVyYnVmZmVyKTtcblx0XHRnbC5yZW5kZXJidWZmZXJTdG9yYWdlKGdsLlJFTkRFUkJVRkZFUiwgZ2wuREVQVEhfQ09NUE9ORU5UMTYsIHRoaXMuZnJhbWVCdWZmZXIud2lkdGgsIHRoaXMuZnJhbWVCdWZmZXIuaGVpZ2h0KTtcblx0XHRnbC5mcmFtZWJ1ZmZlclRleHR1cmUyRChnbC5GUkFNRUJVRkZFUiwgZ2wuQ09MT1JfQVRUQUNITUVOVDAsIGdsLlRFWFRVUkVfMkQsIHRoaXMudGV4dHVyZSwgMCk7XG4gICAgXHRnbC5mcmFtZWJ1ZmZlclJlbmRlcmJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgZ2wuREVQVEhfQVRUQUNITUVOVCwgZ2wuUkVOREVSQlVGRkVSLCByZW5kZXJidWZmZXIpO1xuXHRcdC8vIGdsLmZyYW1lYnVmZmVyUmVuZGVyYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBnbC5ERVBUSF9BVFRBQ0hNRU5ULCBnbC5SRU5ERVJCVUZGRVIsIHJlbmRlcmJ1ZmZlcik7XHRcblx0XHQvLyBpZiAoZ2wuY2hlY2tGcmFtZWJ1ZmZlclN0YXR1cyhnbC5GUkFNRUJVRkZFUikgIT0gZ2wuRlJBTUVCVUZGRVJfQ09NUExFVEUpIHtcblx0IC8vICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZW5kZXJpbmcgdG8gdGhpcyB0ZXh0dXJlIGlzIG5vdCBzdXBwb3J0ZWQgKGluY29tcGxldGUgZnJhbWVidWZmZXIpJyk7XG5cdCAvLyAgICB9XG5cblx0IFx0Ly8gZ2wucmVuZGVyYnVmZmVyU3RvcmFnZSggZ2wuUkVOREVSQlVGRkVSLCBnbC5SR0JBNCwgdGhpcy5mcmFtZUJ1ZmZlci53aWR0aCwgdGhpcy5mcmFtZUJ1ZmZlci5oZWlnaHQgKTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLmRlcHRoVGV4dHVyZSAgICAgICA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcblx0XHR0aGlzLmdsRGVwdGhUZXh0dXJlXHRcdD0gbmV3IEdMVGV4dHVyZSh0aGlzLmRlcHRoVGV4dHVyZSwgdHJ1ZSk7XG5cblx0XHRnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLmRlcHRoVGV4dHVyZSk7XG5cdFx0Z2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLk5FQVJFU1QpO1xuXHRcdGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5ORUFSRVNUKTtcblx0XHRnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9TLCBnbC5DTEFNUF9UT19FREdFKTtcblx0XHRnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCBnbC5DTEFNUF9UT19FREdFKTtcblx0XHRnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLkRFUFRIX0NPTVBPTkVOVCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIDAsIGdsLkRFUFRIX0NPTVBPTkVOVCwgZ2wuVU5TSUdORURfU0hPUlQsIG51bGwpO1xuXG5cdFx0Z2wuZnJhbWVidWZmZXJUZXh0dXJlMkQoZ2wuRlJBTUVCVUZGRVIsIGdsLkRFUFRIX0FUVEFDSE1FTlQsIGdsLlRFWFRVUkVfMkQsIHRoaXMuZGVwdGhUZXh0dXJlLCAwKTtcblx0fVxuXG5cdGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIG51bGwpO1xuXHRnbC5iaW5kUmVuZGVyYnVmZmVyKGdsLlJFTkRFUkJVRkZFUiwgbnVsbCk7XG5cdGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgbnVsbCk7XG59O1xuXG5cbnAuYmluZCA9IGZ1bmN0aW9uKCkge1xuXHRnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIHRoaXMuZnJhbWVCdWZmZXIpO1xufTtcblxuXG5wLnVuYmluZCA9IGZ1bmN0aW9uKCkge1xuXHRnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIG51bGwpO1xuXHRcbn07XG5cblxucC5nZXRUZXh0dXJlID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLmdsVGV4dHVyZTtcbn07XG5cblxucC5nZXREZXB0aFRleHR1cmUgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMuZ2xEZXB0aFRleHR1cmU7XG59O1xuXG5cbnAuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuXHRnbC5kZWxldGVGcmFtZWJ1ZmZlcih0aGlzLmZyYW1lQnVmZmVyKTtcblxuXHR0aGlzLmdsVGV4dHVyZS5kZXN0cm95KCk7XG5cdGlmKHRoaXMuZ2xEZXB0aFRleHR1cmUpIHtcblx0XHR0aGlzLmdsRGVwdGhUZXh0dXJlLmRlc3Ryb3koKTtcblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBGcmFtZUJ1ZmZlcjsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGdsO1xudmFyIEdMID0gcmVxdWlyZShcIi4vR0xUb29sc1wiKTtcblxudmFyIEdMQ3ViZVRleHR1cmUgPSBmdW5jdGlvbihzb3VyY2VzLCBvcHRpb25zKSB7XG5cdC8vIFtwb3N4LCBuZWd4LCBwb3N5LCBuZWd5LCBwb3N6LCBuZWd6XVxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblx0Z2wgPSBHTC5nbDtcblx0dGhpcy50ZXh0dXJlID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xuXHRcblx0dGhpcy5tYWdGaWx0ZXIgPSBvcHRpb25zLm1hZ0ZpbHRlciB8fCBnbC5MSU5FQVI7XG5cdHRoaXMubWluRmlsdGVyID0gb3B0aW9ucy5taW5GaWx0ZXIgfHwgZ2wuTElORUFSX01JUE1BUF9ORUFSRVNUO1xuXHR0aGlzLndyYXBTICAgICA9IG9wdGlvbnMud3JhcFMgfHwgZ2wuQ0xBTVBfVE9fRURHRTtcblx0dGhpcy53cmFwVCAgICAgPSBvcHRpb25zLndyYXBUIHx8IGdsLkNMQU1QX1RPX0VER0U7XG5cblx0Z2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV9DVUJFX01BUCwgdGhpcy50ZXh0dXJlKTtcblx0dmFyIHRhcmdldHMgPSBbXG5cdFx0Z2wuVEVYVFVSRV9DVUJFX01BUF9QT1NJVElWRV9YLCBnbC5URVhUVVJFX0NVQkVfTUFQX05FR0FUSVZFX1gsIFxuXHRcdGdsLlRFWFRVUkVfQ1VCRV9NQVBfUE9TSVRJVkVfWSwgZ2wuVEVYVFVSRV9DVUJFX01BUF9ORUdBVElWRV9ZLCBcblx0XHRnbC5URVhUVVJFX0NVQkVfTUFQX1BPU0lUSVZFX1osIGdsLlRFWFRVUkVfQ1VCRV9NQVBfTkVHQVRJVkVfWiBcblx0XTtcblxuXHRmb3IgKHZhciBqID0gMDsgaiA8IDY7IGorKykge1xuXHQgICAgZ2wudGV4SW1hZ2UyRCh0YXJnZXRzW2pdLCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCBzb3VyY2VzW2pdKTtcblx0ICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV9DVUJFX01BUCwgZ2wuVEVYVFVSRV9XUkFQX1MsIHRoaXMud3JhcFMpO1xuXHQgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFX0NVQkVfTUFQLCBnbC5URVhUVVJFX1dSQVBfVCwgdGhpcy53cmFwVCk7XG5cdH1cblx0Z2wuZ2VuZXJhdGVNaXBtYXAoZ2wuVEVYVFVSRV9DVUJFX01BUCk7XG5cblx0Z2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV9DVUJFX01BUCwgbnVsbCk7XG59O1xuXG52YXIgcCA9IEdMQ3ViZVRleHR1cmUucHJvdG90eXBlO1xuXG5cbnAuYmluZCA9IGZ1bmN0aW9uKGluZGV4KSB7XG5cdGlmKGluZGV4ID09PSB1bmRlZmluZWQpIHtpbmRleCA9IDA7fVxuXHRpZighR0wuc2hhZGVyKSB7cmV0dXJuO31cblxuXHRnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFX0NVQkVfTUFQLCB0aGlzLnRleHR1cmUpO1xuXHRnbC51bmlmb3JtMWkoR0wuc2hhZGVyLnVuaWZvcm1UZXh0dXJlc1tpbmRleF0sIGluZGV4KTtcblx0dGhpcy5fYmluZEluZGV4ID0gaW5kZXg7XG59O1xuXG5cbnAudW5iaW5kID0gZnVuY3Rpb24oKSB7XG5cdGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfQ1VCRV9NQVAsIG51bGwpO1x0XG59O1xuXG5wLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcblx0Z2wuZGVsZXRlVGV4dHVyZSh0aGlzLnRleHR1cmUpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBHTEN1YmVUZXh0dXJlOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgR0wgPSByZXF1aXJlKFwiLi9HTFRvb2xzXCIpO1xudmFyIGdsO1xudmFyIFNoYWRlckxpYnMgPSByZXF1aXJlKFwiLi9TaGFkZXJMaWJzXCIpO1xuXG52YXIgYWRkTGluZU51bWJlcnMgPSBmdW5jdGlvbiAoIHN0cmluZyApIHtcblx0dmFyIGxpbmVzID0gc3RyaW5nLnNwbGl0KCAnXFxuJyApO1xuXHRmb3IgKCB2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkgKysgKSB7XG5cdFx0bGluZXNbIGkgXSA9ICggaSArIDEgKSArICc6ICcgKyBsaW5lc1sgaSBdO1xuXHR9XG5cdHJldHVybiBsaW5lcy5qb2luKCAnXFxuJyApO1xufTtcblxudmFyIEdMU2hhZGVyID0gZnVuY3Rpb24oYVZlcnRleFNoYWRlcklkLCBhRnJhZ21lbnRTaGFkZXJJZCkge1xuXHRnbCAgICAgICAgICAgICAgXHQgPSBHTC5nbDtcblx0dGhpcy5pZFZlcnRleCAgICAgICAgPSBhVmVydGV4U2hhZGVySWQ7XG5cdHRoaXMuaWRGcmFnbWVudCAgICAgID0gYUZyYWdtZW50U2hhZGVySWQ7XG5cdHRoaXMucGFyYW1ldGVycyAgICAgID0gW107XG5cdHRoaXMudW5pZm9ybVZhbHVlcyAgID0ge307XG5cdFxuXHR0aGlzLnVuaWZvcm1UZXh0dXJlcyA9IFtdO1xuXHRcblx0dGhpcy52ZXJ0ZXhTaGFkZXIgICAgPSB1bmRlZmluZWQ7XG5cdHRoaXMuZnJhZ21lbnRTaGFkZXIgID0gdW5kZWZpbmVkO1xuXHR0aGlzLl9pc1JlYWR5ICAgICAgICA9IGZhbHNlO1xuXHR0aGlzLl9sb2FkZWRDb3VudCAgICA9IDA7XG5cblx0aWYoYVZlcnRleFNoYWRlcklkID09PSB1bmRlZmluZWQgfHwgYVZlcnRleFNoYWRlcklkID09PSBudWxsICkge1xuXHRcdHRoaXMuY3JlYXRlVmVydGV4U2hhZGVyUHJvZ3JhbShTaGFkZXJMaWJzLmdldFNoYWRlcihcImNvcHlWZXJ0XCIpKTtcblx0fVxuXG5cdGlmKGFGcmFnbWVudFNoYWRlcklkID09PSB1bmRlZmluZWQgfHwgYVZlcnRleFNoYWRlcklkID09PSBudWxsICkge1xuXHRcdHRoaXMuY3JlYXRlRnJhZ21lbnRTaGFkZXJQcm9ncmFtKFNoYWRlckxpYnMuZ2V0U2hhZGVyKFwiY29weUZyYWdcIikpO1xuXHR9XG5cblx0dGhpcy5pbml0KCk7XG59O1xuXG5cbnZhciBwID0gR0xTaGFkZXIucHJvdG90eXBlO1xuXG5wLmluaXQgPSBmdW5jdGlvbigpIHtcblx0aWYodGhpcy5pZFZlcnRleCAmJiB0aGlzLmlkVmVydGV4LmluZGV4T2YoXCJtYWluKHZvaWQpXCIpID4gLTEpIHtcblx0XHR0aGlzLmNyZWF0ZVZlcnRleFNoYWRlclByb2dyYW0odGhpcy5pZFZlcnRleCk7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5nZXRTaGFkZXIodGhpcy5pZFZlcnRleCwgdHJ1ZSk7XHRcblx0fVxuXHRcblx0aWYodGhpcy5pZEZyYWdtZW50ICYmIHRoaXMuaWRGcmFnbWVudC5pbmRleE9mKFwibWFpbih2b2lkKVwiKSA+IC0xKSB7XG5cdFx0dGhpcy5jcmVhdGVGcmFnbWVudFNoYWRlclByb2dyYW0odGhpcy5pZEZyYWdtZW50KTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLmdldFNoYWRlcih0aGlzLmlkRnJhZ21lbnQsIGZhbHNlKTtcdFxuXHR9XG59O1xuXG5wLmdldFNoYWRlciA9IGZ1bmN0aW9uKGFJZCwgYUlzVmVydGV4U2hhZGVyKSB7XG5cdGlmKCFhSWQpIHtyZXR1cm47fVxuXHR2YXIgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdHJlcS5oYXNDb21wbGV0ZWQgPSBmYWxzZTtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXHRyZXEub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oZSkge1xuXHRcdGlmKGUudGFyZ2V0LnJlYWR5U3RhdGUgPT09IDQpIHtcblx0XHRcdGlmKGFJc1ZlcnRleFNoYWRlcikge1xuXHRcdFx0XHR0aGF0LmNyZWF0ZVZlcnRleFNoYWRlclByb2dyYW0oZS50YXJnZXQucmVzcG9uc2VUZXh0KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoYXQuY3JlYXRlRnJhZ21lbnRTaGFkZXJQcm9ncmFtKGUudGFyZ2V0LnJlc3BvbnNlVGV4dCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXEub3BlbihcIkdFVFwiLCBhSWQsIHRydWUpO1xuXHRyZXEuc2VuZChudWxsKTtcbn07XG5cbnAuY3JlYXRlVmVydGV4U2hhZGVyUHJvZ3JhbSA9IGZ1bmN0aW9uKGFTdHIpIHtcblx0aWYoIWdsKSB7XHRyZXR1cm47XHR9XG5cdHZhciBzaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuVkVSVEVYX1NIQURFUik7XG5cblx0Z2wuc2hhZGVyU291cmNlKHNoYWRlciwgYVN0cik7XG5cdGdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKTtcblxuXHRpZighZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XG5cdFx0Y29uc29sZS53YXJuKFwiRXJyb3IgaW4gVmVydGV4IFNoYWRlciA6IFwiLCB0aGlzLmlkVmVydGV4LCBcIjpcIiwgZ2wuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpKTtcblx0XHRjb25zb2xlLmxvZyhhZGRMaW5lTnVtYmVycyhhU3RyKSk7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHR0aGlzLnZlcnRleFNoYWRlciA9IHNoYWRlcjtcblx0XG5cdGlmKHRoaXMudmVydGV4U2hhZGVyICE9PSB1bmRlZmluZWQgJiYgdGhpcy5mcmFnbWVudFNoYWRlciAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhpcy5hdHRhY2hTaGFkZXJQcm9ncmFtKCk7XG5cdH1cblxuXHR0aGlzLl9sb2FkZWRDb3VudCsrO1xufTtcblxuXG5wLmNyZWF0ZUZyYWdtZW50U2hhZGVyUHJvZ3JhbSA9IGZ1bmN0aW9uKGFTdHIpIHtcblx0aWYoIWdsKSB7XHRyZXR1cm47XHR9XG5cdHZhciBzaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuRlJBR01FTlRfU0hBREVSKTtcblxuXHRnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBhU3RyKTtcblx0Z2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xuXG5cdGlmKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUykpIHtcblx0XHRjb25zb2xlLndhcm4oXCJFcnJvciBpbiBGcmFnbWVudCBTaGFkZXI6IFwiLCB0aGlzLmlkRnJhZ21lbnQsIFwiOlwiICwgZ2wuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpKTtcblx0XHRjb25zb2xlLmxvZyhhZGRMaW5lTnVtYmVycyhhU3RyKSk7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHR0aGlzLmZyYWdtZW50U2hhZGVyID0gc2hhZGVyO1xuXG5cdGlmKHRoaXMudmVydGV4U2hhZGVyICE9PSB1bmRlZmluZWQgJiYgdGhpcy5mcmFnbWVudFNoYWRlciAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhpcy5hdHRhY2hTaGFkZXJQcm9ncmFtKCk7XG5cdH1cblxuXHR0aGlzLl9sb2FkZWRDb3VudCsrO1xufTtcblxucC5hdHRhY2hTaGFkZXJQcm9ncmFtID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMuX2lzUmVhZHkgPSB0cnVlO1xuXHR0aGlzLnNoYWRlclByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG5cdGdsLmF0dGFjaFNoYWRlcih0aGlzLnNoYWRlclByb2dyYW0sIHRoaXMudmVydGV4U2hhZGVyKTtcblx0Z2wuYXR0YWNoU2hhZGVyKHRoaXMuc2hhZGVyUHJvZ3JhbSwgdGhpcy5mcmFnbWVudFNoYWRlcik7XG5cdGdsLmxpbmtQcm9ncmFtKHRoaXMuc2hhZGVyUHJvZ3JhbSk7XG59O1xuXG5wLmJpbmQgPSBmdW5jdGlvbigpIHtcblx0aWYoIXRoaXMuX2lzUmVhZHkpIHtyZXR1cm47fVxuXHRnbC51c2VQcm9ncmFtKHRoaXMuc2hhZGVyUHJvZ3JhbSk7XG5cblx0aWYodGhpcy5zaGFkZXJQcm9ncmFtLnBNYXRyaXhVbmlmb3JtID09PSB1bmRlZmluZWQpIHtcdHRoaXMuc2hhZGVyUHJvZ3JhbS5wTWF0cml4VW5pZm9ybSA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnNoYWRlclByb2dyYW0sIFwidVBNYXRyaXhcIik7fVxuXHRpZih0aGlzLnNoYWRlclByb2dyYW0ubXZNYXRyaXhVbmlmb3JtID09PSB1bmRlZmluZWQpIHtcdHRoaXMuc2hhZGVyUHJvZ3JhbS5tdk1hdHJpeFVuaWZvcm0gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5zaGFkZXJQcm9ncmFtLCBcInVNVk1hdHJpeFwiKTt9XG5cdGlmKHRoaXMuc2hhZGVyUHJvZ3JhbS5ub3JtYWxNYXRyaXhVbmlmb3JtID09PSB1bmRlZmluZWQpIHtcdHRoaXMuc2hhZGVyUHJvZ3JhbS5ub3JtYWxNYXRyaXhVbmlmb3JtID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuc2hhZGVyUHJvZ3JhbSwgXCJub3JtYWxNYXRyaXhcIik7fVxuXHRpZih0aGlzLnNoYWRlclByb2dyYW0uaW52ZXJ0TVZNYXRyaXhVbmlmb3JtID09PSB1bmRlZmluZWQpIHtcdHRoaXMuc2hhZGVyUHJvZ3JhbS5pbnZlcnRNVk1hdHJpeFVuaWZvcm0gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5zaGFkZXJQcm9ncmFtLCBcImludmVydE1WTWF0cml4XCIpO31cblxuXHRHTC5zZXRTaGFkZXIodGhpcyk7XG5cdEdMLnNldFNoYWRlclByb2dyYW0odGhpcy5zaGFkZXJQcm9ncmFtKTtcblxuXHR0aGlzLnVuaWZvcm1UZXh0dXJlcyA9IFtdO1xufTtcblxucC5pc1JlYWR5ID0gZnVuY3Rpb24oKSB7XHRyZXR1cm4gdGhpcy5faXNSZWFkeTtcdH07XG5cblxucC5jbGVhclVuaWZvcm1zID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMucGFyYW1ldGVycyAgICA9IFtdO1xuXHR0aGlzLnVuaWZvcm1WYWx1ZXMgPSB7fTtcbn07XG5cbnAudW5pZm9ybSA9IGZ1bmN0aW9uKGFOYW1lLCBhVHlwZSwgYVZhbHVlKSB7XG5cdGlmKCF0aGlzLl9pc1JlYWR5KSB7cmV0dXJuO31cblxuXHRpZihhVHlwZSA9PT0gXCJ0ZXh0dXJlXCIpIHthVHlwZSA9IFwidW5pZm9ybTFpXCI7fVxuXG5cdHZhciBoYXNVbmlmb3JtID0gZmFsc2U7XG5cdHZhciBvVW5pZm9ybTtcblx0Zm9yKHZhciBpPTA7IGk8dGhpcy5wYXJhbWV0ZXJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0b1VuaWZvcm0gPSB0aGlzLnBhcmFtZXRlcnNbaV07XG5cdFx0aWYob1VuaWZvcm0ubmFtZSA9PT0gYU5hbWUpIHtcblx0XHRcdG9Vbmlmb3JtLnZhbHVlID0gYVZhbHVlO1xuXHRcdFx0aGFzVW5pZm9ybSA9IHRydWU7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHRpZighaGFzVW5pZm9ybSkge1xuXHRcdHRoaXMuc2hhZGVyUHJvZ3JhbVthTmFtZV0gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5zaGFkZXJQcm9ncmFtLCBhTmFtZSk7XG5cdFx0dGhpcy5wYXJhbWV0ZXJzLnB1c2goe25hbWUgOiBhTmFtZSwgdHlwZTogYVR5cGUsIHZhbHVlOiBhVmFsdWUsIHVuaWZvcm1Mb2M6IHRoaXMuc2hhZGVyUHJvZ3JhbVthTmFtZV19KTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLnNoYWRlclByb2dyYW1bYU5hbWVdID0gb1VuaWZvcm0udW5pZm9ybUxvYztcblx0fVxuXG5cblx0aWYoYVR5cGUuaW5kZXhPZihcIk1hdHJpeFwiKSA9PT0gLTEpIHtcblx0XHRpZighaGFzVW5pZm9ybSkge1xuXHRcdFx0dmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5KGFWYWx1ZSk7XG5cdFx0XHRpZihpc0FycmF5KSB7XG5cdFx0XHRcdHRoaXMudW5pZm9ybVZhbHVlc1thTmFtZV0gPSBhVmFsdWUuY29uY2F0KCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnVuaWZvcm1WYWx1ZXNbYU5hbWVdID0gYVZhbHVlO1x0XG5cdFx0XHR9XG5cdFx0XHRnbFthVHlwZV0odGhpcy5zaGFkZXJQcm9ncmFtW2FOYW1lXSwgYVZhbHVlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gaWYoYU5hbWUgPT0gJ3Bvc2l0aW9uJykgY29uc29sZS5sb2coJ0hhcyB1bmlmb3JtJywgdGhpcy5jaGVja1VuaWZvcm0oYU5hbWUsIGFUeXBlLCBhVmFsdWUpKTtcblx0XHRcdGlmKHRoaXMuY2hlY2tVbmlmb3JtKGFOYW1lLCBhVHlwZSwgYVZhbHVlKSkge1xuXHRcdFx0XHRnbFthVHlwZV0odGhpcy5zaGFkZXJQcm9ncmFtW2FOYW1lXSwgYVZhbHVlKTtcblx0XHRcdFx0Ly8gY29uc29sZS5kZWJ1ZygnU2V0IHVuaWZvcm0nLCBhTmFtZSwgYVR5cGUsIGFWYWx1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdGdsW2FUeXBlXSh0aGlzLnNoYWRlclByb2dyYW1bYU5hbWVdLCBmYWxzZSwgYVZhbHVlKTtcblx0XHRpZighaGFzVW5pZm9ybSkge1xuXHRcdFx0Z2xbYVR5cGVdKHRoaXMuc2hhZGVyUHJvZ3JhbVthTmFtZV0sIGZhbHNlLCBhVmFsdWUpO1xuXHRcdFx0dGhpcy51bmlmb3JtVmFsdWVzW2FOYW1lXSA9IGFWYWx1ZTtcblx0XHRcdC8vIGNvbnNvbGUuZGVidWcoJ1NldCB1bmlmb3JtJywgYU5hbWUsIGFUeXBlLCBhVmFsdWUpO1xuXHRcdH1cblx0fVxuXG5cdGlmKGFUeXBlID09PSBcInVuaWZvcm0xaVwiKSB7XG5cdFx0Ly8gVGV4dHVyZVxuXHRcdHRoaXMudW5pZm9ybVRleHR1cmVzW2FWYWx1ZV0gPSB0aGlzLnNoYWRlclByb2dyYW1bYU5hbWVdO1xuXHR9XG59O1xuXG5wLmNoZWNrVW5pZm9ybSA9IGZ1bmN0aW9uKGFOYW1lLCBhVHlwZSwgYVZhbHVlKSB7XG5cdHZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheShhVmFsdWUpO1xuXG5cdGlmKCF0aGlzLnVuaWZvcm1WYWx1ZXNbYU5hbWVdKSB7XG5cdFx0dGhpcy51bmlmb3JtVmFsdWVzW2FOYW1lXSA9IGFWYWx1ZTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGlmKGFUeXBlID09PSBcInVuaWZvcm0xaVwiKSB7XG5cdFx0dGhpcy51bmlmb3JtVmFsdWVzW2FOYW1lXSA9IGFWYWx1ZTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdHZhciB1bmlmb3JtVmFsdWUgPSB0aGlzLnVuaWZvcm1WYWx1ZXNbYU5hbWVdO1xuXHR2YXIgaGFzQ2hhbmdlZCA9IGZhbHNlO1xuXG5cdGlmKGlzQXJyYXkpIHtcblx0XHRmb3IodmFyIGk9MDsgaTx1bmlmb3JtVmFsdWUubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmKHVuaWZvcm1WYWx1ZVtpXSAhPT0gYVZhbHVlW2ldKSB7XG5cdFx0XHRcdGhhc0NoYW5nZWQgPSB0cnVlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XHRcblx0fSBlbHNlIHtcblx0XHRoYXNDaGFuZ2VkID0gdW5pZm9ybVZhbHVlICE9PSBhVmFsdWU7XG5cdH1cblx0XG5cdFxuXHRpZihoYXNDaGFuZ2VkKSB7XG5cdFx0aWYoaXNBcnJheSkge1xuXHRcdFx0dGhpcy51bmlmb3JtVmFsdWVzW2FOYW1lXSA9IGFWYWx1ZS5jb25jYXQoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy51bmlmb3JtVmFsdWVzW2FOYW1lXSA9IGFWYWx1ZTtcdFxuXHRcdH1cblx0XHRcblx0fVxuXG5cdHJldHVybiBoYXNDaGFuZ2VkO1xufTtcblxuXG5wLnVuYmluZCA9IGZ1bmN0aW9uKCkge1xuXG59O1xuXG5cbnAuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuXHRnbC5kZXRhY2hTaGFkZXIodGhpcy5zaGFkZXJQcm9ncmFtLCB0aGlzLnZlcnRleFNoYWRlcik7XG5cdGdsLmRldGFjaFNoYWRlcih0aGlzLnNoYWRlclByb2dyYW0sIHRoaXMuZnJhZ21lbnRTaGFkZXIpO1xuXHRnbC5kZWxldGVTaGFkZXIodGhpcy52ZXJ0ZXhTaGFkZXIpO1xuXHRnbC5kZWxldGVTaGFkZXIodGhpcy5mcmFnbWVudFNoYWRlcik7XG5cdGdsLmRlbGV0ZVByb2dyYW0odGhpcy5zaGFkZXJQcm9ncmFtKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gR0xTaGFkZXI7IiwiLy8gR0xUZXh0dXJlLmpzXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGdsO1xudmFyIEdMID0gcmVxdWlyZShcIi4vR0xUb29sc1wiKTtcbnZhciBfaXNQb3dlck9mVHdvID0gZnVuY3Rpb24oeCkge1x0XG5cdHZhciBjaGVjayA9ICh4ICE9PSAwKSAmJiAoISh4ICYgKHggLSAxKSkpO1xuXHRyZXR1cm4gY2hlY2s7XG59O1xudmFyIGlzUG93ZXJPZlR3byA9IGZ1bmN0aW9uKG9iaikge1x0XG5cdHZhciB3ID0gb2JqLndpZHRoIHx8IG9iai52aWRlb1dpZHRoO1xuXHR2YXIgaCA9IG9iai5oZWlnaHQgfHwgb2JqLnZpZGVvSGVpZ2h0O1xuXG5cdGlmKCF3IHx8ICFoKSB7cmV0dXJuIGZhbHNlO31cblxuXHRyZXR1cm4gX2lzUG93ZXJPZlR3byh3KSAmJiBfaXNQb3dlck9mVHdvKGgpO1xufTtcblxudmFyIEdMVGV4dHVyZSA9IGZ1bmN0aW9uKHNvdXJjZSwgaXNUZXh0dXJlLCBvcHRpb25zKSB7XG5cdGlzVGV4dHVyZSA9IGlzVGV4dHVyZSB8fCBmYWxzZTtcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cdGdsID0gR0wuZ2w7XG5cdGlmKGlzVGV4dHVyZSkge1xuXHRcdHRoaXMudGV4dHVyZSA9IHNvdXJjZTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLl9zb3VyY2UgICA9IHNvdXJjZTtcblx0XHR0aGlzLnRleHR1cmUgICA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcblx0XHR0aGlzLl9pc1ZpZGVvICA9IChzb3VyY2UudGFnTmFtZSA9PT0gXCJWSURFT1wiKTtcblx0XHR0aGlzLm1hZ0ZpbHRlciA9IG9wdGlvbnMubWFnRmlsdGVyIHx8IGdsLkxJTkVBUjtcblx0XHR0aGlzLm1pbkZpbHRlciA9IG9wdGlvbnMubWluRmlsdGVyIHx8IGdsLkxJTkVBUl9NSVBNQVBfTkVBUkVTVDtcblx0XHRcblx0XHR0aGlzLndyYXBTICAgICA9IG9wdGlvbnMud3JhcFMgfHwgZ2wuTUlSUk9SRURfUkVQRUFUO1xuXHRcdHRoaXMud3JhcFQgICAgID0gb3B0aW9ucy53cmFwVCB8fCBnbC5NSVJST1JFRF9SRVBFQVQ7XG5cdFx0dmFyIHdpZHRoICAgICAgPSBzb3VyY2Uud2lkdGggfHwgc291cmNlLnZpZGVvV2lkdGg7XG5cblx0XHRpZih3aWR0aCkge1xuXHRcdFx0aWYoIWlzUG93ZXJPZlR3byhzb3VyY2UpKSB7XG5cdFx0XHRcdHRoaXMud3JhcFMgPSB0aGlzLndyYXBUID0gZ2wuQ0xBTVBfVE9fRURHRTtcblx0XHRcdFx0aWYodGhpcy5taW5GaWx0ZXIgPT09IGdsLkxJTkVBUl9NSVBNQVBfTkVBUkVTVCkge1xuXHRcdFx0XHRcdHRoaXMubWluRmlsdGVyID0gZ2wuTElORUFSO1xuXHRcdFx0XHR9XG5cdFx0XHR9IFx0XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMud3JhcFMgPSB0aGlzLndyYXBUID0gZ2wuQ0xBTVBfVE9fRURHRTtcblx0XHRcdGlmKHRoaXMubWluRmlsdGVyID09PSBnbC5MSU5FQVJfTUlQTUFQX05FQVJFU1QpIHtcblx0XHRcdFx0dGhpcy5taW5GaWx0ZXIgPSBnbC5MSU5FQVI7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Z2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy50ZXh0dXJlKTtcblx0XHRnbC5waXhlbFN0b3JlaShnbC5VTlBBQ0tfRkxJUF9ZX1dFQkdMLCB0cnVlKTtcblx0XHRnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLlJHQkEsIGdsLlJHQkEsIGdsLlVOU0lHTkVEX0JZVEUsIHNvdXJjZSk7XG5cblx0XHRnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgdGhpcy5tYWdGaWx0ZXIpO1xuXHRcdGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCB0aGlzLm1pbkZpbHRlcik7XG5cdFx0Z2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgdGhpcy53cmFwUyk7XG5cdFx0Z2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgdGhpcy53cmFwVCk7XG5cdFx0XG5cdFx0aWYodGhpcy5taW5GaWx0ZXIgPT09IGdsLkxJTkVBUl9NSVBNQVBfTkVBUkVTVClcdHtcblx0XHRcdGdsLmdlbmVyYXRlTWlwbWFwKGdsLlRFWFRVUkVfMkQpO1xuXHRcdH1cblxuXHRcdGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIG51bGwpO1xuXHR9XG59O1xuXG52YXIgcCA9IEdMVGV4dHVyZS5wcm90b3R5cGU7XG5cblxucC51cGRhdGVUZXh0dXJlID0gZnVuY3Rpb24oc291cmNlKSB7XG5cdGlmKHNvdXJjZSl7IHRoaXMuX3NvdXJjZSA9IHNvdXJjZTsgfVxuXHRnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLnRleHR1cmUpO1xuXHRnbC5waXhlbFN0b3JlaShnbC5VTlBBQ0tfRkxJUF9ZX1dFQkdMLCB0cnVlKTtcblx0Z2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCB0aGlzLl9zb3VyY2UpO1xuXHRnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgdGhpcy5tYWdGaWx0ZXIpO1xuXHRnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgdGhpcy5taW5GaWx0ZXIpO1xuXHRpZih0aGlzLm1pbkZpbHRlciA9PT0gZ2wuTElORUFSX01JUE1BUF9ORUFSRVNUKVx0e1xuXHRcdGdsLmdlbmVyYXRlTWlwbWFwKGdsLlRFWFRVUkVfMkQpO1xuXHR9XG5cblx0Z2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgbnVsbCk7XG59O1xuXG5cbnAuYmluZCA9IGZ1bmN0aW9uKGluZGV4KSB7XG5cdGlmKGluZGV4ID09PSB1bmRlZmluZWQpIHtpbmRleCA9IDA7fVxuXHRpZighR0wuc2hhZGVyKSB7cmV0dXJuO31cblxuXHRnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUwICsgaW5kZXgpO1xuXHRnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLnRleHR1cmUpO1xuXHRnbC51bmlmb3JtMWkoR0wuc2hhZGVyLnVuaWZvcm1UZXh0dXJlc1tpbmRleF0sIGluZGV4KTtcblx0dGhpcy5fYmluZEluZGV4ID0gaW5kZXg7XG59O1xuXG5cbnAudW5iaW5kID0gZnVuY3Rpb24oKSB7XG5cdGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIG51bGwpO1xufTtcblxucC5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG5cdGdsLmRlbGV0ZVRleHR1cmUodGhpcy50ZXh0dXJlKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gR0xUZXh0dXJlOyIsIi8vIEdMVG9vbHMuanNcblwidXNlIHN0cmljdFwiO1xuXG52YXIgZ2xtID0gcmVxdWlyZShcImdsLW1hdHJpeFwiKTtcblxuZnVuY3Rpb24gR0xUb29scygpIHtcblx0dGhpcy5hc3BlY3RSYXRpbyAgID0gMTtcblx0dGhpcy5maWVsZE9mVmlldyAgID0gNDU7XG5cdHRoaXMuek5lYXIgICAgICAgICA9IDU7XG5cdHRoaXMuekZhciAgICAgICAgICA9IDMwMDA7XG5cblx0dGhpcy5jYW52YXMgICAgICAgID0gbnVsbDtcblx0dGhpcy5nbCAgICAgICAgICAgID0gbnVsbDtcblxuXHR0aGlzLnNoYWRlciAgICAgICAgPSBudWxsO1xuXHR0aGlzLnNoYWRlclByb2dyYW0gPSBudWxsO1xufVxuXG52YXIgcCA9IEdMVG9vbHMucHJvdG90eXBlO1xuXG5wLmluaXQgPSBmdW5jdGlvbihtQ2FudmFzLCBtV2lkdGgsIG1IZWlnaHQsIHBhcmFtZXRlcnMpIHtcblx0aWYodGhpcy5jYW52YXMgPT09IG51bGwpIHtcblx0XHR0aGlzLmNhbnZhcyAgICAgID0gbUNhbnZhcyB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuXHR9XG5cdHZhciBwYXJhbXMgICAgICAgPSBwYXJhbWV0ZXJzIHx8IHt9O1xuXHRwYXJhbXMuYW50aWFsaWFzID0gdHJ1ZTtcblxuXHR0aGlzLmdsICAgICAgICAgID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIndlYmdsXCIsIHBhcmFtcykgfHwgdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcImV4cGVyaW1lbnRhbC13ZWJnbFwiLCBwYXJhbXMpO1xuXHRjb25zb2xlLmxvZygnR0wgVE9PTFMgOiAnLCB0aGlzLmdsKTtcblx0XG5cdFxuXHRpZihtV2lkdGggIT09IHVuZGVmaW5lZCAmJiBtSGVpZ2h0ICE9PSB1bmRlZmluZWQpIHtcblx0XHR0aGlzLnNldFNpemUobVdpZHRoLCBtSGVpZ2h0KTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XHRcblx0fVxuXG5cdHRoaXMuZ2wudmlld3BvcnQoMCwgMCwgdGhpcy5nbC52aWV3cG9ydFdpZHRoLCB0aGlzLmdsLnZpZXdwb3J0SGVpZ2h0KTtcblx0dGhpcy5nbC5lbmFibGUodGhpcy5nbC5ERVBUSF9URVNUKTtcblx0dGhpcy5nbC5lbmFibGUodGhpcy5nbC5DVUxMX0ZBQ0UpO1xuXHR0aGlzLmdsLmVuYWJsZSh0aGlzLmdsLkJMRU5EKTtcblx0dGhpcy5nbC5jbGVhckNvbG9yKCAwLCAwLCAwLCAxICk7XG5cdHRoaXMuZ2wuY2xlYXJEZXB0aCggMSApO1xuXG5cdHRoaXMubWF0cml4ICAgICAgICAgICAgICAgICA9IGdsbS5tYXQ0LmNyZWF0ZSgpO1xuXHRnbG0ubWF0NC5pZGVudGl0eSh0aGlzLm1hdHJpeCk7XG5cdHRoaXMubm9ybWFsTWF0cml4ICAgICAgICAgICA9IGdsbS5tYXQzLmNyZWF0ZSgpO1xuXHR0aGlzLmludmVydE1WTWF0cml4ICAgICAgICAgPSBnbG0ubWF0My5jcmVhdGUoKTtcblx0dGhpcy5kZXB0aFRleHR1cmVFeHQgICAgICAgID0gdGhpcy5nbC5nZXRFeHRlbnNpb24oXCJXRUJLSVRfV0VCR0xfZGVwdGhfdGV4dHVyZVwiKTsgLy8gT3IgYnJvd3Nlci1hcHByb3ByaWF0ZSBwcmVmaXhcblx0dGhpcy5mbG9hdFRleHR1cmVFeHQgICAgICAgID0gdGhpcy5nbC5nZXRFeHRlbnNpb24oXCJPRVNfdGV4dHVyZV9mbG9hdFwiKTsgLy8gT3IgYnJvd3Nlci1hcHByb3ByaWF0ZSBwcmVmaXhcblx0dGhpcy5mbG9hdFRleHR1cmVMaW5lYXJFeHQgID0gdGhpcy5nbC5nZXRFeHRlbnNpb24oXCJPRVNfdGV4dHVyZV9mbG9hdF9saW5lYXJcIik7IC8vIE9yIGJyb3dzZXItYXBwcm9wcmlhdGUgcHJlZml4XG5cdHRoaXMuc3RhbmRhcmREZXJpdmF0aXZlc0V4dCA9IHRoaXMuZ2wuZ2V0RXh0ZW5zaW9uKFwiT0VTX3N0YW5kYXJkX2Rlcml2YXRpdmVzXCIpOyAvLyBPciBicm93c2VyLWFwcHJvcHJpYXRlIHByZWZpeFxuXG5cdHRoaXMuZW5hYmxlZFZlcnRleEF0dHJpYnV0ZSA9IFtdO1xuXHR0aGlzLmVuYWJsZUFscGhhQmxlbmRpbmcoKTtcblx0dGhpcy5fdmlld3BvcnQgPSBbMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHRdO1xufTtcblxuXG5wLmdldEdMID0gZnVuY3Rpb24oKSB7XHRyZXR1cm4gdGhpcy5nbDtcdH07XG5cbnAuc2V0U2hhZGVyID0gZnVuY3Rpb24oYVNoYWRlcikge1xuXHR0aGlzLnNoYWRlciA9IGFTaGFkZXI7XG59O1xuXG5wLnNldFNoYWRlclByb2dyYW0gPSBmdW5jdGlvbihhU2hhZGVyUHJvZ3JhbSkge1xuXHR0aGlzLnNoYWRlclByb2dyYW0gPSBhU2hhZGVyUHJvZ3JhbTtcbn07XG5cbnAuc2V0Vmlld3BvcnQgPSBmdW5jdGlvbihhWCwgYVksIGFXLCBhSCkge1xuXHR2YXIgaGFzQ2hhbmdlZCA9IGZhbHNlO1xuXHRpZihhWCE9PXRoaXMuX3ZpZXdwb3J0WzBdKSB7aGFzQ2hhbmdlZCA9IHRydWU7fVxuXHRpZihhWSE9PXRoaXMuX3ZpZXdwb3J0WzFdKSB7aGFzQ2hhbmdlZCA9IHRydWU7fVxuXHRpZihhVyE9PXRoaXMuX3ZpZXdwb3J0WzJdKSB7aGFzQ2hhbmdlZCA9IHRydWU7fVxuXHRpZihhSCE9PXRoaXMuX3ZpZXdwb3J0WzNdKSB7aGFzQ2hhbmdlZCA9IHRydWU7fVxuXG5cdGlmKGhhc0NoYW5nZWQpIHtcblx0XHR0aGlzLmdsLnZpZXdwb3J0KGFYLCBhWSwgYVcsIGFIKTtcblx0XHR0aGlzLl92aWV3cG9ydCA9IFthWCwgYVksIGFXLCBhSF07XG5cdH1cbn07XG5cbnAuc2V0TWF0cmljZXMgPSBmdW5jdGlvbihhQ2FtZXJhKSB7XG5cdHRoaXMuY2FtZXJhID0gYUNhbWVyYTtcdFxufTtcblxucC5yb3RhdGUgPSBmdW5jdGlvbihhUm90YXRpb24pIHtcblx0Z2xtLm1hdDQuY29weSh0aGlzLm1hdHJpeCwgYVJvdGF0aW9uKTtcblxuXHRnbG0ubWF0NC5tdWx0aXBseSh0aGlzLm1hdHJpeCwgdGhpcy5jYW1lcmEuZ2V0TWF0cml4KCksIHRoaXMubWF0cml4KTtcblx0Z2xtLm1hdDMuZnJvbU1hdDQodGhpcy5ub3JtYWxNYXRyaXgsIHRoaXMubWF0cml4KTtcblx0Z2xtLm1hdDMuaW52ZXJ0KHRoaXMubm9ybWFsTWF0cml4LCB0aGlzLm5vcm1hbE1hdHJpeCk7XG5cdGdsbS5tYXQzLnRyYW5zcG9zZSh0aGlzLm5vcm1hbE1hdHJpeCwgdGhpcy5ub3JtYWxNYXRyaXgpO1xuXG5cdGdsbS5tYXQzLmZyb21NYXQ0KHRoaXMuaW52ZXJ0TVZNYXRyaXgsIHRoaXMubWF0cml4KTtcblx0Z2xtLm1hdDMuaW52ZXJ0KHRoaXMuaW52ZXJ0TVZNYXRyaXgsIHRoaXMuaW52ZXJ0TVZNYXRyaXgpO1xufTtcblxuXG4vL1x0QkxFTkQgTU9ERVNcbnAuZW5hYmxlQWxwaGFCbGVuZGluZyA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLmdsLmJsZW5kRnVuYyh0aGlzLmdsLlNSQ19BTFBIQSwgdGhpcy5nbC5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcdFxufTtcblxucC5lbmFibGVBZGRpdGl2ZUJsZW5kaW5nID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMuZ2wuYmxlbmRGdW5jKHRoaXMuZ2wuT05FLCB0aGlzLmdsLk9ORSk7XG59O1xuXG4vL1x0Q0xFQVIgQ0FOVkFTXG5wLmNsZWFyID0gZnVuY3Rpb24ociwgZywgYiwgYSkge1xuXHR0aGlzLmdsLmNsZWFyQ29sb3IoIHIsIGcsIGIsIGEgKTtcblx0dGhpcy5nbC5jbGVhcih0aGlzLmdsLkNPTE9SX0JVRkZFUl9CSVQgfCB0aGlzLmdsLkRFUFRIX0JVRkZFUl9CSVQpO1xufTtcblxuLy9cdERSQVdJTkcgRUxFTUVOVFNcbnAuZHJhdyA9IGZ1bmN0aW9uKGFNZXNoKSB7XG5cdGlmKCF0aGlzLnNoYWRlclByb2dyYW0pIHtcblx0XHRjb25zb2xlLndhcm4oXCJTaGFkZXIgcHJvZ3JhbSBub3QgcmVhZHkgeWV0XCIpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vXHRQUk9KRUNUSU9OIE1BVFJJWFxuXHRpZighdGhpcy5zaGFkZXJQcm9ncmFtLnBNYXRyaXhWYWx1ZSkge1xuXHRcdHRoaXMuc2hhZGVyUHJvZ3JhbS5wTWF0cml4VmFsdWUgPSBnbG0ubWF0NC5jcmVhdGUoKTtcblx0XHR0aGlzLmdsLnVuaWZvcm1NYXRyaXg0ZnYodGhpcy5zaGFkZXJQcm9ncmFtLnBNYXRyaXhVbmlmb3JtLCBmYWxzZSwgdGhpcy5jYW1lcmEucHJvamVjdGlvbiB8fCB0aGlzLmNhbWVyYS5nZXRNYXRyaXgoKSApO1xuXHRcdGdsbS5tYXQ0LmNvcHkodGhpcy5zaGFkZXJQcm9ncmFtLnBNYXRyaXhWYWx1ZSwgdGhpcy5jYW1lcmEucHJvamVjdGlvbiB8fCB0aGlzLmNhbWVyYS5nZXRNYXRyaXgoKSk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIHBNYXRyaXggPSB0aGlzLmNhbWVyYS5wcm9qZWN0aW9uIHx8IHRoaXMuY2FtZXJhLmdldE1hdHJpeCgpO1xuXHRcdGlmKGdsbS5tYXQ0LnN0cih0aGlzLnNoYWRlclByb2dyYW0ucE1hdHJpeFZhbHVlKSAhPT0gZ2xtLm1hdDQuc3RyKHBNYXRyaXgpKSB7XG5cdFx0XHR0aGlzLmdsLnVuaWZvcm1NYXRyaXg0ZnYodGhpcy5zaGFkZXJQcm9ncmFtLnBNYXRyaXhVbmlmb3JtLCBmYWxzZSwgdGhpcy5jYW1lcmEucHJvamVjdGlvbiB8fCB0aGlzLmNhbWVyYS5nZXRNYXRyaXgoKSApO1xuXHRcdFx0Z2xtLm1hdDQuY29weSh0aGlzLnNoYWRlclByb2dyYW0ucE1hdHJpeFZhbHVlLCBwTWF0cml4KTtcblx0XHR9XG5cdH1cblxuXHQvL1x0TU9ERUwtVklFVyBNQVRSSVhcblx0aWYoIXRoaXMuc2hhZGVyUHJvZ3JhbS5tdk1hdHJpeFZhbHVlKSB7XG5cdFx0dGhpcy5zaGFkZXJQcm9ncmFtLm12TWF0cml4VmFsdWUgPSBnbG0ubWF0NC5jcmVhdGUoKTtcblx0XHR0aGlzLmdsLnVuaWZvcm1NYXRyaXg0ZnYodGhpcy5zaGFkZXJQcm9ncmFtLm12TWF0cml4VW5pZm9ybSwgZmFsc2UsIHRoaXMubWF0cml4ICk7XG5cdFx0Z2xtLm1hdDQuY29weSh0aGlzLnNoYWRlclByb2dyYW0ubXZNYXRyaXhWYWx1ZSwgdGhpcy5tYXRyaXgpO1xuXHR9IGVsc2Uge1xuXHRcdGlmKGdsbS5tYXQ0LnN0cih0aGlzLnNoYWRlclByb2dyYW0ubXZNYXRyaXhWYWx1ZSkgIT09IGdsbS5tYXQ0LnN0cih0aGlzLm1hdHJpeCkpIHtcblx0XHRcdHRoaXMuZ2wudW5pZm9ybU1hdHJpeDRmdih0aGlzLnNoYWRlclByb2dyYW0ubXZNYXRyaXhVbmlmb3JtLCBmYWxzZSwgdGhpcy5tYXRyaXggKTtcblx0XHRcdGdsbS5tYXQ0LmNvcHkodGhpcy5zaGFkZXJQcm9ncmFtLm12TWF0cml4VmFsdWUsIHRoaXMubWF0cml4KTtcblx0XHR9XG5cdH1cblx0XG5cdFxuICAgIC8vXHRJTlZFUlQgTU9ERUwtVklFVyBNQVRSSVhcblx0aWYoIXRoaXMuc2hhZGVyUHJvZ3JhbS5pbnZlcnRNVk1hdHJpeFZhbHVlKSB7XG5cdFx0dGhpcy5zaGFkZXJQcm9ncmFtLmludmVydE1WTWF0cml4VmFsdWUgPSBnbG0ubWF0My5jcmVhdGUoKTtcblx0XHR0aGlzLmdsLnVuaWZvcm1NYXRyaXgzZnYodGhpcy5zaGFkZXJQcm9ncmFtLmludmVydE1WTWF0cml4VW5pZm9ybSwgZmFsc2UsIHRoaXMuaW52ZXJ0TVZNYXRyaXggKTtcblx0XHRnbG0ubWF0My5jb3B5KHRoaXMuc2hhZGVyUHJvZ3JhbS5pbnZlcnRNVk1hdHJpeFZhbHVlLCB0aGlzLmludmVydE1WTWF0cml4KTtcblx0fSBlbHNlIHtcblx0XHRpZihnbG0ubWF0My5zdHIodGhpcy5zaGFkZXJQcm9ncmFtLmludmVydE1WTWF0cml4VmFsdWUpICE9PSBnbG0ubWF0My5zdHIodGhpcy5pbnZlcnRNVk1hdHJpeCkpIHtcblx0XHRcdHRoaXMuZ2wudW5pZm9ybU1hdHJpeDNmdih0aGlzLnNoYWRlclByb2dyYW0uaW52ZXJ0TVZNYXRyaXhVbmlmb3JtLCBmYWxzZSwgdGhpcy5pbnZlcnRNVk1hdHJpeCApO1xuXHRcdFx0Z2xtLm1hdDMuY29weSh0aGlzLnNoYWRlclByb2dyYW0uaW52ZXJ0TVZNYXRyaXhWYWx1ZSwgdGhpcy5pbnZlcnRNVk1hdHJpeCk7XG5cdFx0fVxuXHR9XG5cblx0Ly9cdE5PUk1BTCBNQVRSSVhcblx0aWYoIXRoaXMuc2hhZGVyUHJvZ3JhbS5ub3JtYWxNYXRyaXhWYWx1ZSkge1xuXHRcdHRoaXMuc2hhZGVyUHJvZ3JhbS5ub3JtYWxNYXRyaXhWYWx1ZSA9IGdsbS5tYXQ0LmNyZWF0ZSgpO1xuXHRcdHRoaXMuZ2wudW5pZm9ybU1hdHJpeDNmdih0aGlzLnNoYWRlclByb2dyYW0ubm9ybWFsTWF0cml4VW5pZm9ybSwgZmFsc2UsIHRoaXMubm9ybWFsTWF0cml4ICk7XG5cdFx0Z2xtLm1hdDMuY29weSh0aGlzLnNoYWRlclByb2dyYW0ubm9ybWFsTWF0cml4VmFsdWUsIHRoaXMubm9ybWFsTWF0cml4KTtcblx0fSBlbHNlIHtcblx0XHRpZihnbG0ubWF0My5zdHIodGhpcy5zaGFkZXJQcm9ncmFtLm5vcm1hbE1hdHJpeFZhbHVlKSAhPT0gZ2xtLm1hdDMuc3RyKHRoaXMubm9ybWFsTWF0cml4KSkge1xuXHRcdFx0dGhpcy5nbC51bmlmb3JtTWF0cml4M2Z2KHRoaXMuc2hhZGVyUHJvZ3JhbS5ub3JtYWxNYXRyaXhVbmlmb3JtLCBmYWxzZSwgdGhpcy5ub3JtYWxNYXRyaXggKTtcblx0XHRcdGdsbS5tYXQzLmNvcHkodGhpcy5zaGFkZXJQcm9ncmFtLm5vcm1hbE1hdHJpeFZhbHVlLCB0aGlzLm5vcm1hbE1hdHJpeCk7XG5cdFx0fVxuXHR9XG5cblxuXG5cdC8vIFx0VkVSVEVYIFBPU0lUSU9OU1xuXHR0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIGFNZXNoLnZCdWZmZXJQb3MpO1xuXHR2YXIgdmVydGV4UG9zaXRpb25BdHRyaWJ1dGUgPSBnZXRBdHRyaWJMb2ModGhpcy5nbCwgdGhpcy5zaGFkZXJQcm9ncmFtLCBcImFWZXJ0ZXhQb3NpdGlvblwiKTtcblx0dGhpcy5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHZlcnRleFBvc2l0aW9uQXR0cmlidXRlLCBhTWVzaC52QnVmZmVyUG9zLml0ZW1TaXplLCB0aGlzLmdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG5cdGlmKHRoaXMuZW5hYmxlZFZlcnRleEF0dHJpYnV0ZS5pbmRleE9mKHZlcnRleFBvc2l0aW9uQXR0cmlidXRlKSA9PT0gLTEpIHtcblx0XHR0aGlzLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHZlcnRleFBvc2l0aW9uQXR0cmlidXRlKTtcdFxuXHRcdHRoaXMuZW5hYmxlZFZlcnRleEF0dHJpYnV0ZS5wdXNoKHZlcnRleFBvc2l0aW9uQXR0cmlidXRlKTtcblx0fVxuXHRcblxuXHQvL1x0VEVYVFVSRSBDT09SRFNcblx0dGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCBhTWVzaC52QnVmZmVyVVYpO1xuXHR2YXIgdGV4dHVyZUNvb3JkQXR0cmlidXRlID0gZ2V0QXR0cmliTG9jKHRoaXMuZ2wsIHRoaXMuc2hhZGVyUHJvZ3JhbSwgXCJhVGV4dHVyZUNvb3JkXCIpO1xuXHR0aGlzLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGV4dHVyZUNvb3JkQXR0cmlidXRlLCBhTWVzaC52QnVmZmVyVVYuaXRlbVNpemUsIHRoaXMuZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcblx0XG5cdGlmKHRoaXMuZW5hYmxlZFZlcnRleEF0dHJpYnV0ZS5pbmRleE9mKHRleHR1cmVDb29yZEF0dHJpYnV0ZSkgPT09IC0xKSB7XG5cdFx0dGhpcy5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0ZXh0dXJlQ29vcmRBdHRyaWJ1dGUpO1xuXHRcdHRoaXMuZW5hYmxlZFZlcnRleEF0dHJpYnV0ZS5wdXNoKHRleHR1cmVDb29yZEF0dHJpYnV0ZSk7XG5cdH1cblxuXHQvL1x0SU5ESUNFU1xuXHR0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgYU1lc2guaUJ1ZmZlcik7XG5cblx0Ly9cdEVYVFJBIEFUVFJJQlVURVNcblx0Zm9yKHZhciBpPTA7IGk8YU1lc2guZXh0cmFBdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCBhTWVzaC5leHRyYUF0dHJpYnV0ZXNbaV0uYnVmZmVyKTtcblx0XHR2YXIgYXR0clBvc2l0aW9uID0gZ2V0QXR0cmliTG9jKHRoaXMuZ2wsIHRoaXMuc2hhZGVyUHJvZ3JhbSwgYU1lc2guZXh0cmFBdHRyaWJ1dGVzW2ldLm5hbWUpO1xuXHRcdHRoaXMuZ2wudmVydGV4QXR0cmliUG9pbnRlcihhdHRyUG9zaXRpb24sIGFNZXNoLmV4dHJhQXR0cmlidXRlc1tpXS5pdGVtU2l6ZSwgdGhpcy5nbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuXHRcdC8vIHRoaXMuZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoYXR0clBvc2l0aW9uKTtcdFxuXHRcdGlmKHRoaXMuZW5hYmxlZFZlcnRleEF0dHJpYnV0ZS5pbmRleE9mKGF0dHJQb3NpdGlvbikgPT09IC0xKSB7XG5cdFx0XHR0aGlzLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGF0dHJQb3NpdGlvbik7XG5cdFx0XHR0aGlzLmVuYWJsZWRWZXJ0ZXhBdHRyaWJ1dGUucHVzaChhdHRyUG9zaXRpb24pO1xuXHRcdH1cdFxuXHR9XG5cblx0Ly9cdERSQVdJTkdcblx0aWYoYU1lc2guZHJhd1R5cGUgPT09IHRoaXMuZ2wuUE9JTlRTICkge1xuXHRcdHRoaXMuZ2wuZHJhd0FycmF5cyhhTWVzaC5kcmF3VHlwZSwgMCwgYU1lc2gudmVydGV4U2l6ZSk7XHRcblx0fSBlbHNlIHtcblx0XHR0aGlzLmdsLmRyYXdFbGVtZW50cyhhTWVzaC5kcmF3VHlwZSwgYU1lc2guaUJ1ZmZlci5udW1JdGVtcywgdGhpcy5nbC5VTlNJR05FRF9TSE9SVCwgMCk7XHRcblx0fVxuXG5cblx0ZnVuY3Rpb24gZ2V0QXR0cmliTG9jKGdsLCBzaGFkZXJQcm9ncmFtLCBuYW1lKSB7XG5cdFx0aWYoc2hhZGVyUHJvZ3JhbS5jYWNoZUF0dHJpYkxvYyA9PT0gdW5kZWZpbmVkKSB7XHRzaGFkZXJQcm9ncmFtLmNhY2hlQXR0cmliTG9jID0ge307XHR9XG5cdFx0aWYoc2hhZGVyUHJvZ3JhbS5jYWNoZUF0dHJpYkxvY1tuYW1lXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRzaGFkZXJQcm9ncmFtLmNhY2hlQXR0cmliTG9jW25hbWVdID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgbmFtZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHNoYWRlclByb2dyYW0uY2FjaGVBdHRyaWJMb2NbbmFtZV07XG5cdH1cblxufTtcblxuLy9cdENBTlZBUyBSRVNJWklOR1xucC5zZXRTaXplID0gZnVuY3Rpb24obVdpZHRoLCBtSGVpZ2h0KSB7XG5cdHRoaXMuX3dpZHRoID0gbVdpZHRoO1xuXHR0aGlzLl9oZWlnaHQgPSBtSGVpZ2h0O1xuXG5cdHRoaXMuY2FudmFzLndpZHRoICAgICAgPSB0aGlzLl93aWR0aDtcblx0dGhpcy5jYW52YXMuaGVpZ2h0ICAgICA9IHRoaXMuX2hlaWdodDtcblx0dGhpcy5nbC52aWV3cG9ydFdpZHRoICA9IHRoaXMuX3dpZHRoO1xuXHR0aGlzLmdsLnZpZXdwb3J0SGVpZ2h0ID0gdGhpcy5faGVpZ2h0O1xuXG5cdHRoaXMuZ2wudmlld3BvcnQoMCwgMCwgdGhpcy5fd2lkdGgsIHRoaXMuX2hlaWdodCk7XG5cdHRoaXMuYXNwZWN0UmF0aW8gICAgICAgPSB0aGlzLl93aWR0aCAvIHRoaXMuX2hlaWdodDtcbn07XG5cblxucC5fX2RlZmluZUdldHRlcl9fKFwid2lkdGhcIiwgZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLl93aWR0aDtcbn0pO1xuXG5wLl9fZGVmaW5lR2V0dGVyX18oXCJoZWlnaHRcIiwgZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLl9oZWlnaHQ7XG59KTtcblxucC5fX2RlZmluZUdldHRlcl9fKFwidmlld3BvcnRcIiwgZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLl92aWV3cG9ydDtcbn0pO1xuXG52YXIgaW5zdGFuY2UgPSBudWxsO1xuXG5HTFRvb2xzLmdldEluc3RhbmNlID0gZnVuY3Rpb24oKSB7XG5cdGlmKGluc3RhbmNlID09PSBudWxsKSB7XG5cdFx0aW5zdGFuY2UgPSBuZXcgR0xUb29scygpO1xuXHR9XG5cdHJldHVybiBpbnN0YW5jZTtcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBHTFRvb2xzLmdldEluc3RhbmNlKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBGYWNlID0gcmVxdWlyZShcIi4vRmFjZVwiKTtcbnZhciBHTCA9IHJlcXVpcmUoXCIuL0dMVG9vbHNcIik7XG52YXIgZ2xtID0gcmVxdWlyZShcImdsLW1hdHJpeFwiKTtcblxudmFyIE1lc2ggPSBmdW5jdGlvbihhVmVydGV4U2l6ZSwgYUluZGV4U2l6ZSwgYURyYXdUeXBlKSB7XG5cblx0dGhpcy5nbCA9IEdMLmdsO1xuXHR0aGlzLnZlcnRleFNpemUgPSBhVmVydGV4U2l6ZTtcblx0dGhpcy5pbmRleFNpemUgPSBhSW5kZXhTaXplO1xuXHR0aGlzLmRyYXdUeXBlID0gYURyYXdUeXBlO1xuXHR0aGlzLmV4dHJhQXR0cmlidXRlcyA9IFtdO1xuXHRcblx0dGhpcy52QnVmZmVyUG9zID0gdW5kZWZpbmVkO1xuXHR0aGlzLl9mbG9hdEFycmF5VmVydGV4ID0gdW5kZWZpbmVkO1xuXG5cdHRoaXMuX2luaXQoKTtcbn07XG5cbnZhciBwID0gTWVzaC5wcm90b3R5cGU7XG5cbnAuX2luaXQgPSBmdW5jdGlvbigpIHtcblxufTtcblxucC5idWZmZXJWZXJ0ZXggPSBmdW5jdGlvbihhQXJyYXlWZXJ0aWNlcywgaXNEeW5hbWljKSB7XG5cdHZhciB2ZXJ0aWNlcyA9IFtdO1xuXHR2YXIgZHJhd1R5cGUgPSBpc0R5bmFtaWMgPyB0aGlzLmdsLkRZTkFNSUNfRFJBVyA6IHRoaXMuZ2wuU1RBVElDX0RSQVc7XG5cdHRoaXMuX3ZlcnRpY2VzID0gW107XG5cblx0Zm9yKHZhciBpPTA7IGk8YUFycmF5VmVydGljZXMubGVuZ3RoOyBpKyspIHtcblx0XHRmb3IodmFyIGo9MDsgajxhQXJyYXlWZXJ0aWNlc1tpXS5sZW5ndGg7IGorKykge1xuXHRcdFx0dmVydGljZXMucHVzaChhQXJyYXlWZXJ0aWNlc1tpXVtqXSk7XG5cdFx0fVxuXHRcdHRoaXMuX3ZlcnRpY2VzLnB1c2goZ2xtLnZlYzMuY2xvbmUoYUFycmF5VmVydGljZXNbaV0pKTtcblx0fVxuXG5cdGlmKHRoaXMudkJ1ZmZlclBvcyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhpcy52QnVmZmVyUG9zID0gdGhpcy5nbC5jcmVhdGVCdWZmZXIoKTtcblx0fVxuXHR0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHRoaXMudkJ1ZmZlclBvcyk7XG5cblx0aWYodGhpcy5fZmxvYXRBcnJheVZlcnRleCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhpcy5fZmxvYXRBcnJheVZlcnRleCA9IG5ldyBGbG9hdDMyQXJyYXkodmVydGljZXMpO1xuXHR9IGVsc2Uge1xuXHRcdGlmKGFBcnJheVZlcnRpY2VzLmxlbmd0aCAhPT0gdGhpcy5fZmxvYXRBcnJheVZlcnRleC5sZW5ndGgpIHtcblx0XHRcdHRoaXMuX2Zsb2F0QXJyYXlWZXJ0ZXggPSBuZXcgRmxvYXQzMkFycmF5KHZlcnRpY2VzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Zm9yKHZhciBrPTA7IGs8YUFycmF5VmVydGljZXMubGVuZ3RoOyBrKyspIHtcblx0XHRcdFx0dGhpcy5fZmxvYXRBcnJheVZlcnRleFtrXSA9IGFBcnJheVZlcnRpY2VzW2tdO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHRoaXMuZ2wuYnVmZmVyRGF0YSh0aGlzLmdsLkFSUkFZX0JVRkZFUiwgdGhpcy5fZmxvYXRBcnJheVZlcnRleCwgZHJhd1R5cGUpO1xuXHR0aGlzLnZCdWZmZXJQb3MuaXRlbVNpemUgPSAzO1xufTtcblxucC5idWZmZXJUZXhDb29yZHMgPSBmdW5jdGlvbihhQXJyYXlUZXhDb29yZHMpIHtcblx0dmFyIGNvb3JkcyA9IFtdO1xuXG5cdGZvcih2YXIgaT0wOyBpPGFBcnJheVRleENvb3Jkcy5sZW5ndGg7IGkrKykge1xuXHRcdGZvcih2YXIgaj0wOyBqPGFBcnJheVRleENvb3Jkc1tpXS5sZW5ndGg7IGorKykge1xuXHRcdFx0Y29vcmRzLnB1c2goYUFycmF5VGV4Q29vcmRzW2ldW2pdKTtcblx0XHR9XG5cdH1cblxuXHR0aGlzLnZCdWZmZXJVViA9IHRoaXMuZ2wuY3JlYXRlQnVmZmVyKCk7XG5cdHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgdGhpcy52QnVmZmVyVVYpO1xuXHR0aGlzLmdsLmJ1ZmZlckRhdGEodGhpcy5nbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkoY29vcmRzKSwgdGhpcy5nbC5TVEFUSUNfRFJBVyk7XG5cdHRoaXMudkJ1ZmZlclVWLml0ZW1TaXplID0gMjtcbn07XG5cbnAuYnVmZmVyRGF0YSA9IGZ1bmN0aW9uKGFEYXRhLCBhTmFtZSwgYUl0ZW1TaXplLCBpc0R5bmFtaWMpIHtcblx0dmFyIGluZGV4ID0gLTE7XG5cdHZhciBkcmF3VHlwZSA9IGlzRHluYW1pYyA/IHRoaXMuZ2wuRFlOQU1JQ19EUkFXIDogdGhpcy5nbC5TVEFUSUNfRFJBVztcblx0dmFyIGk9MDtcblxuXHRmb3IoaT0wOyBpPHRoaXMuZXh0cmFBdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0aWYodGhpcy5leHRyYUF0dHJpYnV0ZXNbaV0ubmFtZSA9PT0gYU5hbWUpIHtcblx0XHRcdHRoaXMuZXh0cmFBdHRyaWJ1dGVzW2ldLmRhdGEgPSBhRGF0YTtcblx0XHRcdGluZGV4ID0gaTtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXG5cdHZhciBidWZmZXJEYXRhID0gW107XG5cdGZvcihpPTA7IGk8YURhdGEubGVuZ3RoOyBpKyspIHtcblx0XHRmb3IodmFyIGo9MDsgajxhRGF0YVtpXS5sZW5ndGg7IGorKykge1xuXHRcdFx0YnVmZmVyRGF0YS5wdXNoKGFEYXRhW2ldW2pdKTtcblx0XHR9XG5cdH1cblxuXHR2YXIgYnVmZmVyLCBmbG9hdEFycmF5O1xuXHRpZihpbmRleCA9PT0gLTEpIHtcblx0XHRidWZmZXIgPSB0aGlzLmdsLmNyZWF0ZUJ1ZmZlcigpO1xuXHRcdHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgYnVmZmVyKTtcblx0XHRmbG9hdEFycmF5ID0gbmV3IEZsb2F0MzJBcnJheShidWZmZXJEYXRhKTtcblx0XHR0aGlzLmdsLmJ1ZmZlckRhdGEodGhpcy5nbC5BUlJBWV9CVUZGRVIsIGZsb2F0QXJyYXksIGRyYXdUeXBlKTtcblx0XHR0aGlzLmV4dHJhQXR0cmlidXRlcy5wdXNoKHtuYW1lOmFOYW1lLCBkYXRhOmFEYXRhLCBpdGVtU2l6ZTogYUl0ZW1TaXplLCBidWZmZXI6YnVmZmVyLCBmbG9hdEFycmF5OmZsb2F0QXJyYXl9KTtcblx0fSBlbHNlIHtcblx0XHRidWZmZXIgPSB0aGlzLmV4dHJhQXR0cmlidXRlc1tpbmRleF0uYnVmZmVyO1xuXHRcdC8vIGNvbnNvbGUuZGVidWcoXCJCdWZmZXIgZXhpc3RcIiwgYnVmZmVyKTtcblx0XHR0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIGJ1ZmZlcik7XG5cdFx0ZmxvYXRBcnJheSA9IHRoaXMuZXh0cmFBdHRyaWJ1dGVzW2luZGV4XS5mbG9hdEFycmF5O1xuXHRcdGZvcihpPTA7IGk8YnVmZmVyRGF0YS5sZW5ndGg7IGkrKykge1xuXHRcdFx0ZmxvYXRBcnJheVtpXSA9IGJ1ZmZlckRhdGFbaV07XG5cdFx0fVxuXHRcdHRoaXMuZ2wuYnVmZmVyRGF0YSh0aGlzLmdsLkFSUkFZX0JVRkZFUiwgZmxvYXRBcnJheSwgZHJhd1R5cGUpO1xuXHR9XG5cbn07XG5cbnAuYnVmZmVySW5kaWNlcyA9IGZ1bmN0aW9uKGFBcnJheUluZGljZXMpIHtcblx0dGhpcy5faW5kaWNlcyA9IGFBcnJheUluZGljZXM7XG5cdHRoaXMuaUJ1ZmZlciA9IHRoaXMuZ2wuY3JlYXRlQnVmZmVyKCk7XG5cdHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLmlCdWZmZXIpO1xuXHR0aGlzLmdsLmJ1ZmZlckRhdGEodGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgbmV3IFVpbnQxNkFycmF5KGFBcnJheUluZGljZXMpLCB0aGlzLmdsLlNUQVRJQ19EUkFXKTtcblx0dGhpcy5pQnVmZmVyLml0ZW1TaXplID0gMTtcblx0dGhpcy5pQnVmZmVyLm51bUl0ZW1zID0gYUFycmF5SW5kaWNlcy5sZW5ndGg7XG59O1xuXG5cbnAuY29tcHV0ZU5vcm1hbHMgPSBmdW5jdGlvbigpIHtcblx0aWYodGhpcy5kcmF3VHlwZSAhPT0gdGhpcy5nbC5UUklBTkdMRVMpIHtyZXR1cm47fVxuXG5cdGlmKHRoaXMuX2ZhY2VzID09PSB1bmRlZmluZWQpIHtcdHRoaXMuX2dlbmVyYXRlRmFjZXMoKTtcdH1cblx0Y29uc29sZS5sb2coXCJTdGFydCBjb21wdXRpbmdcIik7XG5cblx0dmFyIHRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblx0dmFyIGo9MDtcblxuXHR0aGlzLl9ub3JtYWxzID0gW107XG5cdGZvcih2YXIgaT0wOyBpPHRoaXMuX3ZlcnRpY2VzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIG5vcm1hbCA9IGdsbS52ZWMzLmNyZWF0ZSgpO1xuXHRcdHZhciBmYWNlQ291bnQgPSAwO1xuXHRcdGZvcihqPTA7IGo8dGhpcy5fZmFjZXMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmKHRoaXMuX2ZhY2VzW2pdLmNvbnRhaW5zKHRoaXMuX3ZlcnRpY2VzW2ldKSkge1xuXHRcdFx0XHRnbG0udmVjMy5hZGQobm9ybWFsLCBub3JtYWwsIHRoaXMuX2ZhY2VzW2pdLmZhY2VOb3JtYWwpO1xuXHRcdFx0XHRmYWNlQ291bnQgKys7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Z2xtLnZlYzMubm9ybWFsaXplKG5vcm1hbCwgbm9ybWFsKTtcblx0XHR0aGlzLl9ub3JtYWxzLnB1c2gobm9ybWFsKTtcblx0fVxuXG5cdHRoaXMuYnVmZmVyRGF0YSh0aGlzLl9ub3JtYWxzLCBcImFOb3JtYWxcIiwgMyk7XG5cblx0dmFyIHRvdGFsVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdGltZTtcblx0Y29uc29sZS5sb2coXCJUb3RhbCBUaW1lIDogXCIsIHRvdGFsVGltZSk7XG59O1xuXG5cbnAuY29tcHV0ZVRhbmdlbnQgPSBmdW5jdGlvbigpIHtcblx0XG59O1xuXG5cbnAuX2dlbmVyYXRlRmFjZXMgPSBmdW5jdGlvbigpIHtcblx0dGhpcy5fZmFjZXMgPSBbXTtcblxuXHRmb3IodmFyIGk9MDsgaTx0aGlzLl9pbmRpY2VzLmxlbmd0aDsgaSs9Mykge1xuXHRcdHZhciBwMCA9IHRoaXMuX3ZlcnRpY2VzW3RoaXMuX2luZGljZXNbaSswXV07XG5cdFx0dmFyIHAxID0gdGhpcy5fdmVydGljZXNbdGhpcy5faW5kaWNlc1tpKzFdXTtcblx0XHR2YXIgcDIgPSB0aGlzLl92ZXJ0aWNlc1t0aGlzLl9pbmRpY2VzW2krMl1dO1xuXG5cdFx0dGhpcy5fZmFjZXMucHVzaChuZXcgRmFjZShwMCwgcDEsIHAyKSk7XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTWVzaDsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIEdMID0gcmVxdWlyZShcIi4vR0xUb29sc1wiKTtcbnZhciBNZXNoID0gcmVxdWlyZShcIi4vTWVzaFwiKTtcbnZhciBNZXNoVXRpbHMgPSB7fTtcblxuTWVzaFV0aWxzLmNyZWF0ZVBsYW5lID0gZnVuY3Rpb24od2lkdGgsIGhlaWdodCwgbnVtU2VnbWVudHMsIHdpdGhOb3JtYWxzLCBheGlzKSB7XG5cdGF4aXMgICAgICAgICAgPSBheGlzID09PSB1bmRlZmluZWQgPyBcInh5XCIgOiBheGlzO1xuXHR3aXRoTm9ybWFscyAgID0gd2l0aE5vcm1hbHMgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogd2l0aE5vcm1hbHM7XG5cdHZhciBwb3NpdGlvbnMgPSBbXTtcblx0dmFyIGNvb3JkcyAgICA9IFtdO1xuXHR2YXIgaW5kaWNlcyAgID0gW107XG5cdHZhciBub3JtYWxzICAgPSBbXTtcblxuXHR2YXIgZ2FwWCAgPSB3aWR0aC9udW1TZWdtZW50cztcblx0dmFyIGdhcFkgID0gaGVpZ2h0L251bVNlZ21lbnRzO1xuXHR2YXIgZ2FwVVYgPSAxL251bVNlZ21lbnRzO1xuXHR2YXIgaW5kZXggPSAwO1xuXHR2YXIgc3ggICAgPSAtd2lkdGggKiAwLjU7XG5cdHZhciBzeSAgICA9IC1oZWlnaHQgKiAwLjU7XG5cblx0Zm9yKHZhciBpPTA7IGk8bnVtU2VnbWVudHM7IGkrKykge1xuXHRcdGZvciAodmFyIGo9MDsgajxudW1TZWdtZW50czsgaisrKSB7XG5cdFx0XHR2YXIgdHggPSBnYXBYICogaSArIHN4O1xuXHRcdFx0dmFyIHR5ID0gZ2FwWSAqIGogKyBzeTtcblxuXHRcdFx0aWYoYXhpcyA9PT0gJ3h6Jykge1xuXHRcdFx0XHRwb3NpdGlvbnMucHVzaChbdHgsIFx0XHQwLCBcdHR5K2dhcFlcdF0pO1xuXHRcdFx0XHRwb3NpdGlvbnMucHVzaChbdHgrZ2FwWCwgXHQwLCBcdHR5K2dhcFlcdF0pO1xuXHRcdFx0XHRwb3NpdGlvbnMucHVzaChbdHgrZ2FwWCwgXHQwLCBcdHR5XHRdKTtcblx0XHRcdFx0cG9zaXRpb25zLnB1c2goW3R4LCBcdFx0MCwgXHR0eVx0XSk7XHRcblxuXHRcdFx0XHRub3JtYWxzLnB1c2goWzAsIDEsIDBdKTtcblx0XHRcdFx0bm9ybWFscy5wdXNoKFswLCAxLCAwXSk7XG5cdFx0XHRcdG5vcm1hbHMucHVzaChbMCwgMSwgMF0pO1xuXHRcdFx0XHRub3JtYWxzLnB1c2goWzAsIDEsIDBdKTtcblx0XHRcdH0gZWxzZSBpZihheGlzID09PSAneXonKSB7XG5cdFx0XHRcdHBvc2l0aW9ucy5wdXNoKFswLCB0eCwgXHRcdHR5XSk7XG5cdFx0XHRcdHBvc2l0aW9ucy5wdXNoKFswLCB0eCtnYXBYLCB0eV0pO1xuXHRcdFx0XHRwb3NpdGlvbnMucHVzaChbMCwgdHgrZ2FwWCwgdHkrZ2FwWV0pO1xuXHRcdFx0XHRwb3NpdGlvbnMucHVzaChbMCwgdHgsIFx0XHR0eStnYXBZXSk7XHRcblxuXHRcdFx0XHRub3JtYWxzLnB1c2goWzEsIDAsIDBdKTtcblx0XHRcdFx0bm9ybWFscy5wdXNoKFsxLCAwLCAwXSk7XG5cdFx0XHRcdG5vcm1hbHMucHVzaChbMSwgMCwgMF0pO1xuXHRcdFx0XHRub3JtYWxzLnB1c2goWzEsIDAsIDBdKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHBvc2l0aW9ucy5wdXNoKFt0eCwgXHRcdHR5LCBcdDBdKTtcblx0XHRcdFx0cG9zaXRpb25zLnB1c2goW3R4K2dhcFgsIFx0dHksIFx0MF0pO1xuXHRcdFx0XHRwb3NpdGlvbnMucHVzaChbdHgrZ2FwWCwgXHR0eStnYXBZLCBcdDBdKTtcblx0XHRcdFx0cG9zaXRpb25zLnB1c2goW3R4LCBcdFx0dHkrZ2FwWSwgXHQwXSk7XHRcblxuXHRcdFx0XHRub3JtYWxzLnB1c2goWzAsIDAsIDFdKTtcblx0XHRcdFx0bm9ybWFscy5wdXNoKFswLCAwLCAxXSk7XG5cdFx0XHRcdG5vcm1hbHMucHVzaChbMCwgMCwgMV0pO1xuXHRcdFx0XHRub3JtYWxzLnB1c2goWzAsIDAsIDFdKTtcblx0XHRcdH0gXG5cblx0XHRcdHZhciB1ID0gaS9udW1TZWdtZW50cztcblx0XHRcdHZhciB2ID0gai9udW1TZWdtZW50cztcblx0XHRcdGNvb3Jkcy5wdXNoKFt1LCB2XSk7XG5cdFx0XHRjb29yZHMucHVzaChbdStnYXBVViwgdl0pO1xuXHRcdFx0Y29vcmRzLnB1c2goW3UrZ2FwVVYsIHYrZ2FwVVZdKTtcblx0XHRcdGNvb3Jkcy5wdXNoKFt1LCB2K2dhcFVWXSk7XG5cblx0XHRcdGluZGljZXMucHVzaChpbmRleCo0ICsgMCk7XG5cdFx0XHRpbmRpY2VzLnB1c2goaW5kZXgqNCArIDEpO1xuXHRcdFx0aW5kaWNlcy5wdXNoKGluZGV4KjQgKyAyKTtcblx0XHRcdGluZGljZXMucHVzaChpbmRleCo0ICsgMCk7XG5cdFx0XHRpbmRpY2VzLnB1c2goaW5kZXgqNCArIDIpO1xuXHRcdFx0aW5kaWNlcy5wdXNoKGluZGV4KjQgKyAzKTtcblxuXHRcdFx0aW5kZXgrKztcblx0XHR9XG5cdH1cblxuXHR2YXIgbWVzaCA9IG5ldyBNZXNoKHBvc2l0aW9ucy5sZW5ndGgsIGluZGljZXMubGVuZ3RoLCBHTC5nbC5UUklBTkdMRVMpO1xuXHRtZXNoLmJ1ZmZlclZlcnRleChwb3NpdGlvbnMpO1xuXHRtZXNoLmJ1ZmZlclRleENvb3Jkcyhjb29yZHMpO1xuXHRtZXNoLmJ1ZmZlckluZGljZXMoaW5kaWNlcyk7XG5cdGlmKHdpdGhOb3JtYWxzKSB7XG5cdFx0bWVzaC5idWZmZXJEYXRhKG5vcm1hbHMsIFwiYU5vcm1hbFwiLCAzKTtcblx0fVxuXG5cdHJldHVybiBtZXNoO1xufTtcblxuTWVzaFV0aWxzLmNyZWF0ZVNwaGVyZSA9IGZ1bmN0aW9uKHNpemUsIG51bVNlZ21lbnRzLCB3aXRoTm9ybWFscykge1xuXHR3aXRoTm9ybWFscyAgID0gd2l0aE5vcm1hbHMgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogd2l0aE5vcm1hbHM7XG5cdHZhciBwb3NpdGlvbnMgPSBbXTtcblx0dmFyIGNvb3JkcyAgICA9IFtdO1xuXHR2YXIgaW5kaWNlcyAgID0gW107XG5cdHZhciBub3JtYWxzICAgPSBbXTtcblx0dmFyIGluZGV4ICAgICA9IDA7XG5cdHZhciBnYXBVViAgICAgPSAxL251bVNlZ21lbnRzO1xuXG5cdHZhciBnZXRQb3NpdGlvbiA9IGZ1bmN0aW9uKGksIGosIGlzTm9ybWFsKSB7XHQvL1x0cnggOiAtOTAgfiA5MCAsIHJ5IDogMCB+IDM2MFxuXHRcdGlzTm9ybWFsID0gaXNOb3JtYWwgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogaXNOb3JtYWw7XG5cdFx0dmFyIHJ4ID0gaS9udW1TZWdtZW50cyAqIE1hdGguUEkgLSBNYXRoLlBJICogMC41O1xuXHRcdHZhciByeSA9IGovbnVtU2VnbWVudHMgKiBNYXRoLlBJICogMjtcblx0XHR2YXIgciA9IGlzTm9ybWFsID8gMSA6IHNpemU7XG5cdFx0dmFyIHBvcyA9IFtdO1xuXHRcdHBvc1sxXSA9IE1hdGguc2luKHJ4KSAqIHI7XG5cdFx0dmFyIHQgPSBNYXRoLmNvcyhyeCkgKiByO1xuXHRcdHBvc1swXSA9IE1hdGguY29zKHJ5KSAqIHQ7XG5cdFx0cG9zWzJdID0gTWF0aC5zaW4ocnkpICogdDtcblxuXHRcdHZhciBwcmVjaXNpb24gPSAxMDAwMDtcblx0XHRwb3NbMF0gPSBNYXRoLmZsb29yKHBvc1swXSAqIHByZWNpc2lvbikgLyBwcmVjaXNpb247XG5cdFx0cG9zWzFdID0gTWF0aC5mbG9vcihwb3NbMV0gKiBwcmVjaXNpb24pIC8gcHJlY2lzaW9uO1xuXHRcdHBvc1syXSA9IE1hdGguZmxvb3IocG9zWzJdICogcHJlY2lzaW9uKSAvIHByZWNpc2lvbjtcblxuXHRcdHJldHVybiBwb3M7XG5cdH07XG5cblx0XG5cdGZvcih2YXIgaT0wOyBpPG51bVNlZ21lbnRzOyBpKyspIHtcblx0XHRmb3IodmFyIGo9MDsgajxudW1TZWdtZW50czsgaisrKSB7XG5cdFx0XHRwb3NpdGlvbnMucHVzaChnZXRQb3NpdGlvbihpLCBqKSk7XG5cdFx0XHRwb3NpdGlvbnMucHVzaChnZXRQb3NpdGlvbihpKzEsIGopKTtcblx0XHRcdHBvc2l0aW9ucy5wdXNoKGdldFBvc2l0aW9uKGkrMSwgaisxKSk7XG5cdFx0XHRwb3NpdGlvbnMucHVzaChnZXRQb3NpdGlvbihpLCBqKzEpKTtcblxuXHRcdFx0aWYod2l0aE5vcm1hbHMpIHtcblx0XHRcdFx0bm9ybWFscy5wdXNoKGdldFBvc2l0aW9uKGksIGosIHRydWUpKTtcblx0XHRcdFx0bm9ybWFscy5wdXNoKGdldFBvc2l0aW9uKGkrMSwgaiwgdHJ1ZSkpO1xuXHRcdFx0XHRub3JtYWxzLnB1c2goZ2V0UG9zaXRpb24oaSsxLCBqKzEsIHRydWUpKTtcblx0XHRcdFx0bm9ybWFscy5wdXNoKGdldFBvc2l0aW9uKGksIGorMSwgdHJ1ZSkpO1x0XG5cdFx0XHR9XG5cdFx0XHRcblxuXHRcdFx0dmFyIHUgPSBqL251bVNlZ21lbnRzO1xuXHRcdFx0dmFyIHYgPSBpL251bVNlZ21lbnRzO1xuXHRcdFx0XG5cdFx0XHRcblx0XHRcdGNvb3Jkcy5wdXNoKFsxLjAgLSB1LCB2XSk7XG5cdFx0XHRjb29yZHMucHVzaChbMS4wIC0gdSwgditnYXBVVl0pO1xuXHRcdFx0Y29vcmRzLnB1c2goWzEuMCAtIHUgLSBnYXBVViwgditnYXBVVl0pO1xuXHRcdFx0Y29vcmRzLnB1c2goWzEuMCAtIHUgLSBnYXBVViwgdl0pO1xuXG5cdFx0XHRpbmRpY2VzLnB1c2goaW5kZXgqNCArIDApO1xuXHRcdFx0aW5kaWNlcy5wdXNoKGluZGV4KjQgKyAxKTtcblx0XHRcdGluZGljZXMucHVzaChpbmRleCo0ICsgMik7XG5cdFx0XHRpbmRpY2VzLnB1c2goaW5kZXgqNCArIDApO1xuXHRcdFx0aW5kaWNlcy5wdXNoKGluZGV4KjQgKyAyKTtcblx0XHRcdGluZGljZXMucHVzaChpbmRleCo0ICsgMyk7XG5cblx0XHRcdGluZGV4Kys7XG5cdFx0fVxuXHR9XG5cblxuXHR2YXIgbWVzaCA9IG5ldyBNZXNoKHBvc2l0aW9ucy5sZW5ndGgsIGluZGljZXMubGVuZ3RoLCBHTC5nbC5UUklBTkdMRVMpO1xuXHRtZXNoLmJ1ZmZlclZlcnRleChwb3NpdGlvbnMpO1xuXHRtZXNoLmJ1ZmZlclRleENvb3Jkcyhjb29yZHMpO1xuXHRtZXNoLmJ1ZmZlckluZGljZXMoaW5kaWNlcyk7XG5cdGNvbnNvbGUubG9nKCdXaXRoIG5vcm1hbHMgOicsIHdpdGhOb3JtYWxzKTtcblx0aWYod2l0aE5vcm1hbHMpIHtcblx0XHRtZXNoLmJ1ZmZlckRhdGEobm9ybWFscywgXCJhTm9ybWFsXCIsIDMpO1xuXHR9XG5cblx0cmV0dXJuIG1lc2g7XG59O1xuXG5NZXNoVXRpbHMuY3JlYXRlQ3ViZSA9IGZ1bmN0aW9uKHcsaCxkLCB3aXRoTm9ybWFscykge1xuXHR3aXRoTm9ybWFscyAgID0gd2l0aE5vcm1hbHMgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogd2l0aE5vcm1hbHM7XG5cdGggPSBoIHx8IHc7XG5cdGQgPSBkIHx8IHc7XG5cblx0dmFyIHggPSB3LzI7XG5cdHZhciB5ID0gaC8yO1xuXHR2YXIgeiA9IGQvMjtcblxuXHR2YXIgcG9zaXRpb25zID0gW107XG5cdHZhciBjb29yZHMgICAgPSBbXTtcblx0dmFyIGluZGljZXMgICA9IFtdOyBcblx0dmFyIG5vcm1hbHMgICA9IFtdOyBcblx0dmFyIGNvdW50ICAgICA9IDA7XG5cblxuXHQvLyBCQUNLXG5cdHBvc2l0aW9ucy5wdXNoKFsteCwgIHksIC16XSk7XG5cdHBvc2l0aW9ucy5wdXNoKFsgeCwgIHksIC16XSk7XG5cdHBvc2l0aW9ucy5wdXNoKFsgeCwgLXksIC16XSk7XG5cdHBvc2l0aW9ucy5wdXNoKFsteCwgLXksIC16XSk7XG5cblx0bm9ybWFscy5wdXNoKFswLCAwLCAtMV0pO1xuXHRub3JtYWxzLnB1c2goWzAsIDAsIC0xXSk7XG5cdG5vcm1hbHMucHVzaChbMCwgMCwgLTFdKTtcblx0bm9ybWFscy5wdXNoKFswLCAwLCAtMV0pO1xuXG5cdGNvb3Jkcy5wdXNoKFswLCAwXSk7XG5cdGNvb3Jkcy5wdXNoKFsxLCAwXSk7XG5cdGNvb3Jkcy5wdXNoKFsxLCAxXSk7XG5cdGNvb3Jkcy5wdXNoKFswLCAxXSk7XG5cblx0aW5kaWNlcy5wdXNoKGNvdW50KjQgKyAwKTtcblx0aW5kaWNlcy5wdXNoKGNvdW50KjQgKyAxKTtcblx0aW5kaWNlcy5wdXNoKGNvdW50KjQgKyAyKTtcblx0aW5kaWNlcy5wdXNoKGNvdW50KjQgKyAwKTtcblx0aW5kaWNlcy5wdXNoKGNvdW50KjQgKyAyKTtcblx0aW5kaWNlcy5wdXNoKGNvdW50KjQgKyAzKTtcblxuXHRjb3VudCArKztcblxuXHQvLyBSSUdIVFxuXHRwb3NpdGlvbnMucHVzaChbIHgsICB5LCAtel0pO1xuXHRwb3NpdGlvbnMucHVzaChbIHgsICB5LCAgel0pO1xuXHRwb3NpdGlvbnMucHVzaChbIHgsIC15LCAgel0pO1xuXHRwb3NpdGlvbnMucHVzaChbIHgsIC15LCAtel0pO1xuXG5cdG5vcm1hbHMucHVzaChbMSwgMCwgMF0pO1xuXHRub3JtYWxzLnB1c2goWzEsIDAsIDBdKTtcblx0bm9ybWFscy5wdXNoKFsxLCAwLCAwXSk7XG5cdG5vcm1hbHMucHVzaChbMSwgMCwgMF0pO1xuXG5cdGNvb3Jkcy5wdXNoKFswLCAwXSk7XG5cdGNvb3Jkcy5wdXNoKFsxLCAwXSk7XG5cdGNvb3Jkcy5wdXNoKFsxLCAxXSk7XG5cdGNvb3Jkcy5wdXNoKFswLCAxXSk7XG5cblx0aW5kaWNlcy5wdXNoKGNvdW50KjQgKyAwKTtcblx0aW5kaWNlcy5wdXNoKGNvdW50KjQgKyAxKTtcblx0aW5kaWNlcy5wdXNoKGNvdW50KjQgKyAyKTtcblx0aW5kaWNlcy5wdXNoKGNvdW50KjQgKyAwKTtcblx0aW5kaWNlcy5wdXNoKGNvdW50KjQgKyAyKTtcblx0aW5kaWNlcy5wdXNoKGNvdW50KjQgKyAzKTtcblxuXHRjb3VudCArKztcblxuXHQvLyBGUk9OVFxuXHRwb3NpdGlvbnMucHVzaChbIHgsICB5LCAgel0pO1xuXHRwb3NpdGlvbnMucHVzaChbLXgsICB5LCAgel0pO1xuXHRwb3NpdGlvbnMucHVzaChbLXgsIC15LCAgel0pO1xuXHRwb3NpdGlvbnMucHVzaChbIHgsIC15LCAgel0pO1xuXG5cdG5vcm1hbHMucHVzaChbMCwgMCwgMV0pO1xuXHRub3JtYWxzLnB1c2goWzAsIDAsIDFdKTtcblx0bm9ybWFscy5wdXNoKFswLCAwLCAxXSk7XG5cdG5vcm1hbHMucHVzaChbMCwgMCwgMV0pO1xuXG5cdGNvb3Jkcy5wdXNoKFswLCAwXSk7XG5cdGNvb3Jkcy5wdXNoKFsxLCAwXSk7XG5cdGNvb3Jkcy5wdXNoKFsxLCAxXSk7XG5cdGNvb3Jkcy5wdXNoKFswLCAxXSk7XG5cblx0aW5kaWNlcy5wdXNoKGNvdW50KjQgKyAwKTtcblx0aW5kaWNlcy5wdXNoKGNvdW50KjQgKyAxKTtcblx0aW5kaWNlcy5wdXNoKGNvdW50KjQgKyAyKTtcblx0aW5kaWNlcy5wdXNoKGNvdW50KjQgKyAwKTtcblx0aW5kaWNlcy5wdXNoKGNvdW50KjQgKyAyKTtcblx0aW5kaWNlcy5wdXNoKGNvdW50KjQgKyAzKTtcblxuXHRjb3VudCArKztcblxuXG5cdC8vIExFRlRcblx0cG9zaXRpb25zLnB1c2goWy14LCAgeSwgIHpdKTtcblx0cG9zaXRpb25zLnB1c2goWy14LCAgeSwgLXpdKTtcblx0cG9zaXRpb25zLnB1c2goWy14LCAteSwgLXpdKTtcblx0cG9zaXRpb25zLnB1c2goWy14LCAteSwgIHpdKTtcblxuXHRub3JtYWxzLnB1c2goWy0xLCAwLCAwXSk7XG5cdG5vcm1hbHMucHVzaChbLTEsIDAsIDBdKTtcblx0bm9ybWFscy5wdXNoKFstMSwgMCwgMF0pO1xuXHRub3JtYWxzLnB1c2goWy0xLCAwLCAwXSk7XG5cblx0Y29vcmRzLnB1c2goWzAsIDBdKTtcblx0Y29vcmRzLnB1c2goWzEsIDBdKTtcblx0Y29vcmRzLnB1c2goWzEsIDFdKTtcblx0Y29vcmRzLnB1c2goWzAsIDFdKTtcblxuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDApO1xuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDEpO1xuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDIpO1xuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDApO1xuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDIpO1xuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDMpO1xuXG5cdGNvdW50ICsrO1xuXG5cdC8vIFRPUFxuXHRwb3NpdGlvbnMucHVzaChbLXgsICB5LCAgel0pO1xuXHRwb3NpdGlvbnMucHVzaChbIHgsICB5LCAgel0pO1xuXHRwb3NpdGlvbnMucHVzaChbIHgsICB5LCAtel0pO1xuXHRwb3NpdGlvbnMucHVzaChbLXgsICB5LCAtel0pO1xuXG5cdG5vcm1hbHMucHVzaChbMCwgMSwgMF0pO1xuXHRub3JtYWxzLnB1c2goWzAsIDEsIDBdKTtcblx0bm9ybWFscy5wdXNoKFswLCAxLCAwXSk7XG5cdG5vcm1hbHMucHVzaChbMCwgMSwgMF0pO1xuXG5cdGNvb3Jkcy5wdXNoKFswLCAwXSk7XG5cdGNvb3Jkcy5wdXNoKFsxLCAwXSk7XG5cdGNvb3Jkcy5wdXNoKFsxLCAxXSk7XG5cdGNvb3Jkcy5wdXNoKFswLCAxXSk7XG5cblx0aW5kaWNlcy5wdXNoKGNvdW50KjQgKyAwKTtcblx0aW5kaWNlcy5wdXNoKGNvdW50KjQgKyAxKTtcblx0aW5kaWNlcy5wdXNoKGNvdW50KjQgKyAyKTtcblx0aW5kaWNlcy5wdXNoKGNvdW50KjQgKyAwKTtcblx0aW5kaWNlcy5wdXNoKGNvdW50KjQgKyAyKTtcblx0aW5kaWNlcy5wdXNoKGNvdW50KjQgKyAzKTtcblxuXHRjb3VudCArKztcblxuXHQvLyBCT1RUT01cblx0cG9zaXRpb25zLnB1c2goWy14LCAteSwgLXpdKTtcblx0cG9zaXRpb25zLnB1c2goWyB4LCAteSwgLXpdKTtcblx0cG9zaXRpb25zLnB1c2goWyB4LCAteSwgIHpdKTtcblx0cG9zaXRpb25zLnB1c2goWy14LCAteSwgIHpdKTtcblxuXHRub3JtYWxzLnB1c2goWzAsIC0xLCAwXSk7XG5cdG5vcm1hbHMucHVzaChbMCwgLTEsIDBdKTtcblx0bm9ybWFscy5wdXNoKFswLCAtMSwgMF0pO1xuXHRub3JtYWxzLnB1c2goWzAsIC0xLCAwXSk7XG5cblx0Y29vcmRzLnB1c2goWzAsIDBdKTtcblx0Y29vcmRzLnB1c2goWzEsIDBdKTtcblx0Y29vcmRzLnB1c2goWzEsIDFdKTtcblx0Y29vcmRzLnB1c2goWzAsIDFdKTtcblxuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDApO1xuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDEpO1xuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDIpO1xuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDApO1xuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDIpO1xuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDMpO1xuXG5cdGNvdW50ICsrO1xuXG5cblx0dmFyIG1lc2ggPSBuZXcgTWVzaChwb3NpdGlvbnMubGVuZ3RoLCBpbmRpY2VzLmxlbmd0aCwgR0wuZ2wuVFJJQU5HTEVTKTtcblx0bWVzaC5idWZmZXJWZXJ0ZXgocG9zaXRpb25zKTtcblx0bWVzaC5idWZmZXJUZXhDb29yZHMoY29vcmRzKTtcblx0bWVzaC5idWZmZXJJbmRpY2VzKGluZGljZXMpO1xuXHRpZih3aXRoTm9ybWFscykge1xuXHRcdG1lc2guYnVmZmVyRGF0YShub3JtYWxzLCBcImFOb3JtYWxcIiwgMyk7XG5cdH1cblxuXHRyZXR1cm4gbWVzaDtcbn07XG5cbk1lc2hVdGlscy5jcmVhdGVTa3lCb3ggPSBmdW5jdGlvbihzaXplLCB3aXRoTm9ybWFscykge1xuXHR3aXRoTm9ybWFscyAgID0gd2l0aE5vcm1hbHMgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogd2l0aE5vcm1hbHM7XG5cblx0dmFyIHBvc2l0aW9ucyA9IFtdO1xuXHR2YXIgY29vcmRzICAgID0gW107XG5cdHZhciBpbmRpY2VzICAgPSBbXTsgXG5cdHZhciBub3JtYWxzICAgPSBbXTsgXG5cdHZhciBjb3VudCAgICAgPSAwO1xuXG5cdC8vIEJBQ0tcblx0cG9zaXRpb25zLnB1c2goWyBzaXplLCAgc2l6ZSwgLXNpemVdKTtcblx0cG9zaXRpb25zLnB1c2goWy1zaXplLCAgc2l6ZSwgLXNpemVdKTtcblx0cG9zaXRpb25zLnB1c2goWy1zaXplLCAtc2l6ZSwgLXNpemVdKTtcblx0cG9zaXRpb25zLnB1c2goWyBzaXplLCAtc2l6ZSwgLXNpemVdKTtcblxuXHRub3JtYWxzLnB1c2goWzAsIDAsIC0xXSk7XG5cdG5vcm1hbHMucHVzaChbMCwgMCwgLTFdKTtcblx0bm9ybWFscy5wdXNoKFswLCAwLCAtMV0pO1xuXHRub3JtYWxzLnB1c2goWzAsIDAsIC0xXSk7XG5cblx0Y29vcmRzLnB1c2goWzAsIDBdKTtcblx0Y29vcmRzLnB1c2goWzEsIDBdKTtcblx0Y29vcmRzLnB1c2goWzEsIDFdKTtcblx0Y29vcmRzLnB1c2goWzAsIDFdKTtcblxuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDApO1xuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDEpO1xuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDIpO1xuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDApO1xuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDIpO1xuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDMpO1xuXG5cdGNvdW50ICsrO1xuXG5cdC8vIFJJR0hUXG5cdHBvc2l0aW9ucy5wdXNoKFsgc2l6ZSwgLXNpemUsIC1zaXplXSk7XG5cdHBvc2l0aW9ucy5wdXNoKFsgc2l6ZSwgLXNpemUsICBzaXplXSk7XG5cdHBvc2l0aW9ucy5wdXNoKFsgc2l6ZSwgIHNpemUsICBzaXplXSk7XG5cdHBvc2l0aW9ucy5wdXNoKFsgc2l6ZSwgIHNpemUsIC1zaXplXSk7XG5cblx0bm9ybWFscy5wdXNoKFsxLCAwLCAwXSk7XG5cdG5vcm1hbHMucHVzaChbMSwgMCwgMF0pO1xuXHRub3JtYWxzLnB1c2goWzEsIDAsIDBdKTtcblx0bm9ybWFscy5wdXNoKFsxLCAwLCAwXSk7XG5cblx0Y29vcmRzLnB1c2goWzAsIDBdKTtcblx0Y29vcmRzLnB1c2goWzEsIDBdKTtcblx0Y29vcmRzLnB1c2goWzEsIDFdKTtcblx0Y29vcmRzLnB1c2goWzAsIDFdKTtcblxuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDApO1xuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDEpO1xuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDIpO1xuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDApO1xuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDIpO1xuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDMpO1xuXG5cdGNvdW50ICsrO1xuXG5cdC8vIEZST05UXG5cdHBvc2l0aW9ucy5wdXNoKFstc2l6ZSwgIHNpemUsICBzaXplXSk7XG5cdHBvc2l0aW9ucy5wdXNoKFsgc2l6ZSwgIHNpemUsICBzaXplXSk7XG5cdHBvc2l0aW9ucy5wdXNoKFsgc2l6ZSwgLXNpemUsICBzaXplXSk7XG5cdHBvc2l0aW9ucy5wdXNoKFstc2l6ZSwgLXNpemUsICBzaXplXSk7XG5cblx0bm9ybWFscy5wdXNoKFswLCAwLCAxXSk7XG5cdG5vcm1hbHMucHVzaChbMCwgMCwgMV0pO1xuXHRub3JtYWxzLnB1c2goWzAsIDAsIDFdKTtcblx0bm9ybWFscy5wdXNoKFswLCAwLCAxXSk7XG5cblx0Y29vcmRzLnB1c2goWzAsIDBdKTtcblx0Y29vcmRzLnB1c2goWzEsIDBdKTtcblx0Y29vcmRzLnB1c2goWzEsIDFdKTtcblx0Y29vcmRzLnB1c2goWzAsIDFdKTtcblxuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDApO1xuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDEpO1xuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDIpO1xuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDApO1xuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDIpO1xuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDMpO1xuXG5cdGNvdW50ICsrO1xuXG5cdC8vIExFRlRcblx0cG9zaXRpb25zLnB1c2goWy1zaXplLCAtc2l6ZSwgIHNpemVdKTtcblx0cG9zaXRpb25zLnB1c2goWy1zaXplLCAtc2l6ZSwgLXNpemVdKTtcblx0cG9zaXRpb25zLnB1c2goWy1zaXplLCAgc2l6ZSwgLXNpemVdKTtcblx0cG9zaXRpb25zLnB1c2goWy1zaXplLCAgc2l6ZSwgIHNpemVdKTtcblxuXHRub3JtYWxzLnB1c2goWy0xLCAwLCAwXSk7XG5cdG5vcm1hbHMucHVzaChbLTEsIDAsIDBdKTtcblx0bm9ybWFscy5wdXNoKFstMSwgMCwgMF0pO1xuXHRub3JtYWxzLnB1c2goWy0xLCAwLCAwXSk7XG5cblx0Y29vcmRzLnB1c2goWzAsIDBdKTtcblx0Y29vcmRzLnB1c2goWzEsIDBdKTtcblx0Y29vcmRzLnB1c2goWzEsIDFdKTtcblx0Y29vcmRzLnB1c2goWzAsIDFdKTtcblxuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDApO1xuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDEpO1xuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDIpO1xuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDApO1xuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDIpO1xuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDMpO1xuXG5cdGNvdW50ICsrO1xuXG5cdC8vIFRPUFxuXHRwb3NpdGlvbnMucHVzaChbIHNpemUsICBzaXplLCAgc2l6ZV0pO1xuXHRwb3NpdGlvbnMucHVzaChbLXNpemUsICBzaXplLCAgc2l6ZV0pO1xuXHRwb3NpdGlvbnMucHVzaChbLXNpemUsICBzaXplLCAtc2l6ZV0pO1xuXHRwb3NpdGlvbnMucHVzaChbIHNpemUsICBzaXplLCAtc2l6ZV0pO1xuXG5cdG5vcm1hbHMucHVzaChbMCwgMSwgMF0pO1xuXHRub3JtYWxzLnB1c2goWzAsIDEsIDBdKTtcblx0bm9ybWFscy5wdXNoKFswLCAxLCAwXSk7XG5cdG5vcm1hbHMucHVzaChbMCwgMSwgMF0pO1xuXG5cdGNvb3Jkcy5wdXNoKFswLCAwXSk7XG5cdGNvb3Jkcy5wdXNoKFsxLCAwXSk7XG5cdGNvb3Jkcy5wdXNoKFsxLCAxXSk7XG5cdGNvb3Jkcy5wdXNoKFswLCAxXSk7XG5cblx0aW5kaWNlcy5wdXNoKGNvdW50KjQgKyAwKTtcblx0aW5kaWNlcy5wdXNoKGNvdW50KjQgKyAxKTtcblx0aW5kaWNlcy5wdXNoKGNvdW50KjQgKyAyKTtcblx0aW5kaWNlcy5wdXNoKGNvdW50KjQgKyAwKTtcblx0aW5kaWNlcy5wdXNoKGNvdW50KjQgKyAyKTtcblx0aW5kaWNlcy5wdXNoKGNvdW50KjQgKyAzKTtcblxuXHRjb3VudCArKztcblxuXHQvLyBCT1RUT01cblx0cG9zaXRpb25zLnB1c2goWyBzaXplLCAtc2l6ZSwgLXNpemVdKTtcblx0cG9zaXRpb25zLnB1c2goWy1zaXplLCAtc2l6ZSwgLXNpemVdKTtcblx0cG9zaXRpb25zLnB1c2goWy1zaXplLCAtc2l6ZSwgIHNpemVdKTtcblx0cG9zaXRpb25zLnB1c2goWyBzaXplLCAtc2l6ZSwgIHNpemVdKTtcblxuXHRub3JtYWxzLnB1c2goWzAsIC0xLCAwXSk7XG5cdG5vcm1hbHMucHVzaChbMCwgLTEsIDBdKTtcblx0bm9ybWFscy5wdXNoKFswLCAtMSwgMF0pO1xuXHRub3JtYWxzLnB1c2goWzAsIC0xLCAwXSk7XG5cblx0Y29vcmRzLnB1c2goWzAsIDBdKTtcblx0Y29vcmRzLnB1c2goWzEsIDBdKTtcblx0Y29vcmRzLnB1c2goWzEsIDFdKTtcblx0Y29vcmRzLnB1c2goWzAsIDFdKTtcblxuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDApO1xuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDEpO1xuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDIpO1xuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDApO1xuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDIpO1xuXHRpbmRpY2VzLnB1c2goY291bnQqNCArIDMpO1xuXG5cdHZhciBtZXNoID0gbmV3IE1lc2gocG9zaXRpb25zLmxlbmd0aCwgaW5kaWNlcy5sZW5ndGgsIEdMLmdsLlRSSUFOR0xFUyk7XG5cdG1lc2guYnVmZmVyVmVydGV4KHBvc2l0aW9ucyk7XG5cdG1lc2guYnVmZmVyVGV4Q29vcmRzKGNvb3Jkcyk7XG5cdG1lc2guYnVmZmVySW5kaWNlcyhpbmRpY2VzKTtcblx0aWYod2l0aE5vcm1hbHMpIHtcblx0XHRtZXNoLmJ1ZmZlckRhdGEobm9ybWFscywgXCJhTm9ybWFsXCIsIDMpO1xuXHR9XG5cblx0cmV0dXJuIG1lc2g7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1lc2hVdGlsczsiLCIvLyBPYmpMb2FkZXIuanNcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBHTCA9IHJlcXVpcmUoXCIuL0dMVG9vbHNcIik7XG52YXIgTWVzaCA9IHJlcXVpcmUoXCIuL01lc2hcIik7XG52YXIgZ2w7XG5cblxuZnVuY3Rpb24gT2JqTG9hZGVyKCkge1xuXHR0aGlzLl9jbGVhckFsbCgpO1xufVxuXG5cbnZhciBwID0gT2JqTG9hZGVyLnByb3RvdHlwZTtcblxucC5fY2xlYXJBbGwgPSBmdW5jdGlvbigpIHtcblx0dGhpcy5fY2FsbGJhY2sgICAgICA9IG51bGw7XG5cdHRoaXMuX2NhbGxiYWNrRXJyb3IgPSBudWxsO1xuXHR0aGlzLl9tZXNoICAgICAgICAgID0gW107XHRcblx0dGhpcy5fZHJhd2luZ1R5cGUgXHQ9IFwiXCI7XG59O1xuXG5wLmxvYWQgPSBmdW5jdGlvbih1cmwsIGNhbGxiYWNrLCBjYWxsYmFja0Vycm9yLCBpZ25vcmVOb3JtYWxzLCBkcmF3aW5nVHlwZSkge1xuXHR0aGlzLl9jbGVhckFsbCgpO1xuXHRpZighZ2wpIHtcdGdsID0gR0wuZ2w7XHR9XG5cdHRoaXMuX2RyYXdpbmdUeXBlID0gZHJhd2luZ1R5cGUgPT09IHVuZGVmaW5lZCA/IGdsLlRSSUFOR0xFUyA6IGRyYXdpbmdUeXBlO1xuXHR0aGlzLl9pZ25vcmVOb3JtYWxzID0gaWdub3JlTm9ybWFscyA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGlnbm9yZU5vcm1hbHM7XG5cblx0dGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcblx0dGhpcy5fY2FsbGJhY2tFcnJvciA9IGNhbGxiYWNrRXJyb3I7XG5cblx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSB0aGlzLl9vblhIVFBTdGF0ZS5iaW5kKHRoaXMpO1xuXHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgdXJsLCB0cnVlKTtcblx0cmVxdWVzdC5zZW5kKCk7XG59O1xuXG5wLl9vblhIVFBTdGF0ZSA9IGZ1bmN0aW9uKGUpIHtcblx0aWYoZS50YXJnZXQucmVhZHlTdGF0ZSA9PT0gNCkge1xuXHRcdHRoaXMuX3BhcnNlT2JqKGUudGFyZ2V0LnJlc3BvbnNlKTtcblx0fVxufTtcblxuXG5wLnBhcnNlID0gZnVuY3Rpb24ob2JqU3RyLCBjYWxsYmFjaywgY2FsbGJhY2tFcnJvciwgaWdub3JlTm9ybWFscywgZHJhd2luZ1R5cGUpIHtcblx0dGhpcy5fY2xlYXJBbGwoKTtcblx0dGhpcy5fZHJhd2luZ1R5cGUgPSBkcmF3aW5nVHlwZSA9PT0gdW5kZWZpbmVkID8gZ2wuVFJJQU5HTEVTIDogZHJhd2luZ1R5cGU7XG5cdHRoaXMuX2lnbm9yZU5vcm1hbHMgPSBpZ25vcmVOb3JtYWxzID09PSB1bmRlZmluZWQgPyB0cnVlIDogaWdub3JlTm9ybWFscztcblxuXHR0aGlzLl9wYXJzZU9iaihvYmpTdHIpO1xufTtcblxuXG5wLl9wYXJzZU9iaiA9IGZ1bmN0aW9uKG9ialN0cikge1xuXHR2YXIgbGluZXMgPSBvYmpTdHIuc3BsaXQoJ1xcbicpO1xuXG5cdHZhciBwb3NpdGlvbnMgICAgPSBbXTtcblx0dmFyIGNvb3JkcyAgICAgICA9IFtdO1xuXHR2YXIgZmluYWxOb3JtYWxzID0gW107XG5cdHZhciB2ZXJ0aWNlcyAgICAgPSBbXTtcblx0dmFyIG5vcm1hbHMgICAgICA9IFtdO1xuXHR2YXIgdXZzICAgICAgICAgID0gW107XG5cdHZhciBpbmRpY2VzICAgICAgPSBbXTtcblx0dmFyIGNvdW50ICAgICAgICA9IDA7XG5cdHZhciByZXN1bHQ7XG5cblx0Ly8gdiBmbG9hdCBmbG9hdCBmbG9hdFxuXHR2YXIgdmVydGV4X3BhdHRlcm4gPSAvdiggK1tcXGR8XFwufFxcK3xcXC18ZXxFXSspKCArW1xcZHxcXC58XFwrfFxcLXxlfEVdKykoICtbXFxkfFxcLnxcXCt8XFwtfGV8RV0rKS87XG5cblx0Ly8gdm4gZmxvYXQgZmxvYXQgZmxvYXRcblx0dmFyIG5vcm1hbF9wYXR0ZXJuID0gL3ZuKCArW1xcZHxcXC58XFwrfFxcLXxlfEVdKykoICtbXFxkfFxcLnxcXCt8XFwtfGV8RV0rKSggK1tcXGR8XFwufFxcK3xcXC18ZXxFXSspLztcblxuXHQvLyB2dCBmbG9hdCBmbG9hdFxuXHR2YXIgdXZfcGF0dGVybiA9IC92dCggK1tcXGR8XFwufFxcK3xcXC18ZXxFXSspKCArW1xcZHxcXC58XFwrfFxcLXxlfEVdKykvO1xuXG5cdC8vIGYgdmVydGV4IHZlcnRleCB2ZXJ0ZXggLi4uXG5cdHZhciBmYWNlX3BhdHRlcm4xID0gL2YoICstP1xcZCspKCArLT9cXGQrKSggKy0/XFxkKykoICstP1xcZCspPy87XG5cblx0Ly8gZiB2ZXJ0ZXgvdXYgdmVydGV4L3V2IHZlcnRleC91diAuLi5cblx0dmFyIGZhY2VfcGF0dGVybjIgPSAvZiggKygtP1xcZCspXFwvKC0/XFxkKykpKCArKC0/XFxkKylcXC8oLT9cXGQrKSkoICsoLT9cXGQrKVxcLygtP1xcZCspKSggKygtP1xcZCspXFwvKC0/XFxkKykpPy87XG5cblx0Ly8gZiB2ZXJ0ZXgvdXYvbm9ybWFsIHZlcnRleC91di9ub3JtYWwgdmVydGV4L3V2L25vcm1hbCAuLi5cblx0dmFyIGZhY2VfcGF0dGVybjMgPSAvZiggKygtP1xcZCspXFwvKC0/XFxkKylcXC8oLT9cXGQrKSkoICsoLT9cXGQrKVxcLygtP1xcZCspXFwvKC0/XFxkKykpKCArKC0/XFxkKylcXC8oLT9cXGQrKVxcLygtP1xcZCspKSggKygtP1xcZCspXFwvKC0/XFxkKylcXC8oLT9cXGQrKSk/LztcblxuXHQvLyBmIHZlcnRleC8vbm9ybWFsIHZlcnRleC8vbm9ybWFsIHZlcnRleC8vbm9ybWFsIC4uLiBcblx0dmFyIGZhY2VfcGF0dGVybjQgPSAvZiggKygtP1xcZCspXFwvXFwvKC0/XFxkKykpKCArKC0/XFxkKylcXC9cXC8oLT9cXGQrKSkoICsoLT9cXGQrKVxcL1xcLygtP1xcZCspKSggKygtP1xcZCspXFwvXFwvKC0/XFxkKykpPy87XG5cblxuXHRmdW5jdGlvbiBwYXJzZVZlcnRleEluZGV4KCB2YWx1ZSApIHtcblx0XHR2YXIgaW5kZXggPSBwYXJzZUludCggdmFsdWUgKTtcblx0XHRyZXR1cm4gKCBpbmRleCA+PSAwID8gaW5kZXggLSAxIDogaW5kZXggKyB2ZXJ0aWNlcy5sZW5ndGggLyAzICkgKiAzO1xuXHR9XG5cblx0ZnVuY3Rpb24gcGFyc2VOb3JtYWxJbmRleCggdmFsdWUgKSB7XG5cdFx0dmFyIGluZGV4ID0gcGFyc2VJbnQoIHZhbHVlICk7XG5cdFx0cmV0dXJuICggaW5kZXggPj0gMCA/IGluZGV4IC0gMSA6IGluZGV4ICsgbm9ybWFscy5sZW5ndGggLyAzICkgKiAzO1xuXHR9XG5cblx0ZnVuY3Rpb24gcGFyc2VVVkluZGV4KCB2YWx1ZSApIHtcblx0XHR2YXIgaW5kZXggPSBwYXJzZUludCggdmFsdWUgKTtcblx0XHRyZXR1cm4gKCBpbmRleCA+PSAwID8gaW5kZXggLSAxIDogaW5kZXggKyB1dnMubGVuZ3RoIC8gMiApICogMjtcblx0fVxuXG5cblx0ZnVuY3Rpb24gYWRkVmVydGV4KGEsIGIgLGMpIHtcblx0XHRwb3NpdGlvbnMucHVzaChbdmVydGljZXNbYV0sIHZlcnRpY2VzW2ErMV0sIHZlcnRpY2VzW2ErMl1dKTtcblx0XHRwb3NpdGlvbnMucHVzaChbdmVydGljZXNbYl0sIHZlcnRpY2VzW2IrMV0sIHZlcnRpY2VzW2IrMl1dKTtcblx0XHRwb3NpdGlvbnMucHVzaChbdmVydGljZXNbY10sIHZlcnRpY2VzW2MrMV0sIHZlcnRpY2VzW2MrMl1dKTtcblxuXHRcdGluZGljZXMucHVzaChjb3VudCAqIDMgKyAwKTtcblx0XHRpbmRpY2VzLnB1c2goY291bnQgKiAzICsgMSk7XG5cdFx0aW5kaWNlcy5wdXNoKGNvdW50ICogMyArIDIpO1xuXG5cdFx0Y291bnQgKys7XG5cdH1cblxuXG5cdGZ1bmN0aW9uIGFkZFVWKGEsIGIsIGMpIHtcblx0XHRjb29yZHMucHVzaChbdXZzW2FdLCB1dnNbYSsxXV0pO1xuXHRcdGNvb3Jkcy5wdXNoKFt1dnNbYl0sIHV2c1tiKzFdXSk7XG5cdFx0Y29vcmRzLnB1c2goW3V2c1tjXSwgdXZzW2MrMV1dKTtcblx0fVxuXG5cblx0ZnVuY3Rpb24gYWRkTm9ybWFsKGEsIGIsIGMpIHtcblx0XHRmaW5hbE5vcm1hbHMucHVzaChbbm9ybWFsc1thXSwgbm9ybWFsc1thKzFdLCBub3JtYWxzW2ErMl1dKTtcblx0XHRmaW5hbE5vcm1hbHMucHVzaChbbm9ybWFsc1tiXSwgbm9ybWFsc1tiKzFdLCBub3JtYWxzW2IrMl1dKTtcblx0XHRmaW5hbE5vcm1hbHMucHVzaChbbm9ybWFsc1tjXSwgbm9ybWFsc1tjKzFdLCBub3JtYWxzW2MrMl1dKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGFkZEZhY2UoIGEsIGIsIGMsIGQsICB1YSwgdWIsIHVjLCB1ZCwgIG5hLCBuYiwgbmMsIG5kICkge1xuXHRcdHZhciBpYSA9IHBhcnNlVmVydGV4SW5kZXgoIGEgKTtcblx0XHR2YXIgaWIgPSBwYXJzZVZlcnRleEluZGV4KCBiICk7XG5cdFx0dmFyIGljID0gcGFyc2VWZXJ0ZXhJbmRleCggYyApO1xuXHRcdHZhciBpZDtcblxuXHRcdGlmICggZCA9PT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRhZGRWZXJ0ZXgoIGlhLCBpYiwgaWMgKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGlkID0gcGFyc2VWZXJ0ZXhJbmRleCggZCApO1xuXG5cdFx0XHRhZGRWZXJ0ZXgoIGlhLCBpYiwgaWQgKTtcblx0XHRcdGFkZFZlcnRleCggaWIsIGljLCBpZCApO1xuXG5cdFx0fVxuXG5cblx0XHRpZiAoIHVhICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdGlhID0gcGFyc2VVVkluZGV4KCB1YSApO1xuXHRcdFx0aWIgPSBwYXJzZVVWSW5kZXgoIHViICk7XG5cdFx0XHRpYyA9IHBhcnNlVVZJbmRleCggdWMgKTtcblxuXHRcdFx0aWYgKCBkID09PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdFx0YWRkVVYoIGlhLCBpYiwgaWMgKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRpZCA9IHBhcnNlVVZJbmRleCggdWQgKTtcblxuXHRcdFx0XHRhZGRVViggaWEsIGliLCBpZCApO1xuXHRcdFx0XHRhZGRVViggaWIsIGljLCBpZCApO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRpZiAoIG5hICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdGlhID0gcGFyc2VOb3JtYWxJbmRleCggbmEgKTtcblx0XHRcdGliID0gcGFyc2VOb3JtYWxJbmRleCggbmIgKTtcblx0XHRcdGljID0gcGFyc2VOb3JtYWxJbmRleCggbmMgKTtcblxuXHRcdFx0aWYgKCBkID09PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdFx0YWRkTm9ybWFsKCBpYSwgaWIsIGljICk7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0aWQgPSBwYXJzZU5vcm1hbEluZGV4KCBuZCApO1xuXG5cdFx0XHRcdGFkZE5vcm1hbCggaWEsIGliLCBpZCApO1xuXHRcdFx0XHRhZGROb3JtYWwoIGliLCBpYywgaWQgKTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXHR9XG5cblxuXHRmb3IgKCB2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkgKysgKSB7XG5cdFx0dmFyIGxpbmUgPSBsaW5lc1sgaSBdO1xuXHRcdGxpbmUgPSBsaW5lLnRyaW0oKTtcblxuXHRcdGlmICggbGluZS5sZW5ndGggPT09IDAgfHwgbGluZS5jaGFyQXQoIDAgKSA9PT0gJyMnICkge1xuXG5cdFx0XHRjb250aW51ZTtcblxuXHRcdH0gZWxzZSBpZiAoICggcmVzdWx0ID0gdmVydGV4X3BhdHRlcm4uZXhlYyggbGluZSApICkgIT09IG51bGwgKSB7XG5cblx0XHRcdHZlcnRpY2VzLnB1c2goXG5cdFx0XHRcdHBhcnNlRmxvYXQoIHJlc3VsdFsgMSBdICksXG5cdFx0XHRcdHBhcnNlRmxvYXQoIHJlc3VsdFsgMiBdICksXG5cdFx0XHRcdHBhcnNlRmxvYXQoIHJlc3VsdFsgMyBdIClcblx0XHRcdCk7XG5cblx0XHR9IGVsc2UgaWYgKCAoIHJlc3VsdCA9IG5vcm1hbF9wYXR0ZXJuLmV4ZWMoIGxpbmUgKSApICE9PSBudWxsICkge1xuXG5cdFx0XHRub3JtYWxzLnB1c2goXG5cdFx0XHRcdHBhcnNlRmxvYXQoIHJlc3VsdFsgMSBdICksXG5cdFx0XHRcdHBhcnNlRmxvYXQoIHJlc3VsdFsgMiBdICksXG5cdFx0XHRcdHBhcnNlRmxvYXQoIHJlc3VsdFsgMyBdIClcblx0XHRcdCk7XG5cblx0XHR9IGVsc2UgaWYgKCAoIHJlc3VsdCA9IHV2X3BhdHRlcm4uZXhlYyggbGluZSApICkgIT09IG51bGwgKSB7XG5cblx0XHRcdHV2cy5wdXNoKFxuXHRcdFx0XHRwYXJzZUZsb2F0KCByZXN1bHRbIDEgXSApLFxuXHRcdFx0XHRwYXJzZUZsb2F0KCByZXN1bHRbIDIgXSApXG5cdFx0XHQpO1xuXG5cdFx0fSBlbHNlIGlmICggKCByZXN1bHQgPSBmYWNlX3BhdHRlcm4xLmV4ZWMoIGxpbmUgKSApICE9PSBudWxsICkge1xuXG5cdFx0XHRhZGRGYWNlKFxuXHRcdFx0XHRyZXN1bHRbIDEgXSwgcmVzdWx0WyAyIF0sIHJlc3VsdFsgMyBdLCByZXN1bHRbIDQgXVxuXHRcdFx0KTtcblxuXHRcdH0gZWxzZSBpZiAoICggcmVzdWx0ID0gZmFjZV9wYXR0ZXJuMi5leGVjKCBsaW5lICkgKSAhPT0gbnVsbCApIHtcblxuXHRcdFx0YWRkRmFjZShcblx0XHRcdFx0cmVzdWx0WyAyIF0sIHJlc3VsdFsgNSBdLCByZXN1bHRbIDggXSwgcmVzdWx0WyAxMSBdLFxuXHRcdFx0XHRyZXN1bHRbIDMgXSwgcmVzdWx0WyA2IF0sIHJlc3VsdFsgOSBdLCByZXN1bHRbIDEyIF1cblx0XHRcdCk7XG5cblx0XHR9IGVsc2UgaWYgKCAoIHJlc3VsdCA9IGZhY2VfcGF0dGVybjMuZXhlYyggbGluZSApICkgIT09IG51bGwgKSB7XG5cdFx0XHRhZGRGYWNlKFxuXHRcdFx0XHRyZXN1bHRbIDIgXSwgcmVzdWx0WyA2IF0sIHJlc3VsdFsgMTAgXSwgcmVzdWx0WyAxNCBdLFxuXHRcdFx0XHRyZXN1bHRbIDMgXSwgcmVzdWx0WyA3IF0sIHJlc3VsdFsgMTEgXSwgcmVzdWx0WyAxNSBdLFxuXHRcdFx0XHRyZXN1bHRbIDQgXSwgcmVzdWx0WyA4IF0sIHJlc3VsdFsgMTIgXSwgcmVzdWx0WyAxNiBdXG5cdFx0XHQpO1xuXG5cdFx0fSBlbHNlIGlmICggKCByZXN1bHQgPSBmYWNlX3BhdHRlcm40LmV4ZWMoIGxpbmUgKSApICE9PSBudWxsICkge1xuXHRcdFx0YWRkRmFjZShcblx0XHRcdFx0cmVzdWx0WyAyIF0sIHJlc3VsdFsgNSBdLCByZXN1bHRbIDggXSwgcmVzdWx0WyAxMSBdLFxuXHRcdFx0XHR1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsXG5cdFx0XHRcdHJlc3VsdFsgMyBdLCByZXN1bHRbIDYgXSwgcmVzdWx0WyA5IF0sIHJlc3VsdFsgMTIgXVxuXHRcdFx0KTtcblxuXHRcdH0gXG5cdH1cblxuXHR0aGlzLl9nZW5lcmF0ZU1lc2hlcyh7XHRcblx0XHRwb3NpdGlvbnM6cG9zaXRpb25zLFxuXHRcdGNvb3Jkczpjb29yZHMsXG5cdFx0bm9ybWFsczpmaW5hbE5vcm1hbHMsXG5cdFx0aW5kaWNlczppbmRpY2VzXG5cdH0pO1xuXHRcbn07XG5cblxucC5fZ2VuZXJhdGVNZXNoZXMgPSBmdW5jdGlvbihvKSB7XG5cdGdsID0gR0wuZ2w7XG5cblx0dmFyIG1lc2ggPSBuZXcgTWVzaChvLnBvc2l0aW9ucy5sZW5ndGgsIG8uaW5kaWNlcy5sZW5ndGgsIHRoaXMuX2RyYXdpbmdUeXBlKTtcblx0bWVzaC5idWZmZXJWZXJ0ZXgoby5wb3NpdGlvbnMpO1xuXHRtZXNoLmJ1ZmZlclRleENvb3JkcyhvLmNvb3Jkcyk7XG5cdG1lc2guYnVmZmVySW5kaWNlcyhvLmluZGljZXMpO1xuXHRpZighdGhpcy5faWdub3JlTm9ybWFscykge1xuXHRcdG1lc2guYnVmZmVyRGF0YShvLm5vcm1hbHMsIFwiYU5vcm1hbFwiLCAzKTtcblx0fVxuXG5cdGlmKHRoaXMuX2NhbGxiYWNrKSB7XG5cdFx0dGhpcy5fY2FsbGJhY2sobWVzaCwgbyk7XG5cdH1cbn07XG5cbi8vIHZhciBsb2FkZXIgPSBuZXcgT2JqTG9hZGVyKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqTG9hZGVyOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgZ2xtID0gcmVxdWlyZShcImdsLW1hdHJpeFwiKTtcblxuZnVuY3Rpb24gUXVhdFJvdGF0aW9uKG1MaXN0ZW5lclRhcmdldCkge1xuXHRpZihtTGlzdGVuZXJUYXJnZXQgPT09IHVuZGVmaW5lZCkge1x0bUxpc3RlbmVyVGFyZ2V0ID0gZG9jdW1lbnQ7XHR9XG5cdHRoaXMuX2lzUm90YXRlWiAgICAgPSAwO1xuXHR0aGlzLm1hdHJpeCAgICAgICAgID0gZ2xtLm1hdDQuY3JlYXRlKCk7XG5cdHRoaXMubSAgICAgICAgICAgICAgPSBnbG0ubWF0NC5jcmVhdGUoKTtcblx0dGhpcy5fdlpheGlzICAgICAgICA9IGdsbS52ZWMzLmNsb25lKFswLCAwLCAwXSk7XG5cdHRoaXMuX3pBeGlzICAgICAgICAgPSBnbG0udmVjMy5jbG9uZShbMCwgMCwgLTFdKTtcblx0dGhpcy5wcmVNb3VzZSAgICAgICA9IHt4OjAsIHk6MH07XG5cdHRoaXMubW91c2UgICAgICAgICAgPSB7eDowLCB5OjB9O1xuXHR0aGlzLl9pc01vdXNlRG93biAgID0gZmFsc2U7XG5cdHRoaXMuX3JvdGF0aW9uICAgICAgPSBnbG0ucXVhdC5jbG9uZShbMCwgMCwgMSwgMF0pO1xuXHR0aGlzLnRlbXBSb3RhdGlvbiAgID0gZ2xtLnF1YXQuY2xvbmUoWzAsIDAsIDAsIDBdKTtcblx0dGhpcy5fcm90YXRlWk1hcmdpbiA9IDA7XG5cdHRoaXMuZGlmZlggICAgICAgICAgPSAwO1xuXHR0aGlzLmRpZmZZICAgICAgICAgID0gMDtcblx0dGhpcy5fY3VyckRpZmZYICAgICA9IDA7XG5cdHRoaXMuX2N1cnJEaWZmWSAgICAgPSAwO1xuXHR0aGlzLl9vZmZzZXQgICAgICAgID0gMC4wMDQ7XG5cdHRoaXMuX2Vhc2luZyAgICAgICAgPSAwLjE7XG5cdHRoaXMuX3NsZXJwXHRcdFx0PSAtMTtcblx0dGhpcy5faXNMb2NrZWQgXHRcdD0gZmFsc2U7XG5cblx0dmFyIHRoYXQgPSB0aGlzO1xuXHRtTGlzdGVuZXJUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBmdW5jdGlvbihhRXZlbnQpIHsgdGhhdC5fb25Nb3VzZURvd24oYUV2ZW50KTsgfSk7XG5cdG1MaXN0ZW5lclRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBmdW5jdGlvbihhRXZlbnQpIHtcdHRoYXQuX29uTW91c2VEb3duKGFFdmVudCk7IH0pO1xuXHRtTGlzdGVuZXJUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgZnVuY3Rpb24oYUV2ZW50KSB7IHRoYXQuX29uTW91c2VVcChhRXZlbnQpOyB9KTtcblx0bUxpc3RlbmVyVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBmdW5jdGlvbihhRXZlbnQpIHsgdGhhdC5fb25Nb3VzZVVwKGFFdmVudCk7IH0pO1xuXHRtTGlzdGVuZXJUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBmdW5jdGlvbihhRXZlbnQpIHsgdGhhdC5fb25Nb3VzZU1vdmUoYUV2ZW50KTsgfSk7XG5cdG1MaXN0ZW5lclRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGZ1bmN0aW9uKGFFdmVudCkgeyB0aGF0Ll9vbk1vdXNlTW92ZShhRXZlbnQpOyB9KTtcbn1cblxuXG52YXIgcCA9IFF1YXRSb3RhdGlvbi5wcm90b3R5cGU7XG5cbnAuaW52ZXJzZUNvbnRyb2wgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHRpZih2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHRcblx0XHR0aGlzLl9pc0ludmVydCA9IHRydWU7XHRcblx0fSBlbHNlIHtcblx0XHR0aGlzLl9pc0ludmVydCA9IHZhbHVlO1xuXHR9XG59O1xuXG5wLmxvY2sgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHRpZih2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHRcblx0XHR0aGlzLl9pc0xvY2tlZCA9IHRydWU7XHRcblx0fSBlbHNlIHtcdFxuXHRcdHRoaXMuX2lzTG9ja2VkID0gdmFsdWU7XHRcblx0fVxufTtcblxucC5nZXRNb3VzZVBvcyA9IGZ1bmN0aW9uKGFFdmVudCkge1xuXHR2YXIgbW91c2VYLCBtb3VzZVk7XG5cblx0aWYoYUV2ZW50LmNoYW5nZWRUb3VjaGVzICE9PSB1bmRlZmluZWQpIHtcblx0XHRtb3VzZVggPSBhRXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVg7XG5cdFx0bW91c2VZID0gYUV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZO1xuXHR9IGVsc2Uge1xuXHRcdG1vdXNlWCA9IGFFdmVudC5jbGllbnRYO1xuXHRcdG1vdXNlWSA9IGFFdmVudC5jbGllbnRZO1xuXHR9XG5cdFxuXHRyZXR1cm4ge3g6bW91c2VYLCB5Om1vdXNlWX07XG59O1xuXG5wLl9vbk1vdXNlRG93biA9IGZ1bmN0aW9uKGFFdmVudCkge1xuXHRpZih0aGlzLl9pc0xvY2tlZCkge3JldHVybjt9XG5cdGlmKHRoaXMuX2lzTW91c2VEb3duKSB7cmV0dXJuO31cblxuXHR2YXIgbW91c2UgPSB0aGlzLmdldE1vdXNlUG9zKGFFdmVudCk7XG5cdHZhciB0ZW1wUm90YXRpb24gPSBnbG0ucXVhdC5jbG9uZSh0aGlzLl9yb3RhdGlvbik7XG5cdHRoaXMuX3VwZGF0ZVJvdGF0aW9uKHRlbXBSb3RhdGlvbik7XG5cdHRoaXMuX3JvdGF0aW9uID0gdGVtcFJvdGF0aW9uO1xuXG5cdHRoaXMuX2lzTW91c2VEb3duID0gdHJ1ZTtcblx0dGhpcy5faXNSb3RhdGVaID0gMDtcblx0dGhpcy5wcmVNb3VzZSA9IHt4Om1vdXNlLngsIHk6bW91c2UueX07XG5cblx0aWYobW91c2UueSA8IHRoaXMuX3JvdGF0ZVpNYXJnaW4gfHwgbW91c2UueSA+ICh3aW5kb3cuaW5uZXJIZWlnaHQgLSB0aGlzLl9yb3RhdGVaTWFyZ2luKSApIHtcdHRoaXMuX2lzUm90YXRlWiA9IDE7XHR9XG5cdGVsc2UgaWYobW91c2UueCA8IHRoaXMuX3JvdGF0ZVpNYXJnaW4gfHwgbW91c2UueCA+ICh3aW5kb3cuaW5uZXJXaWR0aCAtIHRoaXMuX3JvdGF0ZVpNYXJnaW4pICkge1x0dGhpcy5faXNSb3RhdGVaID0gMjtcdH1cblxuXHR0aGlzLl9jdXJyRGlmZlggPSB0aGlzLmRpZmZYID0gMDtcblx0dGhpcy5fY3VyckRpZmZZID0gdGhpcy5kaWZmWSA9IDA7XG59O1xuXG5wLl9vbk1vdXNlTW92ZSA9IGZ1bmN0aW9uKGFFdmVudCkge1xuXHRpZih0aGlzLl9pc0xvY2tlZCkge3JldHVybjt9XG5cdGlmKGFFdmVudC50b3VjaGVzKSB7YUV2ZW50LnByZXZlbnREZWZhdWx0KCk7fVxuXHR0aGlzLm1vdXNlID0gdGhpcy5nZXRNb3VzZVBvcyhhRXZlbnQpO1xufTtcblxucC5fb25Nb3VzZVVwID0gZnVuY3Rpb24oKSB7XG5cdGlmKHRoaXMuX2lzTG9ja2VkKSB7cmV0dXJuO31cblx0aWYoIXRoaXMuX2lzTW91c2VEb3duKSB7cmV0dXJuO31cblx0dGhpcy5faXNNb3VzZURvd24gPSBmYWxzZTtcbn07XG5cbnAuc2V0Q2FtZXJhUG9zID0gZnVuY3Rpb24obVF1YXQsIHNwZWVkKSB7XG5cdHNwZWVkICAgICAgICAgICAgID0gc3BlZWQgfHwgdGhpcy5fZWFzaW5nO1xuXHR0aGlzLl9lYXNpbmcgICAgICA9IHNwZWVkO1xuXHRpZih0aGlzLl9zbGVycCA+IDApIHtyZXR1cm47fVxuXHRcblx0dmFyIHRlbXBSb3RhdGlvbiAgPSBnbG0ucXVhdC5jbG9uZSh0aGlzLl9yb3RhdGlvbik7XG5cdHRoaXMuX3VwZGF0ZVJvdGF0aW9uKHRlbXBSb3RhdGlvbik7XG5cdHRoaXMuX3JvdGF0aW9uICAgID0gZ2xtLnF1YXQuY2xvbmUodGVtcFJvdGF0aW9uKTtcblx0dGhpcy5fY3VyckRpZmZYICAgPSB0aGlzLmRpZmZYID0gMDtcblx0dGhpcy5fY3VyckRpZmZZICAgPSB0aGlzLmRpZmZZID0gMDtcblx0XG5cdHRoaXMuX2lzTW91c2VEb3duID0gZmFsc2U7XG5cdHRoaXMuX2lzUm90YXRlWiAgID0gMDtcblx0XG5cdHRoaXMuX3RhcmdldFF1YXQgID0gZ2xtLnF1YXQuY2xvbmUobVF1YXQpO1xuXHR0aGlzLl9zbGVycCAgICAgICA9IDE7XG59O1xuXG5wLnJlc2V0UXVhdCA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLl9yb3RhdGlvbiAgICA9IGdsbS5xdWF0LmNsb25lKFswLCAwLCAxLCAwXSk7XG5cdHRoaXMudGVtcFJvdGF0aW9uID0gZ2xtLnF1YXQuY2xvbmUoWzAsIDAsIDAsIDBdKTtcblx0dGhpcy5fdGFyZ2V0UXVhdCAgPSB1bmRlZmluZWQ7XG5cdHRoaXMuX3NsZXJwICAgICAgID0gLTE7XG59O1xuXG5wLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuXHRnbG0ubWF0NC5pZGVudGl0eSh0aGlzLm0pO1xuXG5cdGlmKHRoaXMuX3RhcmdldFF1YXQgPT09IHVuZGVmaW5lZCkgeyBcblx0XHRnbG0ucXVhdC5zZXQodGhpcy50ZW1wUm90YXRpb24sIHRoaXMuX3JvdGF0aW9uWzBdLCB0aGlzLl9yb3RhdGlvblsxXSwgdGhpcy5fcm90YXRpb25bMl0sIHRoaXMuX3JvdGF0aW9uWzNdKTtcblx0XHR0aGlzLl91cGRhdGVSb3RhdGlvbih0aGlzLnRlbXBSb3RhdGlvbik7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5fc2xlcnAgKz0gKDAgLSB0aGlzLl9zbGVycCkgKiAwLjE7XG5cblx0XHRpZih0aGlzLl9zbGVycCA8IDAuMDAxKSB7XG5cdFx0XHQvLyBxdWF0LnNldCh0aGlzLl90YXJnZXRRdWF0LCB0aGlzLl9yb3RhdGlvbik7XG5cdFx0XHRnbG0ucXVhdC5zZXQodGhpcy5fcm90YXRpb24sIHRoaXMuX3RhcmdldFF1YXRbMF0sIHRoaXMuX3RhcmdldFF1YXRbMV0sIHRoaXMuX3RhcmdldFF1YXRbMl0sIHRoaXMuX3RhcmdldFF1YXRbM10pO1xuXHRcdFx0dGhpcy5fdGFyZ2V0UXVhdCA9IHVuZGVmaW5lZDtcblx0XHRcdHRoaXMuX3NsZXJwID0gLTE7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGdsbS5xdWF0LnNldCh0aGlzLnRlbXBSb3RhdGlvbiwgMCwgMCwgMCwgMCk7XG5cdFx0XHRnbG0ucXVhdC5zbGVycCh0aGlzLnRlbXBSb3RhdGlvbiwgdGhpcy5fdGFyZ2V0UXVhdCwgdGhpcy5fcm90YXRpb24sIHRoaXMuX3NsZXJwKTtcblx0XHR9XG5cdH1cblxuXHRnbG0udmVjMy50cmFuc2Zvcm1RdWF0KHRoaXMuX3ZaYXhpcywgdGhpcy5fdlpheGlzLCB0aGlzLnRlbXBSb3RhdGlvbik7XG5cblx0Z2xtLm1hdDQuZnJvbVF1YXQodGhpcy5tYXRyaXgsIHRoaXMudGVtcFJvdGF0aW9uKTtcbn07XG5cbnAuX3VwZGF0ZVJvdGF0aW9uID0gZnVuY3Rpb24oYVRlbXBSb3RhdGlvbikge1xuXHRpZih0aGlzLl9pc01vdXNlRG93biAmJiAhdGhpcy5faXNMb2NrZWQpIHtcblx0XHR0aGlzLmRpZmZYID0gLSh0aGlzLm1vdXNlLnggLSB0aGlzLnByZU1vdXNlLngpO1xuXHRcdHRoaXMuZGlmZlkgPSAodGhpcy5tb3VzZS55IC0gdGhpcy5wcmVNb3VzZS55KTtcblxuXHRcdGlmKHRoaXMuX2lzSW52ZXJ0KSB7XG5cdFx0XHR0aGlzLmRpZmZYID0gLXRoaXMuZGlmZlg7XG5cdFx0XHR0aGlzLmRpZmZZID0gLXRoaXMuZGlmZlk7XG5cdFx0fVxuXHR9XG5cdFxuXHR0aGlzLl9jdXJyRGlmZlggKz0gKHRoaXMuZGlmZlggLSB0aGlzLl9jdXJyRGlmZlgpICogdGhpcy5fZWFzaW5nO1xuXHR0aGlzLl9jdXJyRGlmZlkgKz0gKHRoaXMuZGlmZlkgLSB0aGlzLl9jdXJyRGlmZlkpICogdGhpcy5fZWFzaW5nO1xuXG5cdHZhciBhbmdsZSwgX3F1YXQ7XG5cblx0aWYodGhpcy5faXNSb3RhdGVaID4gMCkge1xuXHRcdGlmKHRoaXMuX2lzUm90YXRlWiA9PT0gMSkge1xuXHRcdFx0YW5nbGUgPSAtdGhpcy5fY3VyckRpZmZYICogdGhpcy5fb2Zmc2V0OyBcblx0XHRcdGFuZ2xlICo9ICh0aGlzLnByZU1vdXNlLnkgPCB0aGlzLl9yb3RhdGVaTWFyZ2luKSA/IC0xIDogMTtcblx0XHRcdF9xdWF0ID0gZ2xtLnF1YXQuY2xvbmUoIFswLCAwLCBNYXRoLnNpbihhbmdsZSksIE1hdGguY29zKGFuZ2xlKSBdICk7XG5cdFx0XHRnbG0ucXVhdC5tdWx0aXBseShfcXVhdCwgYVRlbXBSb3RhdGlvbiwgX3F1YXQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRhbmdsZSA9IC10aGlzLl9jdXJyRGlmZlkgKiB0aGlzLl9vZmZzZXQ7IFxuXHRcdFx0YW5nbGUgKj0gKHRoaXMucHJlTW91c2UueCA8IHRoaXMuX3JvdGF0ZVpNYXJnaW4pID8gMSA6IC0xO1xuXHRcdFx0X3F1YXQgPSBnbG0ucXVhdC5jbG9uZSggWzAsIDAsIE1hdGguc2luKGFuZ2xlKSwgTWF0aC5jb3MoYW5nbGUpIF0gKTtcblx0XHRcdGdsbS5xdWF0Lm11bHRpcGx5KF9xdWF0LCBhVGVtcFJvdGF0aW9uLCBfcXVhdCk7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHZhciB2ID0gZ2xtLnZlYzMuY2xvbmUoW3RoaXMuX2N1cnJEaWZmWCwgdGhpcy5fY3VyckRpZmZZLCAwXSk7XG5cdFx0dmFyIGF4aXMgPSBnbG0udmVjMy5jcmVhdGUoKTtcblx0XHRnbG0udmVjMy5jcm9zcyhheGlzLCB2LCB0aGlzLl96QXhpcyk7XG5cdFx0Z2xtLnZlYzMubm9ybWFsaXplKGF4aXMsIGF4aXMpO1xuXHRcdGFuZ2xlID0gZ2xtLnZlYzMubGVuZ3RoKHYpICogdGhpcy5fb2Zmc2V0O1xuXHRcdF9xdWF0ID0gZ2xtLnF1YXQuY2xvbmUoIFtNYXRoLnNpbihhbmdsZSkgKiBheGlzWzBdLCBNYXRoLnNpbihhbmdsZSkgKiBheGlzWzFdLCBNYXRoLnNpbihhbmdsZSkgKiBheGlzWzJdLCBNYXRoLmNvcyhhbmdsZSkgXSApO1xuXHRcdGdsbS5xdWF0Lm11bHRpcGx5KGFUZW1wUm90YXRpb24sIF9xdWF0LCBhVGVtcFJvdGF0aW9uKTtcblx0fVxuXG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gUXVhdFJvdGF0aW9uOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgR0wgPSByZXF1aXJlKFwiLi9HTFRvb2xzXCIpO1xudmFyIFF1YXRSb3RhdGlvbiA9IHJlcXVpcmUoXCIuL1F1YXRSb3RhdGlvblwiKTtcbnZhciBDYW1lcmFPcnRobyA9IHJlcXVpcmUoXCIuL0NhbWVyYU9ydGhvXCIpO1xudmFyIFNpbXBsZUNhbWVyYSA9IHJlcXVpcmUoXCIuL1NpbXBsZUNhbWVyYVwiKTtcbnZhciBnbG0gPSByZXF1aXJlKFwiZ2wtbWF0cml4XCIpO1xuXG52YXIgU2NlbmUgPSBmdW5jdGlvbigpIHtcblx0aWYoR0wuY2FudmFzID09PSBudWxsKSB7cmV0dXJuO31cblx0dGhpcy5nbCA9IEdMLmdsO1xuXHR0aGlzLl9jaGlsZHJlbiA9IFtdO1xuXHR0aGlzLl9pbml0KCk7XG59O1xuXG52YXIgcCA9IFNjZW5lLnByb3RvdHlwZTtcblxucC5faW5pdCA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLmNhbWVyYSA9IG5ldyBTaW1wbGVDYW1lcmEoR0wuY2FudmFzKTtcblx0dGhpcy5jYW1lcmEuc2V0UGVyc3BlY3RpdmUoNDUqTWF0aC5QSS8xODAsIEdMLmFzcGVjdFJhdGlvLCA1LCAzMDAwKTtcblx0dGhpcy5jYW1lcmEubG9ja1JvdGF0aW9uKCk7XG5cblx0dmFyIGV5ZSAgICAgICAgICAgICAgICA9IGdsbS52ZWMzLmNsb25lKFswLCAwLCA1MDBdICApO1xuXHR2YXIgY2VudGVyICAgICAgICAgICAgID0gZ2xtLnZlYzMuY3JlYXRlKCApO1xuXHR2YXIgdXAgICAgICAgICAgICAgICAgID0gZ2xtLnZlYzMuY2xvbmUoIFswLC0xLDBdICk7XG5cdHRoaXMuY2FtZXJhLmxvb2tBdChleWUsIGNlbnRlciwgdXApO1xuXHRcblx0dGhpcy5zY2VuZVJvdGF0aW9uICAgICA9IG5ldyBRdWF0Um90YXRpb24oR0wuY2FudmFzKTtcblx0dGhpcy5yb3RhdGlvbkZyb250ICAgICA9IGdsbS5tYXQ0LmNyZWF0ZSgpO1xuXHRnbG0ubWF0NC5pZGVudGl0eSh0aGlzLnJvdGF0aW9uRnJvbnQpO1xuXHRcblx0dGhpcy5jYW1lcmFPcnRobyAgICAgICA9IG5ldyBDYW1lcmFPcnRobygpO1xuXHR0aGlzLmNhbWVyYU9ydGhvU2NyZWVuID0gbmV3IENhbWVyYU9ydGhvKCk7XG5cdHRoaXMuY2FtZXJhT3RobyAgICAgICAgPSB0aGlzLmNhbWVyYU9ydGhvO1xuXG5cdHRoaXMuY2FtZXJhT3J0aG8ubG9va0F0KGV5ZSwgY2VudGVyLCB1cCk7XG5cdHRoaXMuY2FtZXJhT3J0aG8ub3J0aG8oIDEsIC0xLCAxLCAtMSk7XG5cblx0dGhpcy5jYW1lcmFPcnRob1NjcmVlbi5sb29rQXQoZXllLCBjZW50ZXIsIHVwKTtcblx0dGhpcy5jYW1lcmFPcnRob1NjcmVlbi5vcnRobyggMCwgR0wud2lkdGgsIEdMLmhlaWdodCwgMCk7XG5cblx0Ly8gSW4gU3VwZXJDbGFzcyBzaG91bGQgY2FsbCBmb2xsb3dpbmcgZnVuY3Rpb25zLlxuXHR0aGlzLl9pbml0VGV4dHVyZXMoKTtcblx0dGhpcy5faW5pdFZpZXdzKCk7XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdGhpcy5fb25SZXNpemUuYmluZCh0aGlzKSk7XG59O1xuXG5wLl9pbml0VGV4dHVyZXMgPSBmdW5jdGlvbigpIHtcblx0Ly8gY29uc29sZS5sb2coXCJTaG91bGQgYmUgb3ZlcndyaXR0ZW4gYnkgU3VwZXJDbGFzc1wiKTtcbn07XG5cbnAuX2luaXRWaWV3cyA9IGZ1bmN0aW9uKCkge1xuXHQvLyBjb25zb2xlLmxvZyhcIlNob3VsZCBiZSBvdmVyd3JpdHRlbiBieSBTdXBlckNsYXNzXCIpO1xufTtcblxucC5sb29wID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMudXBkYXRlKCk7XG5cdHRoaXMucmVuZGVyKCk7XG59O1xuXG5wLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLmdsLmNsZWFyKHRoaXMuZ2wuQ09MT1JfQlVGRkVSX0JJVCB8IHRoaXMuZ2wuREVQVEhfQlVGRkVSX0JJVCk7XG5cdHRoaXMuc2NlbmVSb3RhdGlvbi51cGRhdGUoKTtcblx0R0wuc2V0Vmlld3BvcnQoMCwgMCwgR0wud2lkdGgsIEdMLmhlaWdodCk7XG5cdEdMLnNldE1hdHJpY2VzKHRoaXMuY2FtZXJhICk7XG5cdEdMLnJvdGF0ZSh0aGlzLnNjZW5lUm90YXRpb24ubWF0cml4KTtcblxufTtcblxucC5yZXNpemUgPSBmdW5jdGlvbigpIHtcblx0Ly8gaWYodGhpcy5jYW1lcmEucmVzaXplKSB7XG5cdC8vIFx0dGhpcy5jYW1lcmEucmVzaXplKEdMLmFzcGVjdFJhdGlvKTtcblx0Ly8gfVxufTtcblxucC5yZW5kZXIgPSBmdW5jdGlvbigpIHtcblxufTtcblxucC5fb25SZXNpemUgPSBmdW5jdGlvbigpIHtcblx0dGhpcy5jYW1lcmFPcnRob1NjcmVlbi5vcnRobyggMCwgR0wud2lkdGgsIEdMLmhlaWdodCwgMCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNjZW5lOyIsIi8vIFNjaGVkdWxlci5qc1xuXG5cInVzZSBzdHJpY3RcIjtcblxuaWYod2luZG93LnJlcXVlc3RBbmltRnJhbWUgPT09IHVuZGVmaW5lZCkge1xuXHR3aW5kb3cucmVxdWVzdEFuaW1GcmFtZSA9IChmdW5jdGlvbigpe1xuXHRcdHJldHVybiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgICB8fCBcblx0XHR3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IFxuXHRcdHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHwgXG5cdFx0d2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICB8fCBcblx0XHR3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgIHx8IFxuXHRcdGZ1bmN0aW9uKCBjYWxsYmFjayApe1xuXHRcdHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuXHRcdH07XG5cdH0pKCk7XG59XG5cbmZ1bmN0aW9uIFNjaGVkdWxlcigpIHtcblx0dGhpcy5GUkFNRVJBVEUgPSA2MDtcblx0dGhpcy5fZGVsYXlUYXNrcyA9IFtdO1xuXHR0aGlzLl9uZXh0VGFza3MgPSBbXTtcblx0dGhpcy5fZGVmZXJUYXNrcyA9IFtdO1xuXHR0aGlzLl9oaWdoVGFza3MgPSBbXTtcblx0dGhpcy5fdXN1cnBUYXNrID0gW107XG5cdHRoaXMuX2VudGVyZnJhbWVUYXNrcyA9IFtdO1xuXHR0aGlzLl9pZFRhYmxlID0gMDtcblxuXHR3aW5kb3cucmVxdWVzdEFuaW1GcmFtZSggdGhpcy5fbG9vcC5iaW5kKHRoaXMpICk7XG59XG5cbnZhciBwID0gU2NoZWR1bGVyLnByb3RvdHlwZTtcblxucC5fbG9vcCA9IGZ1bmN0aW9uKCkge1xuXHR3aW5kb3cucmVxdWVzdEFuaW1GcmFtZSggdGhpcy5fbG9vcC5iaW5kKHRoaXMpICk7XG5cdHRoaXMuX3Byb2Nlc3MoKTtcbn07XG5cblxucC5fcHJvY2VzcyA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgaSA9IDAsXG5cdFx0dGFzaywgaW50ZXJ2YWwsIGN1cnJlbnQ7XG5cdGZvciAoIGk9MDsgaTx0aGlzLl9lbnRlcmZyYW1lVGFza3MubGVuZ3RoOyBpKyspIHtcblx0XHR0YXNrID0gdGhpcy5fZW50ZXJmcmFtZVRhc2tzW2ldO1xuXHRcdGlmKHRhc2sgIT09IG51bGwgJiYgdGFzayAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0YXNrLmZ1bmMuYXBwbHkodGFzay5zY29wZSwgdGFzay5wYXJhbXMpO1xuXHRcdH1cblx0fVxuXHRcblx0d2hpbGUgKCB0aGlzLl9oaWdoVGFza3MubGVuZ3RoID4gMCkge1xuXHRcdHRhc2sgPSB0aGlzLl9oaWdoVGFza3MucG9wKCk7XG5cdFx0dGFzay5mdW5jLmFwcGx5KHRhc2suc2NvcGUsIHRhc2sucGFyYW1zKTtcblx0fVxuXHRcblxuXHR2YXIgc3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cblx0Zm9yICggaT0wOyBpPHRoaXMuX2RlbGF5VGFza3MubGVuZ3RoOyBpKyspIHtcblx0XHR0YXNrID0gdGhpcy5fZGVsYXlUYXNrc1tpXTtcblx0XHRpZihzdGFydFRpbWUtdGFzay50aW1lID4gdGFzay5kZWxheSkge1xuXHRcdFx0dGFzay5mdW5jLmFwcGx5KHRhc2suc2NvcGUsIHRhc2sucGFyYW1zKTtcblx0XHRcdHRoaXMuX2RlbGF5VGFza3Muc3BsaWNlKGksIDEpO1xuXHRcdH1cblx0fVxuXG5cdHN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXHRpbnRlcnZhbCA9IDEwMDAgLyB0aGlzLkZSQU1FUkFURTtcblx0d2hpbGUodGhpcy5fZGVmZXJUYXNrcy5sZW5ndGggPiAwKSB7XG5cdFx0dGFzayA9IHRoaXMuX2RlZmVyVGFza3Muc2hpZnQoKTtcblx0XHRjdXJyZW50ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cdFx0aWYoY3VycmVudCAtIHN0YXJ0VGltZSA8IGludGVydmFsICkge1xuXHRcdFx0dGFzay5mdW5jLmFwcGx5KHRhc2suc2NvcGUsIHRhc2sucGFyYW1zKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fZGVmZXJUYXNrcy51bnNoaWZ0KHRhc2spO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblxuXHRzdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblx0aW50ZXJ2YWwgPSAxMDAwIC8gdGhpcy5GUkFNRVJBVEU7XG5cdHdoaWxlKHRoaXMuX3VzdXJwVGFzay5sZW5ndGggPiAwKSB7XG5cdFx0dGFzayA9IHRoaXMuX3VzdXJwVGFzay5zaGlmdCgpO1xuXHRcdGN1cnJlbnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblx0XHRpZihjdXJyZW50IC0gc3RhcnRUaW1lIDwgaW50ZXJ2YWwgKSB7XG5cdFx0XHR0YXNrLmZ1bmMuYXBwbHkodGFzay5zY29wZSwgdGFzay5wYXJhbXMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyB0aGlzLl91c3VycFRhc2sudW5zaGlmdCh0YXNrKTtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXG5cblxuXHR0aGlzLl9oaWdoVGFza3MgPSB0aGlzLl9oaWdoVGFza3MuY29uY2F0KHRoaXMuX25leHRUYXNrcyk7XG5cdHRoaXMuX25leHRUYXNrcyA9IFtdO1xuXHR0aGlzLl91c3VycFRhc2sgPSBbXTtcbn07XG5cblxucC5hZGRFRiA9IGZ1bmN0aW9uKHNjb3BlLCBmdW5jLCBwYXJhbXMpIHtcblx0cGFyYW1zID0gcGFyYW1zIHx8IFtdO1xuXHR2YXIgaWQgPSB0aGlzLl9pZFRhYmxlO1xuXHR0aGlzLl9lbnRlcmZyYW1lVGFza3NbaWRdID0ge3Njb3BlOnNjb3BlLCBmdW5jOmZ1bmMsIHBhcmFtczpwYXJhbXN9O1xuXHR0aGlzLl9pZFRhYmxlICsrO1xuXHRyZXR1cm4gaWQ7XG59O1xuXG5cbnAucmVtb3ZlRUYgPSBmdW5jdGlvbihpZCkge1xuXHRpZih0aGlzLl9lbnRlcmZyYW1lVGFza3NbaWRdICE9PSB1bmRlZmluZWQpIHtcblx0XHR0aGlzLl9lbnRlcmZyYW1lVGFza3NbaWRdID0gbnVsbDtcblx0fVxuXHRyZXR1cm4gLTE7XG59O1xuXG5cbnAuZGVsYXkgPSBmdW5jdGlvbihzY29wZSwgZnVuYywgcGFyYW1zLCBkZWxheSkge1xuXHR2YXIgdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXHR2YXIgdCA9IHtzY29wZTpzY29wZSwgZnVuYzpmdW5jLCBwYXJhbXM6cGFyYW1zLCBkZWxheTpkZWxheSwgdGltZTp0aW1lfTtcblx0dGhpcy5fZGVsYXlUYXNrcy5wdXNoKHQpO1xufTtcblxuXG5wLmRlZmVyID0gZnVuY3Rpb24oc2NvcGUsIGZ1bmMsIHBhcmFtcykge1xuXHR2YXIgdCA9IHtzY29wZTpzY29wZSwgZnVuYzpmdW5jLCBwYXJhbXM6cGFyYW1zfTtcblx0dGhpcy5fZGVmZXJUYXNrcy5wdXNoKHQpO1xufTtcblxuXG5wLm5leHQgPSBmdW5jdGlvbihzY29wZSwgZnVuYywgcGFyYW1zKSB7XG5cdHZhciB0ID0ge3Njb3BlOnNjb3BlLCBmdW5jOmZ1bmMsIHBhcmFtczpwYXJhbXN9O1xuXHR0aGlzLl9uZXh0VGFza3MucHVzaCh0KTtcbn07XG5cblxucC51c3VycCA9IGZ1bmN0aW9uKHNjb3BlLCBmdW5jLCBwYXJhbXMpIHtcblx0dmFyIHQgPSB7c2NvcGU6c2NvcGUsIGZ1bmM6ZnVuYywgcGFyYW1zOnBhcmFtc307XG5cdHRoaXMuX3VzdXJwVGFzay5wdXNoKHQpO1xufTtcblxuXG52YXIgaW5zdGFuY2UgPSBudWxsO1xuXG5TY2hlZHVsZXIuZ2V0SW5zdGFuY2UgPSBmdW5jdGlvbigpIHtcblx0aWYoaW5zdGFuY2UgPT09IG51bGwpIHtcblx0XHRpbnN0YW5jZSA9IG5ldyBTY2hlZHVsZXIoKTtcblx0fVxuXHRyZXR1cm4gaW5zdGFuY2U7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNjaGVkdWxlci5nZXRJbnN0YW5jZSgpOyIsIlwidXNlIHN0cmljdFwiO1xuXG5cbnZhciBTaGFkZXJMaWJzID0gZnVuY3Rpb24oKSB7IH07XG5cblNoYWRlckxpYnMuc2hhZGVycyA9IHt9O1xuXG5TaGFkZXJMaWJzLnNoYWRlcnMuY29weVZlcnQgPSBcIiNkZWZpbmUgR0xTTElGWSAxXFxuXFxuI2RlZmluZSBTSEFERVJfTkFNRSBCQVNJQ19WRVJURVhcXG5cXG5wcmVjaXNpb24gaGlnaHAgZmxvYXQ7XFxuYXR0cmlidXRlIHZlYzMgYVZlcnRleFBvc2l0aW9uO1xcbmF0dHJpYnV0ZSB2ZWMyIGFUZXh0dXJlQ29vcmQ7XFxuXFxudW5pZm9ybSBtYXQ0IHVNVk1hdHJpeDtcXG51bmlmb3JtIG1hdDQgdVBNYXRyaXg7XFxuXFxudmFyeWluZyB2ZWMyIHZUZXh0dXJlQ29vcmQ7XFxuXFxudm9pZCBtYWluKHZvaWQpIHtcXG4gICAgZ2xfUG9zaXRpb24gPSB1UE1hdHJpeCAqIHVNVk1hdHJpeCAqIHZlYzQoYVZlcnRleFBvc2l0aW9uLCAxLjApO1xcbiAgICB2VGV4dHVyZUNvb3JkID0gYVRleHR1cmVDb29yZDtcXG59XCI7XG5TaGFkZXJMaWJzLnNoYWRlcnMuY29weU5vcm1hbFZlcnQgPSBcIiNkZWZpbmUgR0xTTElGWSAxXFxuXFxuLy8gY29weVdpdGhOb3JtYWxzLnZlcnRcXG5cXG4jZGVmaW5lIFNIQURFUl9OQU1FIEJBU0lDX1ZFUlRFWFxcblxcbnByZWNpc2lvbiBoaWdocCBmbG9hdDtcXG5hdHRyaWJ1dGUgdmVjMyBhVmVydGV4UG9zaXRpb247XFxuYXR0cmlidXRlIHZlYzMgYU5vcm1hbDtcXG5hdHRyaWJ1dGUgdmVjMiBhVGV4dHVyZUNvb3JkO1xcblxcbnVuaWZvcm0gbWF0NCB1TVZNYXRyaXg7XFxudW5pZm9ybSBtYXQ0IHVQTWF0cml4O1xcblxcbnZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1xcbnZhcnlpbmcgdmVjMyB2Tm9ybWFsO1xcbnZhcnlpbmcgdmVjMyB2VmVydGV4O1xcblxcbnZvaWQgbWFpbih2b2lkKSB7XFxuXFx0Z2xfUG9zaXRpb24gICA9IHVQTWF0cml4ICogdU1WTWF0cml4ICogdmVjNChhVmVydGV4UG9zaXRpb24sIDEuMCk7XFxuXFx0dlRleHR1cmVDb29yZCA9IGFUZXh0dXJlQ29vcmQ7XFxuXFx0dk5vcm1hbCAgICAgICA9IGFOb3JtYWw7XFxuXFx0dlZlcnRleCBcXHQgID0gYVZlcnRleFBvc2l0aW9uO1xcbn1cIjtcblxuU2hhZGVyTGlicy5zaGFkZXJzLmdlbmVyYWxWZXJ0ID0gXCIjZGVmaW5lIEdMU0xJRlkgMVxcblxcbiNkZWZpbmUgU0hBREVSX05BTUUgR0VORVJBTF9WRVJURVhcXG5cXG5wcmVjaXNpb24gaGlnaHAgZmxvYXQ7XFxuYXR0cmlidXRlIHZlYzMgYVZlcnRleFBvc2l0aW9uO1xcbmF0dHJpYnV0ZSB2ZWMyIGFUZXh0dXJlQ29vcmQ7XFxuXFxudW5pZm9ybSBtYXQ0IHVNVk1hdHJpeDtcXG51bmlmb3JtIG1hdDQgdVBNYXRyaXg7XFxudW5pZm9ybSB2ZWMzIHBvc2l0aW9uO1xcbnVuaWZvcm0gdmVjMyBzY2FsZTtcXG5cXG52YXJ5aW5nIHZlYzIgdlRleHR1cmVDb29yZDtcXG5cXG52b2lkIG1haW4odm9pZCkge1xcbiAgICB2ZWMzIHBvcyA9IGFWZXJ0ZXhQb3NpdGlvbjtcXG4gICAgcG9zICo9IHNjYWxlO1xcbiAgICBwb3MgKz0gcG9zaXRpb247XFxuICAgIGdsX1Bvc2l0aW9uID0gdVBNYXRyaXggKiB1TVZNYXRyaXggKiB2ZWM0KHBvcywgMS4wKTtcXG4gICAgdlRleHR1cmVDb29yZCA9IGFUZXh0dXJlQ29vcmQ7XFxufVwiO1xuU2hhZGVyTGlicy5zaGFkZXJzLmdlbmVyYWxOb3JtYWxWZXJ0ID0gXCIjZGVmaW5lIEdMU0xJRlkgMVxcblxcbiNkZWZpbmUgU0hBREVSX05BTUUgR0VORVJBTF9WRVJURVhcXG5cXG5wcmVjaXNpb24gaGlnaHAgZmxvYXQ7XFxuYXR0cmlidXRlIHZlYzMgYVZlcnRleFBvc2l0aW9uO1xcbmF0dHJpYnV0ZSB2ZWMzIGFOb3JtYWw7XFxuYXR0cmlidXRlIHZlYzIgYVRleHR1cmVDb29yZDtcXG5cXG51bmlmb3JtIG1hdDQgdU1WTWF0cml4O1xcbnVuaWZvcm0gbWF0NCB1UE1hdHJpeDtcXG51bmlmb3JtIHZlYzMgcG9zaXRpb247XFxudW5pZm9ybSB2ZWMzIHNjYWxlO1xcblxcbnZhcnlpbmcgdmVjMyB2VmVydGV4O1xcbnZhcnlpbmcgdmVjMyB2Tm9ybWFsO1xcbnZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1xcblxcbnZvaWQgbWFpbih2b2lkKSB7XFxuXFx0dmVjMyBwb3MgICAgICA9IGFWZXJ0ZXhQb3NpdGlvbjtcXG5cXHRwb3MgICAgICAgICAgICo9IHNjYWxlO1xcblxcdHBvcyAgICAgICAgICAgKz0gcG9zaXRpb247XFxuXFx0Z2xfUG9zaXRpb24gICA9IHVQTWF0cml4ICogdU1WTWF0cml4ICogdmVjNChwb3MsIDEuMCk7XFxuXFx0dlRleHR1cmVDb29yZCA9IGFUZXh0dXJlQ29vcmQ7XFxuXFx0XFxuXFx0dk5vcm1hbCAgICAgICA9IGFOb3JtYWw7XFxuXFx0dlZlcnRleCAgICAgICA9IHBvcztcXG59XCI7XG5TaGFkZXJMaWJzLnNoYWRlcnMuZ2VuZXJhbFdpdGhOb3JtYWxWZXJ0ID0gXCIjZGVmaW5lIEdMU0xJRlkgMVxcblxcbiNkZWZpbmUgU0hBREVSX05BTUUgR0VORVJBTF9WRVJURVhcXG5cXG5wcmVjaXNpb24gaGlnaHAgZmxvYXQ7XFxuYXR0cmlidXRlIHZlYzMgYVZlcnRleFBvc2l0aW9uO1xcbmF0dHJpYnV0ZSB2ZWMzIGFOb3JtYWw7XFxuYXR0cmlidXRlIHZlYzIgYVRleHR1cmVDb29yZDtcXG5cXG51bmlmb3JtIG1hdDQgdU1WTWF0cml4O1xcbnVuaWZvcm0gbWF0NCB1UE1hdHJpeDtcXG51bmlmb3JtIHZlYzMgcG9zaXRpb247XFxudW5pZm9ybSB2ZWMzIHNjYWxlO1xcblxcbnZhcnlpbmcgdmVjMyB2VmVydGV4O1xcbnZhcnlpbmcgdmVjMyB2Tm9ybWFsO1xcbnZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1xcblxcbnZvaWQgbWFpbih2b2lkKSB7XFxuXFx0dmVjMyBwb3MgICAgICA9IGFWZXJ0ZXhQb3NpdGlvbjtcXG5cXHRwb3MgICAgICAgICAgICo9IHNjYWxlO1xcblxcdHBvcyAgICAgICAgICAgKz0gcG9zaXRpb247XFxuXFx0Z2xfUG9zaXRpb24gICA9IHVQTWF0cml4ICogdU1WTWF0cml4ICogdmVjNChwb3MsIDEuMCk7XFxuXFx0dlRleHR1cmVDb29yZCA9IGFUZXh0dXJlQ29vcmQ7XFxuXFx0XFxuXFx0dk5vcm1hbCAgICAgICA9IGFOb3JtYWw7XFxuXFx0dlZlcnRleCAgICAgICA9IHBvcztcXG59XCI7XG5cblNoYWRlckxpYnMuc2hhZGVycy5jb3B5RnJhZyA9IFwiI2RlZmluZSBHTFNMSUZZIDFcXG5cXG4jZGVmaW5lIFNIQURFUl9OQU1FIFNJTVBMRV9URVhUVVJFXFxuXFxucHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xcbnZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1xcbnVuaWZvcm0gc2FtcGxlcjJEIHRleHR1cmU7XFxuXFxudm9pZCBtYWluKHZvaWQpIHtcXG4gICAgZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZTJEKHRleHR1cmUsIHZUZXh0dXJlQ29vcmQpO1xcbn1cXG5cIjtcblxuXG5TaGFkZXJMaWJzLnNoYWRlcnMuYWxwaGFGcmFnID0gXCIjZGVmaW5lIEdMU0xJRlkgMVxcblxcbiNkZWZpbmUgU0hBREVSX05BTUUgVEVYVFVSRV9XSVRIX0FMUEhBXFxuXFxucHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xcbnZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1xcbnVuaWZvcm0gc2FtcGxlcjJEIHRleHR1cmU7XFxudW5pZm9ybSBmbG9hdCBvcGFjaXR5O1xcblxcbnZvaWQgbWFpbih2b2lkKSB7XFxuICAgIGdsX0ZyYWdDb2xvciA9IHRleHR1cmUyRCh0ZXh0dXJlLCB2VGV4dHVyZUNvb3JkKTtcXG4gICAgZ2xfRnJhZ0NvbG9yLmEgKj0gb3BhY2l0eTtcXG59XCI7XG5cblNoYWRlckxpYnMuc2hhZGVycy5zaW1wbGVDb2xvckZyYWcgPSBcIiNkZWZpbmUgR0xTTElGWSAxXFxuXFxuI2RlZmluZSBTSEFERVJfTkFNRSBTSU1QTEVfQ09MT1JfRlJBR01FTlRcXG5cXG5wcmVjaXNpb24gaGlnaHAgZmxvYXQ7XFxudW5pZm9ybSB2ZWMzIGNvbG9yO1xcbnVuaWZvcm0gZmxvYXQgb3BhY2l0eTtcXG5cXG52b2lkIG1haW4odm9pZCkge1xcbiAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KGNvbG9yLCBvcGFjaXR5KTtcXG59XCI7XG5cblNoYWRlckxpYnMuc2hhZGVycy5kZXB0aEZyYWcgPSBcIiNkZWZpbmUgR0xTTElGWSAxXFxuXFxucHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xcbnZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1xcbnVuaWZvcm0gc2FtcGxlcjJEIHRleHR1cmU7XFxudW5pZm9ybSBmbG9hdCBuO1xcbnVuaWZvcm0gZmxvYXQgZjtcXG5cXG5mbG9hdCBnZXREZXB0aChmbG9hdCB6KSB7XFxuXFx0cmV0dXJuICg2LjAgKiBuKSAvIChmICsgbiAtIHoqKGYtbikpO1xcbn1cXG5cXG52b2lkIG1haW4odm9pZCkge1xcbiAgICBmbG9hdCByID0gdGV4dHVyZTJEKHRleHR1cmUsIHZUZXh0dXJlQ29vcmQpLnI7XFxuICAgIGZsb2F0IGdyZXkgPSBnZXREZXB0aChyKTtcXG4gICAgZ2xfRnJhZ0NvbG9yID0gdmVjNChncmV5LCBncmV5LCBncmV5LCAxLjApO1xcbn1cIjtcblxuU2hhZGVyTGlicy5zaGFkZXJzLnNpbXBsZUNvcHlMaWdodGluZyA9IFwiI2RlZmluZSBHTFNMSUZZIDFcXG5cXG4jZGVmaW5lIFNIQURFUl9OQU1FIFNJTVBMRV9URVhUVVJFX0xJR0hUSU5HXFxuXFxucHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xcblxcbnVuaWZvcm0gdmVjMyBhbWJpZW50O1xcbnVuaWZvcm0gdmVjMyBsaWdodFBvc2l0aW9uO1xcbnVuaWZvcm0gdmVjMyBsaWdodENvbG9yO1xcbnVuaWZvcm0gZmxvYXQgbGlnaHRXZWlnaHQ7XFxuXFxudW5pZm9ybSBzYW1wbGVyMkQgdGV4dHVyZTtcXG5cXG52YXJ5aW5nIHZlYzIgdlRleHR1cmVDb29yZDtcXG52YXJ5aW5nIHZlYzMgdlZlcnRleDtcXG52YXJ5aW5nIHZlYzMgdk5vcm1hbDtcXG5cXG52b2lkIG1haW4odm9pZCkge1xcblxcdHZlYzMgTCAgICAgICAgPSBub3JtYWxpemUobGlnaHRQb3NpdGlvbi12VmVydGV4KTtcXG5cXHRmbG9hdCBsYW1iZXJ0ID0gbWF4KGRvdCh2Tm9ybWFsLCBMKSwgLjApO1xcblxcdHZlYzMgbGlnaHQgICAgPSBhbWJpZW50ICsgbGlnaHRDb2xvciAqIGxhbWJlcnQgKiBsaWdodFdlaWdodDtcXG5cXHR2ZWM0IGNvbG9yIFxcdCAgPSB0ZXh0dXJlMkQodGV4dHVyZSwgdlRleHR1cmVDb29yZCk7XFxuXFx0Y29sb3IucmdiIFxcdCAgKj0gbGlnaHQ7XFxuXFx0XFxuXFx0Z2xfRnJhZ0NvbG9yICA9IGNvbG9yO1xcbn1cIjtcblNoYWRlckxpYnMuc2hhZGVycy5zaW1wbGVDb2xvckxpZ2h0aW5nID0gXCIjZGVmaW5lIEdMU0xJRlkgMVxcblxcbi8vIHNpbXBsZUNvbG9yTGlnaHRpbmcuZnJhZ1xcblxcbiNkZWZpbmUgU0hBREVSX05BTUUgU0lNUExFX0NPTE9SX0xJR0hUSU5HXFxuXFxucHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xcblxcbnVuaWZvcm0gdmVjMyBhbWJpZW50O1xcbnVuaWZvcm0gdmVjMyBsaWdodFBvc2l0aW9uO1xcbnVuaWZvcm0gdmVjMyBsaWdodENvbG9yO1xcbnVuaWZvcm0gZmxvYXQgbGlnaHRXZWlnaHQ7XFxuXFxudW5pZm9ybSB2ZWMzIGNvbG9yO1xcbnVuaWZvcm0gZmxvYXQgb3BhY2l0eTtcXG5cXG52YXJ5aW5nIHZlYzMgdlZlcnRleDtcXG52YXJ5aW5nIHZlYzMgdk5vcm1hbDtcXG5cXG52b2lkIG1haW4odm9pZCkge1xcblxcdHZlYzMgTCAgICAgICAgPSBub3JtYWxpemUobGlnaHRQb3NpdGlvbi12VmVydGV4KTtcXG5cXHRmbG9hdCBsYW1iZXJ0ID0gbWF4KGRvdCh2Tm9ybWFsLCBMKSwgLjApO1xcblxcdHZlYzMgbGlnaHQgICAgPSBhbWJpZW50ICsgbGlnaHRDb2xvciAqIGxhbWJlcnQgKiBsaWdodFdlaWdodDtcXG5cXHRcXG5cXHRnbF9GcmFnQ29sb3IgID0gdmVjNChjb2xvciAqIGxpZ2h0LCBvcGFjaXR5KTtcXG59XCI7XG5cblxuXG5TaGFkZXJMaWJzLmdldFNoYWRlciA9IGZ1bmN0aW9uKG1JZCkge1xuXHRyZXR1cm4gdGhpcy5zaGFkZXJzW21JZF07XG59O1xuXG5TaGFkZXJMaWJzLmdldCA9IFNoYWRlckxpYnMuZ2V0U2hhZGVyO1xubW9kdWxlLmV4cG9ydHMgPSBTaGFkZXJMaWJzOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgZ2xtID0gcmVxdWlyZShcImdsLW1hdHJpeFwiKTtcbnZhciBDYW1lcmFQZXJzcGVjdGl2ZSA9IHJlcXVpcmUoXCIuL0NhbWVyYVBlcnNwZWN0aXZlXCIpO1xudmFyIEVhc2VOdW1iZXIgPSByZXF1aXJlKFwiLi9FYXNlTnVtYmVyXCIpO1xuXG52YXIgU2ltcGxlQ2FtZXJhID0gZnVuY3Rpb24obUxpc3RlbmVyVGFyZ2V0KSB7XG5cdHRoaXMuX2xpc3RlbmVyVGFyZ2V0ID0gbUxpc3RlbmVyVGFyZ2V0IHx8IHdpbmRvdztcblx0Q2FtZXJhUGVyc3BlY3RpdmUuY2FsbCh0aGlzKTtcblx0Ly8gdGhpcy5faXNMb2NrZWQgPSBmYWxzZTtcblx0dGhpcy5faW5pdCgpO1xufTtcblxudmFyIHAgPSBTaW1wbGVDYW1lcmEucHJvdG90eXBlID0gbmV3IENhbWVyYVBlcnNwZWN0aXZlKCk7XG52YXIgcyA9IENhbWVyYVBlcnNwZWN0aXZlLnByb3RvdHlwZTtcblxucC5faW5pdCA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLnJhZGl1cyAgICAgICAgICA9IG5ldyBFYXNlTnVtYmVyKDUwMCk7XG5cdHRoaXMucG9zaXRpb25bMl0gICAgID0gdGhpcy5yYWRpdXMudmFsdWU7XG5cdHRoaXMuY2VudGVyICAgICAgICAgID0gZ2xtLnZlYzMuY3JlYXRlKCApO1xuXHR0aGlzLnVwICAgICAgICAgICAgICA9IGdsbS52ZWMzLmNsb25lKCBbMCwtMSwwXSApO1xuXHR0aGlzLmxvb2tBdCh0aGlzLnBvc2l0aW9uLCB0aGlzLmNlbnRlciwgdGhpcy51cCk7XG5cdHRoaXMuX21vdXNlICAgICAgICAgID0ge307XG5cdHRoaXMuX3ByZU1vdXNlICAgICAgID0ge307XG5cdHRoaXMuX2lzTW91c2VEb3duICAgID0gZmFsc2U7XG5cdFxuXHR0aGlzLl9yeCAgICAgICAgICAgICA9IG5ldyBFYXNlTnVtYmVyKDApO1xuXHR0aGlzLl9yeC5saW1pdCgtTWF0aC5QSS8yLCBNYXRoLlBJLzIpO1xuXHR0aGlzLl9yeSAgICAgICAgICAgICA9IG5ldyBFYXNlTnVtYmVyKDApO1xuXHR0aGlzLl9wcmVSWCAgICAgICAgICA9IDA7XG5cdHRoaXMuX3ByZVJZICAgICAgICAgID0gMDtcblx0Ly8gdGhpcy5faXNMb2NrZWQgICAgICAgPSBmYWxzZTtcblx0dGhpcy5faXNMb2NrWm9vbSBcdCA9IGZhbHNlO1xuXHR0aGlzLl9pc0xvY2tSb3RhdGlvbiA9IGZhbHNlO1xuXHR0aGlzLl9pc0ludmVydCAgICAgICA9IGZhbHNlO1xuXG5cdHRoaXMuX2xpc3RlbmVyVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXdoZWVsXCIsIHRoaXMuX29uV2hlZWwuYmluZCh0aGlzKSk7XG5cdHRoaXMuX2xpc3RlbmVyVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Nb3VzZVNjcm9sbFwiLCB0aGlzLl9vbldoZWVsLmJpbmQodGhpcykpO1xuXG5cdHRoaXMuX2xpc3RlbmVyVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5fb25Nb3VzZURvd24uYmluZCh0aGlzKSk7XG5cdHRoaXMuX2xpc3RlbmVyVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMuX29uTW91c2VEb3duLmJpbmQodGhpcykpO1xuXHR0aGlzLl9saXN0ZW5lclRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMuX29uTW91c2VNb3ZlLmJpbmQodGhpcykpO1xuXHR0aGlzLl9saXN0ZW5lclRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIHRoaXMuX29uTW91c2VNb3ZlLmJpbmQodGhpcykpO1xuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5fb25Nb3VzZVVwLmJpbmQodGhpcykpO1xuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHRoaXMuX29uTW91c2VVcC5iaW5kKHRoaXMpKTtcbn07XG5cbnAuaW52ZXJzZUNvbnRyb2wgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHRpZih2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhpcy5faXNJbnZlcnQgPSB0cnVlO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMuX2lzSW52ZXJ0ID0gdmFsdWU7XG5cdH1cbn07XG5cbnAubG9jayA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdGlmKHZhbHVlID09PSB1bmRlZmluZWQpIHtcblx0XHQvLyB0aGlzLl9pc0xvY2tlZCA9IHRydWU7XG5cdFx0dGhpcy5faXNMb2NrWm9vbSA9IHRydWU7XG5cdFx0dGhpcy5faXNMb2NrUm90YXRpb24gPSB0cnVlO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMuX2lzTG9ja1pvb20gPSB2YWx1ZTtcblx0XHR0aGlzLl9pc0xvY2tSb3RhdGlvbiA9IHZhbHVlO1xuXHR9XG59O1xuXG5wLmxvY2tSb3RhdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdGlmKHZhbHVlID09PSB1bmRlZmluZWQpIHtcblx0XHR0aGlzLl9pc0xvY2tSb3RhdGlvbiA9IHRydWU7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5faXNMb2NrUm90YXRpb24gPSB2YWx1ZTtcblx0fVxufTtcblxucC5sb2NrWm9vbSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdHRoaXMuX2lzTG9ja1pvb20gPSB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHZhbHVlO1xufTtcblxucC5fb25Nb3VzZURvd24gPSBmdW5jdGlvbihtRXZlbnQpIHtcblx0aWYodGhpcy5faXNMb2NrUm90YXRpb24pIHtyZXR1cm47fVxuXHR0aGlzLl9pc01vdXNlRG93biA9IHRydWU7XG5cdGdldE1vdXNlKG1FdmVudCwgdGhpcy5fbW91c2UpO1xuXHRnZXRNb3VzZShtRXZlbnQsIHRoaXMuX3ByZU1vdXNlKTtcblx0dGhpcy5fcHJlUlggPSB0aGlzLl9yeC50YXJnZXRWYWx1ZTtcblx0dGhpcy5fcHJlUlkgPSB0aGlzLl9yeS50YXJnZXRWYWx1ZTtcbn07XG5cblxucC5fb25Nb3VzZU1vdmUgPSBmdW5jdGlvbihtRXZlbnQpIHtcblx0aWYodGhpcy5faXNMb2NrUm90YXRpb24pIHtyZXR1cm47fVxuXHRnZXRNb3VzZShtRXZlbnQsIHRoaXMuX21vdXNlKTtcblx0aWYobUV2ZW50LnRvdWNoZXMpIHttRXZlbnQucHJldmVudERlZmF1bHQoKTt9XG5cdGlmKHRoaXMuX2lzTW91c2VEb3duKSB7XG5cdFx0dmFyIGRpZmZYID0gdGhpcy5fbW91c2UueCAtIHRoaXMuX3ByZU1vdXNlLng7XG5cdFx0aWYodGhpcy5faXNJbnZlcnQpIHtkaWZmWCAqPSAtMTt9XG5cdFx0dGhpcy5fcnkudmFsdWUgPSB0aGlzLl9wcmVSWSAtIGRpZmZYICogMC4wMTtcblxuXHRcdHZhciBkaWZmWSA9IHRoaXMuX21vdXNlLnkgLSB0aGlzLl9wcmVNb3VzZS55O1xuXHRcdGlmKHRoaXMuX2lzSW52ZXJ0KSB7ZGlmZlkgKj0gLTE7fVxuXHRcdHRoaXMuX3J4LnZhbHVlID0gdGhpcy5fcHJlUlggLSBkaWZmWSAqIDAuMDE7XG5cblx0XHQvLyBpZih0aGlzLl9yeC50YXJnZXRWYWx1ZSA+IE1hdGguUEkgKiAwLjUpIHt0aGlzLl9yeC50YXJnZXRWYWx1ZSA9IE1hdGg7XHR9XG5cdH1cbn07XG5cblxucC5fb25Nb3VzZVVwID0gZnVuY3Rpb24oKSB7XG5cdGlmKHRoaXMuX2lzTG9ja1JvdGF0aW9uKSB7cmV0dXJuO31cblx0dGhpcy5faXNNb3VzZURvd24gPSBmYWxzZTtcblx0Ly8gZ2V0TW91c2UobUV2ZW50LCB0aGlzLl9tb3VzZSk7XG59O1xuXG5cbnAuX29uV2hlZWwgPSBmdW5jdGlvbihhRXZlbnQpIHtcblx0aWYodGhpcy5faXNMb2NrWm9vbSkge1x0cmV0dXJuO1x0fVxuXHR2YXIgdyA9IGFFdmVudC53aGVlbERlbHRhO1xuXHR2YXIgZCA9IGFFdmVudC5kZXRhaWw7XG5cdHZhciB2YWx1ZSA9IDA7XG5cdGlmIChkKXtcblx0XHRpZiAodykge1xuXHRcdFx0dmFsdWUgPSB3L2QvNDAqZD4wPzE6LTE7IC8vIE9wZXJhXG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhbHVlID0gLWQvMzsgICAgICAgICAgICAgIC8vIEZpcmVmb3g7ICAgICAgICAgVE9ETzogZG8gbm90IC8zIGZvciBPUyBYXG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHZhbHVlID0gdy8xMjA7IFxuXHR9XG5cblx0Ly8gdGhpcy5fdGFyZ2V0UmFkaXVzIC09IHZhbHVlICogNTtcblx0dGhpcy5yYWRpdXMuYWRkKCAtdmFsdWUgKiA1KTtcblx0XG59O1xuXG5cbnAuZ2V0TWF0cml4ID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMuX3VwZGF0ZUNhbWVyYVBvc2l0aW9uKCk7XG5cdHRoaXMubG9va0F0KHRoaXMucG9zaXRpb24sIHRoaXMuY2VudGVyLCB0aGlzLnVwKTtcblx0cmV0dXJuIHMuZ2V0TWF0cml4LmNhbGwodGhpcyk7XG59O1xuXG5cbnAuX3VwZGF0ZUNhbWVyYVBvc2l0aW9uID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMucG9zaXRpb25bMl0gXHQ9IHRoaXMucmFkaXVzLnZhbHVlO1xuXG5cdHRoaXMucG9zaXRpb25bMV0gPSBNYXRoLnNpbih0aGlzLl9yeC52YWx1ZSkgKiB0aGlzLnJhZGl1cy52YWx1ZTtcblx0dmFyIHRyID0gTWF0aC5jb3ModGhpcy5fcngudmFsdWUpICogdGhpcy5yYWRpdXMudmFsdWU7XG5cdHRoaXMucG9zaXRpb25bMF0gPSBNYXRoLmNvcyh0aGlzLl9yeS52YWx1ZSArIE1hdGguUEkqMC41KSAqIHRyO1xuXHR0aGlzLnBvc2l0aW9uWzJdID0gTWF0aC5zaW4odGhpcy5fcnkudmFsdWUgKyBNYXRoLlBJKjAuNSkgKiB0cjtcbn07XG5cblxudmFyIGdldE1vdXNlID0gZnVuY3Rpb24obUV2ZW50LCBtVGFyZ2V0KSB7XG5cdHZhciBvID0gbVRhcmdldCB8fCB7fTtcblx0aWYobUV2ZW50LnRvdWNoZXMpIHtcblx0XHRvLnggPSBtRXZlbnQudG91Y2hlc1swXS5wYWdlWDtcblx0XHRvLnkgPSBtRXZlbnQudG91Y2hlc1swXS5wYWdlWTtcblx0fSBlbHNlIHtcblx0XHRvLnggPSBtRXZlbnQuY2xpZW50WDtcblx0XHRvLnkgPSBtRXZlbnQuY2xpZW50WTtcblx0fVxuXG5cdHJldHVybiBvO1xufTtcblxuXG5wLl9fZGVmaW5lR2V0dGVyX18oXCJyeFwiLCBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMuX3J4LnRhcmdldFZhbHVlO1xufSk7XG4gXG5wLl9fZGVmaW5lU2V0dGVyX18oXCJyeFwiLCBmdW5jdGlvbihtVmFsdWUpIHtcblx0dGhpcy5fcngudmFsdWUgPSBtVmFsdWU7XG59KTtcblxucC5fX2RlZmluZUdldHRlcl9fKFwicnlcIiwgZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLl9yeS50YXJnZXRWYWx1ZTtcbn0pO1xuIFxucC5fX2RlZmluZVNldHRlcl9fKFwicnlcIiwgZnVuY3Rpb24obVZhbHVlKSB7XG5cdHRoaXMuX3J5LnZhbHVlID0gbVZhbHVlO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2ltcGxlQ2FtZXJhOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgU2ltcGxlSW1hZ2VMb2FkZXIgPSBmdW5jdGlvbigpIHtcblx0dGhpcy5faW1ncyAgICAgICAgICAgICA9IHt9O1xuXHR0aGlzLl9sb2FkZWRDb3VudCAgICAgID0gMDtcblx0dGhpcy5fdG9Mb2FkQ291bnQgICAgICA9IDA7XG5cdHRoaXMuX3Njb3BlICAgICAgICAgICAgPSB1bmRlZmluZWQ7XG5cdHRoaXMuX2NhbGxiYWNrICAgICAgICAgPSB1bmRlZmluZWQ7XG5cdHRoaXMuX2NhbGxiYWNrUHJvZ3Jlc3MgPSB1bmRlZmluZWQ7XG59O1xuXG52YXIgcCA9IFNpbXBsZUltYWdlTG9hZGVyLnByb3RvdHlwZTtcblxuXG5wLmxvYWQgPSBmdW5jdGlvbihpbWdzLCBzY29wZSwgY2FsbGJhY2ssIHByb2dyZXNzQ2FsbGJhY2spIHtcblx0dGhpcy5faW1ncyA9IHt9O1xuXHR0aGlzLl9sb2FkZWRDb3VudCA9IDA7XG5cdHRoaXMuX3RvTG9hZENvdW50ID0gaW1ncy5sZW5ndGg7XG5cdHRoaXMuX3Njb3BlID0gc2NvcGU7XG5cdHRoaXMuX2NhbGxiYWNrID0gY2FsbGJhY2s7XG5cdHRoaXMuX2NhbGxiYWNrUHJvZ3Jlc3MgPSBwcm9ncmVzc0NhbGxiYWNrO1xuXG5cdHRoaXMuX2ltZ0xvYWRlZEJpbmQgPSB0aGlzLl9vbkltYWdlTG9hZGVkLmJpbmQodGhpcyk7XG5cblx0Zm9yICggdmFyIGk9MDsgaTxpbWdzLmxlbmd0aCA7IGkrKykge1xuXHRcdHZhciBpbWcgICAgICAgICA9IG5ldyBJbWFnZSgpO1xuXHRcdGltZy5vbmxvYWQgICAgICA9IHRoaXMuX2ltZ0xvYWRlZEJpbmQ7XG5cdFx0dmFyIHBhdGggICAgICAgID0gaW1nc1tpXTtcblx0XHR2YXIgdG1wICAgICAgICAgPSBwYXRoLnNwbGl0KFwiL1wiKTtcblx0XHR2YXIgcmVmICAgICAgICAgPSB0bXBbdG1wLmxlbmd0aC0xXS5zcGxpdChcIi5cIilbMF07XG5cdFx0dGhpcy5faW1nc1tyZWZdID0gaW1nO1xuXHRcdGltZy5zcmMgICAgICAgICA9IHBhdGg7XG5cdH1cbn07XG5cblxucC5fb25JbWFnZUxvYWRlZCA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLl9sb2FkZWRDb3VudCsrO1xuXG5cdGlmKHRoaXMuX2xvYWRlZENvdW50ID09PSB0aGlzLl90b0xvYWRDb3VudCkge1xuXHRcdHRoaXMuX2NhbGxiYWNrLmNhbGwodGhpcy5fc2NvcGUsIHRoaXMuX2ltZ3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBwID0gdGhpcy5fbG9hZGVkQ291bnQgLyB0aGlzLl90b0xvYWRDb3VudDtcblx0XHRpZih0aGlzLl9jYWxsYmFja1Byb2dyZXNzKSB7XG5cdFx0XHR0aGlzLl9jYWxsYmFja1Byb2dyZXNzLmNhbGwodGhpcy5fc2NvcGUsIHApO1xuXHRcdH1cblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTaW1wbGVJbWFnZUxvYWRlcjsiLCIvLyBWaWV3LmpzXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIEdMU2hhZGVyID0gcmVxdWlyZShcIi4vR0xTaGFkZXJcIik7XG5cbnZhciBWaWV3ID0gZnVuY3Rpb24oYVBhdGhWZXJ0LCBhUGF0aEZyYWcpIHtcblx0dGhpcy5zaGFkZXIgPSBuZXcgR0xTaGFkZXIoYVBhdGhWZXJ0LCBhUGF0aEZyYWcpO1xuXHR0aGlzLl9pbml0KCk7XG59O1xuXG52YXIgcCA9IFZpZXcucHJvdG90eXBlO1xuXG5wLl9pbml0ID0gZnVuY3Rpb24oKSB7XG5cdC8vIGNvbnNvbGUubG9nKFwiU2hvdWxkIGJlIG92ZXJ3cml0dGVuIGJ5IFN1cGVyQ2xhc3NcIik7XG59O1xuXG5wLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xuXHQvLyBjb25zb2xlLmxvZyhcIlNob3VsZCBiZSBvdmVyd3JpdHRlbiBieSBTdXBlckNsYXNzXCIpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBWaWV3O1xuXG4iLCIvLyBWaWV3QXhpcy5qc1xuXG5cInVzZSBzdHJpY3RcIjtcbnZhciBHTCA9IHJlcXVpcmUoXCIuL0dMVG9vbHNcIik7XG52YXIgVmlldyA9IHJlcXVpcmUoXCIuL1ZpZXdcIik7XG52YXIgTWVzaCA9IHJlcXVpcmUoXCIuL01lc2hcIik7XG5cbnZhciB2ZXJ0U2hhZGVyID0gXCJwcmVjaXNpb24gaGlnaHAgZmxvYXQ7YXR0cmlidXRlIHZlYzMgYVZlcnRleFBvc2l0aW9uO2F0dHJpYnV0ZSB2ZWMyIGFUZXh0dXJlQ29vcmQ7YXR0cmlidXRlIHZlYzMgYUNvbG9yO3VuaWZvcm0gbWF0NCB1TVZNYXRyaXg7dW5pZm9ybSBtYXQ0IHVQTWF0cml4O3ZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO3ZhcnlpbmcgdmVjMyB2Q29sb3I7dm9pZCBtYWluKHZvaWQpIHsgICAgZ2xfUG9zaXRpb24gPSB1UE1hdHJpeCAqIHVNVk1hdHJpeCAqIHZlYzQoYVZlcnRleFBvc2l0aW9uLCAxLjApOyAgICB2VGV4dHVyZUNvb3JkID0gYVRleHR1cmVDb29yZDsgICAgdkNvbG9yID0gYUNvbG9yO31cIjtcbnZhciBmcmFnU2hhZGVyID0gXCJwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDt2YXJ5aW5nIHZlYzMgdkNvbG9yO3ZvaWQgbWFpbih2b2lkKSB7ICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQodkNvbG9yLCAxLjApO31cIjtcblxudmFyIFZpZXdBeGlzID0gZnVuY3Rpb24obGluZVdpZHRoLCBtRnJhZ1NoYWRlcikge1xuXHR0aGlzLmxpbmVXaWR0aCA9IGxpbmVXaWR0aCA9PT0gdW5kZWZpbmVkID8gMi4wIDogbGluZVdpZHRoO1xuXHR2YXIgZnMgPSBtRnJhZ1NoYWRlciA9PT0gdW5kZWZpbmVkID8gZnJhZ1NoYWRlciA6IG1GcmFnU2hhZGVyO1xuXHRWaWV3LmNhbGwodGhpcywgdmVydFNoYWRlciwgZnMpO1xufTtcblxudmFyIHAgPSBWaWV3QXhpcy5wcm90b3R5cGUgPSBuZXcgVmlldygpO1xuXG5wLl9pbml0ID0gZnVuY3Rpb24oKSB7XG5cdC8vIHRoaXMubWVzaCA9IGJvbmdpb3ZpLk1lc2hVdGlscy5jcmVhdGVQbGFuZSgyLCAyLCAxKTtcblxuXHR2YXIgcG9zaXRpb25zID0gW107XG5cdHZhciBjb2xvcnMgPSBbXTtcblx0dmFyIGNvb3JkcyA9IFtdO1xuXHR2YXIgaW5kaWNlcyA9IFswLCAxLCAyLCAzLCA0LCA1XTtcblx0dmFyIHIgPSA5OTk5O1xuXG5cdHBvc2l0aW9ucy5wdXNoKFstciwgIDAsICAwXSk7XG5cdHBvc2l0aW9ucy5wdXNoKFsgciwgIDAsICAwXSk7XG5cdHBvc2l0aW9ucy5wdXNoKFsgMCwgLXIsICAwXSk7XG5cdHBvc2l0aW9ucy5wdXNoKFsgMCwgIHIsICAwXSk7XG5cdHBvc2l0aW9ucy5wdXNoKFsgMCwgIDAsIC1yXSk7XG5cdHBvc2l0aW9ucy5wdXNoKFsgMCwgIDAsICByXSk7XG5cblxuXHRjb2xvcnMucHVzaChbMSwgMCwgMF0pO1xuXHRjb2xvcnMucHVzaChbMSwgMCwgMF0pO1xuXHRjb2xvcnMucHVzaChbMCwgMSwgMF0pO1xuXHRjb2xvcnMucHVzaChbMCwgMSwgMF0pO1xuXHRjb2xvcnMucHVzaChbMCwgMCwgMV0pO1xuXHRjb2xvcnMucHVzaChbMCwgMCwgMV0pO1xuXG5cblx0Y29vcmRzLnB1c2goWzAsIDBdKTtcblx0Y29vcmRzLnB1c2goWzAsIDBdKTtcblx0Y29vcmRzLnB1c2goWzAsIDBdKTtcblx0Y29vcmRzLnB1c2goWzAsIDBdKTtcblx0Y29vcmRzLnB1c2goWzAsIDBdKTtcblx0Y29vcmRzLnB1c2goWzAsIDBdKTtcblxuXG5cdHRoaXMubWVzaCA9IG5ldyBNZXNoKHBvc2l0aW9ucy5sZW5ndGgsIGluZGljZXMubGVuZ3RoLCBHTC5nbC5MSU5FUyk7XG5cdHRoaXMubWVzaC5idWZmZXJWZXJ0ZXgocG9zaXRpb25zKTtcblx0dGhpcy5tZXNoLmJ1ZmZlclRleENvb3Jkcyhjb29yZHMpO1xuXHR0aGlzLm1lc2guYnVmZmVySW5kaWNlcyhpbmRpY2VzKTtcblx0dGhpcy5tZXNoLmJ1ZmZlckRhdGEoY29sb3JzLCBcImFDb2xvclwiLCAzLCBmYWxzZSk7XG59O1xuXG5wLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xuXHRpZighdGhpcy5zaGFkZXIuaXNSZWFkeSgpKSB7cmV0dXJuO31cblxuXHR0aGlzLnNoYWRlci5iaW5kKCk7XG5cdEdMLmdsLmxpbmVXaWR0aCh0aGlzLmxpbmVXaWR0aCk7XG5cdEdMLmRyYXcodGhpcy5tZXNoKTtcblx0R0wuZ2wubGluZVdpZHRoKDEuMCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFZpZXdBeGlzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBWaWV3ID0gcmVxdWlyZShcIi4vVmlld1wiKTtcbnZhciBHTCA9IHJlcXVpcmUoXCIuL0dMVG9vbHNcIik7XG52YXIgTWVzaFV0aWxzID0gcmVxdWlyZShcIi4vTWVzaFV0aWxzXCIpO1xuXG52YXIgVmlld0NvcHkgPSBmdW5jdGlvbihhUGF0aFZlcnQsIGFQYXRoRnJhZykge1xuXHRWaWV3LmNhbGwodGhpcywgYVBhdGhWZXJ0LCBhUGF0aEZyYWcpO1xufTtcblxudmFyIHAgPSBWaWV3Q29weS5wcm90b3R5cGUgPSBuZXcgVmlldygpO1xuXG5wLl9pbml0ID0gZnVuY3Rpb24oKSB7XG5cdGlmKCFHTC5nbCkgeyByZXR1cm47XHR9XG5cdHRoaXMubWVzaCA9IE1lc2hVdGlscy5jcmVhdGVQbGFuZSgyLCAyLCAxKTtcbn07XG5cbnAucmVuZGVyID0gZnVuY3Rpb24oYVRleHR1cmUpIHtcblx0aWYoIXRoaXMuc2hhZGVyLmlzUmVhZHkoKSkge3JldHVybjt9XG5cdHRoaXMuc2hhZGVyLmJpbmQoKTtcblx0dGhpcy5zaGFkZXIudW5pZm9ybShcInRleHR1cmVcIiwgXCJ1bmlmb3JtMWlcIiwgMCk7XG5cdC8vIGNvbnNvbGUubG9nKCdSZW5kZXInLCBhVGV4dHVyZSk7XG5cdGFUZXh0dXJlLmJpbmQoMCk7XG5cdEdMLmRyYXcodGhpcy5tZXNoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVmlld0NvcHk7XG4iLCIvLyBWaWV3RG90UGxhbmVzLmpzXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgR0wgPSByZXF1aXJlKFwiLi9HTFRvb2xzXCIpO1xudmFyIFZpZXcgPSByZXF1aXJlKFwiLi9WaWV3XCIpO1xudmFyIFNoYWRlckxpYnMgPSByZXF1aXJlKFwiLi9TaGFkZXJMaWJzXCIpO1xudmFyIE1lc2ggPSByZXF1aXJlKFwiLi9NZXNoXCIpO1xuXG4vLyB2YXIgdmVydFNoYWRlciA9IFwicHJlY2lzaW9uIGhpZ2hwIGZsb2F0O2F0dHJpYnV0ZSB2ZWMzIGFWZXJ0ZXhQb3NpdGlvbjthdHRyaWJ1dGUgdmVjMiBhVGV4dHVyZUNvb3JkO2F0dHJpYnV0ZSB2ZWMzIGFDb2xvcjt1bmlmb3JtIG1hdDQgdU1WTWF0cml4O3VuaWZvcm0gbWF0NCB1UE1hdHJpeDt2YXJ5aW5nIHZlYzIgdlRleHR1cmVDb29yZDt2YXJ5aW5nIHZlYzMgdkNvbG9yO3ZvaWQgbWFpbih2b2lkKSB7ICAgIGdsX1Bvc2l0aW9uID0gdVBNYXRyaXggKiB1TVZNYXRyaXggKiB2ZWM0KGFWZXJ0ZXhQb3NpdGlvbiwgMS4wKTsgICAgdlRleHR1cmVDb29yZCA9IGFUZXh0dXJlQ29vcmQ7ICAgIHZDb2xvciA9IGFDb2xvcjt9XCI7XG4vLyB2YXIgZnJhZ1NoYWRlciA9IFwicHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7dmFyeWluZyB2ZWMzIHZDb2xvcjt2b2lkIG1haW4odm9pZCkgeyAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KHZDb2xvciwgMS4wKTt9XCI7XG5cbnZhciBWaWV3RG90UGxhbmVzID0gZnVuY3Rpb24oY29sb3IsIGZyYWdTaGFkZXIpIHtcblx0dmFyIGdyZXkgPSAwLjc1O1xuXHR0aGlzLmNvbG9yID0gY29sb3IgPT09IHVuZGVmaW5lZCA/IFtncmV5LCBncmV5LCBncmV5XSA6IGNvbG9yO1xuXHR2YXIgZnMgPSBmcmFnU2hhZGVyID09PSB1bmRlZmluZWQgPyBTaGFkZXJMaWJzLmdldChcInNpbXBsZUNvbG9yRnJhZ1wiKSA6IGZyYWdTaGFkZXI7XG5cdFZpZXcuY2FsbCh0aGlzLCBudWxsLCBmcyk7XG59O1xuXG52YXIgcCA9IFZpZXdEb3RQbGFuZXMucHJvdG90eXBlID0gbmV3IFZpZXcoKTtcblxucC5faW5pdCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgcG9zaXRpb25zID0gW107XG5cdHZhciBjb29yZHMgPSBbXTtcblx0dmFyIGluZGljZXMgPSBbXTtcblx0dmFyIGluZGV4ID0gMDtcblxuXG5cdHZhciBudW1Eb3RzID0gMTAwO1xuXHR2YXIgc2l6ZSA9IDMwMDA7XG5cdHZhciBnYXAgPSBzaXplIC8gbnVtRG90cztcblx0dmFyIGksIGo7XG5cblxuXHRmb3IoaT0tc2l6ZS8yOyBpPHNpemU7IGkrPWdhcCkge1xuXHRcdGZvcihqPS1zaXplLzI7IGo8c2l6ZTsgais9Z2FwKSB7XG5cdFx0XHRwb3NpdGlvbnMucHVzaChbaSwgaiwgMF0pO1xuXHRcdFx0Y29vcmRzLnB1c2goWzAsIDBdKTtcblx0XHRcdGluZGljZXMucHVzaChpbmRleCk7XG5cdFx0XHRpbmRleCsrO1xuXG5cdFx0XHRwb3NpdGlvbnMucHVzaChbaSwgMCwgal0pO1xuXHRcdFx0Y29vcmRzLnB1c2goWzAsIDBdKTtcblx0XHRcdGluZGljZXMucHVzaChpbmRleCk7XG5cdFx0XHRpbmRleCsrO1xuXHRcdH1cblx0fVxuXG5cdHRoaXMubWVzaCA9IG5ldyBNZXNoKHBvc2l0aW9ucy5sZW5ndGgsIGluZGljZXMubGVuZ3RoLCBHTC5nbC5ET1RTKTtcblx0dGhpcy5tZXNoLmJ1ZmZlclZlcnRleChwb3NpdGlvbnMpO1xuXHR0aGlzLm1lc2guYnVmZmVyVGV4Q29vcmRzKGNvb3Jkcyk7XG5cdHRoaXMubWVzaC5idWZmZXJJbmRpY2VzKGluZGljZXMpO1xufTtcblxucC5yZW5kZXIgPSBmdW5jdGlvbigpIHtcblx0dGhpcy5zaGFkZXIuYmluZCgpO1xuXHR0aGlzLnNoYWRlci51bmlmb3JtKFwiY29sb3JcIiwgXCJ1bmlmb3JtM2Z2XCIsIHRoaXMuY29sb3IpO1xuXHR0aGlzLnNoYWRlci51bmlmb3JtKFwib3BhY2l0eVwiLCBcInVuaWZvcm0xZlwiLCAxKTtcblx0R0wuZHJhdyh0aGlzLm1lc2gpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBWaWV3RG90UGxhbmVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBQYXNzID0gcmVxdWlyZShcIi4vUGFzc1wiKTtcblxudmFyIEVmZmVjdENvbXBvc2VyID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMuX3Bhc3NlcyA9IFtdO1xufTtcblxudmFyIHAgPSBFZmZlY3RDb21wb3Nlci5wcm90b3R5cGUgPSBuZXcgUGFzcygpO1xuXG5cbnAuYWRkUGFzcyA9IGZ1bmN0aW9uKHBhc3MpIHtcblx0dGhpcy5fcGFzc2VzLnB1c2gocGFzcyk7XG59O1xuXG5cbnAucmVuZGVyID0gZnVuY3Rpb24odGV4dHVyZSkge1xuXHR0aGlzLnRleHR1cmUgPSB0ZXh0dXJlO1xuXHRmb3IodmFyIGk9MDsgaTx0aGlzLl9wYXNzZXMubGVuZ3RoOyBpKyspIHtcblx0XHR0aGlzLnRleHR1cmUgPSB0aGlzLl9wYXNzZXNbaV0ucmVuZGVyKHRoaXMudGV4dHVyZSk7XG5cdH1cblxuXHRyZXR1cm4gdGhpcy50ZXh0dXJlO1xufTtcblxucC5nZXRUZXh0dXJlID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLnRleHR1cmU7XHRcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPUVmZmVjdENvbXBvc2VyOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgZ2wsR0wgPSByZXF1aXJlKFwiLi4vR0xUb29sc1wiKTtcbnZhciBWaWV3Q29weSA9IHJlcXVpcmUoXCIuLi9WaWV3Q29weVwiKTtcbnZhciBGcmFtZUJ1ZmZlciA9IHJlcXVpcmUoXCIuLi9GcmFtZUJ1ZmZlclwiKTtcblxudmFyIFBhc3MgPSBmdW5jdGlvbihtUGFyYW1zLCBtV2lkdGgsIG1IZWlnaHQsIG1GYm9QYXJhbXMpIHtcblx0bVdpZHRoID0gbVdpZHRoID09PSB1bmRlZmluZWQgPyA1MTIgOiBtV2lkdGg7XG5cdG1IZWlnaHQgPSBtSGVpZ2h0ID09PSB1bmRlZmluZWQgPyA1MTIgOiBtSGVpZ2h0O1xuXHRnbCA9IEdMLmdsO1xuXHRpZighbVBhcmFtcykge1x0cmV0dXJuO1x0fVxuXHRpZiggKHR5cGVvZiBtUGFyYW1zKSA9PT0gXCJzdHJpbmdcIikge1xuXHRcdHRoaXMudmlldyA9IG5ldyBWaWV3Q29weShudWxsLCBtUGFyYW1zKTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLnZpZXcgPSBtUGFyYW1zO1xuXHR9XG5cblx0dGhpcy53aWR0aCA9IG1XaWR0aDtcblx0dGhpcy5oZWlnaHQgPSBtSGVpZ2h0O1xuXHR0aGlzLl9mYm9QYXJhbXMgPSBtRmJvUGFyYW1zO1xuXG5cdHRoaXMuX2luaXQoKTtcbn07XG5cbnZhciBwID0gUGFzcy5wcm90b3R5cGU7XG5cblxucC5faW5pdCA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLl9mYm8gPSBuZXcgRnJhbWVCdWZmZXIodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHRoaXMuX2Zib1BhcmFtcyk7XG5cdHRoaXMuX2Ziby5iaW5kKCk7XG5cdEdMLnNldFZpZXdwb3J0KDAsIDAsIHRoaXMuX2Ziby53aWR0aCwgdGhpcy5fZmJvLmhlaWdodCk7XG5cdEdMLmNsZWFyKDAsIDAsIDAsIDApO1xuXHR0aGlzLl9mYm8udW5iaW5kKCk7XG5cdEdMLnNldFZpZXdwb3J0KDAsIDAsIEdMLmNhbnZhcy53aWR0aCwgR0wuY2FudmFzLmhlaWdodCk7XG5cbn07XG5cblxucC5yZW5kZXIgPSBmdW5jdGlvbih0ZXh0dXJlKSB7XG5cdHRoaXMuX2Ziby5iaW5kKCk7XG5cdEdMLnNldFZpZXdwb3J0KDAsIDAsIHRoaXMuX2Ziby53aWR0aCwgdGhpcy5fZmJvLmhlaWdodCk7XG5cdEdMLmNsZWFyKDAsIDAsIDAsIDApO1xuXHR0aGlzLnZpZXcucmVuZGVyKHRleHR1cmUpO1xuXHR0aGlzLl9mYm8udW5iaW5kKCk7XG5cdEdMLnNldFZpZXdwb3J0KDAsIDAsIEdMLmNhbnZhcy53aWR0aCwgR0wuY2FudmFzLmhlaWdodCk7XG5cblx0cmV0dXJuIHRoaXMuX2Ziby5nZXRUZXh0dXJlKCk7XG59O1xuXG5wLmdldFRleHR1cmUgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMuX2Ziby5nZXRUZXh0dXJlKCk7XG59O1xuXG5wLmdldEZibyA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5fZmJvO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQYXNzOyIsIi8vIFBhc3NHcmV5c2NhbGUuanNcblxuXCJ1c2Ugc3RyaWN0XCI7XG52YXIgUGFzcyA9IHJlcXVpcmUoXCIuL1Bhc3NcIik7XG5cblxudmFyIFBhc3NHcmV5c2NhbGUgPSBmdW5jdGlvbihtV2lkdGgsIG1IZWlnaHQsIG1GYm9QYXJhbXMpIHtcblx0UGFzcy5jYWxsKHRoaXMsIFwiI2RlZmluZSBHTFNMSUZZIDFcXG5cXG4vLyBncmV5c2NhbGUuZnJhZ1xcblxcbiNkZWZpbmUgU0hBREVSX05BTUUgRlJBR01FTlRfR1JFWVNDQUxFXFxuXFxucHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xcblxcbnZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1xcblxcbnVuaWZvcm0gc2FtcGxlcjJEIHRleHR1cmU7XFxuXFxudm9pZCBtYWluKHZvaWQpIHtcXG5cXHR2ZWM0IGNvbG9yID0gdGV4dHVyZTJEKHRleHR1cmUsIHZUZXh0dXJlQ29vcmQpO1xcblxcdGZsb2F0IGdyZXkgPSAoY29sb3IuciArIGNvbG9yLmcgKyBjb2xvci5iKSAvIDMuMDtcXG5cXHRnbF9GcmFnQ29sb3IgPSB2ZWM0KHZlYzMoZ3JleSksIGNvbG9yLmEpO1xcbn1cIiwgbVdpZHRoLCBtSGVpZ2h0LCBtRmJvUGFyYW1zKTtcbn07XG5cblBhc3NHcmV5c2NhbGUucHJvdG90eXBlID0gbmV3IFBhc3MoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBQYXNzR3JleXNjYWxlOyJdfQ==
;
    }
    det = 1.0 / det;
    
    out[0] =  a3 * det;
    out[1] = -a1 * det;
    out[2] = -a2 * det;
    out[3] =  a0 * det;

    return out;
};

/**
 * Calculates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.adjoint = function(out, a) {
    // Caching this value is nessecary if out == a
    var a0 = a[0];
    out[0] =  a[3];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] =  a0;

    return out;
};

/**
 * Calculates the determinant of a mat2
 *
 * @param {mat2} a the source matrix
 * @returns {Number} determinant of a
 */
mat2.determinant = function (a) {
    return a[0] * a[3] - a[2] * a[1];
};

/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
mat2.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    return out;
};

/**
 * Alias for {@link mat2.multiply}
 * @function
 */
mat2.mul = mat2.multiply;

/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
mat2.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a2 * s;
    out[1] = a1 *  c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    return out;
};

/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/
mat2.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    return out;
};

/**
 * Returns a string representation of a mat2
 *
 * @param {mat2} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2.str = function (a) {
    return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

/**
 * Returns Frobenius norm of a mat2
 *
 * @param {mat2} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat2.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2)))
};

/**
 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
 * @param {mat2} L the lower triangular matrix 
 * @param {mat2} D the diagonal matrix 
 * @param {mat2} U the upper triangular matrix 
 * @param {mat2} a the input matrix to factorize
 */

mat2.LDU = function (L, D, U, a) { 
    L[2] = a[2]/a[0]; 
    U[0] = a[0]; 
    U[1] = a[1]; 
    U[3] = a[3] - L[2] * U[1]; 
    return [L, D, U];       
}; 

if(typeof(exports) !== 'undefined') {
    exports.mat2 = mat2;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2x3 Matrix
 * @name mat2d
 * 
 * @description 
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, c, tx,
 *  b, d, ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, c, tx,
 *  b, d, ty,
 *  0, 0, 1]
 * </pre>
 * The last row is ignored so the array is shorter and operations are faster.
 */

var mat2d = {};

/**
 * Creates a new identity mat2d
 *
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.create = function() {
    var out = new GLMAT_ARRAY_TYPE(6);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Creates a new mat2d initialized with values from an existing matrix
 *
 * @param {mat2d} a matrix to clone
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(6);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Copy the values from one mat2d to another
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Set a mat2d to the identity matrix
 *
 * @param {mat2d} out the receiving matrix
 * @returns {mat2d} out
 */
mat2d.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Inverts a mat2d
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.invert = function(out, a) {
    var aa = a[0], ab = a[1], ac = a[2], ad = a[3],
        atx = a[4], aty = a[5];

    var det = aa * ad - ab * ac;
    if(!det){
        return null;
    }
    det = 1.0 / det;

    out[0] = ad * det;
    out[1] = -ab * det;
    out[2] = -ac * det;
    out[3] = aa * det;
    out[4] = (ac * aty - ad * atx) * det;
    out[5] = (ab * atx - aa * aty) * det;
    return out;
};

/**
 * Calculates the determinant of a mat2d
 *
 * @param {mat2d} a the source matrix
 * @returns {Number} determinant of a
 */
mat2d.determinant = function (a) {
    return a[0] * a[3] - a[1] * a[2];
};

/**
 * Multiplies two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
mat2d.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    out[4] = a0 * b4 + a2 * b5 + a4;
    out[5] = a1 * b4 + a3 * b5 + a5;
    return out;
};

/**
 * Alias for {@link mat2d.multiply}
 * @function
 */
mat2d.mul = mat2d.multiply;


/**
 * Rotates a mat2d by the given angle
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
mat2d.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a2 * s;
    out[1] = a1 *  c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    out[4] = a4;
    out[5] = a5;
    return out;
};

/**
 * Scales the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2d} out
 **/
mat2d.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    out[4] = a4;
    out[5] = a5;
    return out;
};

/**
 * Translates the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to translate the matrix by
 * @returns {mat2d} out
 **/
mat2d.translate = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        v0 = v[0], v1 = v[1];
    out[0] = a0;
    out[1] = a1;
    out[2] = a2;
    out[3] = a3;
    out[4] = a0 * v0 + a2 * v1 + a4;
    out[5] = a1 * v0 + a3 * v1 + a5;
    return out;
};

/**
 * Returns a string representation of a mat2d
 *
 * @param {mat2d} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2d.str = function (a) {
    return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ')';
};

/**
 * Returns Frobenius norm of a mat2d
 *
 * @param {mat2d} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat2d.frob = function (a) { 
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1))
}; 

if(typeof(exports) !== 'undefined') {
    exports.mat2d = mat2d;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 3x3 Matrix
 * @name mat3
 */

var mat3 = {};

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */
mat3.create = function() {
    var out = new GLMAT_ARRAY_TYPE(9);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
mat3.fromMat4 = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
};

/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */
mat3.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
mat3.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a12 = a[5];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a01;
        out[5] = a[7];
        out[6] = a02;
        out[7] = a12;
    } else {
        out[0] = a[0];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a[1];
        out[4] = a[4];
        out[5] = a[7];
        out[6] = a[2];
        out[7] = a[5];
        out[8] = a[8];
    }
    
    return out;
};

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b01 = a22 * a11 - a12 * a21,
        b11 = -a22 * a10 + a12 * a20,
        b21 = a21 * a10 - a11 * a20,

        // Calculate the determinant
        det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
};

/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    out[0] = (a11 * a22 - a12 * a21);
    out[1] = (a02 * a21 - a01 * a22);
    out[2] = (a01 * a12 - a02 * a11);
    out[3] = (a12 * a20 - a10 * a22);
    out[4] = (a00 * a22 - a02 * a20);
    out[5] = (a02 * a10 - a00 * a12);
    out[6] = (a10 * a21 - a11 * a20);
    out[7] = (a01 * a20 - a00 * a21);
    out[8] = (a00 * a11 - a01 * a10);
    return out;
};

/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
mat3.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
};

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b00 = b[0], b01 = b[1], b02 = b[2],
        b10 = b[3], b11 = b[4], b12 = b[5],
        b20 = b[6], b21 = b[7], b22 = b[8];

    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
};

/**
 * Alias for {@link mat3.multiply}
 * @function
 */
mat3.mul = mat3.multiply;

/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */
mat3.translate = function(out, a, v) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],
        x = v[0], y = v[1];

    out[0] = a00;
    out[1] = a01;
    out[2] = a02;

    out[3] = a10;
    out[4] = a11;
    out[5] = a12;

    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
};

/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
mat3.rotate = function (out, a, rad) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        s = Math.sin(rad),
        c = Math.cos(rad);

    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;

    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;

    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
};

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
mat3.scale = function(out, a, v) {
    var x = v[0], y = v[1];

    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];

    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];

    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {mat3} out
 **/
mat3.fromMat2d = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = 0;

    out[3] = a[2];
    out[4] = a[3];
    out[5] = 0;

    out[6] = a[4];
    out[7] = a[5];
    out[8] = 1;
    return out;
};

/**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/
mat3.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[3] = yx - wz;
    out[6] = zx + wy;

    out[1] = yx + wz;
    out[4] = 1 - xx - zz;
    out[7] = zy - wx;

    out[2] = zx - wy;
    out[5] = zy + wx;
    out[8] = 1 - xx - yy;

    return out;
};

/**
* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
*
* @param {mat3} out mat3 receiving operation result
* @param {mat4} a Mat4 to derive the normal matrix from
*
* @returns {mat3} out
*/
mat3.normalFromMat4 = function (out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

    return out;
};

/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat3.str = function (a) {
    return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + 
                    a[6] + ', ' + a[7] + ', ' + a[8] + ')';
};

/**
 * Returns Frobenius norm of a mat3
 *
 * @param {mat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat3.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2)))
};


if(typeof(exports) !== 'undefined') {
    exports.mat3 = mat3;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 4x4 Matrix
 * @name mat4
 */

var mat4 = {};

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
mat4.create = function() {
    var out = new GLMAT_ARRAY_TYPE(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
mat4.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
mat4.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3],
            a12 = a[6], a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }
    
    return out;
};

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};

/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
    return out;
};

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
mat4.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};

/**
 * Multiplies two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];  
    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    return out;
};

/**
 * Alias for {@link mat4.multiply}
 * @function
 */
mat4.mul = mat4.multiply;

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.translate = function (out, a, v) {
    var x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};

/**
 * Scales the mat4 by the dimensions in the given vec3
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4.scale = function(out, a, v) {
    var x = v[0], y = v[1], z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Rotates a mat4 by the given angle
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.rotate = function (out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (Math.abs(len) < GLMAT_EPSILON) { return null; }
    
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateX = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[0]  = a[0];
        out[1]  = a[1];
        out[2]  = a[2];
        out[3]  = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateY = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateZ = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslation = function (out, q, v) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    
    return out;
};

mat4.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.frustum = function (out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);
    out[0] = (near * 2) * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = (near * 2) * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (far * near * 2) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspective = function (out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (2 * far * near) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.ortho = function (out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
mat4.lookAt = function (out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < GLMAT_EPSILON &&
        Math.abs(eyey - centery) < GLMAT_EPSILON &&
        Math.abs(eyez - centerz) < GLMAT_EPSILON) {
        return mat4.identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat4.str = function (a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + 
                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};

/**
 * Returns Frobenius norm of a mat4
 *
 * @param {mat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat4.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2) ))
};


if(typeof(exports) !== 'undefined') {
    exports.mat4 = mat4;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class Quaternion
 * @name quat
 */

var quat = {};

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */
quat.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {vec3} a the initial vector
 * @param {vec3} b the destination vector
 * @returns {quat} out
 */
quat.rotationTo = (function() {
    var tmpvec3 = vec3.create();
    var xUnitVec3 = vec3.fromValues(1,0,0);
    var yUnitVec3 = vec3.fromValues(0,1,0);

    return function(out, a, b) {
        var dot = vec3.dot(a, b);
        if (dot < -0.999999) {
            vec3.cross(tmpvec3, xUnitVec3, a);
            if (vec3.length(tmpvec3) < 0.000001)
                vec3.cross(tmpvec3, yUnitVec3, a);
            vec3.normalize(tmpvec3, tmpvec3);
            quat.setAxisAngle(out, tmpvec3, Math.PI);
            return out;
        } else if (dot > 0.999999) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        } else {
            vec3.cross(tmpvec3, a, b);
            out[0] = tmpvec3[0];
            out[1] = tmpvec3[1];
            out[2] = tmpvec3[2];
            out[3] = 1 + dot;
            return quat.normalize(out, out);
        }
    };
})();

/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {vec3} view  the vector representing the viewing direction
 * @param {vec3} right the vector representing the local "right" direction
 * @param {vec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */
quat.setAxes = (function() {
    var matr = mat3.create();

    return function(out, view, right, up) {
        matr[0] = right[0];
        matr[3] = right[1];
        matr[6] = right[2];

        matr[1] = up[0];
        matr[4] = up[1];
        matr[7] = up[2];

        matr[2] = -view[0];
        matr[5] = -view[1];
        matr[8] = -view[2];

        return quat.normalize(out, quat.fromMat3(out, matr));
    };
})();

/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */
quat.clone = vec4.clone;

/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */
quat.fromValues = vec4.fromValues;

/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */
quat.copy = vec4.copy;

/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */
quat.set = vec4.set;

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
quat.identity = function(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
quat.setAxisAngle = function(out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
};

/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */
quat.add = vec4.add;

/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */
quat.multiply = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
};

/**
 * Alias for {@link quat.multiply}
 * @function
 */
quat.mul = quat.multiply;

/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */
quat.scale = vec4.scale;

/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateX = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateY = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        by = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateZ = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bz = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
};

/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate W component of
 * @returns {quat} out
 */
quat.calculateW = function (out, a) {
    var x = a[0], y = a[1], z = a[2];

    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = -Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
    return out;
};

/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
quat.dot = vec4.dot;

/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 * @function
 */
quat.lerp = vec4.lerp;

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */
quat.slerp = function (out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    var        omega, cosom, sinom, scale0, scale1;

    // calc cosine
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    // adjust signs (if necessary)
    if ( cosom < 0.0 ) {
        cosom = -cosom;
        bx = - bx;
        by = - by;
        bz = - bz;
        bw = - bw;
    }
    // calculate coefficients
    if ( (1.0 - cosom) > 0.000001 ) {
        // standard case (slerp)
        omega  = Math.acos(cosom);
        sinom  = Math.sin(omega);
        scale0 = Math.sin((1.0 - t) * omega) / sinom;
        scale1 = Math.sin(t * omega) / sinom;
    } else {        
        // "from" and "to" quaternions are very close 
        //  ... so we can do a linear interpolation
        scale0 = 1.0 - t;
        scale1 = t;
    }
    // calculate final values
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;
    
    return out;
};

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */
quat.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        dot = a0*a0 + a1*a1 + a2*a2 + a3*a3,
        invDot = dot ? 1.0/dot : 0;
    
    // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

    out[0] = -a0*invDot;
    out[1] = -a1*invDot;
    out[2] = -a2*invDot;
    out[3] = a3*invDot;
    return out;
};

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */
quat.conjugate = function (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
};

/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 * @function
 */
quat.length = vec4.length;

/**
 * Alias for {@link quat.length}
 * @function
 */
quat.len = quat.length;

/**
 * Calculates the squared length of a quat
 *
 * @param {quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
quat.squaredLength = vec4.squaredLength;

/**
 * Alias for {@link quat.squaredLength}
 * @function
 */
quat.sqrLen = quat.squaredLength;

/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
quat.normalize = vec4.normalize;

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
quat.fromMat3 = function(out, m) {
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    var fTrace = m[0] + m[4] + m[8];
    var fRoot;

    if ( fTrace > 0.0 ) {
        // |w| > 1/2, may as well choose w > 1/2
        fRoot = Math.sqrt(fTrace + 1.0);  // 2w
        out[3] = 0.5 * fRoot;
        fRoot = 0.5/fRoot;  // 1/(4w)
        out[0] = (m[7]-m[5])*fRoot;
        out[1] = (m[2]-m[6])*fRoot;
        out[2] = (m[3]-m[1])*fRoot;
    } else {
        // |w| <= 1/2
        var i = 0;
        if ( m[4] > m[0] )
          i = 1;
        if ( m[8] > m[i*3+i] )
          i = 2;
        var j = (i+1)%3;
        var k = (i+2)%3;
        
        fRoot = Math.sqrt(m[i*3+i]-m[j*3+j]-m[k*3+k] + 1.0);
        out[i] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot;
        out[3] = (m[k*3+j] - m[j*3+k]) * fRoot;
        out[j] = (m[j*3+i] + m[i*3+j]) * fRoot;
        out[k] = (m[k*3+i] + m[i*3+k]) * fRoot;
    }
    
    return out;
};

/**
 * Returns a string representation of a quatenion
 *
 * @param {quat} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
quat.str = function (a) {
    return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.quat = quat;
}
;













  })(shim.exports);
})(this);

},{}],3:[function(_dereq_,module,exports){
"use strict";

var GLTools = _dereq_("./bongiovi/GLTools");

var bongiovi = {
	GL:GLTools,
	GLTools:GLTools,
	Scheduler:_dereq_("./bongiovi/Scheduler"),
	SimpleImageLoader:_dereq_("./bongiovi/SimpleImageLoader"),
	EaseNumber:_dereq_("./bongiovi/EaseNumber"),
	QuatRotation:_dereq_("./bongiovi/QuatRotation"),
	Scene:_dereq_("./bongiovi/Scene"),
	Camera:_dereq_("./bongiovi/Camera"),
	SimpleCamera:_dereq_("./bongiovi/SimpleCamera"),
	CameraOrtho:_dereq_("./bongiovi/CameraOrtho"),
	CameraPerspective:_dereq_("./bongiovi/CameraPerspective"),
	Mesh:_dereq_("./bongiovi/Mesh"),
	Face:_dereq_("./bongiovi/Face"),
	GLShader:_dereq_("./bongiovi/GLShader"),
	GLTexture:_dereq_("./bongiovi/GLTexture"),
	GLCubeTexture:_dereq_("./bongiovi/GLCubeTexture"),
	ShaderLibs:_dereq_("./bongiovi/ShaderLibs"),
	View:_dereq_("./bongiovi/View"),
	ViewCopy:_dereq_("./bongiovi/ViewCopy"),
	ViewAxis:_dereq_("./bongiovi/ViewAxis"),
	ViewDotPlane:_dereq_("./bongiovi/ViewDotPlanes"),
	MeshUtils:_dereq_("./bongiovi/MeshUtils"),
	FrameBuffer:_dereq_("./bongiovi/FrameBuffer"),
	EventDispatcher:_dereq_("./bongiovi/EventDispatcher"),
	ObjLoader:_dereq_("./bongiovi/ObjLoader"),
	glm:_dereq_("gl-matrix")
};

module.exports = bongiovi;
},{"./bongiovi/Camera":4,"./bongiovi/CameraOrtho":5,"./bongiovi/CameraPerspective":6,"./bongiovi/EaseNumber":7,"./bongiovi/EventDispatcher":8,"./bongiovi/Face":9,"./bongiovi/FrameBuffer":10,"./bongiovi/GLCubeTexture":11,"./bongiovi/GLShader":12,"./bongiovi/GLTexture":13,"./bongiovi/GLTools":14,"./bongiovi/Mesh":15,"./bongiovi/MeshUtils":16,"./bongiovi/ObjLoader":17,"./bongiovi/QuatRotation":18,"./bongiovi/Scene":19,"./bongiovi/Scheduler":20,"./bongiovi/ShaderLibs":21,"./bongiovi/SimpleCamera":22,"./bongiovi/SimpleImageLoader":23,"./bongiovi/View":24,"./bongiovi/ViewAxis":25,"./bongiovi/ViewCopy":26,"./bongiovi/ViewDotPlanes":27,"gl-matrix":2}],4:[function(_dereq_,module,exports){
"use strict";

var glm = _dereq_("gl-matrix");

var Camera = function() {
	this.matrix = glm.mat4.create();
	glm.mat4.identity(this.matrix);

	this.position = glm.vec3.create();
};

var p = Camera.prototype;

p.lookAt = function(aEye, aCenter, aUp) {
	glm.vec3.copy(this.position, aEye);
	glm.mat4.identity(this.matrix);
	glm.mat4.lookAt(this.matrix, aEye, aCenter, aUp);
};

p.getMatrix = function() {
	return this.matrix;
};

module.exports = Camera;
},{"gl-matrix":2}],5:[function(_dereq_,module,exports){
// CameraOrtho.js

"use strict";

var Camera = _dereq_("./Camera");
var glm = _dereq_("gl-matrix");


var CameraOrtho = function() {
	Camera.call(this);

	var eye            = glm.vec3.clone([0, 0, 500]  );
	var center         = glm.vec3.create( );
	var up             = glm.vec3.clone( [0,-1,0] );
	this.lookAt(eye, center, up);

	this.projection = glm.mat4.create();
};

var p = CameraOrtho.prototype = new Camera();


p.setBoundary = function(left, right, top, bottom) {
	this.left = left;
	this.right = right;
	this.top = top;
	this.bottom = bottom;
	glm.mat4.ortho(this.projection, left, right, top, bottom, 0, 10000);
};


p.ortho = p.setBoundary;

p.getMatrix = function() {
	return this.matrix;
};


p.resize = function() {
	glm.mat4.ortho(this.projection, this.left, this.right, this.top, this.bottom, 0, 10000);
};


module.exports = CameraOrtho;
},{"./Camera":4,"gl-matrix":2}],6:[function(_dereq_,module,exports){
// CameraPerspective.js
"use strict";

var Camera = _dereq_("./Camera");
var glm = _dereq_("gl-matrix");

var CameraPerspective = function() {
	Camera.call(this);

	this.projection = glm.mat4.create();
	this.mtxFinal = glm.mat4.create();
};

var p = CameraPerspective.prototype = new Camera();

p.setPerspective = function(aFov, aAspectRatio, aNear, aFar) {
	this._fov = aFov;
	this._near = aNear;
	this._far = aFar;
	this._aspect = aAspectRatio;
	glm.mat4.perspective(this.projection, aFov, aAspectRatio, aNear, aFar);
};

p.getMatrix = function() {
	// mat4.multiply(this.mtxFinal, this.projection, this.matrix);
	return this.matrix;
};

p.resize = function(aAspectRatio) {
	this._aspect = aAspectRatio;
	glm.mat4.perspective(this.projection, this._fov, aAspectRatio, this._near, this._far);
};

p.__defineGetter__("near", function() {
	return this._near;
});

p.__defineGetter__("far", function() {
	return this._far;
});

module.exports = CameraPerspective;
},{"./Camera":4,"gl-matrix":2}],7:[function(_dereq_,module,exports){
// EaseNumber.js

"use strict";

var Scheduler = _dereq_("./Scheduler");

function EaseNumber(mValue, mEasing) {
	this._easing = mEasing || 0.1;
	this._value = mValue;
	this._targetValue = mValue;

	Scheduler.addEF(this, this._update);
}

var p = EaseNumber.prototype;


p._update = function() {
	this._checkLimit();
	this._value += (this._targetValue - this._value) * this._easing;	
};


p.setTo = function(mValue) {
	this._targetValue = this._value = mValue;
};


p.add = function(mAdd) {
	this._targetValue += mAdd;
};

p.limit = function(mMin, mMax) {
	this._min = mMin;
	this._max = mMax;

	this._checkLimit();
};

p.setEasing = function(mValue) {
	this._easing = mValue;
};

p._checkLimit = function() {
	if(this._min !== undefined && this._targetValue < this._min) {
		this._targetValue = this._min;
	} 

	if(this._max !== undefined && this._targetValue > this._max) {
		this._targetValue = this._max;
	} 
};


p.__defineGetter__("value", function() {
	return this._value;
});


p.__defineGetter__("targetValue", function() {
	return this._targetValue;
});


p.__defineSetter__("value", function(mValue) {
	this._targetValue = mValue;
});


module.exports = EaseNumber;
},{"./Scheduler":20}],8:[function(_dereq_,module,exports){
// EventDispatcher.js

"use strict";

var supportsCustomEvents = true;
try {
	var newTestCustomEvent = document.createEvent("CustomEvent");
	newTestCustomEvent = null;
} catch(e){
	supportsCustomEvents = false;
}

function EventDispatcher() {
	this._eventListeners = null;
}


var p = EventDispatcher.prototype;


p.addEventListener = function(aEventType, aFunction) {

	if(this._eventListeners === null) {
		this._eventListeners = {};
	}
	if(!this._eventListeners[aEventType]){
		this._eventListeners[aEventType] = [];
	}
	this._eventListeners[aEventType].push(aFunction);
	
	return this;
};

p.removeEventListener = function(aEventType, aFunction) {
	if(this._eventListeners === null) {
		this._eventListeners = {};
	}
	var currentArray = this._eventListeners[aEventType];
	
	if (typeof(currentArray) === "undefined") {
		// console.warn("EventDispatcher :: removeEventListener :: Tried to remove an event handler (for " + aEventType +") that doesn't exist");
		return this;
	}
	
	var currentArrayLength = currentArray.length;
	for(var i = 0; i < currentArrayLength; i++){
		if(currentArray[i] === aFunction){
			currentArray.splice(i, 1);
			i--;
			currentArrayLength--;
		}
	}
	return this;
};

p.dispatchEvent = function(aEvent) {
	if(this._eventListeners === null) {
		this._eventListeners = {};
	}
	var eventType = aEvent.type;
	
	try {
		if(aEvent.target === null) {
			aEvent.target = this;
		}
		aEvent.currentTarget = this;
	}
	catch(theError) {
		var newEvent = {"type" : eventType, "detail" : aEvent.detail, "dispatcher" : this };
		return this.dispatchEvent(newEvent);
	}
	
	var currentEventListeners = this._eventListeners[eventType];
	if(currentEventListeners !== null && currentEventListeners !== undefined) {
		var currentArray = this._copyArray(currentEventListeners);
		var currentArrayLength = currentArray.length;
		for(var i = 0; i < currentArrayLength; i++){
			var currentFunction = currentArray[i];
			currentFunction.call(this, aEvent);
		}
	}
	return this;
};

p.dispatchCustomEvent = function(aEventType, aDetail) {
	var newEvent;
	if (supportsCustomEvents){
		newEvent = document.createEvent("CustomEvent");
		newEvent.dispatcher = this;
		newEvent.initCustomEvent(aEventType, false, false, aDetail);
	}
	else {
		newEvent = {"type" : aEventType, "detail" : aDetail, "dispatcher" : this };
	}
	return this.dispatchEvent(newEvent);
};

p._destroy = function() {
	if(this._eventListeners !== null) {
		for(var objectName in this._eventListeners) {
			if(this._eventListeners.hasOwnProperty(objectName)) {
				var currentArray = this._eventListeners[objectName];
				var currentArrayLength = currentArray.length;
				for(var i = 0; i < currentArrayLength; i++) {
					currentArray[i] = null;
				}
				delete this._eventListeners[objectName];	
			}
		}
		this._eventListeners = null;
	}
};

p._copyArray = function(aArray) {
	var currentArray = new Array(aArray.length);
	var currentArrayLength = currentArray.length;
	for(var i = 0; i < currentArrayLength; i++) {
		currentArray[i] = aArray[i];
	}
	return currentArray;
};

module.exports = EventDispatcher;
},{}],9:[function(_dereq_,module,exports){
"use strict";

var glm = _dereq_("gl-matrix");

var Face = function(mA, mB, mC) {
	this._vertexA = mA;
	this._vertexB = mB;
	this._vertexC = mC;

	this._init();
};

var p = Face.prototype;


p._init = function() {
	var BA = glm.vec3.create();
	var CA = glm.vec3.create();
	glm.vec3.sub(BA, this._vertexB, this._vertexA);
	glm.vec3.sub(CA, this._vertexC, this._vertexA);

	this._faceNormal = glm.vec3.create();
	glm.vec3.cross(this._faceNormal, BA, CA);
	glm.vec3.normalize(this._faceNormal, this._faceNormal);
};


p.contains = function(mVertex) {
	return ( equal(mVertex, this._vertexA) || equal(mVertex, this._vertexB) || equal(mVertex, this._vertexC) );
};


p.__defineGetter__("faceNormal", function() {
	return this._faceNormal;
});

var equal = function(mV0, mV1) {
	return ( (mV0[0] === mV1[0]) && (mV0[1] === mV1[1]) && (mV0[2] === mV1[2]) );
};

module.exports = Face;
},{"gl-matrix":2}],10:[function(_dereq_,module,exports){
"use strict";

var gl, GL = _dereq_("./GLTools");
var GLTexture = _dereq_("./GLTexture");
var isPowerOfTwo = function(x) {	
	return (x !== 0) && !(x & (x - 1));	
};

var FrameBuffer = function(width, height, options) {
	gl = GL.gl;
	options        = options || {};
	this.width     = width;
	this.height    = height;
	this.magFilter = options.magFilter || gl.LINEAR;
	this.minFilter = options.minFilter || gl.LINEAR;
	this.wrapS     = options.wrapS || gl.MIRRORED_REPEAT;
	this.wrapT     = options.wrapT || gl.MIRRORED_REPEAT;

	if(!isPowerOfTwo(width) || !isPowerOfTwo(height)) {
		this.wrapS = this.wrapT = gl.CLAMP_TO_EDGE;

		if(this.minFilter === gl.LINEAR_MIPMAP_NEAREST) {
			this.minFilter = gl.LINEAR;
		}
	} 

	this._init();
};

var p = FrameBuffer.prototype;

p._init = function() {
	this.texture            = gl.createTexture();
	
	this.glTexture			= new GLTexture(this.texture, true);
	
	this.frameBuffer        = gl.createFramebuffer();		
	gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
	this.frameBuffer.width  = this.width;
	this.frameBuffer.height = this.height;

	gl.bindTexture(gl.TEXTURE_2D, this.texture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.magFilter);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.minFilter);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);


	// gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.frameBuffer.width, this.frameBuffer.height, 0, gl.RGBA, gl.FLOAT, null);
	if(GL.depthTextureExt) {
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.frameBuffer.width, this.frameBuffer.height, 0, gl.RGBA, gl.FLOAT, null);
	} else {
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.frameBuffer.width, this.frameBuffer.height, 0, gl.RGBA, gl.FLOAT, null);
	}
	
	// gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.frameBuffer.width, this.frameBuffer.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

	// if(this.magFilter == gl.NEAREST && this.minFilter == gl.NEAREST) {
	// 	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.frameBuffer.width, this.frameBuffer.height, 0, gl.RGBA, gl.FLOAT, null);
	// 	console.debug("Both Nearest", this.floatTextureExt);
	// } else {
	// 	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.frameBuffer.width, this.frameBuffer.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	// }

	if(this.minFilter === gl.LINEAR_MIPMAP_NEAREST)	{
		gl.generateMipmap(gl.TEXTURE_2D);
	}

	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
	if(GL.depthTextureExt === null) {
		var renderbuffer = gl.createRenderbuffer();
		gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
		gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.frameBuffer.width, this.frameBuffer.height);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
    	gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);
		// gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);	
		// if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) != gl.FRAMEBUFFER_COMPLETE) {
	 //      throw new Error('Rendering to this texture is not supported (incomplete framebuffer)');
	 //    }

	 	// gl.renderbufferStorage( gl.RENDERBUFFER, gl.RGBA4, this.frameBuffer.width, this.frameBuffer.height );
	} else {
		this.depthTexture       = gl.createTexture();
		this.glDepthTexture		= new GLTexture(this.depthTexture, true);

		gl.bindTexture(gl.TEXTURE_2D, this.depthTexture);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, this.width, this.height, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);

		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthTexture, 0);
	}

	gl.bindTexture(gl.TEXTURE_2D, null);
	gl.bindRenderbuffer(gl.RENDERBUFFER, null);
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
};


p.bind = function() {
	gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
};


p.unbind = function() {
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	
};


p.getTexture = function() {
	return this.glTexture;
};


p.getDepthTexture = function() {
	return this.glDepthTexture;
};


p.destroy = function() {
	gl.deleteFramebuffer(this.frameBuffer);

	this.glTexture.destroy();
	if(this.glDepthTexture) {
		this.glDepthTexture.destroy();
	}
};

module.exports = FrameBuffer;
},{"./GLTexture":13,"./GLTools":14}],11:[function(_dereq_,module,exports){
"use strict";

var gl;
var GL = _dereq_("./GLTools");

var GLCubeTexture = function(sources, options) {
	// [posx, negx, posy, negy, posz, negz]
	options = options || {};
	gl = GL.gl;
	this.texture = gl.createTexture();
	
	this.magFilter = options.magFilter || gl.LINEAR;
	this.minFilter = options.minFilter || gl.LINEAR_MIPMAP_NEAREST;
	this.wrapS     = options.wrapS || gl.CLAMP_TO_EDGE;
	this.wrapT     = options.wrapT || gl.CLAMP_TO_EDGE;

	gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);
	var targets = [
		gl.TEXTURE_CUBE_MAP_POSITIVE_X, gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 
		gl.TEXTURE_CUBE_MAP_POSITIVE_Y, gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 
		gl.TEXTURE_CUBE_MAP_POSITIVE_Z, gl.TEXTURE_CUBE_MAP_NEGATIVE_Z 
	];

	for (var j = 0; j < 6; j++) {
	    gl.texImage2D(targets[j], 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sources[j]);
	    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, this.wrapS);
	    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, this.wrapT);
	}
	gl.generateMipmap(gl.TEXTURE_CUBE_MAP);

	gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
};

var p = GLCubeTexture.prototype;


p.bind = function(index) {
	if(index === undefined) {index = 0;}
	if(!GL.shader) {return;}

	gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);
	gl.uniform1i(GL.shader.uniformTextures[index], index);
	this._bindIndex = index;
};


p.unbind = function() {
	gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);	
};

p.destroy = function() {
	gl.deleteTexture(this.texture);
};

module.exports = GLCubeTexture;
},{"./GLTools":14}],12:[function(_dereq_,module,exports){
"use strict";

var GL = _dereq_("./GLTools");
var gl;
var ShaderLibs = _dereq_("./ShaderLibs");

var addLineNumbers = function ( string ) {
	var lines = string.split( '\n' );
	for ( var i = 0; i < lines.length; i ++ ) {
		lines[ i ] = ( i + 1 ) + ': ' + lines[ i ];
	}
	return lines.join( '\n' );
};

var GLShader = function(aVertexShaderId, aFragmentShaderId) {
	gl              	 = GL.gl;
	this.idVertex        = aVertexShaderId;
	this.idFragment      = aFragmentShaderId;
	this.parameters      = [];
	this.uniformValues   = {};
	
	this.uniformTextures = [];
	
	this.vertexShader    = undefined;
	this.fragmentShader  = undefined;
	this._isReady        = false;
	this._loadedCount    = 0;

	if(aVertexShaderId === undefined || aVertexShaderId === null ) {
		this.createVertexShaderProgram(ShaderLibs.getShader("copyVert"));
	}

	if(aFragmentShaderId === undefined || aVertexShaderId === null ) {
		this.createFragmentShaderProgram(ShaderLibs.getShader("copyFrag"));
	}

	this.init();
};


var p = GLShader.prototype;

p.init = function() {
	if(this.idVertex && this.idVertex.indexOf("main(void)") > -1) {
		this.createVertexShaderProgram(this.idVertex);
	} else {
		this.getShader(this.idVertex, true);	
	}
	
	if(this.idFragment && this.idFragment.indexOf("main(void)") > -1) {
		this.createFragmentShaderProgram(this.idFragment);
	} else {
		this.getShader(this.idFragment, false);	
	}
};

p.getShader = function(aId, aIsVertexShader) {
	if(!aId) {return;}
	var req = new XMLHttpRequest();
	req.hasCompleted = false;
	var that = this;
	req.onreadystatechange = function(e) {
		if(e.target.readyState === 4) {
			if(aIsVertexShader) {
				that.createVertexShaderProgram(e.target.responseText);
			} else {
				that.createFragmentShaderProgram(e.target.responseText);
			}
		}
	};
	req.open("GET", aId, true);
	req.send(null);
};

p.createVertexShaderProgram = function(aStr) {
	if(!gl) {	return;	}
	var shader = gl.createShader(gl.VERTEX_SHADER);

	gl.shaderSource(shader, aStr);
	gl.compileShader(shader);

	if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.warn("Error in Vertex Shader : ", this.idVertex, ":", gl.getShaderInfoLog(shader));
		console.log(addLineNumbers(aStr));
		return null;
	}

	this.vertexShader = shader;
	
	if(this.vertexShader !== undefined && this.fragmentShader !== undefined) {
		this.attachShaderProgram();
	}

	this._loadedCount++;
};


p.createFragmentShaderProgram = function(aStr) {
	if(!gl) {	return;	}
	var shader = gl.createShader(gl.FRAGMENT_SHADER);

	gl.shaderSource(shader, aStr);
	gl.compileShader(shader);

	if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.warn("Error in Fragment Shader: ", this.idFragment, ":" , gl.getShaderInfoLog(shader));
		console.log(addLineNumbers(aStr));
		return null;
	}

	this.fragmentShader = shader;

	if(this.vertexShader !== undefined && this.fragmentShader !== undefined) {
		this.attachShaderProgram();
	}

	this._loadedCount++;
};

p.attachShaderProgram = function() {
	this._isReady = true;
	this.shaderProgram = gl.createProgram();
	gl.attachShader(this.shaderProgram, this.vertexShader);
	gl.attachShader(this.shaderProgram, this.fragmentShader);
	gl.linkProgram(this.shaderProgram);
};

p.bind = function() {
	if(!this._isReady) {return;}
	gl.useProgram(this.shaderProgram);

	if(this.shaderProgram.pMatrixUniform === undefined) {	this.shaderProgram.pMatrixUniform = gl.getUniformLocation(this.shaderProgram, "uPMatrix");}
	if(this.shaderProgram.mvMatrixUniform === undefined) {	this.shaderProgram.mvMatrixUniform = gl.getUniformLocation(this.shaderProgram, "uMVMatrix");}
	if(this.shaderProgram.normalMatrixUniform === undefined) {	this.shaderProgram.normalMatrixUniform = gl.getUniformLocation(this.shaderProgram, "normalMatrix");}
	if(this.shaderProgram.invertMVMatrixUniform === undefined) {	this.shaderProgram.invertMVMatrixUniform = gl.getUniformLocation(this.shaderProgram, "invertMVMatrix");}

	GL.setShader(this);
	GL.setShaderProgram(this.shaderProgram);

	this.uniformTextures = [];
};

p.isReady = function() {	return this._isReady;	};


p.clearUniforms = function() {
	this.parameters    = [];
	this.uniformValues = {};
};

p.uniform = function(aName, aType, aValue) {
	if(!this._isReady) {return;}

	if(aType === "texture") {aType = "uniform1i";}

	var hasUniform = false;
	var oUniform;
	for(var i=0; i<this.parameters.length; i++) {
		oUniform = this.parameters[i];
		if(oUniform.name === aName) {
			oUniform.value = aValue;
			hasUniform = true;
			break;
		}
	}

	if(!hasUniform) {
		this.shaderProgram[aName] = gl.getUniformLocation(this.shaderProgram, aName);
		this.parameters.push({name : aName, type: aType, value: aValue, uniformLoc: this.shaderProgram[aName]});
	} else {
		this.shaderProgram[aName] = oUniform.uniformLoc;
	}


	if(aType.indexOf("Matrix") === -1) {
		if(!hasUniform) {
			var isArray = Array.isArray(aValue);
			if(isArray) {
				this.uniformValues[aName] = aValue.concat();
			} else {
				this.uniformValues[aName] = aValue;	
			}
			gl[aType](this.shaderProgram[aName], aValue);
		} else {
			// if(aName == 'position') console.log('Has uniform', this.checkUniform(aName, aType, aValue));
			if(this.checkUniform(aName, aType, aValue)) {
				gl[aType](this.shaderProgram[aName], aValue);
				// console.debug('Set uniform', aName, aType, aValue);
			}
		}
	} else {
		gl[aType](this.shaderProgram[aName], false, aValue);
		if(!hasUniform) {
			gl[aType](this.shaderProgram[aName], false, aValue);
			this.uniformValues[aName] = aValue;
			// console.debug('Set uniform', aName, aType, aValue);
		}
	}

	if(aType === "uniform1i") {
		// Texture
		this.uniformTextures[aValue] = this.shaderProgram[aName];
	}
};

p.checkUniform = function(aName, aType, aValue) {
	var isArray = Array.isArray(aValue);

	if(!this.uniformValues[aName]) {
		this.uniformValues[aName] = aValue;
		return true;
	}

	if(aType === "uniform1i") {
		this.uniformValues[aName] = aValue;
		return true;
	}

	var uniformValue = this.uniformValues[aName];
	var hasChanged = false;

	if(isArray) {
		for(var i=0; i<uniformValue.length; i++) {
			if(uniformValue[i] !== aValue[i]) {
				hasChanged = true;
				break;
			}
		}	
	} else {
		hasChanged = uniformValue !== aValue;
	}
	
	
	if(hasChanged) {
		if(isArray) {
			this.uniformValues[aName] = aValue.concat();
		} else {
			this.uniformValues[aName] = aValue;	
		}
		
	}

	return hasChanged;
};


p.unbind = function() {

};


p.destroy = function() {
	gl.detachShader(this.shaderProgram, this.vertexShader);
	gl.detachShader(this.shaderProgram, this.fragmentShader);
	gl.deleteShader(this.vertexShader);
	gl.deleteShader(this.fragmentShader);
	gl.deleteProgram(this.shaderProgram);
};

module.exports = GLShader;
},{"./GLTools":14,"./ShaderLibs":21}],13:[function(_dereq_,module,exports){
// GLTexture.js
"use strict";

var gl;
var GL = _dereq_("./GLTools");
var _isPowerOfTwo = function(x) {	
	var check = (x !== 0) && (!(x & (x - 1)));
	return check;
};
var isPowerOfTwo = function(obj) {	
	var w = obj.width || obj.videoWidth;
	var h = obj.height || obj.videoHeight;

	if(!w || !h) {return false;}

	return _isPowerOfTwo(w) && _isPowerOfTwo(h);
};

var GLTexture = function(source, isTexture, options) {
	isTexture = isTexture || false;
	options = options || {};
	gl = GL.gl;
	if(isTexture) {
		this.texture = source;
	} else {
		this._source   = source;
		this.texture   = gl.createTexture();
		this._isVideo  = (source.tagName === "VIDEO");
		this.magFilter = options.magFilter || gl.LINEAR;
		this.minFilter = options.minFilter || gl.LINEAR_MIPMAP_NEAREST;
		
		this.wrapS     = options.wrapS || gl.MIRRORED_REPEAT;
		this.wrapT     = options.wrapT || gl.MIRRORED_REPEAT;
		var width      = source.width || source.videoWidth;

		if(width) {
			if(!isPowerOfTwo(source)) {
				this.wrapS = this.wrapT = gl.CLAMP_TO_EDGE;
				if(this.minFilter === gl.LINEAR_MIPMAP_NEAREST) {
					this.minFilter = gl.LINEAR;
				}
			} 	
		} else {
			this.wrapS = this.wrapT = gl.CLAMP_TO_EDGE;
			if(this.minFilter === gl.LINEAR_MIPMAP_NEAREST) {
				this.minFilter = gl.LINEAR;
			}
		}

		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);

		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.magFilter);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.minFilter);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.wrapS);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.wrapT);
		
		if(this.minFilter === gl.LINEAR_MIPMAP_NEAREST)	{
			gl.generateMipmap(gl.TEXTURE_2D);
		}

		gl.bindTexture(gl.TEXTURE_2D, null);
	}
};

var p = GLTexture.prototype;


p.updateTexture = function(source) {
	if(source){ this._source = source; }
	gl.bindTexture(gl.TEXTURE_2D, this.texture);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._source);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.magFilter);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.minFilter);
	if(this.minFilter === gl.LINEAR_MIPMAP_NEAREST)	{
		gl.generateMipmap(gl.TEXTURE_2D);
	}

	gl.bindTexture(gl.TEXTURE_2D, null);
};


p.bind = function(index) {
	if(index === undefined) {index = 0;}
	if(!GL.shader) {return;}

	gl.activeTexture(gl.TEXTURE0 + index);
	gl.bindTexture(gl.TEXTURE_2D, this.texture);
	gl.uniform1i(GL.shader.uniformTextures[index], index);
	this._bindIndex = index;
};


p.unbind = function() {
	gl.bindTexture(gl.TEXTURE_2D, null);
};

p.destroy = function() {
	gl.deleteTexture(this.texture);
};

module.exports = GLTexture;
},{"./GLTools":14}],14:[function(_dereq_,module,exports){
// GLTools.js
"use strict";

var glm = _dereq_("gl-matrix");

function GLTools() {
	this.aspectRatio   = 1;
	this.fieldOfView   = 45;
	this.zNear         = 5;
	this.zFar          = 3000;

	this.canvas        = null;
	this.gl            = null;

	this.shader        = null;
	this.shaderProgram = null;
}

var p = GLTools.prototype;

p.init = function(mCanvas, mWidth, mHeight, parameters) {
	if(this.canvas === null) {
		this.canvas      = mCanvas || document.createElement("canvas");
	}
	var params       = parameters || {};
	params.antialias = true;

	this.gl          = this.canvas.getContext("webgl", params) || this.canvas.getContext("experimental-webgl", params);
	console.log('GL TOOLS : ', this.gl);
	
	
	if(mWidth !== undefined && mHeight !== undefined) {
		this.setSize(mWidth, mHeight);
	} else {
		this.setSize(window.innerWidth, window.innerHeight);	
	}

	this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.enable(this.gl.BLEND);
	this.gl.clearColor( 0, 0, 0, 1 );
	this.gl.clearDepth( 1 );

	this.matrix                 = glm.mat4.create();
	glm.mat4.identity(this.matrix);
	this.normalMatrix           = glm.mat3.create();
	this.invertMVMatrix         = glm.mat3.create();
	this.depthTextureExt        = this.gl.getExtension("WEBKIT_WEBGL_depth_texture"); // Or browser-appropriate prefix
	this.floatTextureExt        = this.gl.getExtension("OES_texture_float"); // Or browser-appropriate prefix
	this.floatTextureLinearExt  = this.gl.getExtension("OES_texture_float_linear"); // Or browser-appropriate prefix
	this.standardDerivativesExt = this.gl.getExtension("OES_standard_derivatives"); // Or browser-appropriate prefix

	this.enabledVertexAttribute = [];
	this.enableAlphaBlending();
	this._viewport = [0, 0, this.width, this.height];
};


p.getGL = function() {	return this.gl;	};

p.setShader = function(aShader) {
	this.shader = aShader;
};

p.setShaderProgram = function(aShaderProgram) {
	this.shaderProgram = aShaderProgram;
};

p.setViewport = function(aX, aY, aW, aH) {
	var hasChanged = false;
	if(aX!==this._viewport[0]) {hasChanged = true;}
	if(aY!==this._viewport[1]) {hasChanged = true;}
	if(aW!==this._viewport[2]) {hasChanged = true;}
	if(aH!==this._viewport[3]) {hasChanged = true;}

	if(hasChanged) {
		this.gl.viewport(aX, aY, aW, aH);
		this._viewport = [aX, aY, aW, aH];
	}
};

p.setMatrices = function(aCamera) {
	this.camera = aCamera;	
};

p.rotate = function(aRotation) {
	glm.mat4.copy(this.matrix, aRotation);

	glm.mat4.multiply(this.matrix, this.camera.getMatrix(), this.matrix);
	glm.mat3.fromMat4(this.normalMatrix, this.matrix);
	glm.mat3.invert(this.normalMatrix, this.normalMatrix);
	glm.mat3.transpose(this.normalMatrix, this.normalMatrix);

	glm.mat3.fromMat4(this.invertMVMatrix, this.matrix);
	glm.mat3.invert(this.invertMVMatrix, this.invertMVMatrix);
};


//	BLEND MODES
p.enableAlphaBlending = function() {
	this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);	
};

p.enableAdditiveBlending = function() {
	this.gl.blendFunc(this.gl.ONE, this.gl.ONE);
};

//	CLEAR CANVAS
p.clear = function(r, g, b, a) {
	this.gl.clearColor( r, g, b, a );
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
};

//	DRAWING ELEMENTS
p.draw = function(aMesh) {
	if(!this.shaderProgram) {
		console.warn("Shader program not ready yet");
		return;
	}

	//	PROJECTION MATRIX
	if(!this.shaderProgram.pMatrixValue) {
		this.shaderProgram.pMatrixValue = glm.mat4.create();
		this.gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, this.camera.projection || this.camera.getMatrix() );
		glm.mat4.copy(this.shaderProgram.pMatrixValue, this.camera.projection || this.camera.getMatrix());
	} else {
		var pMatrix = this.camera.projection || this.camera.getMatrix();
		if(glm.mat4.str(this.shaderProgram.pMatrixValue) !== glm.mat4.str(pMatrix)) {
			this.gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, this.camera.projection || this.camera.getMatrix() );
			glm.mat4.copy(this.shaderProgram.pMatrixValue, pMatrix);
		}
	}

	//	MODEL-VIEW MATRIX
	if(!this.shaderProgram.mvMatrixValue) {
		this.shaderProgram.mvMatrixValue = glm.mat4.create();
		this.gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, this.matrix );
		glm.mat4.copy(this.shaderProgram.mvMatrixValue, this.matrix);
	} else {
		if(glm.mat4.str(this.shaderProgram.mvMatrixValue) !== glm.mat4.str(this.matrix)) {
			this.gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, this.matrix );
			glm.mat4.copy(this.shaderProgram.mvMatrixValue, this.matrix);
		}
	}
	
	
    //	INVERT MODEL-VIEW MATRIX
	if(!this.shaderProgram.invertMVMatrixValue) {
		this.shaderProgram.invertMVMatrixValue = glm.mat3.create();
		this.gl.uniformMatrix3fv(this.shaderProgram.invertMVMatrixUniform, false, this.invertMVMatrix );
		glm.mat3.copy(this.shaderProgram.invertMVMatrixValue, this.invertMVMatrix);
	} else {
		if(glm.mat3.str(this.shaderProgram.invertMVMatrixValue) !== glm.mat3.str(this.invertMVMatrix)) {
			this.gl.uniformMatrix3fv(this.shaderProgram.invertMVMatrixUniform, false, this.invertMVMatrix );
			glm.mat3.copy(this.shaderProgram.invertMVMatrixValue, this.invertMVMatrix);
		}
	}

	//	NORMAL MATRIX
	if(!this.shaderProgram.normalMatrixValue) {
		this.shaderProgram.normalMatrixValue = glm.mat4.create();
		this.gl.uniformMatrix3fv(this.shaderProgram.normalMatrixUniform, false, this.normalMatrix );
		glm.mat3.copy(this.shaderProgram.normalMatrixValue, this.normalMatrix);
	} else {
		if(glm.mat3.str(this.shaderProgram.normalMatrixValue) !== glm.mat3.str(this.normalMatrix)) {
			this.gl.uniformMatrix3fv(this.shaderProgram.normalMatrixUniform, false, this.normalMatrix );
			glm.mat3.copy(this.shaderProgram.normalMatrixValue, this.normalMatrix);
		}
	}



	// 	VERTEX POSITIONS
	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, aMesh.vBufferPos);
	var vertexPositionAttribute = getAttribLoc(this.gl, this.shaderProgram, "aVertexPosition");
	this.gl.vertexAttribPointer(vertexPositionAttribute, aMesh.vBufferPos.itemSize, this.gl.FLOAT, false, 0, 0);
	if(this.enabledVertexAttribute.indexOf(vertexPositionAttribute) === -1) {
		this.gl.enableVertexAttribArray(vertexPositionAttribute);	
		this.enabledVertexAttribute.push(vertexPositionAttribute);
	}
	

	//	TEXTURE COORDS
	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, aMesh.vBufferUV);
	var textureCoordAttribute = getAttribLoc(this.gl, this.shaderProgram, "aTextureCoord");
	this.gl.vertexAttribPointer(textureCoordAttribute, aMesh.vBufferUV.itemSize, this.gl.FLOAT, false, 0, 0);
	
	if(this.enabledVertexAttribute.indexOf(textureCoordAttribute) === -1) {
		this.gl.enableVertexAttribArray(textureCoordAttribute);
		this.enabledVertexAttribute.push(textureCoordAttribute);
	}

	//	INDICES
	this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, aMesh.iBuffer);

	//	EXTRA ATTRIBUTES
	for(var i=0; i<aMesh.extraAttributes.length; i++) {
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, aMesh.extraAttributes[i].buffer);
		var attrPosition = getAttribLoc(this.gl, this.shaderProgram, aMesh.extraAttributes[i].name);
		this.gl.vertexAttribPointer(attrPosition, aMesh.extraAttributes[i].itemSize, this.gl.FLOAT, false, 0, 0);
		// this.gl.enableVertexAttribArray(attrPosition);	
		if(this.enabledVertexAttribute.indexOf(attrPosition) === -1) {
			this.gl.enableVertexAttribArray(attrPosition);
			this.enabledVertexAttribute.push(attrPosition);
		}	
	}

	//	DRAWING
	if(aMesh.drawType === this.gl.POINTS ) {
		this.gl.drawArrays(aMesh.drawType, 0, aMesh.vertexSize);	
	} else {
		this.gl.drawElements(aMesh.drawType, aMesh.iBuffer.numItems, this.gl.UNSIGNED_SHORT, 0);	
	}


	function getAttribLoc(gl, shaderProgram, name) {
		if(shaderProgram.cacheAttribLoc === undefined) {	shaderProgram.cacheAttribLoc = {};	}
		if(shaderProgram.cacheAttribLoc[name] === undefined) {
			shaderProgram.cacheAttribLoc[name] = gl.getAttribLocation(shaderProgram, name);
		}

		return shaderProgram.cacheAttribLoc[name];
	}

};

//	CANVAS RESIZING
p.setSize = function(mWidth, mHeight) {
	this._width = mWidth;
	this._height = mHeight;

	this.canvas.width      = this._width;
	this.canvas.height     = this._height;
	this.gl.viewportWidth  = this._width;
	this.gl.viewportHeight = this._height;

	this.gl.viewport(0, 0, this._width, this._height);
	this.aspectRatio       = this._width / this._height;
};


p.__defineGetter__("width", function() {
	return this._width;
});

p.__defineGetter__("height", function() {
	return this._height;
});

p.__defineGetter__("viewport", function() {
	return this._viewport;
});

var instance = null;

GLTools.getInstance = function() {
	if(instance === null) {
		instance = new GLTools();
	}
	return instance;
};


module.exports = GLTools.getInstance();
},{"gl-matrix":2}],15:[function(_dereq_,module,exports){
"use strict";

var Face = _dereq_("./Face");
var GL = _dereq_("./GLTools");
var glm = _dereq_("gl-matrix");

var Mesh = function(aVertexSize, aIndexSize, aDrawType) {

	this.gl = GL.gl;
	this.vertexSize = aVertexSize;
	this.indexSize = aIndexSize;
	this.drawType = aDrawType;
	this.extraAttributes = [];
	
	this.vBufferPos = undefined;
	this._floatArrayVertex = undefined;

	this._init();
};

var p = Mesh.prototype;

p._init = function() {

};

p.bufferVertex = function(aArrayVertices, isDynamic) {
	var vertices = [];
	var drawType = isDynamic ? this.gl.DYNAMIC_DRAW : this.gl.STATIC_DRAW;
	this._vertices = [];

	for(var i=0; i<aArrayVertices.length; i++) {
		for(var j=0; j<aArrayVertices[i].length; j++) {
			vertices.push(aArrayVertices[i][j]);
		}
		this._vertices.push(glm.vec3.clone(aArrayVertices[i]));
	}

	if(this.vBufferPos === undefined) {
		this.vBufferPos = this.gl.createBuffer();
	}
	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vBufferPos);

	if(this._floatArrayVertex === undefined) {
		this._floatArrayVertex = new Float32Array(vertices);
	} else {
		if(aArrayVertices.length !== this._floatArrayVertex.length) {
			this._floatArrayVertex = new Float32Array(vertices);
		} else {
			for(var k=0; k<aArrayVertices.length; k++) {
				this._floatArrayVertex[k] = aArrayVertices[k];
			}
		}
	}

	this.gl.bufferData(this.gl.ARRAY_BUFFER, this._floatArrayVertex, drawType);
	this.vBufferPos.itemSize = 3;
};

p.bufferTexCoords = function(aArrayTexCoords) {
	var coords = [];

	for(var i=0; i<aArrayTexCoords.length; i++) {
		for(var j=0; j<aArrayTexCoords[i].length; j++) {
			coords.push(aArrayTexCoords[i][j]);
		}
	}

	this.vBufferUV = this.gl.createBuffer();
	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vBufferUV);
	this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(coords), this.gl.STATIC_DRAW);
	this.vBufferUV.itemSize = 2;
};

p.bufferData = function(aData, aName, aItemSize, isDynamic) {
	var index = -1;
	var drawType = isDynamic ? this.gl.DYNAMIC_DRAW : this.gl.STATIC_DRAW;
	var i=0;

	for(i=0; i<this.extraAttributes.length; i++) {
		if(this.extraAttributes[i].name === aName) {
			this.extraAttributes[i].data = aData;
			index = i;
			break;
		}
	}

	var bufferData = [];
	for(i=0; i<aData.length; i++) {
		for(var j=0; j<aData[i].length; j++) {
			bufferData.push(aData[i][j]);
		}
	}

	var buffer, floatArray;
	if(index === -1) {
		buffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
		floatArray = new Float32Array(bufferData);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, floatArray, drawType);
		this.extraAttributes.push({name:aName, data:aData, itemSize: aItemSize, buffer:buffer, floatArray:floatArray});
	} else {
		buffer = this.extraAttributes[index].buffer;
		// console.debug("Buffer exist", buffer);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
		floatArray = this.extraAttributes[index].floatArray;
		for(i=0; i<bufferData.length; i++) {
			floatArray[i] = bufferData[i];
		}
		this.gl.bufferData(this.gl.ARRAY_BUFFER, floatArray, drawType);
	}

};

p.bufferIndices = function(aArrayIndices) {
	this._indices = aArrayIndices;
	this.iBuffer = this.gl.createBuffer();
	this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.iBuffer);
	this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(aArrayIndices), this.gl.STATIC_DRAW);
	this.iBuffer.itemSize = 1;
	this.iBuffer.numItems = aArrayIndices.length;
};


p.computeNormals = function() {
	if(this.drawType !== this.gl.TRIANGLES) {return;}

	if(this._faces === undefined) {	this._generateFaces();	}
	console.log("Start computing");

	var time = new Date().getTime();
	var j=0;

	this._normals = [];
	for(var i=0; i<this._vertices.length; i++) {
		var normal = glm.vec3.create();
		var faceCount = 0;
		for(j=0; j<this._faces.length; j++) {
			if(this._faces[j].contains(this._vertices[i])) {
				glm.vec3.add(normal, normal, this._faces[j].faceNormal);
				faceCount ++;
			}
		}

		glm.vec3.normalize(normal, normal);
		this._normals.push(normal);
	}

	this.bufferData(this._normals, "aNormal", 3);

	var totalTime = new Date().getTime() - time;
	console.log("Total Time : ", totalTime);
};


p.computeTangent = function() {
	
};


p._generateFaces = function() {
	this._faces = [];

	for(var i=0; i<this._indices.length; i+=3) {
		var p0 = this._vertices[this._indices[i+0]];
		var p1 = this._vertices[this._indices[i+1]];
		var p2 = this._vertices[this._indices[i+2]];

		this._faces.push(new Face(p0, p1, p2));
	}
};

module.exports = Mesh;
},{"./Face":9,"./GLTools":14,"gl-matrix":2}],16:[function(_dereq_,module,exports){
"use strict";

var GL = _dereq_("./GLTools");
var Mesh = _dereq_("./Mesh");
var MeshUtils = {};

MeshUtils.createPlane = function(width, height, numSegments, withNormals, axis) {
	axis          = axis === undefined ? "xy" : axis;
	withNormals   = withNormals === undefined ? false : withNormals;
	var positions = [];
	var coords    = [];
	var indices   = [];
	var normals   = [];

	var gapX  = width/numSegments;
	var gapY  = height/numSegments;
	var gapUV = 1/numSegments;
	var index = 0;
	var sx    = -width * 0.5;
	var sy    = -height * 0.5;

	for(var i=0; i<numSegments; i++) {
		for (var j=0; j<numSegments; j++) {
			var tx = gapX * i + sx;
			var ty = gapY * j + sy;

			if(axis === 'xz') {
				positions.push([tx, 		0, 	ty+gapY	]);
				positions.push([tx+gapX, 	0, 	ty+gapY	]);
				positions.push([tx+gapX, 	0, 	ty	]);
				positions.push([tx, 		0, 	ty	]);	

				normals.push([0, 1, 0]);
				normals.push([0, 1, 0]);
				normals.push([0, 1, 0]);
				normals.push([0, 1, 0]);
			} else if(axis === 'yz') {
				positions.push([0, tx, 		ty]);
				positions.push([0, tx+gapX, ty]);
				positions.push([0, tx+gapX, ty+gapY]);
				positions.push([0, tx, 		ty+gapY]);	

				normals.push([1, 0, 0]);
				normals.push([1, 0, 0]);
				normals.push([1, 0, 0]);
				normals.push([1, 0, 0]);
			} else {
				positions.push([tx, 		ty, 	0]);
				positions.push([tx+gapX, 	ty, 	0]);
				positions.push([tx+gapX, 	ty+gapY, 	0]);
				positions.push([tx, 		ty+gapY, 	0]);	

				normals.push([0, 0, 1]);
				normals.push([0, 0, 1]);
				normals.push([0, 0, 1]);
				normals.push([0, 0, 1]);
			} 

			var u = i/numSegments;
			var v = j/numSegments;
			coords.push([u, v]);
			coords.push([u+gapUV, v]);
			coords.push([u+gapUV, v+gapUV]);
			coords.push([u, v+gapUV]);

			indices.push(index*4 + 0);
			indices.push(index*4 + 1);
			indices.push(index*4 + 2);
			indices.push(index*4 + 0);
			indices.push(index*4 + 2);
			indices.push(index*4 + 3);

			index++;
		}
	}

	var mesh = new Mesh(positions.length, indices.length, GL.gl.TRIANGLES);
	mesh.bufferVertex(positions);
	mesh.bufferTexCoords(coords);
	mesh.bufferIndices(indices);
	if(withNormals) {
		mesh.bufferData(normals, "aNormal", 3);
	}

	return mesh;
};

MeshUtils.createSphere = function(size, numSegments, withNormals) {
	withNormals   = withNormals === undefined ? false : withNormals;
	var positions = [];
	var coords    = [];
	var indices   = [];
	var normals   = [];
	var index     = 0;
	var gapUV     = 1/numSegments;

	var getPosition = function(i, j, isNormal) {	//	rx : -90 ~ 90 , ry : 0 ~ 360
		isNormal = isNormal === undefined ? false : isNormal;
		var rx = i/numSegments * Math.PI - Math.PI * 0.5;
		var ry = j/numSegments * Math.PI * 2;
		var r = isNormal ? 1 : size;
		var pos = [];
		pos[1] = Math.sin(rx) * r;
		var t = Math.cos(rx) * r;
		pos[0] = Math.cos(ry) * t;
		pos[2] = Math.sin(ry) * t;

		var precision = 10000;
		pos[0] = Math.floor(pos[0] * precision) / precision;
		pos[1] = Math.floor(pos[1] * precision) / precision;
		pos[2] = Math.floor(pos[2] * precision) / precision;

		return pos;
	};

	
	for(var i=0; i<numSegments; i++) {
		for(var j=0; j<numSegments; j++) {
			positions.push(getPosition(i, j));
			positions.push(getPosition(i+1, j));
			positions.push(getPosition(i+1, j+1));
			positions.push(getPosition(i, j+1));

			if(withNormals) {
				normals.push(getPosition(i, j, true));
				normals.push(getPosition(i+1, j, true));
				normals.push(getPosition(i+1, j+1, true));
				normals.push(getPosition(i, j+1, true));	
			}
			

			var u = j/numSegments;
			var v = i/numSegments;
			
			
			coords.push([1.0 - u, v]);
			coords.push([1.0 - u, v+gapUV]);
			coords.push([1.0 - u - gapUV, v+gapUV]);
			coords.push([1.0 - u - gapUV, v]);

			indices.push(index*4 + 0);
			indices.push(index*4 + 1);
			indices.push(index*4 + 2);
			indices.push(index*4 + 0);
			indices.push(index*4 + 2);
			indices.push(index*4 + 3);

			index++;
		}
	}


	var mesh = new Mesh(positions.length, indices.length, GL.gl.TRIANGLES);
	mesh.bufferVertex(positions);
	mesh.bufferTexCoords(coords);
	mesh.bufferIndices(indices);
	console.log('With normals :', withNormals);
	if(withNormals) {
		mesh.bufferData(normals, "aNormal", 3);
	}

	return mesh;
};

MeshUtils.createCube = function(w,h,d, withNormals) {
	withNormals   = withNormals === undefined ? false : withNormals;
	h = h || w;
	d = d || w;

	var x = w/2;
	var y = h/2;
	var z = d/2;

	var positions = [];
	var coords    = [];
	var indices   = []; 
	var normals   = []; 
	var count     = 0;


	// BACK
	positions.push([-x,  y, -z]);
	positions.push([ x,  y, -z]);
	positions.push([ x, -y, -z]);
	positions.push([-x, -y, -z]);

	normals.push([0, 0, -1]);
	normals.push([0, 0, -1]);
	normals.push([0, 0, -1]);
	normals.push([0, 0, -1]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count*4 + 0);
	indices.push(count*4 + 1);
	indices.push(count*4 + 2);
	indices.push(count*4 + 0);
	indices.push(count*4 + 2);
	indices.push(count*4 + 3);

	count ++;

	// RIGHT
	positions.push([ x,  y, -z]);
	positions.push([ x,  y,  z]);
	positions.push([ x, -y,  z]);
	positions.push([ x, -y, -z]);

	normals.push([1, 0, 0]);
	normals.push([1, 0, 0]);
	normals.push([1, 0, 0]);
	normals.push([1, 0, 0]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count*4 + 0);
	indices.push(count*4 + 1);
	indices.push(count*4 + 2);
	indices.push(count*4 + 0);
	indices.push(count*4 + 2);
	indices.push(count*4 + 3);

	count ++;

	// FRONT
	positions.push([ x,  y,  z]);
	positions.push([-x,  y,  z]);
	positions.push([-x, -y,  z]);
	positions.push([ x, -y,  z]);

	normals.push([0, 0, 1]);
	normals.push([0, 0, 1]);
	normals.push([0, 0, 1]);
	normals.push([0, 0, 1]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count*4 + 0);
	indices.push(count*4 + 1);
	indices.push(count*4 + 2);
	indices.push(count*4 + 0);
	indices.push(count*4 + 2);
	indices.push(count*4 + 3);

	count ++;


	// LEFT
	positions.push([-x,  y,  z]);
	positions.push([-x,  y, -z]);
	positions.push([-x, -y, -z]);
	positions.push([-x, -y,  z]);

	normals.push([-1, 0, 0]);
	normals.push([-1, 0, 0]);
	normals.push([-1, 0, 0]);
	normals.push([-1, 0, 0]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count*4 + 0);
	indices.push(count*4 + 1);
	indices.push(count*4 + 2);
	indices.push(count*4 + 0);
	indices.push(count*4 + 2);
	indices.push(count*4 + 3);

	count ++;

	// TOP
	positions.push([-x,  y,  z]);
	positions.push([ x,  y,  z]);
	positions.push([ x,  y, -z]);
	positions.push([-x,  y, -z]);

	normals.push([0, 1, 0]);
	normals.push([0, 1, 0]);
	normals.push([0, 1, 0]);
	normals.push([0, 1, 0]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count*4 + 0);
	indices.push(count*4 + 1);
	indices.push(count*4 + 2);
	indices.push(count*4 + 0);
	indices.push(count*4 + 2);
	indices.push(count*4 + 3);

	count ++;

	// BOTTOM
	positions.push([-x, -y, -z]);
	positions.push([ x, -y, -z]);
	positions.push([ x, -y,  z]);
	positions.push([-x, -y,  z]);

	normals.push([0, -1, 0]);
	normals.push([0, -1, 0]);
	normals.push([0, -1, 0]);
	normals.push([0, -1, 0]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count*4 + 0);
	indices.push(count*4 + 1);
	indices.push(count*4 + 2);
	indices.push(count*4 + 0);
	indices.push(count*4 + 2);
	indices.push(count*4 + 3);

	count ++;


	var mesh = new Mesh(positions.length, indices.length, GL.gl.TRIANGLES);
	mesh.bufferVertex(positions);
	mesh.bufferTexCoords(coords);
	mesh.bufferIndices(indices);
	if(withNormals) {
		mesh.bufferData(normals, "aNormal", 3);
	}

	return mesh;
};

MeshUtils.createSkyBox = function(size, withNormals) {
	withNormals   = withNormals === undefined ? false : withNormals;

	var positions = [];
	var coords    = [];
	var indices   = []; 
	var normals   = []; 
	var count     = 0;

	// BACK
	positions.push([ size,  size, -size]);
	positions.push([-size,  size, -size]);
	positions.push([-size, -size, -size]);
	positions.push([ size, -size, -size]);

	normals.push([0, 0, -1]);
	normals.push([0, 0, -1]);
	normals.push([0, 0, -1]);
	normals.push([0, 0, -1]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count*4 + 0);
	indices.push(count*4 + 1);
	indices.push(count*4 + 2);
	indices.push(count*4 + 0);
	indices.push(count*4 + 2);
	indices.push(count*4 + 3);

	count ++;

	// RIGHT
	positions.push([ size, -size, -size]);
	positions.push([ size, -size,  size]);
	positions.push([ size,  size,  size]);
	positions.push([ size,  size, -size]);

	normals.push([1, 0, 0]);
	normals.push([1, 0, 0]);
	normals.push([1, 0, 0]);
	normals.push([1, 0, 0]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count*4 + 0);
	indices.push(count*4 + 1);
	indices.push(count*4 + 2);
	indices.push(count*4 + 0);
	indices.push(count*4 + 2);
	indices.push(count*4 + 3);

	count ++;

	// FRONT
	positions.push([-size,  size,  size]);
	positions.push([ size,  size,  size]);
	positions.push([ size, -size,  size]);
	positions.push([-size, -size,  size]);

	normals.push([0, 0, 1]);
	normals.push([0, 0, 1]);
	normals.push([0, 0, 1]);
	normals.push([0, 0, 1]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count*4 + 0);
	indices.push(count*4 + 1);
	indices.push(count*4 + 2);
	indices.push(count*4 + 0);
	indices.push(count*4 + 2);
	indices.push(count*4 + 3);

	count ++;

	// LEFT
	positions.push([-size, -size,  size]);
	positions.push([-size, -size, -size]);
	positions.push([-size,  size, -size]);
	positions.push([-size,  size,  size]);

	normals.push([-1, 0, 0]);
	normals.push([-1, 0, 0]);
	normals.push([-1, 0, 0]);
	normals.push([-1, 0, 0]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count*4 + 0);
	indices.push(count*4 + 1);
	indices.push(count*4 + 2);
	indices.push(count*4 + 0);
	indices.push(count*4 + 2);
	indices.push(count*4 + 3);

	count ++;

	// TOP
	positions.push([ size,  size,  size]);
	positions.push([-size,  size,  size]);
	positions.push([-size,  size, -size]);
	positions.push([ size,  size, -size]);

	normals.push([0, 1, 0]);
	normals.push([0, 1, 0]);
	normals.push([0, 1, 0]);
	normals.push([0, 1, 0]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count*4 + 0);
	indices.push(count*4 + 1);
	indices.push(count*4 + 2);
	indices.push(count*4 + 0);
	indices.push(count*4 + 2);
	indices.push(count*4 + 3);

	count ++;

	// BOTTOM
	positions.push([ size, -size, -size]);
	positions.push([-size, -size, -size]);
	positions.push([-size, -size,  size]);
	positions.push([ size, -size,  size]);

	normals.push([0, -1, 0]);
	normals.push([0, -1, 0]);
	normals.push([0, -1, 0]);
	normals.push([0, -1, 0]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count*4 + 0);
	indices.push(count*4 + 1);
	indices.push(count*4 + 2);
	indices.push(count*4 + 0);
	indices.push(count*4 + 2);
	indices.push(count*4 + 3);

	var mesh = new Mesh(positions.length, indices.length, GL.gl.TRIANGLES);
	mesh.bufferVertex(positions);
	mesh.bufferTexCoords(coords);
	mesh.bufferIndices(indices);
	if(withNormals) {
		mesh.bufferData(normals, "aNormal", 3);
	}

	return mesh;
};

module.exports = MeshUtils;
},{"./GLTools":14,"./Mesh":15}],17:[function(_dereq_,module,exports){
// ObjLoader.js

"use strict";

var GL = _dereq_("./GLTools");
var Mesh = _dereq_("./Mesh");
var gl;


function ObjLoader() {
	this._clearAll();
}


var p = ObjLoader.prototype;

p._clearAll = function() {
	this._callback      = null;
	this._callbackError = null;
	this._mesh          = [];	
	this._drawingType 	= "";
};

p.load = function(url, callback, callbackError, ignoreNormals, drawingType) {
	this._clearAll();
	if(!gl) {	gl = GL.gl;	}
	this._drawingType = drawingType === undefined ? gl.TRIANGLES : drawingType;
	this._ignoreNormals = ignoreNormals === undefined ? true : ignoreNormals;

	this._callback = callback;
	this._callbackError = callbackError;

	var request = new XMLHttpRequest();
	request.onreadystatechange = this._onXHTPState.bind(this);
	request.open("GET", url, true);
	request.send();
};

p._onXHTPState = function(e) {
	if(e.target.readyState === 4) {
		this._parseObj(e.target.response);
	}
};


p.parse = function(objStr, callback, callbackError, ignoreNormals, drawingType) {
	this._clearAll();
	this._drawingType = drawingType === undefined ? gl.TRIANGLES : drawingType;
	this._ignoreNormals = ignoreNormals === undefined ? true : ignoreNormals;

	this._parseObj(objStr);
};


p._parseObj = function(objStr) {
	var lines = objStr.split('\n');

	var positions    = [];
	var coords       = [];
	var finalNormals = [];
	var vertices     = [];
	var normals      = [];
	var uvs          = [];
	var indices      = [];
	var count        = 0;
	var result;

	// v float float float
	var vertex_pattern = /v( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;

	// vn float float float
	var normal_pattern = /vn( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;

	// vt float float
	var uv_pattern = /vt( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;

	// f vertex vertex vertex ...
	var face_pattern1 = /f( +-?\d+)( +-?\d+)( +-?\d+)( +-?\d+)?/;

	// f vertex/uv vertex/uv vertex/uv ...
	var face_pattern2 = /f( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))?/;

	// f vertex/uv/normal vertex/uv/normal vertex/uv/normal ...
	var face_pattern3 = /f( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))?/;

	// f vertex//normal vertex//normal vertex//normal ... 
	var face_pattern4 = /f( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))?/;


	function parseVertexIndex( value ) {
		var index = parseInt( value );
		return ( index >= 0 ? index - 1 : index + vertices.length / 3 ) * 3;
	}

	function parseNormalIndex( value ) {
		var index = parseInt( value );
		return ( index >= 0 ? index - 1 : index + normals.length / 3 ) * 3;
	}

	function parseUVIndex( value ) {
		var index = parseInt( value );
		return ( index >= 0 ? index - 1 : index + uvs.length / 2 ) * 2;
	}


	function addVertex(a, b ,c) {
		positions.push([vertices[a], vertices[a+1], vertices[a+2]]);
		positions.push([vertices[b], vertices[b+1], vertices[b+2]]);
		positions.push([vertices[c], vertices[c+1], vertices[c+2]]);

		indices.push(count * 3 + 0);
		indices.push(count * 3 + 1);
		indices.push(count * 3 + 2);

		count ++;
	}


	function addUV(a, b, c) {
		coords.push([uvs[a], uvs[a+1]]);
		coords.push([uvs[b], uvs[b+1]]);
		coords.push([uvs[c], uvs[c+1]]);
	}


	function addNormal(a, b, c) {
		finalNormals.push([normals[a], normals[a+1], normals[a+2]]);
		finalNormals.push([normals[b], normals[b+1], normals[b+2]]);
		finalNormals.push([normals[c], normals[c+1], normals[c+2]]);
	}

	function addFace( a, b, c, d,  ua, ub, uc, ud,  na, nb, nc, nd ) {
		var ia = parseVertexIndex( a );
		var ib = parseVertexIndex( b );
		var ic = parseVertexIndex( c );
		var id;

		if ( d === undefined ) {

			addVertex( ia, ib, ic );

		} else {

			id = parseVertexIndex( d );

			addVertex( ia, ib, id );
			addVertex( ib, ic, id );

		}


		if ( ua !== undefined ) {

			ia = parseUVIndex( ua );
			ib = parseUVIndex( ub );
			ic = parseUVIndex( uc );

			if ( d === undefined ) {

				addUV( ia, ib, ic );

			} else {

				id = parseUVIndex( ud );

				addUV( ia, ib, id );
				addUV( ib, ic, id );

			}

		}

		if ( na !== undefined ) {

			ia = parseNormalIndex( na );
			ib = parseNormalIndex( nb );
			ic = parseNormalIndex( nc );

			if ( d === undefined ) {

				addNormal( ia, ib, ic );

			} else {

				id = parseNormalIndex( nd );

				addNormal( ia, ib, id );
				addNormal( ib, ic, id );

			}

		}
	}


	for ( var i = 0; i < lines.length; i ++ ) {
		var line = lines[ i ];
		line = line.trim();

		if ( line.length === 0 || line.charAt( 0 ) === '#' ) {

			continue;

		} else if ( ( result = vertex_pattern.exec( line ) ) !== null ) {

			vertices.push(
				parseFloat( result[ 1 ] ),
				parseFloat( result[ 2 ] ),
				parseFloat( result[ 3 ] )
			);

		} else if ( ( result = normal_pattern.exec( line ) ) !== null ) {

			normals.push(
				parseFloat( result[ 1 ] ),
				parseFloat( result[ 2 ] ),
				parseFloat( result[ 3 ] )
			);

		} else if ( ( result = uv_pattern.exec( line ) ) !== null ) {

			uvs.push(
				parseFloat( result[ 1 ] ),
				parseFloat( result[ 2 ] )
			);

		} else if ( ( result = face_pattern1.exec( line ) ) !== null ) {

			addFace(
				result[ 1 ], result[ 2 ], result[ 3 ], result[ 4 ]
			);

		} else if ( ( result = face_pattern2.exec( line ) ) !== null ) {

			addFace(
				result[ 2 ], result[ 5 ], result[ 8 ], result[ 11 ],
				result[ 3 ], result[ 6 ], result[ 9 ], result[ 12 ]
			);

		} else if ( ( result = face_pattern3.exec( line ) ) !== null ) {
			addFace(
				result[ 2 ], result[ 6 ], result[ 10 ], result[ 14 ],
				result[ 3 ], result[ 7 ], result[ 11 ], result[ 15 ],
				result[ 4 ], result[ 8 ], result[ 12 ], result[ 16 ]
			);

		} else if ( ( result = face_pattern4.exec( line ) ) !== null ) {
			addFace(
				result[ 2 ], result[ 5 ], result[ 8 ], result[ 11 ],
				undefined, undefined, undefined, undefined,
				result[ 3 ], result[ 6 ], result[ 9 ], result[ 12 ]
			);

		} 
	}

	this._generateMeshes({	
		positions:positions,
		coords:coords,
		normals:finalNormals,
		indices:indices
	});
	
};


p._generateMeshes = function(o) {
	gl = GL.gl;

	var mesh = new Mesh(o.positions.length, o.indices.length, this._drawingType);
	mesh.bufferVertex(o.positions);
	mesh.bufferTexCoords(o.coords);
	mesh.bufferIndices(o.indices);
	if(!this._ignoreNormals) {
		mesh.bufferData(o.normals, "aNormal", 3);
	}

	if(this._callback) {
		this._callback(mesh, o);
	}
};

// var loader = new ObjLoader();

module.exports = ObjLoader;
},{"./GLTools":14,"./Mesh":15}],18:[function(_dereq_,module,exports){
"use strict";

var glm = _dereq_("gl-matrix");

function QuatRotation(mListenerTarget) {
	if(mListenerTarget === undefined) {	mListenerTarget = document;	}
	this._isRotateZ     = 0;
	this.matrix         = glm.mat4.create();
	this.m              = glm.mat4.create();
	this._vZaxis        = glm.vec3.clone([0, 0, 0]);
	this._zAxis         = glm.vec3.clone([0, 0, -1]);
	this.preMouse       = {x:0, y:0};
	this.mouse          = {x:0, y:0};
	this._isMouseDown   = false;
	this._rotation      = glm.quat.clone([0, 0, 1, 0]);
	this.tempRotation   = glm.quat.clone([0, 0, 0, 0]);
	this._rotateZMargin = 0;
	this.diffX          = 0;
	this.diffY          = 0;
	this._currDiffX     = 0;
	this._currDiffY     = 0;
	this._offset        = 0.004;
	this._easing        = 0.1;
	this._slerp			= -1;
	this._isLocked 		= false;

	var that = this;
	mListenerTarget.addEventListener("mousedown", function(aEvent) { that._onMouseDown(aEvent); });
	mListenerTarget.addEventListener("touchstart", function(aEvent) {	that._onMouseDown(aEvent); });
	mListenerTarget.addEventListener("mouseup", function(aEvent) { that._onMouseUp(aEvent); });
	mListenerTarget.addEventListener("touchend", function(aEvent) { that._onMouseUp(aEvent); });
	mListenerTarget.addEventListener("mousemove", function(aEvent) { that._onMouseMove(aEvent); });
	mListenerTarget.addEventListener("touchmove", function(aEvent) { that._onMouseMove(aEvent); });
}


var p = QuatRotation.prototype;

p.inverseControl = function(value) {
	if(value === undefined) {	
		this._isInvert = true;	
	} else {
		this._isInvert = value;
	}
};

p.lock = function(value) {
	if(value === undefined) {	
		this._isLocked = true;	
	} else {	
		this._isLocked = value;	
	}
};

p.getMousePos = function(aEvent) {
	var mouseX, mouseY;

	if(aEvent.changedTouches !== undefined) {
		mouseX = aEvent.changedTouches[0].pageX;
		mouseY = aEvent.changedTouches[0].pageY;
	} else {
		mouseX = aEvent.clientX;
		mouseY = aEvent.clientY;
	}
	
	return {x:mouseX, y:mouseY};
};

p._onMouseDown = function(aEvent) {
	if(this._isLocked) {return;}
	if(this._isMouseDown) {return;}

	var mouse = this.getMousePos(aEvent);
	var tempRotation = glm.quat.clone(this._rotation);
	this._updateRotation(tempRotation);
	this._rotation = tempRotation;

	this._isMouseDown = true;
	this._isRotateZ = 0;
	this.preMouse = {x:mouse.x, y:mouse.y};

	if(mouse.y < this._rotateZMargin || mouse.y > (window.innerHeight - this._rotateZMargin) ) {	this._isRotateZ = 1;	}
	else if(mouse.x < this._rotateZMargin || mouse.x > (window.innerWidth - this._rotateZMargin) ) {	this._isRotateZ = 2;	}

	this._currDiffX = this.diffX = 0;
	this._currDiffY = this.diffY = 0;
};

p._onMouseMove = function(aEvent) {
	if(this._isLocked) {return;}
	if(aEvent.touches) {aEvent.preventDefault();}
	this.mouse = this.getMousePos(aEvent);
};

p._onMouseUp = function() {
	if(this._isLocked) {return;}
	if(!this._isMouseDown) {return;}
	this._isMouseDown = false;
};

p.setCameraPos = function(mQuat, speed) {
	speed             = speed || this._easing;
	this._easing      = speed;
	if(this._slerp > 0) {return;}
	
	var tempRotation  = glm.quat.clone(this._rotation);
	this._updateRotation(tempRotation);
	this._rotation    = glm.quat.clone(tempRotation);
	this._currDiffX   = this.diffX = 0;
	this._currDiffY   = this.diffY = 0;
	
	this._isMouseDown = false;
	this._isRotateZ   = 0;
	
	this._targetQuat  = glm.quat.clone(mQuat);
	this._slerp       = 1;
};

p.resetQuat = function() {
	this._rotation    = glm.quat.clone([0, 0, 1, 0]);
	this.tempRotation = glm.quat.clone([0, 0, 0, 0]);
	this._targetQuat  = undefined;
	this._slerp       = -1;
};

p.update = function() {
	glm.mat4.identity(this.m);

	if(this._targetQuat === undefined) { 
		glm.quat.set(this.tempRotation, this._rotation[0], this._rotation[1], this._rotation[2], this._rotation[3]);
		this._updateRotation(this.tempRotation);
	} else {
		this._slerp += (0 - this._slerp) * 0.1;

		if(this._slerp < 0.001) {
			// quat.set(this._targetQuat, this._rotation);
			glm.quat.set(this._rotation, this._targetQuat[0], this._targetQuat[1], this._targetQuat[2], this._targetQuat[3]);
			this._targetQuat = undefined;
			this._slerp = -1;
		} else {
			glm.quat.set(this.tempRotation, 0, 0, 0, 0);
			glm.quat.slerp(this.tempRotation, this._targetQuat, this._rotation, this._slerp);
		}
	}

	glm.vec3.transformQuat(this._vZaxis, this._vZaxis, this.tempRotation);

	glm.mat4.fromQuat(this.matrix, this.tempRotation);
};

p._updateRotation = function(aTempRotation) {
	if(this._isMouseDown && !this._isLocked) {
		this.diffX = -(this.mouse.x - this.preMouse.x);
		this.diffY = (this.mouse.y - this.preMouse.y);

		if(this._isInvert) {
			this.diffX = -this.diffX;
			this.diffY = -this.diffY;
		}
	}
	
	this._currDiffX += (this.diffX - this._currDiffX) * this._easing;
	this._currDiffY += (this.diffY - this._currDiffY) * this._easing;

	var angle, _quat;

	if(this._isRotateZ > 0) {
		if(this._isRotateZ === 1) {
			angle = -this._currDiffX * this._offset; 
			angle *= (this.preMouse.y < this._rotateZMargin) ? -1 : 1;
			_quat = glm.quat.clone( [0, 0, Math.sin(angle), Math.cos(angle) ] );
			glm.quat.multiply(_quat, aTempRotation, _quat);
		} else {
			angle = -this._currDiffY * this._offset; 
			angle *= (this.preMouse.x < this._rotateZMargin) ? 1 : -1;
			_quat = glm.quat.clone( [0, 0, Math.sin(angle), Math.cos(angle) ] );
			glm.quat.multiply(_quat, aTempRotation, _quat);
		}
	} else {
		var v = glm.vec3.clone([this._currDiffX, this._currDiffY, 0]);
		var axis = glm.vec3.create();
		glm.vec3.cross(axis, v, this._zAxis);
		glm.vec3.normalize(axis, axis);
		angle = glm.vec3.length(v) * this._offset;
		_quat = glm.quat.clone( [Math.sin(angle) * axis[0], Math.sin(angle) * axis[1], Math.sin(angle) * axis[2], Math.cos(angle) ] );
		glm.quat.multiply(aTempRotation, _quat, aTempRotation);
	}

};


module.exports = QuatRotation;
},{"gl-matrix":2}],19:[function(_dereq_,module,exports){
"use strict";

var GL = _dereq_("./GLTools");
var QuatRotation = _dereq_("./QuatRotation");
var CameraOrtho = _dereq_("./CameraOrtho");
var SimpleCamera = _dereq_("./SimpleCamera");
var glm = _dereq_("gl-matrix");

var Scene = function() {
	if(GL.canvas === null) {return;}
	this.gl = GL.gl;
	this._children = [];
	this._init();
};

var p = Scene.prototype;

p._init = function() {
	this.camera = new SimpleCamera(GL.canvas);
	this.camera.setPerspective(45*Math.PI/180, GL.aspectRatio, 5, 3000);
	this.camera.lockRotation();

	var eye                = glm.vec3.clone([0, 0, 500]  );
	var center             = glm.vec3.create( );
	var up                 = glm.vec3.clone( [0,-1,0] );
	this.camera.lookAt(eye, center, up);
	
	this.sceneRotation     = new QuatRotation(GL.canvas);
	this.rotationFront     = glm.mat4.create();
	glm.mat4.identity(this.rotationFront);
	
	this.cameraOrtho       = new CameraOrtho();
	this.cameraOrthoScreen = new CameraOrtho();
	this.cameraOtho        = this.cameraOrtho;

	this.cameraOrtho.lookAt(eye, center, up);
	this.cameraOrtho.ortho( 1, -1, 1, -1);

	this.cameraOrthoScreen.lookAt(eye, center, up);
	this.cameraOrthoScreen.ortho( 0, GL.width, GL.height, 0);

	// In SuperClass should call following functions.
	this._initTextures();
	this._initViews();

	window.addEventListener("resize", this._onResize.bind(this));
};

p._initTextures = function() {
	// console.log("Should be overwritten by SuperClass");
};

p._initViews = function() {
	// console.log("Should be overwritten by SuperClass");
};

p.loop = function() {
	this.update();
	this.render();
};

p.update = function() {
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
	this.sceneRotation.update();
	GL.setViewport(0, 0, GL.width, GL.height);
	GL.setMatrices(this.camera );
	GL.rotate(this.sceneRotation.matrix);

};

p.resize = function() {
	// if(this.camera.resize) {
	// 	this.camera.resize(GL.aspectRatio);
	// }
};

p.render = function() {

};

p._onResize = function() {
	this.cameraOrthoScreen.ortho( 0, GL.width, GL.height, 0);
};

module.exports = Scene;
},{"./CameraOrtho":5,"./GLTools":14,"./QuatRotation":18,"./SimpleCamera":22,"gl-matrix":2}],20:[function(_dereq_,module,exports){
// Scheduler.js

"use strict";

if(window.requestAnimFrame === undefined) {
	window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame       || 
		window.webkitRequestAnimationFrame || 
		window.mozRequestAnimationFrame    || 
		window.oRequestAnimationFrame      || 
		window.msRequestAnimationFrame     || 
		function( callback ){
		window.setTimeout(callback, 1000 / 60);
		};
	})();
}

function Scheduler() {
	this.FRAMERATE = 60;
	this._delayTasks = [];
	this._nextTasks = [];
	this._deferTasks = [];
	this._highTasks = [];
	this._usurpTask = [];
	this._enterframeTasks = [];
	this._idTable = 0;

	window.requestAnimFrame( this._loop.bind(this) );
}

var p = Scheduler.prototype;

p._loop = function() {
	window.requestAnimFrame( this._loop.bind(this) );
	this._process();
};


p._process = function() {
	var i = 0,
		task, interval, current;
	for ( i=0; i<this._enterframeTasks.length; i++) {
		task = this._enterframeTasks[i];
		if(task !== null && task !== undefined) {
			task.func.apply(task.scope, task.params);
		}
	}
	
	while ( this._highTasks.length > 0) {
		task = this._highTasks.pop();
		task.func.apply(task.scope, task.params);
	}
	

	var startTime = new Date().getTime();

	for ( i=0; i<this._delayTasks.length; i++) {
		task = this._delayTasks[i];
		if(startTime-task.time > task.delay) {
			task.func.apply(task.scope, task.params);
			this._delayTasks.splice(i, 1);
		}
	}

	startTime = new Date().getTime();
	interval = 1000 / this.FRAMERATE;
	while(this._deferTasks.length > 0) {
		task = this._deferTasks.shift();
		current = new Date().getTime();
		if(current - startTime < interval ) {
			task.func.apply(task.scope, task.params);
		} else {
			this._deferTasks.unshift(task);
			break;
		}
	}


	startTime = new Date().getTime();
	interval = 1000 / this.FRAMERATE;
	while(this._usurpTask.length > 0) {
		task = this._usurpTask.shift();
		current = new Date().getTime();
		if(current - startTime < interval ) {
			task.func.apply(task.scope, task.params);
		} else {
			// this._usurpTask.unshift(task);
			break;
		}
	}



	this._highTasks = this._highTasks.concat(this._nextTasks);
	this._nextTasks = [];
	this._usurpTask = [];
};


p.addEF = function(scope, func, params) {
	params = params || [];
	var id = this._idTable;
	this._enterframeTasks[id] = {scope:scope, func:func, params:params};
	this._idTable ++;
	return id;
};


p.removeEF = function(id) {
	if(this._enterframeTasks[id] !== undefined) {
		this._enterframeTasks[id] = null;
	}
	return -1;
};


p.delay = function(scope, func, params, delay) {
	var time = new Date().getTime();
	var t = {scope:scope, func:func, params:params, delay:delay, time:time};
	this._delayTasks.push(t);
};


p.defer = function(scope, func, params) {
	var t = {scope:scope, func:func, params:params};
	this._deferTasks.push(t);
};


p.next = function(scope, func, params) {
	var t = {scope:scope, func:func, params:params};
	this._nextTasks.push(t);
};


p.usurp = function(scope, func, params) {
	var t = {scope:scope, func:func, params:params};
	this._usurpTask.push(t);
};


var instance = null;

Scheduler.getInstance = function() {
	if(instance === null) {
		instance = new Scheduler();
	}
	return instance;
};

module.exports = Scheduler.getInstance();
},{}],21:[function(_dereq_,module,exports){
"use strict";


var ShaderLibs = function() { };

ShaderLibs.shaders = {};

ShaderLibs.shaders.copyVert = "#define GLSLIFY 1\n\n#define SHADER_NAME BASIC_VERTEX\n\nprecision highp float;\nattribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void) {\n    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
ShaderLibs.shaders.copyNormalVert = "#define GLSLIFY 1\n\n// copyWithNormals.vert\n\n#define SHADER_NAME BASIC_VERTEX\n\nprecision highp float;\nattribute vec3 aVertexPosition;\nattribute vec3 aNormal;\nattribute vec2 aTextureCoord;\n\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec3 vNormal;\nvarying vec3 vVertex;\n\nvoid main(void) {\n\tgl_Position   = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n\tvTextureCoord = aTextureCoord;\n\tvNormal       = aNormal;\n\tvVertex \t  = aVertexPosition;\n}";

ShaderLibs.shaders.generalVert = "#define GLSLIFY 1\n\n#define SHADER_NAME GENERAL_VERTEX\n\nprecision highp float;\nattribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\nuniform vec3 position;\nuniform vec3 scale;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void) {\n    vec3 pos = aVertexPosition;\n    pos *= scale;\n    pos += position;\n    gl_Position = uPMatrix * uMVMatrix * vec4(pos, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
ShaderLibs.shaders.generalNormalVert = "#define GLSLIFY 1\n\n#define SHADER_NAME GENERAL_VERTEX\n\nprecision highp float;\nattribute vec3 aVertexPosition;\nattribute vec3 aNormal;\nattribute vec2 aTextureCoord;\n\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\nuniform vec3 position;\nuniform vec3 scale;\n\nvarying vec3 vVertex;\nvarying vec3 vNormal;\nvarying vec2 vTextureCoord;\n\nvoid main(void) {\n\tvec3 pos      = aVertexPosition;\n\tpos           *= scale;\n\tpos           += position;\n\tgl_Position   = uPMatrix * uMVMatrix * vec4(pos, 1.0);\n\tvTextureCoord = aTextureCoord;\n\t\n\tvNormal       = aNormal;\n\tvVertex       = pos;\n}";
ShaderLibs.shaders.generalWithNormalVert = "#define GLSLIFY 1\n\n#define SHADER_NAME GENERAL_VERTEX\n\nprecision highp float;\nattribute vec3 aVertexPosition;\nattribute vec3 aNormal;\nattribute vec2 aTextureCoord;\n\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\nuniform vec3 position;\nuniform vec3 scale;\n\nvarying vec3 vVertex;\nvarying vec3 vNormal;\nvarying vec2 vTextureCoord;\n\nvoid main(void) {\n\tvec3 pos      = aVertexPosition;\n\tpos           *= scale;\n\tpos           += position;\n\tgl_Position   = uPMatrix * uMVMatrix * vec4(pos, 1.0);\n\tvTextureCoord = aTextureCoord;\n\t\n\tvNormal       = aNormal;\n\tvVertex       = pos;\n}";

ShaderLibs.shaders.copyFrag = "#define GLSLIFY 1\n\n#define SHADER_NAME SIMPLE_TEXTURE\n\nprecision highp float;\nvarying vec2 vTextureCoord;\nuniform sampler2D texture;\n\nvoid main(void) {\n    gl_FragColor = texture2D(texture, vTextureCoord);\n}\n";


ShaderLibs.shaders.alphaFrag = "#define GLSLIFY 1\n\n#define SHADER_NAME TEXTURE_WITH_ALPHA\n\nprecision highp float;\nvarying vec2 vTextureCoord;\nuniform sampler2D texture;\nuniform float opacity;\n\nvoid main(void) {\n    gl_FragColor = texture2D(texture, vTextureCoord);\n    gl_FragColor.a *= opacity;\n}";

ShaderLibs.shaders.simpleColorFrag = "#define GLSLIFY 1\n\n#define SHADER_NAME SIMPLE_COLOR_FRAGMENT\n\nprecision highp float;\nuniform vec3 color;\nuniform float opacity;\n\nvoid main(void) {\n    gl_FragColor = vec4(color, opacity);\n}";

ShaderLibs.shaders.depthFrag = "#define GLSLIFY 1\n\nprecision highp float;\nvarying vec2 vTextureCoord;\nuniform sampler2D texture;\nuniform float n;\nuniform float f;\n\nfloat getDepth(float z) {\n\treturn (6.0 * n) / (f + n - z*(f-n));\n}\n\nvoid main(void) {\n    float r = texture2D(texture, vTextureCoord).r;\n    float grey = getDepth(r);\n    gl_FragColor = vec4(grey, grey, grey, 1.0);\n}";

ShaderLibs.shaders.simpleCopyLighting = "#define GLSLIFY 1\n\n#define SHADER_NAME SIMPLE_TEXTURE_LIGHTING\n\nprecision highp float;\n\nuniform vec3 ambient;\nuniform vec3 lightPosition;\nuniform vec3 lightColor;\nuniform float lightWeight;\n\nuniform sampler2D texture;\n\nvarying vec2 vTextureCoord;\nvarying vec3 vVertex;\nvarying vec3 vNormal;\n\nvoid main(void) {\n\tvec3 L        = normalize(lightPosition-vVertex);\n\tfloat lambert = max(dot(vNormal, L), .0);\n\tvec3 light    = ambient + lightColor * lambert * lightWeight;\n\tvec4 color \t  = texture2D(texture, vTextureCoord);\n\tcolor.rgb \t  *= light;\n\t\n\tgl_FragColor  = color;\n}";
ShaderLibs.shaders.simpleColorLighting = "#define GLSLIFY 1\n\n// simpleColorLighting.frag\n\n#define SHADER_NAME SIMPLE_COLOR_LIGHTING\n\nprecision highp float;\n\nuniform vec3 ambient;\nuniform vec3 lightPosition;\nuniform vec3 lightColor;\nuniform float lightWeight;\n\nuniform vec3 color;\nuniform float opacity;\n\nvarying vec3 vVertex;\nvarying vec3 vNormal;\n\nvoid main(void) {\n\tvec3 L        = normalize(lightPosition-vVertex);\n\tfloat lambert = max(dot(vNormal, L), .0);\n\tvec3 light    = ambient + lightColor * lambert * lightWeight;\n\t\n\tgl_FragColor  = vec4(color * light, opacity);\n}";



ShaderLibs.getShader = function(mId) {
	return this.shaders[mId];
};

ShaderLibs.get = ShaderLibs.getShader;
module.exports = ShaderLibs;
},{}],22:[function(_dereq_,module,exports){
"use strict";

var glm = _dereq_("gl-matrix");
var CameraPerspective = _dereq_("./CameraPerspective");
var EaseNumber = _dereq_("./EaseNumber");

var SimpleCamera = function(mListenerTarget) {
	this._listenerTarget = mListenerTarget || window;
	CameraPerspective.call(this);
	// this._isLocked = false;
	this._init();
};

var p = SimpleCamera.prototype = new CameraPerspective();
var s = CameraPerspective.prototype;

p._init = function() {
	this.radius          = new EaseNumber(500);
	this.position[2]     = this.radius.value;
	this.center          = glm.vec3.create( );
	this.up              = glm.vec3.clone( [0,-1,0] );
	this.lookAt(this.position, this.center, this.up);
	this._mouse          = {};
	this._preMouse       = {};
	this._isMouseDown    = false;
	
	this._rx             = new EaseNumber(0);
	this._rx.limit(-Math.PI/2, Math.PI/2);
	this._ry             = new EaseNumber(0);
	this._preRX          = 0;
	this._preRY          = 0;
	// this._isLocked       = false;
	this._isLockZoom 	 = false;
	this._isLockRotation = false;
	this._isInvert       = false;

	this._listenerTarget.addEventListener("mousewheel", this._onWheel.bind(this));
	this._listenerTarget.addEventListener("DOMMouseScroll", this._onWheel.bind(this));

	this._listenerTarget.addEventListener("mousedown", this._onMouseDown.bind(this));
	this._listenerTarget.addEventListener("touchstart", this._onMouseDown.bind(this));
	this._listenerTarget.addEventListener("mousemove", this._onMouseMove.bind(this));
	this._listenerTarget.addEventListener("touchmove", this._onMouseMove.bind(this));
	window.addEventListener("mouseup", this._onMouseUp.bind(this));
	window.addEventListener("touchend", this._onMouseUp.bind(this));
};

p.inverseControl = function(value) {
	if(value === undefined) {
		this._isInvert = true;
	} else {
		this._isInvert = value;
	}
};

p.lock = function(value) {
	if(value === undefined) {
		// this._isLocked = true;
		this._isLockZoom = true;
		this._isLockRotation = true;
	} else {
		this._isLockZoom = value;
		this._isLockRotation = value;
	}
};

p.lockRotation = function(value) {
	if(value === undefined) {
		this._isLockRotation = true;
	} else {
		this._isLockRotation = value;
	}
};

p.lockZoom = function(value) {
	this._isLockZoom = value === undefined ? true : value;
};

p._onMouseDown = function(mEvent) {
	if(this._isLockRotation) {return;}
	this._isMouseDown = true;
	getMouse(mEvent, this._mouse);
	getMouse(mEvent, this._preMouse);
	this._preRX = this._rx.targetValue;
	this._preRY = this._ry.targetValue;
};


p._onMouseMove = function(mEvent) {
	if(this._isLockRotation) {return;}
	getMouse(mEvent, this._mouse);
	if(mEvent.touches) {mEvent.preventDefault();}
	if(this._isMouseDown) {
		var diffX = this._mouse.x - this._preMouse.x;
		if(this._isInvert) {diffX *= -1;}
		this._ry.value = this._preRY - diffX * 0.01;

		var diffY = this._mouse.y - this._preMouse.y;
		if(this._isInvert) {diffY *= -1;}
		this._rx.value = this._preRX - diffY * 0.01;

		// if(this._rx.targetValue > Math.PI * 0.5) {this._rx.targetValue = Math;	}
	}
};


p._onMouseUp = function() {
	if(this._isLockRotation) {return;}
	this._isMouseDown = false;
	// getMouse(mEvent, this._mouse);
};


p._onWheel = function(aEvent) {
	if(this._isLockZoom) {	return;	}
	var w = aEvent.wheelDelta;
	var d = aEvent.detail;
	var value = 0;
	if (d){
		if (w) {
			value = w/d/40*d>0?1:-1; // Opera
		} else {
			value = -d/3;              // Firefox;         TODO: do not /3 for OS X
		}
	} else {
		value = w/120; 
	}

	// this._targetRadius -= value * 5;
	this.radius.add( -value * 5);
	
};


p.getMatrix = function() {
	this._updateCameraPosition();
	this.lookAt(this.position, this.center, this.up);
	return s.getMatrix.call(this);
};


p._updateCameraPosition = function() {
	this.position[2] 	= this.radius.value;

	this.position[1] = Math.sin(this._rx.value) * this.radius.value;
	var tr = Math.cos(this._rx.value) * this.radius.value;
	this.position[0] = Math.cos(this._ry.value + Math.PI*0.5) * tr;
	this.position[2] = Math.sin(this._ry.value + Math.PI*0.5) * tr;
};


var getMouse = function(mEvent, mTarget) {
	var o = mTarget || {};
	if(mEvent.touches) {
		o.x = mEvent.touches[0].pageX;
		o.y = mEvent.touches[0].pageY;
	} else {
		o.x = mEvent.clientX;
		o.y = mEvent.clientY;
	}

	return o;
};


p.__defineGetter__("rx", function() {
	return this._rx.targetValue;
});
 
p.__defineSetter__("rx", function(mValue) {
	this._rx.value = mValue;
});

p.__defineGetter__("ry", function() {
	return this._ry.targetValue;
});
 
p.__defineSetter__("ry", function(mValue) {
	this._ry.value = mValue;
});

module.exports = SimpleCamera;
},{"./CameraPerspective":6,"./EaseNumber":7,"gl-matrix":2}],23:[function(_dereq_,module,exports){
"use strict";

var SimpleImageLoader = function() {
	this._imgs             = {};
	this._loadedCount      = 0;
	this._toLoadCount      = 0;
	this._scope            = undefined;
	this._callback         = undefined;
	this._callbackProgress = undefined;
};

var p = SimpleImageLoader.prototype;


p.load = function(imgs, scope, callback, progressCallback) {
	this._imgs = {};
	this._loadedCount = 0;
	this._toLoadCount = imgs.length;
	this._scope = scope;
	this._callback = callback;
	this._callbackProgress = progressCallback;

	this._imgLoadedBind = this._onImageLoaded.bind(this);

	for ( var i=0; i<imgs.length ; i++) {
		var img         = new Image();
		img.onload      = this._imgLoadedBind;
		var path        = imgs[i];
		var tmp         = path.split("/");
		var ref         = tmp[tmp.length-1].split(".")[0];
		this._imgs[ref] = img;
		img.src         = path;
	}
};


p._onImageLoaded = function() {
	this._loadedCount++;

	if(this._loadedCount === this._toLoadCount) {
		this._callback.call(this._scope, this._imgs);
	} else {
		var p = this._loadedCount / this._toLoadCount;
		if(this._callbackProgress) {
			this._callbackProgress.call(this._scope, p);
		}
	}
};

module.exports = SimpleImageLoader;
},{}],24:[function(_dereq_,module,exports){
// View.js
"use strict";

var GLShader = _dereq_("./GLShader");

var View = function(aPathVert, aPathFrag) {
	this.shader = new GLShader(aPathVert, aPathFrag);
	this._init();
};

var p = View.prototype;

p._init = function() {
	// console.log("Should be overwritten by SuperClass");
};

p.render = function() {
	// console.log("Should be overwritten by SuperClass");
};

module.exports = View;


},{"./GLShader":12}],25:[function(_dereq_,module,exports){
// ViewAxis.js

"use strict";
var GL = _dereq_("./GLTools");
var View = _dereq_("./View");
var Mesh = _dereq_("./Mesh");

var vertShader = "precision highp float;attribute vec3 aVertexPosition;attribute vec2 aTextureCoord;attribute vec3 aColor;uniform mat4 uMVMatrix;uniform mat4 uPMatrix;varying vec2 vTextureCoord;varying vec3 vColor;void main(void) {    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);    vTextureCoord = aTextureCoord;    vColor = aColor;}";
var fragShader = "precision mediump float;varying vec3 vColor;void main(void) {    gl_FragColor = vec4(vColor, 1.0);}";

var ViewAxis = function(lineWidth, mFragShader) {
	this.lineWidth = lineWidth === undefined ? 2.0 : lineWidth;
	var fs = mFragShader === undefined ? fragShader : mFragShader;
	View.call(this, vertShader, fs);
};

var p = ViewAxis.prototype = new View();

p._init = function() {
	// this.mesh = bongiovi.MeshUtils.createPlane(2, 2, 1);

	var positions = [];
	var colors = [];
	var coords = [];
	var indices = [0, 1, 2, 3, 4, 5];
	var r = 9999;

	positions.push([-r,  0,  0]);
	positions.push([ r,  0,  0]);
	positions.push([ 0, -r,  0]);
	positions.push([ 0,  r,  0]);
	positions.push([ 0,  0, -r]);
	positions.push([ 0,  0,  r]);


	colors.push([1, 0, 0]);
	colors.push([1, 0, 0]);
	colors.push([0, 1, 0]);
	colors.push([0, 1, 0]);
	colors.push([0, 0, 1]);
	colors.push([0, 0, 1]);


	coords.push([0, 0]);
	coords.push([0, 0]);
	coords.push([0, 0]);
	coords.push([0, 0]);
	coords.push([0, 0]);
	coords.push([0, 0]);


	this.mesh = new Mesh(positions.length, indices.length, GL.gl.LINES);
	this.mesh.bufferVertex(positions);
	this.mesh.bufferTexCoords(coords);
	this.mesh.bufferIndices(indices);
	this.mesh.bufferData(colors, "aColor", 3, false);
};

p.render = function() {
	if(!this.shader.isReady()) {return;}

	this.shader.bind();
	GL.gl.lineWidth(this.lineWidth);
	GL.draw(this.mesh);
	GL.gl.lineWidth(1.0);
};

module.exports = ViewAxis;

},{"./GLTools":14,"./Mesh":15,"./View":24}],26:[function(_dereq_,module,exports){
"use strict";

var View = _dereq_("./View");
var GL = _dereq_("./GLTools");
var MeshUtils = _dereq_("./MeshUtils");

var ViewCopy = function(aPathVert, aPathFrag) {
	View.call(this, aPathVert, aPathFrag);
};

var p = ViewCopy.prototype = new View();

p._init = function() {
	if(!GL.gl) { return;	}
	this.mesh = MeshUtils.createPlane(2, 2, 1);
};

p.render = function(aTexture) {
	if(!this.shader.isReady()) {return;}
	this.shader.bind();
	this.shader.uniform("texture", "uniform1i", 0);
	// console.log('Render', aTexture);
	aTexture.bind(0);
	GL.draw(this.mesh);
};

module.exports = ViewCopy;

},{"./GLTools":14,"./MeshUtils":16,"./View":24}],27:[function(_dereq_,module,exports){
// ViewDotPlanes.js

"use strict";

var GL = _dereq_("./GLTools");
var View = _dereq_("./View");
var ShaderLibs = _dereq_("./ShaderLibs");
var Mesh = _dereq_("./Mesh");

// var vertShader = "precision highp float;attribute vec3 aVertexPosition;attribute vec2 aTextureCoord;attribute vec3 aColor;uniform mat4 uMVMatrix;uniform mat4 uPMatrix;varying vec2 vTextureCoord;varying vec3 vColor;void main(void) {    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);    vTextureCoord = aTextureCoord;    vColor = aColor;}";
// var fragShader = "precision mediump float;varying vec3 vColor;void main(void) {    gl_FragColor = vec4(vColor, 1.0);}";

var ViewDotPlanes = function(color, fragShader) {
	var grey = 0.75;
	this.color = color === undefined ? [grey, grey, grey] : color;
	var fs = fragShader === undefined ? ShaderLibs.get("simpleColorFrag") : fragShader;
	View.call(this, null, fs);
};

var p = ViewDotPlanes.prototype = new View();

p._init = function() {
	var positions = [];
	var coords = [];
	var indices = [];
	var index = 0;


	var numDots = 100;
	var size = 3000;
	var gap = size / numDots;
	var i, j;


	for(i=-size/2; i<size; i+=gap) {
		for(j=-size/2; j<size; j+=gap) {
			positions.push([i, j, 0]);
			coords.push([0, 0]);
			indices.push(index);
			index++;

			positions.push([i, 0, j]);
			coords.push([0, 0]);
			indices.push(index);
			index++;
		}
	}

	this.mesh = new Mesh(positions.length, indices.length, GL.gl.DOTS);
	this.mesh.bufferVertex(positions);
	this.mesh.bufferTexCoords(coords);
	this.mesh.bufferIndices(indices);
};

p.render = function() {
	this.shader.bind();
	this.shader.uniform("color", "uniform3fv", this.color);
	this.shader.uniform("opacity", "uniform1f", 1);
	GL.draw(this.mesh);
};

module.exports = ViewDotPlanes;

},{"./GLTools":14,"./Mesh":15,"./ShaderLibs":21,"./View":24}],28:[function(_dereq_,module,exports){
"use strict";

var Pass = _dereq_("./Pass");

var EffectComposer = function() {
	this._passes = [];
};

var p = EffectComposer.prototype = new Pass();


p.addPass = function(pass) {
	this._passes.push(pass);
};


p.render = function(texture) {
	this.texture = texture;
	for(var i=0; i<this._passes.length; i++) {
		this.texture = this._passes[i].render(this.texture);
	}

	return this.texture;
};

p.getTexture = function() {
	return this.texture;	
};


module.exports =EffectComposer;
},{"./Pass":29}],29:[function(_dereq_,module,exports){
"use strict";

var gl,GL = _dereq_("../GLTools");
var ViewCopy = _dereq_("../ViewCopy");
var FrameBuffer = _dereq_("../FrameBuffer");

var Pass = function(mParams, mWidth, mHeight, mFboParams) {
	mWidth = mWidth === undefined ? 512 : mWidth;
	mHeight = mHeight === undefined ? 512 : mHeight;
	gl = GL.gl;
	if(!mParams) {	return;	}
	if( (typeof mParams) === "string") {
		this.view = new ViewCopy(null, mParams);
	} else {
		this.view = mParams;
	}

	this.width = mWidth;
	this.height = mHeight;
	this._fboParams = mFboParams;

	this._init();
};

var p = Pass.prototype;


p._init = function() {
	this._fbo = new FrameBuffer(this.width, this.height, this._fboParams);
	this._fbo.bind();
	GL.setViewport(0, 0, this._fbo.width, this._fbo.height);
	GL.clear(0, 0, 0, 0);
	this._fbo.unbind();
	GL.setViewport(0, 0, GL.canvas.width, GL.canvas.height);

};


p.render = function(texture) {
	this._fbo.bind();
	GL.setViewport(0, 0, this._fbo.width, this._fbo.height);
	GL.clear(0, 0, 0, 0);
	this.view.render(texture);
	this._fbo.unbind();
	GL.setViewport(0, 0, GL.canvas.width, GL.canvas.height);

	return this._fbo.getTexture();
};

p.getTexture = function() {
	return this._fbo.getTexture();
};

p.getFbo = function() {
	return this._fbo;
};

module.exports = Pass;
},{"../FrameBuffer":10,"../GLTools":14,"../ViewCopy":26}],30:[function(_dereq_,module,exports){
// PassGreyscale.js

"use strict";
var Pass = _dereq_("./Pass");


var PassGreyscale = function(mWidth, mHeight, mFboParams) {
	Pass.call(this, "#define GLSLIFY 1\n\n// greyscale.frag\n\n#define SHADER_NAME FRAGMENT_GREYSCALE\n\nprecision highp float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D texture;\n\nvoid main(void) {\n\tvec4 color = texture2D(texture, vTextureCoord);\n\tfloat grey = (color.r + color.g + color.b) / 3.0;\n\tgl_FragColor = vec4(vec3(grey), color.a);\n}", mWidth, mHeight, mFboParams);
};

PassGreyscale.prototype = new Pass();

module.exports = PassGreyscale;
},{"./Pass":29}]},{},[1])(1)
});