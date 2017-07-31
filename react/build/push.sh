#!/bin/bash

npm run build && \
gaa && \
gcam $@ && \
ggpush
